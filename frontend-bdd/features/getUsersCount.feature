Feature: To Get Number of Investors
  As a Admin, I want to get number of investors, so that I can see how many investors are there in the system.
  Scenario: Get Number of Investors
    Given I am an Admin
    When I send a GET request to "http://localhost:5000/users/api/get-no-users"
    Then I should get a response with status code 200
    Then I receive a 200 status code