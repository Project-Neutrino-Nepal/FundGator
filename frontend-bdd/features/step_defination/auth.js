const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();
const delay = 5000;

Given("I am on the login page", async function () {
  await this.driver.get("http://localhost:3000/signin");
  await this.driver.wait(until.elementLocated(By.id("loginForm")), delay);
});

When(
  "I enter {string} as username and I enter {string1} as password",
  async function (username, password) {
    username = await this.driver.findElement(By.id("email"));
    password = await this.driver.findElement(By.id("password"));
    await this.driver.findElement(By.id("email")).sendKeys(username);
    await this.driver.findElement(By.id("password")).sendKeys(password);
  }
);

When("I click on the login button", async function () {
  await this.driver.findElement(By.id("login")).click();
});

Then("I should be redirected to the home page", async function () {
  await this.driver.wait(until.elementLocated(By.id("profileUpdate")), delay);
  const url = await this.driver.getCurrentUrl();
  expect(url).to.equal("http://localhost:3000/Welcome");
});


