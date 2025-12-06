// Chart initialization for the PV line chart.
// This file supports two contexts:
// - Embedded in the main page: canvas id `pvGraph` (preferred)
// - Standalone demo page: canvas id `pvOnly`
// The script waits for DOMContentLoaded, finds the available canvas,
// creates a Chart.js line chart and exposes it as `window._pvChart` so
// other scripts (resize logic, toggles) can access or destroy it.
document.addEventListener('DOMContentLoaded', ()=>{
  // support both standalone page (`pvOnly`) and embedded page (`pvGraph`)
  const canvasId = document.getElementById('pvGraph') ? 'pvGraph' : (document.getElementById('pvOnly') ? 'pvOnly' : null);
  if(!canvasId) return;
  const canvasEl = document.getElementById(canvasId);
  const ctx = canvasEl.getContext('2d');

  const labels = ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00'];
  const dataPoints = [0,0,5,20,120,300,900,700,450];

  // responsive gradient
  const gradient = ctx.createLinearGradient(0,0,0,320);
  gradient.addColorStop(0, 'rgba(17,214,166,0.22)');
  gradient.addColorStop(1, 'rgba(17,214,166,0)');

  const data = {
    labels: labels,
    datasets: [{
      label: 'PV(W)',
      data: dataPoints,
      borderColor: '#00dbaa',
      backgroundColor: gradient,
      fill: true,
      tension: 0.28,
      borderWidth: 2,
      pointRadius: 0,
      segment: { borderJoinStyle: 'round' }
    }]
  };

  const options = {
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{display:false},
      tooltip:{
        enabled:false,
        external: function(context){
          // external tooltip: create DOM element
          const tooltipEl = getOrCreateTooltip(context);
          const tooltipModel = context.tooltip;
          if(tooltipModel.opacity === 0){ tooltipEl.style.opacity = 0; return; }

          // set text
          if(tooltipModel.body){
            const body = tooltipModel.body[0].lines[0];
            tooltipEl.innerHTML = `<div style="font-weight:600;margin-bottom:6px">Power: ${body} W</div><div style="font-size:12px;color:#666">Time: ${tooltipModel.title[0]}</div>`;
          }

          // position
          const canvasRect = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.left = (canvasRect.left + window.scrollX + tooltipModel.caretX - (tooltipEl.offsetWidth/2)) + 'px';
          tooltipEl.style.top = (canvasRect.top + window.scrollY + tooltipModel.caretY - tooltipEl.offsetHeight - 12) + 'px';
          tooltipEl.style.opacity = 1;
        }
      }
    },
    scales:{
      x:{
        grid:{display:false,drawBorder:false},
        ticks:{color:'rgba(255,255,255,0.5)'}
      },
      y:{
        beginAtZero:true,
        grid:{color:'rgba(255,255,255,0.06)',borderDash:[6,6]},
        ticks:{color:'rgba(255,255,255,0.6)'}
      }
    },
    interaction:{mode:'index',intersect:false}
  };

  // Create Chart.js instance for PV data (line chart)
  const chart = new Chart(ctx,{type:'line',data:data,options:options});

  // Expose the chart instance on `window` so the page script can
  // call `window._pvChart.resize()` or destroy it when switching views.
  window._pvChart = chart;

  // Add a ResizeObserver on the chart container. When the parent size
  // changes (for example when the layout changes or the user resizes
  // the window), call Chart.resize() to keep rendering crisp and
  // to allow Chart.js to recalc pixel ratio / scales.
  try{
    const parent = canvasEl.parentElement;
    if(window.ResizeObserver && parent){
      const ro = new ResizeObserver(()=>{ try{ chart.resize(); }catch(e){} });
      ro.observe(parent);
    }
  }catch(e){}

  // helper: create tooltip element
  function getOrCreateTooltip(context){
    let el = document.querySelector('.chartjs-tooltip');
    if(!el){
      el = document.createElement('div');
      el.className = 'chartjs-tooltip';
      el.style.position = 'absolute';
      el.style.pointerEvents = 'none';
      el.style.transition = 'all .08s ease';
      el.style.zIndex = 9999;
      document.body.appendChild(el);
    }
    return el;
  }
});
