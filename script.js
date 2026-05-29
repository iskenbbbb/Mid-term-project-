let transactions = [];

function addTransaction() {

    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (description === "" || isNaN(amount)) {
        alert("Please fill all fields");
        return;
    }

    let transaction = {
        type: type,
        description: description,
        amount: amount
    };

    transactions.push(transaction);

    updateTable();
    updateSummary();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function updateTable() {

    let table = document.getElementById("transaction-list");

    table.innerHTML = "";

    transactions.forEach(transaction => {

        let row = `
            <tr>
                <td>${transaction.type}</td>
                <td>${transaction.description}</td>
                <td>$${transaction.amount}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

function updateSummary() {

    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "Income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    let balance = income - expenses;

    document.getElementById("income").innerText = "$" + income;
    document.getElementById("expenses").innerText = "$" + expenses;
    document.getElementById("balance").innerText = "$" + balance;
}
