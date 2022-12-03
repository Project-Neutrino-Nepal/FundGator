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
  await driver.findElement(By.id("email")).sendKeys("test@gmail.com");
  await driver.findElement(By.id("password")).sendKeys("test@1234");
  await driver.sleep(delay);
  await driver.findElement(By.id("loginBtn")).click();

  await driver.wait(until.elementLocated(By.id("loginForm")), 100000);
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  await driver.quit();
});


const { expect } = require("chai");
const { Given, When, Then } = require("@cucumber/cucumber");
const webdriver = require("selenium-webdriver");
const { By, until } = require("selenium-webdriver");
let driver = new webdriver.Builder().forBrowser("chrome").build();
Given(
  "I visit Crowdly Registration Page",
  { timeout: 1000 * 1000 },
  async () => {
    await driver.get("http://localhost:3000/login");
  }
);
When("I enter my fullname", async () => {
  await driver
    .findElement(By.xpath("//input[@placeholder='Enter Fullname']"))
    .sendKeys("Test User");
});
When("I enter my username", async () => {
  await driver
    .findElement(By.xpath("//input[@placeholder='Enter Username']"))
    .sendKeys("TestUser122323");
});
When("I enter my email", async () => {
  await driver
    .findElement(By.name("email"))
    .sendKeys("testuser122332@gmail.com");
});
When("I select applicant", async () => {
  let element = driver.wait(
    until.elementLocated(By.xpath("//div[@class='singleselectinput']"))
  );
  element.click();
  let candidate = driver.wait(
    until.elementLocated(By.xpath("//li[normalize-space()='individual']"))
  );
  candidate.click();
});
When("I enter my password", async () => {
  await driver.findElement(By.name("password")).sendKeys("password");
});
When("I press submit", async () => {
  let submit = driver.wait(
    until.elementLocated(By.xpath("//button[normalize-space()='Submit']"))
  );
  submit.click();
});
When("I press login now", async () => {
  let loginNow = driver.wait(
    until.elementLocated(By.xpath("//p[@class='toggle-account']"))
  );
  loginNow.click();
});
When("I press login", async () => {
  let loginNow = driver.wait(
    until.elementLocated(By.xpath("//button[normalize-space()='Submit']"))
  );
  loginNow.click();
});
Then("I should be loggedin", async () => {
  driver
    .wait(until.elementLocated(By.id("successFail")))
    .getText()
    .then((text) => {
      if (text === "User Created!: Redirection...") {
        console.log(text);
        return true;
      } else {
        console.log("Fail");
        return false;
      }
    });
});