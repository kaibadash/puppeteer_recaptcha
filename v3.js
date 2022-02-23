const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://pokosho.com/a/recaptcha/v2.html',
    {'timeout': 10000, 'waitUntil':'load'}
  );
  await page.waitForTimeout(1000); 
  
  const selector = ".g-recaptcha";
  const recaptchaPosition = await page.evaluate((selector) => {
    var el = document.querySelector(selector);
    var rect = el.getBoundingClientRect();
    return {
        height: rect.height,
        width: rect.width,
        x: rect.left,
        y: rect.top
    };
  }, selector);
  const margin = 30;
  await page.mouse.move(recaptchaPosition.x + margin, recaptchaPosition.y + margin, { steps: 1 });
  await page.mouse.click(recaptchaPosition.x + margin, recaptchaPosition.y + margin);
  
  await page.waitForTimeout(1000); 
  await page.click('#submit');
  const json = await page.content();
  console.log(json);
  await browser.close();
})();