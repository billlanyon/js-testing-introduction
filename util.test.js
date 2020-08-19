const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('1. Should output name and age', () => {
    const text = generateText('Bill', 55)
    expect(text).toBe('Bill (55 years old)');
});

test('2. Should output dataless text', () => {
    const text = generateText('', null)
    expect(text).toBe(' (null years old)');
});

test('3. Should output undefined', () => {
    const text = generateText()
    expect(text).toBe('undefined (undefined years old)');
});

test('4. checkAndGenerate: should generate valid text output', () => {
    const text = checkAndGenerate('Bill', 55);
    expect(text).toBe('Bill (55 years old)');
});

test('5. Pupetteer should click enter text and hit the button', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        args: ['--window-size=640,640']
    });
    const page = await browser.newPage();
    await page.goto('file:///Users/billlanyon/Documents/GitHub/js-testing-introduction/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (28 years old)');
}, 20000);