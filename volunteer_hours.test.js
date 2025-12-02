const { JSDOM } = require("jsdom");
const {
    validateForm,
    handleSubmit,
    volunteerRecords,
    loadFromLocalStorage,
    saveToLocalStorage,
    addRecordToTable,
    deleteRecord,
    updateTotalHours
} = require("./volunteer_hours");

beforeEach(() => {
    volunteerRecords.length = 0;

    const dom = new JSDOM(`
        <!DOCTYPE html>
        <body>
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

            <table id="volunteerTable">
                <tbody></tbody>
            </table>
            <div id="totalHours"></div>
        </body>
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

// Stage 2 Tests
beforeEach(() => {
    // 清空表格和总时长
    const tableBody = document.querySelector("#volunteerTable tbody");
    if (tableBody) tableBody.innerHTML = "";
    const totalHours = document.getElementById("totalHours");
    if (totalHours) totalHours.textContent = "0";

    // Mock localStorage
    global.localStorage = {
        store: {},
        getItem(key) {
            return this.store[key] || null;
        },
        setItem(key, value) {
            this.store[key] = value.toString();
        },
        clear() {
            this.store = {};
        }
    };
});


beforeEach(() => {
    if (!document.getElementById("volunteerTable")) {
        const table = document.createElement("table");
        table.id = "volunteerTable";
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        document.body.appendChild(table);
    }
    if (!document.getElementById("totalHours")) {
        const totalDiv = document.createElement("div");
        totalDiv.id = "totalHours";
        document.body.appendChild(totalDiv);
    }
});

test("adding a record updates table and total hours", () => {
    const record = { charityName: "Charity A", hours: 3, date: "2025-11-28", rating: 5 };
    volunteerRecords.push(record);
    addRecordToTable(record, 0);
    updateTotalHours();

    const tableRows = document.querySelectorAll("#volunteerTable tbody tr");
    expect(tableRows.length).toBe(1);
    expect(tableRows[0].cells[0].textContent).toBe("Charity A");
    expect(tableRows[0].cells[1].textContent).toBe("3");
    expect(document.getElementById("totalHours").textContent).toBe("3");
});

test("deleting a record updates table, total hours and localStorage", () => {
    const record = { charityName: "Charity B", hours: 4, date: "2025-11-29", rating: 4 };
    volunteerRecords.push(record);
    saveToLocalStorage();
    addRecordToTable(record, 0);
    updateTotalHours();

    deleteRecord(0);

    expect(volunteerRecords.length).toBe(0);
    expect(document.querySelectorAll("#volunteerTable tbody tr").length).toBe(0);
    expect(document.getElementById("totalHours").textContent).toBe("0");
    expect(localStorage.getItem("volunteerRecords")).toBe("[]");
});


test("loadFromLocalStorage correctly populates table and total hours", () => {

    const storedRecords = [
        { charityName: "Charity X", hours: 2, date: "2025-11-25", rating: 5 },
        { charityName: "Charity Y", hours: 4, date: "2025-11-26", rating: 3 }
    ];
    localStorage.setItem("volunteerRecords", JSON.stringify(storedRecords));


    loadFromLocalStorage();


    expect(volunteerRecords.length).toBe(2);
    expect(volunteerRecords[0]).toEqual(storedRecords[0]);
    expect(volunteerRecords[1]).toEqual(storedRecords[1]);


    const tableRows = document.querySelectorAll("#volunteerTable tbody tr");
    expect(tableRows.length).toBe(2);


    expect(tableRows[0].cells[0].textContent).toBe("Charity X");
    expect(tableRows[0].cells[1].textContent).toBe("2");
    expect(tableRows[1].cells[0].textContent).toBe("Charity Y");
    expect(tableRows[1].cells[1].textContent).toBe("4");


    expect(document.getElementById("totalHours").textContent).toBe("6");
});