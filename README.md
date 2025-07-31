# Automating Synchronous/Asynchronous Javascript with LambdaTest

This repository contains the code I used for demonstrating automation using
`selenium-webdriver` and the LambdaTest platform. The `syncauto.js` file shows
the synchronous automation. 

What will define synchronous or asynchronous to us is the behavior being tested with the browser, or the behavior being automated on the browser, not the async/await syntax of the selenium-webdriver we are using to automate.

## In `syncauto.js`
we imported our modules at the top of the script.
We obtained our username and access key from the .env file to enable us to connect to the LambdaTest Grid URL.
We set up our capabilities object, which is basically our LambdaTest environment. We grabbed the site we want to automate with the line:

`await driver.get("https://stevepurpose.github.io/polynomial-Evaluate/")`

We then used selenium-webdriver to search the DOM for our elements using their id attribute.

The `coEntry` variable represents an input element that takes the coefficients of x. The sendEntry variable represents a button on the page. The `varEntry` represents another input element that takes the substitute value for x. The `takeSum` variable represents a button that, when clicked, evaluates the polynomial. The `showEntry` variable represents a button that, when clicked, displays the coefficients of x in the order they were entered.
The values in `sendKeys()` are the coefficients (numbers before an unknown variable) of x, while the last `sendKeys()` key chained to the varEntry is the value of x. So we have six `sendkeys()`, and the last one is the value to substitute for x. The remaining five sendKeys() are used for our polynomial power coefficients. Our highest polynomial power is 4. Counting from 0 to 4.
 So we input the coefficient of each power of x, starting from the highest power (x⁴) to lowest (x⁰), and click after input of each coefficient using `sendEntry.click()`. So for our code below, x⁴ has a coefficient of 2, x³ has a coefficient of 0, since it is not existent in the given polynomial. Then  x² has 1, x¹ has 0 since it's non-existent, and x⁰ has 1. The value to substitute for x is 2.
The `displayInfo` variable represents a div element that displays the result of the evaluation or the coefficients of x in the order they were entered. If we click the `takeSum`, the `displayInfo` text will have the result of the polynomial evaluation. If we click `showEntry`, `displayInfo` text will have the coefficients of x in the order they were entered. We clicked `takeSum`, we got the text from `displayInfo`, and we asserted that it contains 37. This is the expected value from the polynomial evaluation. Then we later clicked `showEntry`, and the coefficients of x were present in `displayInfo`. We got the text from `displayInfo` and saved it as `info2`. We then logged `info2`. Run the code with:
 
`node syncauto.js`

What we proved: The behavior we automated above is synchronous because the result is instantly calculated and shown on the UI without any backend API, `fetch`, or `setTimeout`. We added inputs and clicked buttons in sequence. In all this, the browser behavior was synchronous. We can see this when we clicked showEntry; the coefficients of the powers of x were displayed in the order they were entered: 2 0 1 0 1.






## In `asyncauto1.test.js`
we  automated the addition of data into a local webpage after a specific time from when the webpage first rendered. We used LambdaTest Tunnel to make this possible. The `index.html` file and the `style.css` file where used for our webpage.

The html file is where we want to inject data into. We have two <p> elements that are editable. Data will be added synchronously into one and asynchronously into the other. We added some CSS to make the text larger.

In our script:
we imported our modules at the top.

1. We obtained our username and access Key from the .env file to enable us to connect to the LambdaTest Grid URL.

2. We set up our capabilities object, which is basically our LambdaTest environment.

3. await driver.get("http://localhost:8080/index.html") tells Selenium  to open the locally hosted webpage on LambdaTest through the LT tunnel. Note tunnel:true in capabilities.

4. We used driver.findElement(By.id(...) to get both paragraph elements from HTML and save them in variables syncPara and asyncPara.

5. We created a setTimeout to inject data asynchronously first, so as to verify the non-blocking behaviour. While making sure we console.log the data once it is a text content of the paragraph.

6. We inject data synchronously as the next task making sure to log the data as soon as it is available in the paragraph. Doing this logging in points 6 above and in this point 7 will enable us to verify which data injection was concluded first.

7. driver.sleep makes our async operation have enough time to complete and log the value before driver.quit runs.

8. try-catch was used to handle errors. await syntax is used because the instance methods of our Builder class return promises.

To run the set-up:

Start the http server:  `npm run server`.

In another terminal navigate to the folder where you downloaded the LT Tunnel. For Unix-based systems (Linux and macOS), before using for the first time to make the binary executable, run:

`chmod +x ./LT`


Then run:

`./LT --user <your_username> --key <your_access_key>`


In a third terminal, run the script: `node asyncauto.js`.

Go to the LambdaTest dashboard automation. You will see the session running live or recorded under the Build Name.


## In `asyncauto1.test.js` 
We integrated `selenium-webdriver` with `jest`.
In this scenario, we want to verify that a paragraph’s text updates on a webpage asynchronously after a `setTimeout`. The resulting paragraph text will then be clicked and it updates again showing “I was clicked”. We use Jest to assert this.  You can visualise this behaviour by visiting the web-page in this [link](https://stevepurpose.github.io/async-auto/).

 The `beforeAll1` and `afterAll` are setup and teardown features of Jest. The `describe`, `test`, and `expect` methods are also Jest features. We referenced our `USERNAME` and `ACCESS_KEY` set as environment variables in our `.env` file. We configured our `capabilities` object. 
 
Run the test with:
`npm test asyncauto1.test.js`
