const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");

const delay = 5000;
Given("Test registration functionality", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/signup");
  await driver.findElement(By.id("name")).sendKeys("test");
  await driver.findElement(By.id("email")).sendKeys("test1@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("test1234");
  await driver.findElement(By.id("confirmpassword")).sendKeys("test1234");
  await driver.sleep(delay);
  await driver.findElement(By.id("registerBtn")).click();

  await driver.wait(until.elementLocated(By.id("registerForm")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("registerForm"))));
  await driver.quit();
});

Given("Test login functionality", { timeout: 100000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/signin");
  await driver.findElement(By.id("email")).sendKeys("ymilan361@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("mko0mko0");
  await driver.sleep(delay);
  await driver.findElement(By.id("loginBtn")).click();

  await driver.wait(until.elementLocated(By.id("loginForm")), 100000);
  // after login it will redirect to welcome page with id "profileIpdate"
  expect(await driver.wait(until.elementLocated(By.id("profileUpdate"))));
  await driver.quit();
});


