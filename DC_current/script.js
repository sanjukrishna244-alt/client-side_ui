// script.js
// Animations and chart wiring

document.addEventListener("DOMContentLoaded", () => {

  // 1) Chart.js graph (PV line with shaded area and dotted grid)
  const ctx = document.getElementById("pvChart").getContext("2d");

  // Sample dataset approximating the screenshot curve
  const labels = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
  const data = [0.1,0.3,0.9,1.6,2.2,2.5,2.3,2.1,1.8,1.4,1.2,0.9];

  const pvChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "PV (W)",
        data,
        borderColor: "#12a36a",
        backgroundColor: ctx.createLinearGradient(0,0,0,260),
        pointRadius: 3,
        pointBackgroundColor: "#12a36a",
        tension: 0.35,
        fill: "start",
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend:{ display:false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#111",
          bodyColor: "#333",
          borderColor: "#e6e6e6",
          borderWidth: 1,
          callbacks: {
            label: ctx => `PV(W): ${ctx.raw}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false, drawBorder:false },
          ticks: { color: "#9aa4a0" }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 3,
          grid: {
            borderDash: [3,6],
            color: "#e6e9e6"
          },
          ticks: { color: "#9aa4a0" }
        }
      },
      elements: {
        line: {
          borderWidth: 2.8,
        },
        point: { radius: 3 }
      }
    }
  });

  // add gradient for dataset background (after chart created)
  const gradient = ctx.createLinearGradient(0,0,0,260);
  gradient.addColorStop(0, "rgba(18,163,106,0.08)");
  gradient.addColorStop(1, "rgba(18,163,106,0.02)");
  pvChart.data.datasets[0].backgroundColor = gradient;
  pvChart.update();

  // 2) Gauge needles animation helpers (map value 0-100 to -90..90 deg)
  function setNeedle(id, value) {
    // value expected 0..100, convert to -90° .. 90°
    const deg = (value / 100) * 180 - 90;
    const needle = document.getElementById(id);
    if (!needle) return;
    // Use transform rotate around center (100,110)
    needle.style.transform = `rotate(${deg}deg)`;
  }

  // Example values
  setNeedle("g1needle", 40); // 40% => angle
  setNeedle("g2needle", 30);

  // update displayed text
  document.getElementById("g1val").textContent = "30W";
  document.getElementById("g2val").textContent = "20W";

  // 3) simple function to update gauge values externally
  window.updateGauge = function(gaugeId, percent, text) {
    // gaugeId e.g. "g1needle"
    setNeedle(gaugeId, percent);
    if (gaugeId === "g1needle") document.getElementById("g1val").textContent = text;
    if (gaugeId === "g2needle") document.getElementById("g2val").textContent = text;
  };

  // 4) animated highlight for circular meter (no heavy lib)
  const meterValueEl = document.getElementById("meterValue");
  // you can update this from backend
  function pulseMeter() {
    meterValueEl.style.transform = "scale(1.02)";
    setTimeout(()=> meterValueEl.style.transform = "scale(1)", 600);
  }
  setInterval(pulseMeter, 4000);

});
