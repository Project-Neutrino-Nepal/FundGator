Feature: To Register 
   As a user, I need to register to the system by creating an account, so that I can use the system

  Scenario: User provides full name, email, password and confirm password and press register button to get registered in the application
    Given I am on the registration page
    When I enter "John Doe" in the "Full Name" field
    And I enter "ymilan361@gmail.com" in the "Email" field
    And I enter "123456" in the "Password" field
    And I enter "123456" in the "Confirm Password" field
    And I press "Register" button
    Then I should see "Registration Successful" message


    