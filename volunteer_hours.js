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

// Stage Two Start

function loadFromLocalStorage() {
    const data = localStorage.getItem("volunteerRecords");
    if (data) {
        const records = JSON.parse(data);
        volunteerRecords.length = 0;
        records.forEach(r => volunteerRecords.push(r));
        volunteerRecords.forEach((record, index) => addRecordToTable(record, index));
        updateTotalHours();
    }
}


function saveToLocalStorage() {
    localStorage.setItem("volunteerRecords", JSON.stringify(volunteerRecords));
}

function addRecordToTable(record, index) {
    const tableBody = document.querySelector("#volunteerTable tbody");
    const row = document.createElement("tr");
    row.dataset.index = index;

    row.innerHTML = `
        <td>${record.charityName}</td>
        <td>${record.hours}</td>
        <td>${record.date}</td>
        <td>${record.rating}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `;

    tableBody.appendChild(row);

    row.querySelector(".deleteBtn").addEventListener("click", () => {
        deleteRecord(index);
    });
}


function deleteRecord(index) {
    volunteerRecords.splice(index, 1);
    saveToLocalStorage();
    refreshTable();
}


function refreshTable() {
    const tableBody = document.querySelector("#volunteerTable tbody");
    tableBody.innerHTML = "";
    volunteerRecords.forEach((record, index) => addRecordToTable(record, index));
    updateTotalHours();
}


function updateTotalHours() {
    const total = volunteerRecords.reduce((sum, r) => sum + r.hours, 0);
    document.getElementById("totalHours").textContent = total;
}
// Stage Two End

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

    // Stage Two Start
    saveToLocalStorage();
    addRecordToTable(record, volunteerRecords.length - 1);
    updateTotalHours();
    // Stage Two End

    document.getElementById("volunteerForm").reset();

    console.log("New volunteer record added:", record);
    console.log("Current temporary records:", volunteerRecords);
}

if (typeof window !== "undefined") {
    const volunteerForm = document.getElementById("volunteerForm");
    if (volunteerForm) {
        volunteerForm.addEventListener("submit", handleSubmit);
    }

    // Stage Two
    loadFromLocalStorage();
}

module.exports = { 
    validateForm, 
    handleSubmit, 
    volunteerRecords,
    loadFromLocalStorage,
    saveToLocalStorage,
    addRecordToTable,
    deleteRecord,
    updateTotalHours
};