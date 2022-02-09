const fs = require('fs');
const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync')


(async () => {

  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  await page.goto(URL);

 const imgList = await page.evaluate(() =>{
      // toda essa funçãos sera executada no browser

      // Vamos pegar tpdas as imagens que estao na parte de posts
      const nodeList = document.querySelectorAll('div img')
      // Transformar o nodelist em array
      const imgArray = [...nodeList]
      // Tranformar os nodes em obj JS
      const imgList = imgArray.map( ({src}) => ({
          src
      }))

      
      // Colocar pra fora da função
      return imgList
      
  })

  // Escrever os dados em um arquivo json
  fs.writeFile('file/olx.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('Algo deu errado!')
      console.log("Finalizado com sucesso")
  })

 await browser.close();
})();

