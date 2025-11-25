// Grab references to the donation tracker form
const form = document.getElementById('donationTracker');

// Submit function
form.addEventListener("submit", (event) =>{

    // clear previous errors
    const errorMessges = document.querySelectorAll(".error-message");
    for (const el of errorMessges){
        el.remove();
    }

    // prevent default submission behaviour
    event.preventDefault();

    // unpause and submit form upon validated form
    if(validateForm()){
        form.submit()
        console.log("Validation successful.");
    } else{
        console.log("Validation failed.");
    }

})

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
    }

    // Validate donation amount
    const donationAmountInput = document.getElementById("donation-amount");
    const donationAmountContainer = document.getElementById("donation-amount-container");
    if (donationAmountInput.value.trim() === ""){
        showInputError(donationAmountContainer, "Donation amount is required.");
        isValid = false;
        console.log("Donation amount field is empty.");
    }

    //

    return isValid;
}