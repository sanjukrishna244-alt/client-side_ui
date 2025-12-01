// ------------ Dummy Data ------------
const chargerTable = [
    { status: "Online", name: "EV-A1", sn: "SN1098", model: "Q2", capacity: "7.5KW", date: "2024-03-20", logger: "DL-02" },
    { status: "Offline", name: "EV-C3", sn: "SN2010", model: "P1", capacity: "11KW", date: "2024-01-10", logger: "DL-08" }
];

const layoutTable = []; // No data

const replaceHistory = [
    { no: 1, old: "EV-A1", oldSn: "SN1098", new: "EV-B3", newSn: "SN2100", date: "2024-02-10", note: "Upgrade" }
];

const rfidTable = []; // Empty

// ------------ Render Function ------------
function renderTable(id, dataArr, cols) {
    const tbody = document.getElementById(id);

    if (!dataArr.length) {
        tbody.innerHTML = `<tr><td colspan="${cols}">No data</td></tr>`;
        return;
    }

    tbody.innerHTML = dataArr.map(obj => `
        <tr>${Object.values(obj).map(v => `<td>${v}</td>`).join("")}<td>Add</td></tr>
    `).join("");
}

// ------------ Render Calls ------------
renderTable("chargerData", chargerTable, 8);
renderTable("layoutData", layoutTable, 4);
renderTable("replaceData", replaceHistory, 8);
renderTable("rfidData", rfidTable, 5);

// ------------ Tab Logic ------------
document.querySelectorAll(".sub-tabs button").forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".sub-tabs .active").classList.remove("active");
        btn.classList.add("active");

        document.querySelectorAll(".table-box").forEach(box => box.classList.add("hidden"));
        document.getElementById(btn.dataset.tab).classList.remove("hidden");
    };
});
