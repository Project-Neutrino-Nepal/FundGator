Feature: To Get All Companies List
  As a Admin, I want to get all companies list, so that I can manage them.
  Scenario: Get All Companies List in the System
    Given I am an Admin
    When I send a GET request to "http://localhost:3000/dashboard/company_admin"
    Then I receive a 200 status code