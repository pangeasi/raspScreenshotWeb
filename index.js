const puppeteer = require('puppeteer');
const request = require('request');
const express = require('express');

const app = express();
app.use(express.static('public'));

app.get('/frontAndBack/:id', (req, res) => {
    (async () => {
        const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']})
        const page = await browser.newPage()
        await page.setViewport({ width: 1280, height: 800 })
        await page.goto(`http://localhost:8080/front/${req.params.id}`)
        await page.waitFor(2000)
        await page.screenshot({ path: `public/front_${req.params.id}.png`, fullPage: false, clip: {
            x: 400,
            y: 0,
            width: 500,
            height: 500
        } })
        await page.goto(`http://localhost:8080/back/${req.params.id}`)
        await page.waitFor(2000)
        await page.screenshot({ path: `public/back_${req.params.id}.png`, fullPage: false, clip: {
            x: 400,
            y: 0,
            width: 500,
            height: 500
        } })
        await browser.close()
      })()
      res.send('1');
})




app.listen(3333, console.log('listen on port 3333'));
