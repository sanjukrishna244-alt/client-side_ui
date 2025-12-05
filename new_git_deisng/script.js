// script.js — Chart + gauge helpers

document.addEventListener("DOMContentLoaded", () => {

  // ---- Chart.js (PV line with shaded area and dotted horizontal grid) ----
  const ctx = document.getElementById("pvChart").getContext("2d");

  const labels = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];
  const data = [0.1,0.4,1.0,1.7,2.2,2.5,2.3,2.1,1.8,1.4,1.0];

  const pvChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "PV(W)",
        data,
        borderColor: "#12a36a",
        pointBackgroundColor: "#12a36a",
        pointRadius: 3,
        tension: 0.36,
        fill: true,
        backgroundColor: null
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend:{display:false},
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#111",
          bodyColor: "#333",
          borderColor: "#e6e6e6",
          borderWidth: 1,
          callbacks: { label: ctx => `PV(W): ${ctx.raw}` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#9aa4a0" } },
        y: {
          beginAtZero: true,
          suggestedMax: 3,
          grid: { color: "#e6e9e6", borderDash: [3,6] },
          ticks: { color: "#9aa4a0" }
        }
      },
      elements: { line: { borderWidth: 2.8 }, point: { radius: 3 } }
    }
  });

  // gradient fill after chart created
  const gradient = ctx.createLinearGradient(0,0,0,260);
  gradient.addColorStop(0, "rgba(18,163,106,0.08)");
  gradient.addColorStop(1, "rgba(18,163,106,0.02)");
  pvChart.data.datasets[0].backgroundColor = gradient;
  pvChart.update();

  // ---- gauges: set needle rotation (value 0-100 => -90..90deg) ----
  function setNeedleById(needleId, percent) {
    const deg = (percent / 100) * 180 - 90;
    const needle = document.getElementById(needleId);
    if (!needle) return;
    needle.style.transform = `rotate(${deg}deg)`;
  }

  // initial gauge values (tweak as needed)
  setNeedleById("g1needle", 35); // 35%
  setNeedleById("g2needle", 25); // 25%
  document.getElementById("g1val").textContent = "30W";
  document.getElementById("g2val").textContent = "20W";

  // meter pulse
  const meterValueEl = document.getElementById("meterValue");
  function pulse() {
    meterValueEl.style.transform = "scale(1.02)";
    setTimeout(()=> meterValueEl.style.transform = "scale(1)", 600);
  }
  setInterval(pulse, 4000);

  // Expose helper methods
  window.updateGauge = (gId, percent, text) => {
    setNeedleById(gId, percent);
    if (gId === "g1needle") document.getElementById("g1val").textContent = text;
    if (gId === "g2needle") document.getElementById("g2val").textContent = text;
  };

  window.updateChartData = (newLabels, newData) => {
    pvChart.data.labels = newLabels;
    pvChart.data.datasets[0].data = newData;
    pvChart.update();
  };

});
