var parse = require('url-parse')

let a = [ 'https://www.noticiasaominuto.com/cultura/1665185/covid-19-livrarias-voltam-a-fechar-mas-podem-vender-ao-postigo',
  'https://www.noticiasaominuto.com/cultura/1665167/estruturas-da-cultura-querem-mais-medidas-de-apoio-de-emergencia',
  'https://www.noticiasaominuto.com/cultura/1665142/novo-confinamento-e-agravar-de-tragedia-dizem-promotores-de-espetaculos',
  'https://www.noticiasaominuto.com/lifestyle',
  'https://www.noticiasaominuto.com/lifestyle/1663484/a-evolucao-do-ginasio',
  'https://www.noticiasaominuto.com/lifestyle/1665040/o-segredo-para-maximizar-o-sabor-do-alho-experimente',
  'https://www.noticiasaominuto.com/lifestyle/1664946/empanadas-o-verdadeiro-sabor-argentino-chegou-ao-principe-real',
  'https://www.noticiasaominuto.com/multimedia',
  'https://classificados.noticiasaominuto.com/',
  'https://classificados.noticiasaominuto.com/carros/',
  'https://classificados.noticiasaominuto.com/imoveis-venda/',
  'https://classificados.noticiasaominuto.com/imoveis-arrendar/',
  'https://classificados.noticiasaominuto.com/emprego/',
  'https://classificados.noticiasaominuto.com/',
  'https://www.noticiasaominuto.com/vozes-ao-minuto',
  'https://www.noticiasaominuto.com/informacoes',
  'https://www.noticiasaominuto.com/estatuto-editorial',
  'https://www.noticiasaominuto.com/propriedade-intelectual',
  'https://www.noticiasaominuto.com/politica-de-privacidade']


let b = 'https://www.noticiasaominuto.com/equipa'
b = parse(b).pathname.split('/').slice(1).length > 1
url = parse(a[0], true)
url = url.pathname.split('/').slice(1)

console.log(b)