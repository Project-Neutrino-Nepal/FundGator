Feature: To Login Admin
  As a Admin, I want to Login to the Admin Panel, So that I can access the Admin Panel
  Scenario: Login Admin
    Given I am on the Admin Login Page
    When I enter the emial "admin@gmail.com" and password "admin123"
    And I click on the Login button
    Then I should see the Admin Panel Page
