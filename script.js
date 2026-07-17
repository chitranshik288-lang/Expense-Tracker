const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const search = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");
const clearAllBtn = document.getElementById("clearAllBtn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let editIndex = -1;

displayExpenses();

addBtn.addEventListener("click", () => {

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const selectedCategory = category.value;

    if (name === "" || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    const expense = {
    name: name,
    amount: amount,
    category: selectedCategory,
    date: editIndex === -1
        ? new Date().toLocaleDateString("en-GB")
        : expenses[editIndex].date
};

  if (editIndex === -1) {

    expenses.push(expense);

} else {

    expenses[editIndex] = expense;

    editIndex = -1;

    addBtn.textContent = "Add Expense";

}

saveExpenses();

expenseName.value = "";
expenseAmount.value = "";

displayExpenses();

});

function displayExpenses() {

    expenseList.innerHTML = "";

    const searchText = search.value.toLowerCase();
    const selectedFilter = filterCategory.value;

    let totalAmount = 0;

    expenses.forEach((expense, index) => {

        if (!expense.name.toLowerCase().includes(searchText)) {
            return;
        }

        if (
            selectedFilter !== "All" &&
            expense.category !== selectedFilter
        ) {
            return;
        }

        totalAmount += expense.amount;

        const li = document.createElement("li");

        li.innerHTML = `
    <div>
        <strong>${expense.name}</strong><br>
        ${expense.category}<br>
        ₹${expense.amount}<br>
        📅 ${expense.date}
    </div>

    <div>
        <button class="edit-btn" onclick="editExpense(${index})">
            Edit
        </button>

        <button class="delete-btn" onclick="deleteExpense(${index})">
            Delete
        </button>
    </div>
`;

        expenseList.appendChild(li);

    });

    total.textContent = totalAmount;

}

function deleteExpense(index) {

    expenses.splice(index, 1);

    saveExpenses();

    displayExpenses();

}

function saveExpenses() {

    localStorage.setItem("expenses", JSON.stringify(expenses));

}

search.addEventListener("input", function () {
    displayExpenses();
});

filterCategory.addEventListener("change", function () {
    displayExpenses();
});

function editExpense(index) {

    const expense = expenses[index];

    expenseName.value = expense.name;
    expenseAmount.value = expense.amount;
    category.value = expense.category;

    editIndex = index;

    addBtn.textContent = "Update Expense";
}       

clearAllBtn.addEventListener("click", function () {

    if (confirm("Are you sure you want to delete all expenses?")) {

        expenses = [];

        saveExpenses();

        displayExpenses();

    }

});