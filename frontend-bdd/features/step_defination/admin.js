const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");

const delay = 5000;

Given("I am on the Admin Login Page", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/signin");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("loginForm")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  // await driver.quit();
});

When(
  "I enter the emial {string} and password {string}",{timeout:100000},
  async function (string, string2) {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/signin");
    await driver.wait(until.elementLocated(By.id("loginForm")), 100000);

    string = "ymilan593@gmail.com";
    string2 = "mko0mko0";
    await driver.findElement(By.id("email")).sendKeys(string);
    await driver.findElement(By.id("password")).sendKeys(string2);
    await driver.sleep(delay);
    expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
    // await driver.quit();
  }
);
When("I click on the Login button", async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/signin");
  await driver.wait(until.elementLocated(By.id("loginForm")), 100000);

  await driver.findElement(By.id("loginBtn")).click();

  await driver.sleep(delay);
  await axios.post("http://localhost:5000/users/api/login").then((res) => {
    expect(res.status).to.equal(200);
  });
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  // await driver.quit();
});

Then("I should see the Admin Panel Page", async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/signin");
  await driver.wait(until.elementLocated(By.id("loginForm")), 100000);

  await driver.wait(
    until.urlContains("http://localhost:3000/dashboard"),
    100000
  );
  expect(
    await driver.wait(until.urlContains("http://localhost:3000/dashboard"))
  );
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  // await driver.quit();
});

// Given("I am an Admin", { timeout: 100000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/dashboard/company_admin");

//   await driver.wait(until.elementLocated(By.id("adminCompany")), 100000);
//   expect(await driver.wait(until.elementLocated(By.id("adminCompany"))));
//   await driver.quit();
// });

// When("I send a GET request to {string}", function (string) {
//   // Write code here that turns the phrase above into concrete actions
//   return "pending";
// });

// Then("I receive a {int} status code", function (int) {
//   // Then('I receive a {float} status code', function (float) {
//   // Write code here that turns the phrase above into concrete actions
//   return "pending";
// });
