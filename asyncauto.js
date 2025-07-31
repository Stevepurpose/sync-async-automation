require('dotenv').config()
const { Builder, By } = require('selenium-webdriver')


const USERNAME = process.env.LT_USERNAME
const ACCESS_KEY = process.env.LT_ACCESS_KEY

const GRID_URL = `https://${USERNAME}:${ACCESS_KEY}@hub.lambdatest.com/wd/hub`

const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  platformName: 'Windows 10',
  'LT:Options': {
    build: 'Async Data Injection',
    name: 'Non-blocking SendKeys Logging',
    selenium_version: '4.0.0',
    tunnel: true,
  },
}

async function asyncAutomate() {
  const driver = await new Builder()
    .usingServer(GRID_URL)
    .withCapabilities(capabilities)
    .build()

  try {
    await driver.get('http://localhost:8080/index.html')

    const syncPara = await driver.findElement(By.id('sync'))
    const asyncPara = await driver.findElement(By.id('async'))

    //automate async injection first non-blocking behaviour
    setTimeout(async () => {
      await asyncPara.sendKeys('Asynchronous injection after delay')
      const asyncText = await asyncPara.getText()
      console.log('Async Text:', asyncText)
    }, 5000)

    //automate another injection won’t wait for setTimeout
    await syncPara.sendKeys('Synchronous injection completed')
    const syncText = await syncPara.getText()
    console.log('Sync Text:', syncText)

    // Wait long enough to capture async log
    await driver.sleep(7000)

  } catch (err) {
    console.error('Test failed:', err)
  } finally {
    await driver.quit()
  }
}

asyncAutomate()
