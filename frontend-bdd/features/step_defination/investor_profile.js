const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");

const delay = 5000;
Given("Test Profile Update Feature", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/welcome");
  await driver.findElement(By.id("legalName")).sendKeys("Milan Yadav");
  await driver.findElement(By.id("country")).sendKeys("Nepal");
  await driver.findElement(By.id("address")).sendKeys("Kathmandu");
  await driver.findElement(By.id("bio")).sendKeys("I am an sesonal investor.");
  await driver.findElement(By.id("website")).sendKeys("123.com");
  await driver.findElement(By.id("skills")).sendKeys("Computing and Trading");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("profileUpdate")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("profileUpdate"))));
  await driver.quit();
});

Given("Test update Settings", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/profile/Settings");
  await driver.sleep(delay);

  await driver.wait(until.elementLocated(By.id("SettingsPage")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("SettingsPage"))));
  await driver.quit();
});

Given("Investor can View his profile", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/profile");
  await driver.sleep(delay);
  await driver.wait(until.elementLocated(By.id("ProfilePage")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("ProfilePage"))));
  await driver.quit();
});
