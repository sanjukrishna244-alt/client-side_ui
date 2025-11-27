/*******************************
🔰 Dummy API Data (For Example)
********************************/

const dataToday = [
    { type: "Login", summary: "User logged in", operator: "John", time: "10:15 AM", action: "View" },
    { type: "Update", summary: "Updated product price", operator: "Sarah", time: "09:40 AM", action: "Details" }
];

const data7Days = [
    { type: "Delete", summary: "Removed invoice #45", operator: "Admin", time: "3 days ago", action: "Undo" },
    { type: "Create", summary: "Added new customer", operator: "Ravi", time: "5 days ago", action: "View" },
    { type: "Edit", summary: "Modified address info", operator: "Amir", time: "6 days ago", action: "Details" }
];

const data1Month = [
    { type: "Modify", summary: "Shipment delay updated", operator: "Karthik", time: "18 days ago", action: "View" }
];

const data3Months = []; // empty → will show default message

/*******************************
🧮 Render Function (map)
********************************/
function renderOperations(data) {
    const tableBody = document.getElementById("operationBody");

    if (!data || data.length === 0) {
        tableBody.innerHTML = `
            <tr class="default-row">
                <td colspan="5">Please add owner information</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = data.map(op => `
        <tr>
            <td>${op.type}</td>
            <td>${op.summary}</td>
            <td>${op.operator}</td>
            <td>${op.time}</td>
            <td style="color:#0CA174;font-weight:600;cursor:pointer;">${op.action}</td>
        </tr>
    `).join("");
}

/*******************************
🎯 Tab Button Actions (Click + Active Class)
********************************/

const tabButtons = document.querySelectorAll(".tabs button");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {

        // Remove active class from all tabs
        tabButtons.forEach(b => b.classList.remove("active"));

        // Add active class to clicked tab
        btn.classList.add("active");

        // Check text and show content using ternary logic
        const label = btn.textContent.trim();

        label === "Today" ? renderOperations(dataToday)
        : label === "Last 7 days" ? renderOperations(data7Days)
        : label === "Last 1 month" ? renderOperations(data1Month)
        : renderOperations(data3Months);
    });
});

/*******************************
🔥 Load default data on page load
********************************/
renderOperations(dataToday);
