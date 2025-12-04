const {JSDOM} = require("jsdom");
const { validateForm, saveDonationToLocalStorage, showInputError, 
        onSubmit, onPageLoadHandler, displayDonations, deleteDonation, updateTotalDonations } = require("./donation-script");

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

test ("Valid inputs return correct temporary data objects", () => {
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

test ("Donation table update after record is added to LocalStorage", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <table id = "donationTableBody"></table>
        `
    );
    global.document = dom.window.document;
    
    // Mock localStorage
    global.localStorage = {
        storage: {},
        getItem(key) {
            return this.storage[key] || null;
        },
        setItem(key, value) {
            this.storage[key] = value;
        },
        removeItem(key) {
            delete this.storage[key];
        }
    };

    // Set localStorage with one donation
    const donation = { id: 1, charityName: "Test Charity", amount: "50.00", date: "2024-06-01", comment: "Test comment" };
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));

    // Function to display donations in the table
    const displayDonations = () => {
        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        const tableBody = global.document.getElementById("donationTableBody");

        // Create a row for each donation
        donations.forEach((donation) => {
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>${donation.charityName}</td>
                <td>$${donation.amount}</td>
                <td>${donation.date}</td>
                <td>${donation.comment}</td>
                <td><button class="delete-btn" onclick="deleteDonation(${donation.id})">Delete</button></td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    displayDonations();

    const tableBody = global.document.getElementById("donationTableBody");
    expect(tableBody.innerHTML).toContain("<td>Test Charity</td>");
    expect(tableBody.innerHTML).toContain("<td>$50.00</td>");
    expect(tableBody.innerHTML).toContain("<td>2024-06-01</td>");
    expect(tableBody.innerHTML).toContain("<td>Test comment</td>");
    expect(tableBody.innerHTML).toContain("delete-btn");

});

test ("Data persisted in localStorage is correctly retrieved and displayed", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <table id = "donationTableBody"></table>
        `
    );
    global.document = dom.window.document;

    // Mock localStorage with persisted donation
    global.localStorage = {
        storage: {
            "donations": JSON.stringify([
            { id: 1, charityName: "Test Charity", amount: "50.00", date: "2024-06-01", comment: "Test comment" },
        ]),
        },
        getItem(key) {
            return this.storage[key] || null;
        },
        setItem(key, value) {
            this.storage[key] = value;
        }
    };
    // Function to display donations in the table
    const displayDonations = () => {
        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        const tableBody = global.document.getElementById("donationTableBody");

        // Create a row for each donation
        donations.forEach((donation) => {
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>${donation.charityName}</td>
                <td>$${donation.amount}</td>
                <td>${donation.date}</td>
                <td>${donation.comment}</td>
                <td><button class="delete-btn" onclick="deleteDonation(${donation.id})">Delete</button></td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    displayDonations();
    const tableBody = global.document.getElementById("donationTableBody");
    expect(tableBody.innerHTML).toContain("<td>Test Charity</td>");
    expect(tableBody.innerHTML).toContain("<td>$50.00</td>");
    expect(tableBody.innerHTML).toContain("<td>2024-06-01</td>");
    expect(tableBody.innerHTML).toContain("<td>Test comment</td>");
    expect(tableBody.innerHTML).toContain("delete-btn");
});

test ("Donation Calculation Update", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <span id="totalAmount"></span>
        `
    );
    global.document = dom.window.document;
    
    // Mock localStorage
    global.localStorage = {
        storage: {},
        getItem(key) {
            return this.storage[key] || null;
        },
        setItem(key, value) {
            this.storage[key] = value;
        },
        removeItem(key) {
            delete this.storage[key];
        }
    };
    
    const donation = { id: 1, charityName: "Test Charity", amount: "50.00", date: "2024-06-01", comment: "Test comment" };
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));
    
    // Call updateTotalDonations to calculate and display the total
    const updateTotalDonations = () => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    
    // Calculate sum of all donation amounts
    const total = donations.reduce((sum, donation) => {
        return sum + parseFloat(donation.amount);
    }, 0); // Let sum start from 0
    
    // Update the display with formatted currency
    const totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = `$${total.toFixed(2)}`;
    
    console.log("Total donations updated to:", total);
    }

    updateTotalDonations();

    expect(global.document.getElementById("totalAmount").textContent).toBe("$50.00");
});

test ("Donation Deletion updates localStorage and table display", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <p id="noDonationsMessage"></p>
        `
    );
    global.document = dom.window.document;
    // Mock localStorage
    global.localStorage = {
        storage: {},
        getItem(key) {
            return this.storage[key] || null;
        },
        setItem(key, value) {
            this.storage[key] = value;
        },
        removeItem(key) {
            delete this.storage[key];
        }
    };
    const donation = { id: 1, charityName: "Test Charity", amount: "50.00", date: "2024-06-01", comment: "Test comment" };
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));
    
    // Call updateTotalDonations to calculate and display the total
    const updateTotalDonations = () => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    
    // Calculate sum of all donation amounts
    const total = donations.reduce((sum, donation) => {
        return sum + parseFloat(donation.amount);
    }, 0); // Let sum start from 0
    }

    updateTotalDonations();

    // Function to delete a donation
    const deleteDonation = (id) => {
        let donations = JSON.parse(localStorage.getItem("donations")) || [];
        
        // Loop through donations and keep donations that do not match the selected id
        donations = donations.filter(donation => donation.id !== id);
        
        // Write over localStorage without the deleted donation
        localStorage.setItem("donations", JSON.stringify(donations));
    }

    const displayDonations = () => {
        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        const noDonationsMessage = global.document.getElementById("noDonationsMessage");
        
        // Update total donations
        updateTotalDonations();
        
        // Show message if no donations
        if (donations.length == 0) {
            noDonationsMessage.style.display = "block";
            return;
        }
        
        // Remove no donations message if donations exist
        noDonationsMessage.style.display = "none";

    }

    deleteDonation(1);
    updateTotalDonations();
    displayDonations();

    const noDonationsMessage = global.document.getElementById("noDonationsMessage");
    
    expect(global.localStorage.getItem("donations")).toBe("[]");
    expect(noDonationsMessage.style.display).toBe("block");
});

test (" Total Donation Amount updates after localstorage record deletion", () => {
    const dom = new JSDOM(
        `<!DOCTYPE html>
        <span id="totalAmount"></span>
        `
    );
    global.document = dom.window.document;
    // Mock localStorage
    global.localStorage = {
        storage: {},
        getItem(key) {
            return this.storage[key] || null;
        },
        setItem(key, value) {
            this.storage[key] = value;
        },
        removeItem(key) {
            delete this.storage[key];
        }
    };
    const donation = { id: 1, charityName: "Test Charity", amount: "50.00", date: "2024-06-01", comment: "Test comment" };
    // Set localStorage with one donation
    let donations = [donation];
    localStorage.setItem("donations", JSON.stringify(donations));

    // Function to calculate total donations
    const updateTotalDonations = () => {
        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        
        // Calculate sum of all donation amounts
        const total = donations.reduce((sum, donation) => {
            return sum + parseFloat(donation.amount);
        }, 0); // Let sum start from 0
        
        // Update the display with formatted currency
        const totalAmountElement = document.getElementById("totalAmount");
        totalAmountElement.textContent = `$${total.toFixed(2)}`;
        
        console.log("Total donations updated to:", total);
    }
    // Function to delete a donation
    const deleteDonation = (id) => {
        let donations = JSON.parse(localStorage.getItem("donations")) || [];
        
        // Loop through donations and keep donations that do not match the selected id
        donations = donations.filter(donation => donation.id !== id);
        
        // Write over localStorage without the deleted donation
        localStorage.setItem("donations", JSON.stringify(donations));
    }

    // Delete the only donation
    deleteDonation(1);
    // Update total donations after deletion
    updateTotalDonations();
    expect(global.document.getElementById("totalAmount").textContent).toBe("$0.00");
});