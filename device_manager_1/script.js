// 🔀 Page Switch Logic
const btnInverter = document.getElementById("btn-inverter");
const btnReplace = document.getElementById("btn-replace");

const pageInverter = document.getElementById("page-inverter");
const pageHistory = document.getElementById("page-history");

// Activate Inverter Page
btnInverter.onclick = () => {
    btnInverter.classList.add("active");
    btnReplace.classList.remove("active");
    pageInverter.style.display = "block";
    pageHistory.style.display = "none";
};

// Activate Replacement Page
btnReplace.onclick = () => {
    btnReplace.classList.add("active");
    btnInverter.classList.remove("active");
    pageHistory.style.display = "block";
    pageInverter.style.display = "none";
};
