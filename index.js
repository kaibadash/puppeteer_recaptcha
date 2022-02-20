const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://pokosho.com/a/recaptcha/',
    {'timeout': 10000, 'waitUntil':'load'}
  );
  await page.waitForTimeout(1000); 
  await page.click('#submit');
  const json = await page.content();
  console.log(json);
  await browser.close();
})();