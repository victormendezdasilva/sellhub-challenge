# Coding Challenge: Test Automation with Playwright

## Objective:

The goal of this challenge is to assess your skills in creating automated tests using Playwright.
You will need to create a test project that verifies the functionality of a simple web application.

## Challenge Description:

1. Project Setup:

   1. Create a new Node.js project and install Playwright.
   2. Configure Playwright to run tests on at least two different browsers (e.g., Chromium and Firefox).

2. Test Web Application:

   1. Use the following website for your tests: https://impactshop.sellhub.cx/
   2. Create your own test suite and explain why you select to test that functionality
   3. Implement screenshot capture for failed tests.
   4. Ensure the tests are robust and handle wait times and race conditions appropriately.

3. Submission:
   1. Provide a link to a GitHub repository with your test project.
   2. Include a README file with instructions on how to set up and run the tests.

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/victormendezdasilva/sellhub-challenge.git
   ```

2. Navigate to the project directory:

   ```
   cd sellhub-challenge
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Copy the .example.env and change the name to .env

5. Add the tokens provided by email to the .env file

## Running the Tests Locally

To run the test locally use any of the following commands:

- Running tests for both views: `npm test`
- Running tests with the UI Runner: `npm run ui-test`
- Running tests for Chrome: `npm run test-chrome`
- Running tests for Firefox: `npm run test-firefox`
- Open the HTML report for the previous run: `npm run show-report`

## Coverage and explanation for choosing Cart Functionality

This are the tests included in the suite:

- User should be able to add product from Home Page
- Displayed Order Summary should be shown as expected
- User should be able to edit quantity and total should be updated
- User should be able to navigate, add product and total should be updated
- User should be able to delete product from Cart

I choose the Cart Functionality to automate because it is a critical part of any e-commerce platform, directly affecting user experience and sales. Automating these tests ensures seamless operation and prevents issues that could lead to lost revenue.

Additionally, the Cart Functionality was the most stable functionality available. It is better to automate e2e test for stable functionalities than others with too many errors and will be potentially change by dev team.

## Final Note

Thank you for reviewing my submission! I appreciate the opportunity to take on this challenge (it was really fun!) and demonstrate my skills with Playwright. I look forward to any feedback and the possibility of contributing further.
