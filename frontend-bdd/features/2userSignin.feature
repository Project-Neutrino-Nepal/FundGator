Feature: To Login 
  As a user, I need to login to the system after registration, so that I can access the system.

  Scenario: User provides Email address and password and press login button to get access to backend of application
    Given I am on the login page
    When I enter "ymilan361@gmail.com" in the "Email" field
    And I enter "mko0mko0" in the "Password" field
    And I press "Login" button
    Then I should be redirected to the home page
