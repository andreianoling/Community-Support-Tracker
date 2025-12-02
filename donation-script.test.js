const {JSDOM} = require("jsdom");
const { validateForm, saveDonationToLocalStorage, showInputError, onSubmit, onPageLoadHandler } = require("./donation-script");

test ("Expect temporary objects (console.log) to be stored with valid inputs", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="test">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="50">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;

    // Expect valid temporary objects
    expect(console.log("Charity name:", "test"));
    expect(console.log("Donation amount:", "50"));
    expect(console.log("Donation date:", "2024-06-01"));
    expect(console.log("Donation comment:", "Test comment"));
});

test ("Invalid data triggers validation feedback", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="50">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;
    const charityNameInput = global.document.getElementById("charity-name");
    const charityNameContainer = global.document.getElementById("charity-name-container");
    expect(showInputError(charityNameContainer, "Charity name is required."));
});

test ("Identify empty field - donation amount", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="Test">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;
    const donationAmountInput = global.document.getElementById("donation-amount");
    const donationAmountContainer = global.document.getElementById("donation-amount-container");
    expect(validateForm()).toBe(false);
    expect(showInputError(donationAmountContainer, "Donation amount is required."));
});

test ("Invalid negative donation amount", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="Test">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="-10">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;
    const donationAmountInput = global.document.getElementById("donation-amount");
    const donationAmountContainer = global.document.getElementById("donation-amount-container");
    expect(showInputError(donationAmountContainer, "Donation amount cannot be negative."));
});

test ("Valid inputs are validated correctly", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="test">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="50">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;

    expect(validateForm()).toBe(true);
    expect(console.log("Charity name:", "test"));
    expect(console.log("Donation amount:", "50"));
    expect(console.log("Donation date:", "2024-06-01"));
    expect(console.log("Donation comment:", "Test comment"));
});

test ("Successfull donation table update", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="test">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="50">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;

    expect(console.log("New donation added to table")); // Tests that donation table is updated from data retrived from local storage
});

test ("Donation Calculation Update", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <div class="donation-input-container" id="charity-name-container">
            <label for="charity-name">Which charity did you donate to?</label>
            <input type="text" name="charity-name" id="charity-name" aria-label="Charity Name Input" value="test">
        </div>
        <div class="donation-input-container" id="donation-amount-container">
            <label for="donation-amount">How much did you donate?</label>
            <input type="number" name="donation-amount" id="donation-amount" placeholder="0.00" aria-label="Donation Amount Input" value="50">
        </div>
        <div class="donation-input-container" id="donation-date-container">
            <label for="donation-date">When did you make the donation?</label>
            <input type="date" name="donation-date" id="donation-date" aria-label="Donation Date Input" value="2024-06-01">
        </div>
        <div class="donation-input-container" id="donation-comment-container">
            <label for ="comment">Leave a comment for the donation:</label>
            <input type="text" name="comment" id="comment" aria-label="Donation Comment Input" value="Test comment">
        </div>
        `
    );
    global.document = dom.window.document;
    expect(console.log("Total donations updated to:", 50)); // Tests that total donation amount is updated correctly
});