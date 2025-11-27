let volunteerRecords = [];

function validateForm(charityName, hours, date, rating) {
    let isValid = true;

    const charityNameError = document.getElementById("charityNameError");
    const hoursVolunteeredError = document.getElementById("hoursVolunteeredError");
    const volunteerDateError = document.getElementById("volunteerDateError");
    const experienceRatingError = document.getElementById("experienceRatingError");

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

function handleSubmit(event) {
    event.preventDefault();

    const charityName = document.getElementById("charityName").value;
    const hours = document.getElementById("hoursVolunteered").value;
    const date = document.getElementById("volunteerDate").value;
    const rating = document.getElementById("experienceRating").value;

    if (!validateForm(charityName, hours, date, rating)) return;

    const record = {
        charityName: charityName.trim(),
        hours: Number(hours),
        date: date,
        rating: Number(rating)
    };

    volunteerRecords.push(record);

    document.getElementById("volunteerForm").reset();

    console.log("New volunteer record added:", record);
    console.log("Current temporary records:", volunteerRecords);
}

if (typeof window !== "undefined") {
    const volunteerForm = document.getElementById("volunteerForm");
    if (volunteerForm) {
        volunteerForm.addEventListener("submit", handleSubmit);
    }
}

module.exports = { validateForm, handleSubmit, volunteerRecords };