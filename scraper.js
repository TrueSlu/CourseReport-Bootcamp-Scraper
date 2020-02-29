const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (var i = 0; i < 21; i++) {
        await page.goto(`https://www.coursereport.com/schools?page=${i + 1}`);


        const result = await page.evaluate(() => {

            const bootcamps = document.querySelectorAll(".school-header");
            let bootcampArray = [];

            for (var bootcamp of bootcamps) {
                bootcampArray.push(bootcamp.innerText);
            }

            return bootcampArray;

        });

        console.log(result);
        for (var bootcamp of result) {
            fs.appendFileSync('bootcamps.csv', `\n${bootcamp}`);
        }
    }

    await browser.close();
})();