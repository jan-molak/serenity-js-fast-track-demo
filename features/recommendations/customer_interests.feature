Feature: Customer interests

  In order to provide more accurate product suggestions to our customers
  As a Sales Director
  I'd like to know what their interests are

  @ui-only
  Scenario: Discount upon registration

    Given Sean creates a new user account using his email address sean@example.com
    When he specifies that he's interested in rock music
    Then he should be entitled to a 7% discount

  @fast-track
  Scenario: Discount upon registration (fast-track)

    Given Sean created a new account using his email address sean@example.com
    And specified that he's interested in rock music
    Then he should be entitled to a 7% discount

  @faster-track
  Scenario: Discount upon registration (faster fast-track)

    Given Sean created a new account specifying his email address sean@example.com and interest in rock music
    Then he should be entitled to a 7% discount

