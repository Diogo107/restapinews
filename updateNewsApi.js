'use strict';

const puppeteer = require('puppeteer')
const TopNews = require('./Schemas/topNews')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
try {
    mongoose.connect(process.env.MONGOOSE_SECRET, {
        useNewUrlParser: true
    });
} catch (error) {
    console.log('===> Error: ', error)
}

// Source => Noticias ao Minuto (pt-PT)
// Function to get the top news
const updateTopNews = async () => {
    const url = 'https://www.noticiasaominuto.com'
    const browser = await puppeteer.launch({ 
        args: [ '--start-maximized', '--no-sandbox'], // you can also use '--start-fullscreen'
        headless: true 
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    const topFiveNewsUrls = await page.evaluate( () => {
        const list = []
        for ( let i = 1; i < 6; i++ ) {
            list.push(document.querySelector(`body > div.main-container > div:nth-child(1) > div > div > div.col-lg-12.col-md-12.col-sm-12.col-xs-12.no-padding > div.col-lg-12.col-md-12.col-sm-12.hidden-xs.no-padding > ul > li:nth-child(${i}) > a`).getAttribute('href'))
        }
        return list
    })
    // Update Top Five Pages Content
    async function goForContent () {
        let index = 0
        async function update () {
            if (index < topFiveNewsUrls.length){
                let duplicated = await TopNews.exists({ url: topFiveNewsUrls[index] })
                if (!duplicated){
                    await page.goto(topFiveNewsUrls[index], {
                        waitUntil: 'networkidle2'
                    })
                    let singleTopNews = await page.evaluate(()=> {
                        let title = document.querySelector('body > div.main-container > div.bg-white > div.container-fluid.no-padding.news-wrapper > div.col-lg-8.col-md-6.col-sm-12.col-xs-12 > div.news-container > h1').innerText
                        let subtitle =  document.querySelector('body > div.main-container > div.bg-white > div.container-fluid.no-padding.news-wrapper > div.col-lg-8.col-md-6.col-sm-12.col-xs-12 > div.news-container > h2').innerText
                        let content = function () {
                            let text = []
                            for (let i = 1; i < 20; i++){
                                document.querySelector(`body > div.main-container > div.bg-white > div.container-fluid.no-padding.news-wrapper > div.col-lg-8.col-md-6.col-sm-12.col-xs-12 > div.news-container > div.row.news-main-text-container > div > div > p:nth-child(${i})`) != null && text.push(document.querySelector(`body > div.main-container > div.bg-white > div.container-fluid.no-padding.news-wrapper > div.col-lg-8.col-md-6.col-sm-12.col-xs-12 > div.news-container > div.row.news-main-text-container > div > div > p:nth-child(${i})`).innerText)
                            }
                            return text
                        }()
                        let imgUrl = document.querySelector('body > div.main-container > div.bg-white > div.container-fluid.no-padding.news-wrapper > div.col-lg-8.col-md-6.col-sm-12.col-xs-12 > div.news-container > div.news-main-image > picture > img').getAttribute('src')
                        return { title, subtitle, content, imgUrl }
                    })
                    singleTopNews.url = topFiveNewsUrls[index]
                    await TopNews.create(singleTopNews)
                }
                index++
                update ()
            }
        }
        await update ()
        //browser.close()
        //process.exit()
    }
    await goForContent()
}
updateTopNews()

// Function to get other news
const getOtherNews = async () => {
    const url = 'https://www.noticiasaominuto.com'
    const browser = await puppeteer.launch({ 
        args: [ '--start-maximized'], // you can also use '--start-fullscreen'
        headless: false 
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
}
//getOtherNews()
