// ---------- Dummy Data ----------
const loggerData = [
    { status: "Online", name: "Smart Logger X1", sn: "DL_104202", model: "SL-100", date: "2024-01-20" },
    { status: "Offline", name: "Smart Logger Z3", sn: "DL_204593", model: "SL-500", date: "2024-05-12" }
];

const historyData = [
    // { id: 1, oldD: "Logger A", oldSN: "A01273", newD: "Logger B", newSN: "B38292", date: "2024-08-10" }
];

// ---------- Table Render ----------
function renderLogger() {
    const tbody = document.getElementById("logger-table-body");
    const warningBox = document.querySelector("#page-logger .bottom-warning");
    
    tbody.innerHTML = loggerData.length ? loggerData.map(row => `
        <tr>
            <td>${row.status}</td>
            <td>${row.name}</td>
            <td>${row.sn}</td>
            <td>${row.model}</td>
            <td>${row.date}</td>
            <td><a href="#">Edit</a></td>
        </tr>`).join("") : `<tr><td colspan="6" style="text-align:center">No data</td></tr>`;
    
    // Show warning box if no data, hide if data exists
    if (loggerData.length === 0) {
        warningBox.style.display = "block";
    } else {
        warningBox.style.display = "none";
    }
}

function renderHistory() {
    const tbody = document.getElementById("history-table-body");
    const warningBox = document.querySelector("#page-history .bottom-warning");
    
    tbody.innerHTML = historyData.length ? historyData.map(row => `
        <tr>
            <td>${row.id}</td>
            <td>${row.oldD}</td>
            <td>${row.oldSN}</td>
            <td>${row.newD}</td>
            <td>${row.newSN}</td>
            <td>${row.date}</td>
            <td><a href="#">Edit</a></td>
        </tr>`).join("") : `<tr><td colspan="7" style="text-align:center">No data</td></tr>`;
    
    // Show warning box if no data, hide if data exists
    if (historyData.length === 0) {
        warningBox.style.display = "block";
    } else {
        warningBox.style.display = "none";
    }
}

// ---------- Tab Logic ----------
document.getElementById("tab-logger").onclick = () => switchTab("logger");
document.getElementById("tab-history").onclick = () => switchTab("history");

function switchTab(tab) {
    document.querySelectorAll(".sub-tabs button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active-page"));

    document.getElementById(`tab-${tab}`).classList.add("active");
    document.getElementById(`page-${tab}`).classList.add("active-page");
}

// ---------- Initial Render ----------
renderLogger();
renderHistory();
