const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const delay = 5000;

Given("Get All Investor", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard/investor_admin");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("AdminInvestor")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("AdminInvestor"))));
  await driver.quit();
});


Given("Suspend Investor Account page", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard/investor_admin");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("AdminInvestor")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("AdminInvestor"))));
  await driver.quit();
});

Given("Get My Company profile", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/company/638da97dd6394fc20060db55");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("CompanyProfile")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("CompanyProfile"))));
  await driver.quit();
});

Given("Get Total Number of Investors", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("adminPanel")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("adminPanel"))));
  await driver.quit();
});




