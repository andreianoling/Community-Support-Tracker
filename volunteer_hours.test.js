const { JSDOM } = require("jsdom");
const { validateForm, handleSubmit, volunteerRecords } = require("./volunteer_hours");

beforeEach(() => {
    volunteerRecords.length = 0;
    
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <form id="volunteerForm">
            <input type="text" id="charityName" />
            <span id="charityNameError"></span>

            <input type="number" id="hoursVolunteered" />
            <span id="hoursVolunteeredError"></span>

            <input type="date" id="volunteerDate" />
            <span id="volunteerDateError"></span>

            <input type="number" id="experienceRating" />
            <span id="experienceRatingError"></span>

            <button type="submit">Submit</button>
        </form>
    `);

    global.document = dom.window.document;
    global.window = dom.window;
});

test("all fields empty/invalid should not submit", () => {
    document.getElementById("charityName").value = "";
    document.getElementById("hoursVolunteered").value = "";
    document.getElementById("volunteerDate").value = "";
    document.getElementById("experienceRating").value = "";

    const form = document.getElementById("volunteerForm");
    form.addEventListener("submit", handleSubmit);

    const event = new window.Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    expect(volunteerRecords.length).toBe(0);
    expect(document.getElementById("charityNameError").textContent).toBe("Charity Name is required.");
    expect(document.getElementById("hoursVolunteeredError").textContent).toBe("Hours Volunteered must be a valid number ≥ 0.");
    expect(document.getElementById("volunteerDateError").textContent).toBe("Date of Volunteering is required.");
    expect(document.getElementById("experienceRatingError").textContent).toBe("Experience Rating must be between 1 and 5.");
});

test("all fields valid should submit correctly", () => {
    document.getElementById("charityName").value = "Good Charity";
    document.getElementById("hoursVolunteered").value = "5";
    document.getElementById("volunteerDate").value = "2025-11-27";
    document.getElementById("experienceRating").value = "4";

    const form = document.getElementById("volunteerForm");
    form.addEventListener("submit", handleSubmit);

    const event = new window.Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    expect(volunteerRecords.length).toBe(1);
    expect(volunteerRecords[0]).toEqual({
        charityName: "Good Charity",
        hours: 5,
        date: "2025-11-27",
        rating: 4
    });
});