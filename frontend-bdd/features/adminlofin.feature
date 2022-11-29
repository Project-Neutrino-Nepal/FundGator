Feature: To Login Admin
  As a Admin, I want to Login to the Admin Panel, So that I can access the Admin Panel
  Scenario: Login Admin
    Given I am an Admin
    When I send a POST request to "http://localhost:5000/users/api/login" with:
      | email    | ymilan361@gmail.com
      | password | mko0mko0
  Then I should receive a 200 status code
