const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");

const delay = 5000;
Given("Test registration functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://127.0.0.1:5000/users/api/register");
  await driver.findElement(By.id("firstName")).sendKeys("test");
  await driver.findElement(By.id("email")).sendKeys("test1@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("test1234");
  await driver.findElement(By.id("confirmpassword")).sendKeys("test1234");
  await driver.sleep(delay);
  await driver.findElement(By.id("registerBtn")).click();

  await driver.wait(until.elementLocated(By.id("registerForm")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("registerForm"))));
  // await driver.quit();
});

Given("Test login functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://127.0.0.1:5000/users/api/login");
  await driver.findElement(By.id("email")).sendKeys("test@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("test1234");
  await driver.sleep(delay);
  await driver.findElement(By.id("loginBtn")).click();

  await driver.wait(until.elementLocated(By.id("loginForm")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  // await driver.quit();
});


