require('dotenv').config()
const { Builder, By } = require('selenium-webdriver');
let assert = require("node:assert")

async function evaluatePoly() {
  //LambdaTest credentials
  const USERNAME =  process.env.LT_USERNAME
  const ACCESS_KEY = process.env.LT_ACCESS_KEY
  

  //LambdaTest Grid URL
  const GRID_URL = `https://${USERNAME}:${ACCESS_KEY}@hub.lambdatest.com/wd/hub`;

  
  const capabilities = {
    browserName: 'chrome',
    browserVersion: 'latest',       
    'LT:Options': {
      platformName: 'Windows 10',   
      build: 'Sync Data Injection',
      name: 'LambdaTest Synchronous Test',
      selenium_version: '4.0.0'     
    }
  };

  //Build the driver with the capabilities
  let driver = await new Builder()
    .usingServer(GRID_URL)
    .withCapabilities(capabilities)
    .build();

  try {
    //open site
    await driver.get('https://stevepurpose.github.io/polynomial-Evaluate/')
  let coEntry =  await driver.findElement(By.id('toPush'))
  let sendEntry = await driver.findElement(By.id('but1'))
  let varEntry = await driver.findElement(By.id("toSub"))
  let displayInfo = await driver.findElement(By.id("to_read"))
  let takeSum = await driver.findElement(By.id('but3'))
  let showEntry = await driver.findElement(By.id('but2'))


  await coEntry.sendKeys(2)
  await sendEntry.click()
  await coEntry.sendKeys(0)
  await sendEntry.click()
  await coEntry.sendKeys(1)
  await sendEntry.click()
  await coEntry.sendKeys(0)
  await sendEntry.click()
  await coEntry.sendKeys(1)
  await sendEntry.click()
  await varEntry.sendKeys(2)
  await takeSum.click()

let info = await displayInfo.getText()
console.log(info)
assert(info.includes("37"), "Expected result to contain 37")
console.log("Test Passed")

await showEntry.click()
let info2 = await displayInfo.getText()
console.log(info2)

} finally {
    await driver.quit();
  }
}
evaluatePoly()