from flask import Flask, render_template, request, redirect

app = Flask(__name__)

transactions = []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        transaction_type = request.form["type"]
        description = request.form["description"]
        amount = float(request.form["amount"])

        transactions.append({
            "type": transaction_type,
            "description": description,
            "amount": amount
        })

        return redirect("/")

    income = sum(t["amount"] for t in transactions if t["type"] == "Income")
    expenses = sum(t["amount"] for t in transactions if t["type"] == "Expense")
    balance = income - expenses

    return render_template(
        "index.html",
        transactions=transactions,
        income=income,
        expenses=expenses,
        balance=balance
    )

if __name__ == "__main__":
    app.run(debug=True)
