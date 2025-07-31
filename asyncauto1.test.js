require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');

describe('Check clickable text result', () => {
  let driver;

  beforeAll(async () => {
    const USERNAME = process.env.LT_USERNAME;
    const ACCESS_KEY = process.env.LT_ACCESS_KEY;

    const GRID_URL = `https://${USERNAME}:${ACCESS_KEY}@hub.lambdatest.com/wd/hub`;

    const capabilities = {
      browserName: 'chrome',
      browserVersion: 'latest',
      'LT:Options': {
        platformName: 'Windows 10',
        build: 'asyncTest Jest Build',
        name: 'async automation Test',
        selenium_version: '4.0.0'
      }
    };

    driver = await new Builder()
      .usingServer(GRID_URL)
      .withCapabilities(capabilities)
      .build();
  }, 60000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  }, 10000);

  test('clickable text result should contain clicked', async () => {  
    await driver.get('https://stevepurpose.github.io/async-auto/')

    const paragraph = await driver.findElement(By.id('two'))
    
    //Wait for the async update after 4 seconds
    await driver.wait(
      until.elementTextContains(paragraph, 'incremented to 1'),
      6000
    )

    console.log('Paragraph incremented as expected.')

    //  Automate click of text
    await paragraph.click()

    // Get text after click and assert 
    const finalText = await paragraph.getText()
    expect(finalText).toContain("clicked")

  }, 30000)
})
   