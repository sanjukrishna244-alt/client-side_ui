// Basic interactive bits: draws dummy line chart and simple gauges
document.addEventListener('DOMContentLoaded', () => {
    drawGauges();
    drawLineChart();
  });
  
  // Draw little semicircular gauges
  function drawGauges() {
    document.querySelectorAll('.gauge-svg').forEach((el) => {
      const val = Number(el.dataset.value) || 0;
      const w = 68, h = 46;
      const svgns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgns, 'svg');
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const arcBg = document.createElementNS(svgns, 'path');
      arcBg.setAttribute('d', describeArc(w/2, h*1.3, 28, 180, 0));
      arcBg.setAttribute('stroke', '#e6f1ec');
      arcBg.setAttribute('stroke-width', 6);
      arcBg.setAttribute('fill', 'none');
      svg.appendChild(arcBg);
  
      // Create segmented arcs with different colors
      // Arc goes from 180 (left) to 0 (right), covering 180 degrees
      // Divide into 3 equal segments: left (180-120), middle (120-60), right (60-0)
      const segment1Start = 180; // Left segment start
      const segment1End = 120;   // Left segment end
      const segment2End = 60;    // Middle segment end
      const segment3End = 0;     // Right segment end
      
      // Always draw all three segments fully (all segments are always visible)
      // Segment 1: Left (light purple-blue)
      const arc1 = document.createElementNS(svgns, 'path');
      arc1.setAttribute('d', describeArc(w/2, h*1.3, 28, segment1Start, segment1End));
      arc1.setAttribute('stroke', '#a8c8f0'); // Light purple-blue
      arc1.setAttribute('stroke-width', 6);
      arc1.setAttribute('fill', 'none');
      arc1.setAttribute('stroke-linecap','round');
      svg.appendChild(arc1);
      
      // Segment 2: Middle (medium purple-blue)
      const arc2 = document.createElementNS(svgns, 'path');
      arc2.setAttribute('d', describeArc(w/2, h*1.3, 28, segment1End, segment2End));
      arc2.setAttribute('stroke', '#7ba3d4'); // Medium purple-blue
      arc2.setAttribute('stroke-width', 6);
      arc2.setAttribute('fill', 'none');
      arc2.setAttribute('stroke-linecap','round');
      svg.appendChild(arc2);
      
      // Segment 3: Right (dark purple-blue)
      const arc3 = document.createElementNS(svgns, 'path');
      arc3.setAttribute('d', describeArc(w/2, h*1.3, 28, segment2End, segment3End));
      arc3.setAttribute('stroke', '#4a7bb8'); // Dark purple-blue
      arc3.setAttribute('stroke-width', 6);
      arc3.setAttribute('fill', 'none');
      arc3.setAttribute('stroke-linecap','round');
      svg.appendChild(arc3);
      
      // Calculate needle position based on value
      const valAngle = Math.max(0, Math.min(180, (val/300)*180));
      
      // Add needle (black line pointing to value)
      const needleAngle = 180 - valAngle;
      const needle = document.createElementNS(svgns, 'line');
      const centerX = w/2;
      const centerY = h*1.3;
      const radius = 28;
      const needleX = centerX + radius * Math.cos((needleAngle - 90) * Math.PI / 180);
      const needleY = centerY + radius * Math.sin((needleAngle - 90) * Math.PI / 180);
      needle.setAttribute('x1', centerX.toString());
      needle.setAttribute('y1', centerY.toString());
      needle.setAttribute('x2', needleX.toString());
      needle.setAttribute('y2', needleY.toString());
      needle.setAttribute('stroke', '#000');
      needle.setAttribute('stroke-width', '3');
      svg.appendChild(needle);
  
      el.appendChild(svg);
    });
  
    // helper to create arc path from polar coords
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    }
  
    function describeArc(x, y, radius, startAngle, endAngle) {
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
      return d;
    }
  }
  
  // Draw base chart (grid, line, area)
  function drawChartBase(canvas, ctx, data) {
    const { points, maxY, padLeft, padRight, padTop, padBottom, plotW, plotH, W, H } = data;
    
    // Clear and draw background
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,W,H);
    
    // Draw horizontal grid lines and Y-axis labels
    ctx.strokeStyle = '#e6e6e6';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#666';
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    for (let y=0;y<=6;y++){
      const yy = padTop + y*(plotH/6);
      ctx.beginPath(); 
      ctx.moveTo(padLeft, yy); 
      ctx.lineTo(W-padRight, yy); 
      ctx.stroke();
      // Y-axis labels
      const value = maxY - (y * maxY / 6);
      ctx.fillText(value + ' W', padLeft - 10, yy + 4);
    }
    
    // Draw vertical grid lines and X-axis labels (time)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    for (let x=0;x<=8;x++){
      const hour = x * 2; // 0, 2, 4, 6, 8, 10, 12, 14, 16
      const xx = padLeft + (x/8) * plotW;
      ctx.beginPath();
      ctx.moveTo(xx, padTop);
      ctx.lineTo(xx, H - padBottom);
      ctx.strokeStyle = '#e6e6e6';
      ctx.stroke();
      // X-axis labels
      const timeLabel = String(hour).padStart(2, '0') + ':00';
      ctx.fillText(timeLabel, xx, H - padBottom + 20);
    }
    
    // draw line
    ctx.beginPath();
    ctx.strokeStyle = '#12a36a';
    ctx.lineWidth = 2.2;
    points.forEach((v,i) => {
      const x = padLeft + (i/(points.length-1))*plotW;
      const y = padTop + (1 - v/maxY)*plotH;
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.stroke();
  
    // shaded area under curve
    ctx.beginPath();
    points.forEach((v,i) => {
      const x = padLeft + (i/(points.length-1))*plotW;
      const y = padTop + (1 - v/maxY)*plotH;
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.lineTo(padLeft+plotW, padTop+plotH);
    ctx.lineTo(padLeft, padTop+plotH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(18,163,106,0.08)';
    ctx.fill();
  }

  // Draw a dummy line chart on canvas with grid + tooltip
  function drawLineChart() {
    const canvas = document.getElementById('lineChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    // dummy dataset - simulating power from 0 to 16:00 (16 hours)
    const points = [];
    const hours = 16;
    for (let i=0;i<=hours*2;i++){
      const hour = i/2;
      // Simulate realistic solar power curve (low in morning, peak at noon, low in evening)
      const base = Math.max(0, Math.sin((hour-6)/8 * Math.PI) * 2500);
      const noise = (Math.random() - 0.5) * 200;
      points.push(Math.max(0, base + noise));
    }
    
    const padLeft = 50;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;
    const plotW = W - padLeft - padRight;
    const plotH = H - padTop - padBottom;
    const maxY = 3000; // Max power in Watts
    
    // Store points and settings for tooltip
    const chartData = { points, maxY, padLeft, padRight, padTop, padBottom, plotW, plotH, W, H };
    canvas.chartData = chartData;
    
    // Draw base chart
    drawChartBase(canvas, ctx, chartData);
    
    // small tooltip on hover - only add listener once
    if (!canvas.tooltipAdded) {
      canvas.tooltipAdded = true;
      let tooltipNearest = -1;
      
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const data = canvas.chartData;
        if (!data) return;
        
        // find nearest point
        let nearest = 0, minDist = 1e9;
        data.points.forEach((v,i) => {
          const x = data.padLeft + (i/(data.points.length-1))*data.plotW;
          const d = Math.abs(x-mx);
          if (d<minDist){ minDist = d; nearest = i; }
        });
        
        // Only redraw if nearest point changed
        if (tooltipNearest !== nearest) {
          tooltipNearest = nearest;
          // Redraw base chart
          drawChartBase(canvas, ctx, data);
          
          // tooltip circle + label
          const i = nearest;
          const vx = data.padLeft + (i/(data.points.length-1))*data.plotW;
          const vy = data.padTop + (1 - data.points[i]/data.maxY)*data.plotH;
          ctx.beginPath(); 
          ctx.fillStyle = '#fff'; 
          ctx.strokeStyle='#12a36a'; 
          ctx.lineWidth=2; 
          ctx.arc(vx,vy,5,0,Math.PI*2); 
          ctx.fill(); 
          ctx.stroke();

          // draw tooltip box
          const hour = Math.floor(i/2);
          const minute = (i % 2) * 30;
          const timeStr = String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0');
          const powerValue = data.points[i].toFixed(0);
          const label = `${timeStr}\nPV(W): ${powerValue}`;
          const tw = 90, th = 40;
          const tx = Math.min(data.W - tw - 10, Math.max(10, vx + 8));
          const ty = Math.max(10, vy - th - 12);
          ctx.fillStyle = '#0a8159'; 
          ctx.fillRect(tx,ty,tw,th);
          ctx.fillStyle = '#fff'; 
          ctx.font='11px Arial'; 
          ctx.textAlign = 'left';
          const lines = label.split('\n');
          lines.forEach((line, idx) => {
            ctx.fillText(line, tx+8, ty+16 + (idx * 14));
          });
        }
      });
      
      canvas.addEventListener('mouseleave', () => {
        tooltipNearest = -1;
        drawChartBase(canvas, ctx, canvas.chartData);
      });
    }
  }
  