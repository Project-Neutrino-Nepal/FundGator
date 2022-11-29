const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");

const delay = 5000;
// Given(
//   "Test registration functionality",
//   { timeout: 100000 },
//   async function () {
//     let driver = await new Builder().forBrowser("chrome").build();
//     await driver.get("http://localhost:3000/signup");
//     await driver.findElement(By.id("name")).sendKeys("test");
//     await driver.findElement(By.id("email")).sendKeys("test1@gmail.com");
//     await driver.findElement(By.id("password")).sendKeys("test1234");
//     await driver.findElement(By.id("confirmpassword")).sendKeys("test1234");
//     await driver.sleep(delay);
//     await driver.findElement(By.id("registerBtn")).click();

//     await driver.wait(until.elementLocated(By.id("registerForm")), 100000);
//     expect(await driver.wait(until.elementLocated(By.id("registerForm"))));
//     await driver.quit();
//   }
// );

Given("I am an Admin", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard/company_admin");

  await driver.wait(until.elementLocated(By.id("adminCompany")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("adminCompany"))));
  await driver.quit();
});


 When('I send a GET request to {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
         
         Then('I receive a {int} status code', function (int) {
         // Then('I receive a {float} status code', function (float) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       