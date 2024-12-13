let balance = 5000;
const password = 9999;
const transactions = [];

const screen = document.getElementById("screen");
const pinInput = document.getElementById("pin");
const submitPinButton = document.getElementById("submit-pin");
const options = document.getElementById("options");
const transaction = document.getElementById("transaction");
const amountInput = document.getElementById("amount");
const confirmTransactionButton = document.getElementById("confirm-transaction");
const transactionHistory = document.getElementById("transaction-history");
const historyList = document.getElementById("history-list");
const closeHistoryButton = document.getElementById("close-history");

let selectedOption = null;

submitPinButton.addEventListener("click", () => {
    const pin = parseInt(pinInput.value);
    if (pin === password) {
        screen.innerHTML = `<p>Welcome! Please select an option:</p>`;
        options.classList.remove("hidden");
        pinInput.classList.add("hidden");
        submitPinButton.classList.add("hidden");
    } else {
        screen.innerHTML = `<p>Wrong PIN. Please try again.</p>`;
    }
});

options.addEventListener("click", (e) => {
    const option = e.target.dataset.option;
    if (!option) return;

    selectedOption = parseInt(option);
    transaction.classList.add("hidden");
    transactionHistory.classList.add("hidden");
    amountInput.value = "";

    if (selectedOption === 1) {
        screen.innerHTML = `<p>Your current balance is $${balance}</p>`;
    } else if (selectedOption === 2) {
        screen.innerHTML = `<p>Enter the amount to withdraw:</p>`;
        transaction.classList.remove("hidden");
    } else if (selectedOption === 3) {
        screen.innerHTML = `<p>Enter the amount to deposit:</p>`;
        transaction.classList.remove("hidden");
    } else if (selectedOption === 4) {
        displayTransactionHistory();
    } else if (selectedOption === 5) {
        screen.innerHTML = `<p>Thank you for using our ATM!</p>`;
        options.classList.add("hidden");
        pinInput.classList.remove("hidden");
        submitPinButton.classList.remove("hidden");
    }
});

confirmTransactionButton.addEventListener("click", () => {
    const amount = parseInt(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        screen.innerHTML = `<p>Please enter a valid amount.</p>`;
        return;
    }

    if (selectedOption === 2) {
        if (amount > balance) {
            screen.innerHTML = `<p>Insufficient balance.</p>`;
        } else {
            balance -= amount;
            transactions.push(`Withdrawn: $${amount}`);
            screen.innerHTML = `<p>${amount} has been withdrawn. Your updated balance is $${balance}.</p>`;
        }
    } else if (selectedOption === 3) {
        balance += amount;
        transactions.push(`Deposited: $${amount}`);
        screen.innerHTML = `<p>${amount} has been deposited. Your updated balance is $${balance}.</p>`;
    }

    transaction.classList.add("hidden");
});

function displayTransactionHistory() {
    historyList.innerHTML = transactions.map(t => `<li>${t}</li>`).join("");
    transactionHistory.classList.remove("hidden");
}

closeHistoryButton.addEventListener("click", () => {
    transactionHistory.classList.add("hidden");
});
