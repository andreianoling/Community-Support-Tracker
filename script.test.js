const { validateForm, showInputError, saveDonationToLocalStorage } = require('./script');

test('validates form with all valid inputs', () => {
    // Set up the DOM
    document.body.innerHTML = `
        <form id="donationTracker">
            <div id="charity-name-container">
                <input type="text" id="charity-name" value="Winnipeg charity">
            </div>
            <div id="donation-amount-container">
                <input type="number" id="donation-amount" value="100">
            </div>
            <div id="donation-date-container">
                <input type="date" id="donation-date" value="2025-11-25">
            </div>
            <div id="donation-comment-container">
                <input type="text" id="comment" value="Happy to help!">
            </div>
        </form>
    `;

    // Call validateForm
    const result = validateForm();

    // Assert that validation passes
    expect(result).toBe(true);
    
});