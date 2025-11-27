// Submit function
function onSubmit(event) {
    // Get form reference
    const form = document.getElementById('donationTracker');

    // clear previous errors
    const errorMessges = document.querySelectorAll(".error-message");
    for (const el of errorMessges){
        el.remove();
    }

    // prevent default submission behaviour
    event.preventDefault();

    // unpause and submit form upon validated form
    if(validateForm()){
        saveDonationToLocalStorage();
        console.log("Validation successful. Donation saved to localStorage.");
        form.reset();
    } else{
        console.log("Validation failed.");
    }

}

// Form validation function
const validateForm = () => {

    let isValid = true;

    // Validate charity name
    const charityNameInput = document.getElementById("charity-name");
    const charityNameContainer = document.getElementById("charity-name-container");
    if (charityNameInput.value.trim() === ""){
        showInputError(charityNameContainer, "Charity name is required.");
        isValid = false;
        console.log("Charity name field is empty.");
    } else {
        console.log("Charity name:", charityNameInput.value);
        
    }

    // Validate donation amount
    const donationAmountInput = document.getElementById("donation-amount");
    const donationAmountContainer = document.getElementById("donation-amount-container");
    if (donationAmountInput.value.trim() === ""){
        showInputError(donationAmountContainer, "Donation amount is required.");
        isValid = false;
        console.log("Donation amount field is empty.");
    } else if ((donationAmountInput.value) < 0){
        showInputError(donationAmountContainer, "Donation amount cannot be negative.");
        isValid = false;
        console.log("Donation amount is negative.");
    } else {
        console.log("Donation amount:", donationAmountInput.value);
        
    }

    // Validate donation date
    const donationDateInput = document.getElementById("donation-date");
    const donationDateContainer = document.getElementById("donation-date-container");
    if (donationDateInput.value.trim() === ""){
        showInputError(donationDateContainer, "Donation date is required.");
        isValid = false;
        console.log("Donation date field is empty.");
    } else {
        console.log("Donation date:", donationDateInput.value);
    }

    // Validate donation comment
    const donationCommentInput = document.getElementById("comment");
    const donationCommentContainer = document.getElementById("donation-comment-container");
    if (donationCommentInput.value.trim() === ""){
        showInputError(donationCommentContainer, "Please leave a comment for your donation.");
        isValid = false;
        console.log("Donation comment field is empty.");
    } else {
        console.log("Donation comment:", donationCommentInput.value);
    }

    return isValid;
}

// Function to show input error messages
const showInputError = (inputElement, message) => {
    // create a span element to display the message
    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role","alert");

    inputElement.appendChild(errorDisplay);
}

// Function to save donation to localStorage
const saveDonationToLocalStorage = () => {
    // Get form values
    const charityName = document.getElementById("charity-name").value.trim();
    const donationAmount = document.getElementById("donation-amount").value.trim();
    const donationDate = document.getElementById("donation-date").value.trim();
    const donationComment = document.getElementById("comment").value.trim();

    // Create donation object
    const donation = {
        charityName: charityName,
        amount: donationAmount,
        date: donationDate,
        comment: donationComment,
    };

    // Get existing donations from localStorage or initialize empty array
    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Add new donation to array
    donations.push(donation);

    // Save updated donations array to localStorage
    //localStorage.setItem("donations", JSON.stringify(donations));

    console.log("Donation saved:", donation);
    
    // Return the stored donation object
    return donation;
}

function onPageLoadHandler() {
	const form = document.getElementById("donationTracker");
	if (form) {
		form.addEventListener("submit", onSubmit);
	}
}

// Run the handler if in a browser environment
if (typeof window !== "undefined") {
	window.onload = onPageLoadHandler;
} else {
	module.exports = { validateForm, saveDonationToLocalStorage,showInputError, onSubmit, onPageLoadHandler };
}