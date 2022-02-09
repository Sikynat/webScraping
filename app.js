const request = require('request-promise')
const cheerio = require('cheerio')
const { jsPDF } = require('jspdf')
const fs = require('fs')
const readlineSync = require('readline-sync')


console.log('=======================')
console.log('==Baixar Posts Da Olx==')
console.log('=======================')
console.log('')

var val = readlineSync.question('Digite a URL: ')
var name = readlineSync.question('Digite o nome do arquivo: ')

const URL = val

async function acesso(){
    const response = await request((URL))
    

    let $ = cheerio.load(response)
    let titulo = $('h1[class="sc-45jt43-0 eCghYu sc-ifAKCX cmFKIN"]').text()
    let desc = $('span[class="sc-1sj3nln-1 eOSweo sc-ifAKCX cmFKIN"]').text()
    let value = $('h2[class="sc-1wimjbb-0 JzEH sc-ifAKCX cmFKIN"]').text()
    let cat = $('a[class="sc-57pm5w-0 sc-1f2ug0x-2 dBeEuJ"]').text()
    


    fs.writeFile(`file/${name}.txt`, `${titulo} \n\n ${desc} \n\n ${value} \n\n ${cat}`, function(err){
      
      if(err){
          return console.log(err)
      }  
      console.log("Arquivo criado!")
    })
    
}

acesso()

module.exports = {
  URL, acesso
}


