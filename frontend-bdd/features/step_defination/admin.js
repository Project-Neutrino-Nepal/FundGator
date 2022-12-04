// const { expect } = require("chai");
// const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
// const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
// let driver =  new Builder().forBrowser("chrome").build();
// const delay = 5000;

// // BDD test from Admin Login

// Given("I visit Crowdly Admin Login Page", { timeout: 100000 }, async function () {
//   await driver.get("http://localhost:3000/admin/login");
// });


// Given("I am on the Admin Login Page", { timeout: 100000 }, async function () {
//   await driver.get("http://localhost:3000/signin");
//   await driver.sleep(delay);
//   await driver.wait(until.elementLocated(By.id("loginForm")), 100000);
//   // expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
// });
// When(
//   "I enter the emial {string} and password {string}",
//   async function (string, string2) {
//     // let driver = await new Builder().forBrowser("chrome").build();
//     // await driver.get("http://localhost:3000/signin");
//     await driver.wait(until.elementLocated(By.id("loginForm")), 100000);
//     string = "ymilan593@gmail.com";
//     string2 = "mko0mko0";
//     await driver.findElement(By.id("email")).sendKeys(string);
//     await driver.findElement(By.id("password")).sendKeys(string2);
//     await driver.sleep(delay);
//     // expect(
//     //   await driver.findElement(By.id("email")).getAttribute("value")
//     // ).to.equal(string);
//     // expect(
//     //   await driver.findElement(By.id("password")).getAttribute("value")
//     // ).to.equal(string2);
//     // expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
//     // await driver.quit();
//   }
// );
// When("I click on the Login button", async function () {
//   // let driver = await new Builder().forBrowser("chrome").build();
//   // await driver.get("http://localhost:3000/signin");
//   await driver.wait(until.elementLocated(By.id("loginForm")), 100000);
//   await driver.findElement(By.id("loginBtn")).click();
//   await driver.sleep(delay);
//   // expect(
//   //   await driver.findElement(By.id("loginBtn")).getAttribute("value")
//   // ).click();
//   // await driver.quit();
// });
// Then("I should see the Admin Panel Page", async function () {
//   // let driver = await new Builder().forBrowser("chrome").build();
//   // await driver.get("http://localhost:3000/signin");
//   await driver.wait(until.elementLocated(By.id("adminPanel")), 100000);

//   await driver.sleep(delay);
//   // expect(await driver.wait(until.elementLocated(By.id("adminPanel"))));
//   await driver.quit();
// });

