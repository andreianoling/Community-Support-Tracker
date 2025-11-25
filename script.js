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

