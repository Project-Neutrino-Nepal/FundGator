const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const delay = 5000;

Given("Get all Companies", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard/company_admin");
    await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("adminCompany")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("adminCompany"))));
  await driver.quit();
});

Given("Get Number of Companies", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard/");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("adminPanel")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("adminPanel"))));
  await driver.quit();
});

Given(
  "Investor can view all verified company in explore page",
  { timeout: 30000 },
  async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/explore/");
    await driver.sleep(delay);
    await driver.wait(until.elementLocated(By.id("explorePage")), 30000);
    expect(await driver.wait(until.elementLocated(By.id("explorePage"))));
    await driver.quit();
  }
);

Given(
  "Investor can View details of company",
  { timeout: 30000 },
  async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/detail/638ca8219c03c8a5371807d9");
    await driver.sleep(delay);
    await driver.wait(until.elementLocated(By.id("detailPage")), 30000);
    expect(await driver.wait(until.elementLocated(By.id("detailPage"))));
    await driver.quit();
  }
);

Given("Create Company", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/raise");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("createCompany")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("createCompany"))));
  await driver.quit();
});


Given("To raise fund", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/companyRegister/Hello");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("RaiseFund")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("RaiseFund"))));
  await driver.quit();
});




