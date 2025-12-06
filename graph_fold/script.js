document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('pvGraph');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // sample labels and data roughly matching the screenshot curve
  const labels = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  const values = [0,0,20,40,80,150,220,400,360,300,260,240,220,200,180,160,140];

  // gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height || 300);
  grad.addColorStop(0, 'rgba(31,176,127,0.18)');
  grad.addColorStop(1, 'rgba(31,176,127,0.00)');

  const data = {
    labels: labels,
    datasets: [{
      label: 'PV(W)',
      data: values,
      borderColor: '#1fb07f',
      backgroundColor: grad,
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#111',
        bodyColor: '#111',
        borderColor: '#ddd',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context){
            return 'PV(W): ' + context.parsed.y;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255,255,255,0.7)' }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.06)', borderDash: [4,6] },
        ticks: { color: 'rgba(255,255,255,0.7)' }
      }
    }
  };

  // create chart
  // destroy existing chart if reloaded
  if (window._pvChart) {
    window._pvChart.destroy();
    window._pvChart = null;
  }
  window._pvChart = new Chart(ctx, { type: 'line', data: data, options: options });
});
// LEFT NAV — DROPDOWNS
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let id = btn.dataset.target;
    if (!id) return;

    let box = document.getElementById(id);

    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== box) d.style.display = "none";
    });

    box.style.display = box.style.display === "block" ? "none" : "block";
  });
});

// CHART SETUP
const ctx = document.getElementById("pvGraph").getContext("2d");

const gridColor = "rgba(255,255,255,0.18)";

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14"],
    datasets: [{
      data: [0,0,0,0,0,0.2,0.6,1.2,2.1,2.4,2.2,2.1,1.8,1.6,1.4],
      borderColor: "#72ffd1",
      backgroundColor: "transparent",
      pointRadius: 0,
      borderWidth: 2,
      tension: .35
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#fff8" },
        grid: {
          color: gridColor,
          borderDash: [4, 6]
        }
      },
      y: {
        ticks: { color: "#fff9" },
        grid: {
          color: gridColor,
          borderDash: [4, 6]
        }
      }
    }
  }
});
