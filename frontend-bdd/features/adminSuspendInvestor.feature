Feature: To Suspend an Investor
  As a Admin, I want to suspend an investor, so that I can manage all investors
  Scenario: Suspend an Investor
    Given I am an Admin
    When I send a GET request to "http://localhost:3000/user/api/suspend-user"
    Then I receive a 200 status code