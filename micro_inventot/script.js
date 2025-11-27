// ⭐ MOCK DATA FOR MICRO INVERTER
const microData = [
    {
        status: "Online",
        name: "Micro-X1",
        sn: "MX12345678",
        model: "S-3000",
        pv: "4 Panels",
        layout: "Preview",
        op: "Edit"
    },
    {
        status: "Offline",
        name: "Micro-Edge",
        sn: "ME98765432",
        model: "S-2500",
        pv: "2 Panels",
        layout: "Preview",
        op: "Edit"
    }
];

// ⭐ MOCK DATA FOR REPLACEMENT HISTORY
const replaceData = [
    {
        num: 1,
        orgDev: "Micro-X1",
        orgSn: "MX12345678",
        newDev: "Micro-Pro",
        newSn: "MP56789432",
        date: "2024-10-10",
        op: "View"
    }
];

// ⭐ TAB ELEMENTS
const tabMicro = document.getElementById("tabMicro");
const tabReplace = document.getElementById("tabReplace");

const microTable = document.getElementById("microTable");
const replaceTable = document.getElementById("replaceTable");

// ⭐ RENDER MICRO DATA
function renderMicro() {
    const tbody = microTable.querySelector("tbody");
    tbody.innerHTML = "";

    if (microData.length === 0) {
        tbody.innerHTML = `<tr class="no-data"><td colspan="7">No data</td></tr>`;
        return;
    }

    microData.forEach(item => {
        tbody.innerHTML += `
           <tr>
                <td>${item.status}</td>
                <td>${item.name}</td>
                <td>${item.sn}</td>
                <td>${item.model}</td>
                <td>${item.pv}</td>
                <td>${item.layout}</td>
                <td><button class="btn-op">${item.op}</button></td>
           </tr>`;
    });
}

// ⭐ RENDER REPLACEMENT DATA
function renderReplace() {
    const tbody = replaceTable.querySelector("tbody");
    tbody.innerHTML = "";

    if (replaceData.length === 0) {
        tbody.innerHTML = `<tr class="no-data"><td colspan="7">No data</td></tr>`;
        return;
    }

    replaceData.forEach(item => {
        tbody.innerHTML += `
           <tr>
                <td>${item.num}</td>
                <td>${item.orgDev}</td>
                <td>${item.orgSn}</td>
                <td>${item.newDev}</td>
                <td>${item.newSn}</td>
                <td>${item.date}</td>
                <td><button class="btn-op">${item.op}</button></td>
           </tr>`;
    });
}

// ⭐ INITIAL LOAD
renderMicro();

// 🔄 Switch Content Logic
tabMicro.onclick = () => {
    tabMicro.classList.add("active");
    tabReplace.classList.remove("active");

    microTable.style.display = "block";
    replaceTable.style.display = "none";

    renderMicro();
};

tabReplace.onclick = () => {
    tabReplace.classList.add("active");
    tabMicro.classList.remove("active");

    microTable.style.display = "none";
    replaceTable.style.display = "block";

    renderReplace();
};
