# Automating Synchronous/Asynchronous Javascript with LambdaTest

This repository contains the code I used for demonstrating automation using
`selenium-webdriver` and the LambdaTest platform. The `syncauto.js` file shows
the synchronous automation. 

“What will define synchronous or asynchronous to us is the behavior being tested with the browser, or the behavior being automated on the browser, not the async/await syntax of the selenium-webdriver we are using to automate."

In `syncauto.js`, we imported our modules at the top of the script.
We obtained our username and access key from the .env file to enable us to connect to the LambdaTest Grid URL.
We set up our capabilities object, which is basically our LambdaTest environment. We grabbed the site we want to automate with the line:

`await driver.get("https://stevepurpose.github.io/polynomial-Evaluate/")`

We then used selenium-webdriver to search the DOM for our elements using their id attribute.

The `coEntry` variable represents an input element that takes the coefficients of x. The sendEntry variable represents a button on the page. The `varEntry` represents another input element that takes the substitute value for x. The `takeSum` variable represents a button that, when clicked, evaluates the polynomial. The showEntry variable represents a button that, when clicked, displays the coefficients of x in the order they were entered.
The values in sendKeys() are the coefficients (numbers before an unknown variable) of x, while the last sendKeys() key chained to the varEntry is the value of x. So we have six sendkeys(), and the last one is the value to substitute for x. The remaining five sendKeys() are used for our polynomial power coefficients. Our highest polynomial power is 4. Counting from 0 to 4.
 So we input the coefficient of each power of x, starting from the highest power (x⁴) to lowest (x⁰), and click after input of each coefficient using sendEntry.click(). So for our code below, x⁴ has a coefficient of 2, x³ has a coefficient of 0, since it is not existent in the given polynomial. Then  x² has 1, x¹ has 0 since it's non-existent, and x⁰ has 1. The value to substitute for x is 2.
The displayInfo variable represents a div element that displays the result of the evaluation or the coefficients of x in the order they were entered. If we click the takeSum, the displayInfo text will have the result of the polynomial evaluation. If we click showEntry, displayInfo text will have the coefficients of x in the order they were entered. We clicked takeSum, we got the text from displayInfo, and we asserted that it contains 37. This is the expected value from the polynomial evaluation. Then we later clicked showEntry, and the coefficients of x were present in displayInfo. We got the text from displayInfo and saved it as info2. We then logged info2. Run the code with:
 