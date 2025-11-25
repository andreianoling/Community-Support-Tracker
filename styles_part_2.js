
let volunteerRecords = [];


const volunteerForm = document.getElementById("volunteerForm");


const charityNameError = document.getElementById("charityNameError");
const hoursVolunteeredError = document.getElementById("hoursVolunteeredError");
const volunteerDateError = document.getElementById("volunteerDateError");
const experienceRatingError = document.getElementById("experienceRatingError");


function validateForm(charityName, hours, date, rating) {
    let isValid = true;


    charityNameError.textContent = "";
    hoursVolunteeredError.textContent = "";
    volunteerDateError.textContent = "";
    experienceRatingError.textContent = "";


    if (!charityName || charityName.trim() === "") {
        charityNameError.textContent = "Charity Name is required.";
        isValid = false;
    }


    const hoursValue = Number(hours);
    if (hours === "" || isNaN(hoursValue) || hoursValue < 0) {
        hoursVolunteeredError.textContent = "Hours Volunteered must be a valid number ≥ 0.";
        isValid = false;
    }


    if (!date) {
        volunteerDateError.textContent = "Date of Volunteering is required.";
        isValid = false;
    }


    const ratingValue = Number(rating);
    if (rating === "" || isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        experienceRatingError.textContent = "Experience Rating must be between 1 and 5.";
        isValid = false;
    }

    return isValid;
}


volunteerForm.addEventListener("submit", function(event) {
    event.preventDefault();


    const charityName = document.getElementById("charityName").value;
    const hours = document.getElementById("hoursVolunteered").value;
    const date = document.getElementById("volunteerDate").value;
    const rating = document.getElementById("experienceRating").value;


    const isValid = validateForm(charityName, hours, date, rating);
    if (!isValid) return;


    const record = {
        charityName: charityName.trim(),
        hours: Number(hours),
        date: date,
        rating: Number(rating)
    };


    volunteerRecords.push(record);


    volunteerForm.reset();

    console.log("New volunteer record added:", record);
    console.log("Current temporary records:", volunteerRecords);
});