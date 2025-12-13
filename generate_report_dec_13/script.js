// Mobile Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });
}

// User Selection Logic
const userItems = document.querySelectorAll('.user-item');
let selectedUser = null;

userItems.forEach(item => {
    item.addEventListener('click', function () {
        // Remove active class from all
        userItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked
        this.classList.add('active');
        selectedUser = this.querySelector('.user-name').innerText;
        console.log('Selected User:', selectedUser);
    });
});

// Generate Report Logic and Chart
const generateBtn = document.querySelector('.btn-generate');
const contentArea = document.querySelector('.content-area');

if (generateBtn) {
    generateBtn.addEventListener('click', function () {
        // 1. Clear Empty State
        contentArea.innerHTML = '';

        // 2. Create Chart Container
        const chartWrapper = document.createElement('div');
        chartWrapper.className = 'chart-wrapper';
        chartWrapper.style.width = '100%';
        chartWrapper.style.height = '100%';
        chartWrapper.style.backgroundColor = '#fff';
        chartWrapper.style.borderRadius = '8px';
        chartWrapper.style.padding = '20px';
        chartWrapper.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

        const canvas = document.createElement('canvas');
        canvas.id = 'reportChart';
        chartWrapper.appendChild(canvas);
        contentArea.appendChild(chartWrapper);

        // 3. Render Chart
        renderChart(canvas);
    });
}

function renderChart(canvas) {
    const ctx = canvas.getContext('2d');

    // Dummy Data to match the image style (Bar chart)
    const data = {
        labels: ['03.2025', '05.2025', '07.2025', '09.2025', '11.2025', '25.04.2025', '29.04.2025', '29.04.2025', '01.05.2025'],
        datasets: [{
            label: 'Energy (kWh)',
            data: [380, 400, 460, 460, 400, 150, 400, 280, 410, 380, 400],
            backgroundColor: '#4BC0C0',
            barPercentage: 0.5,
            borderRadius: 4
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'kWh',
                    align: 'start',
                    color: '#666',
                    font: { size: 12 }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    titleColor: '#fff',
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 500,
                    grid: { color: '#f0f0f0' },
                    ticks: { color: '#888', font: { size: 10 } },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#888', font: { size: 10 } },
                    border: { display: false }
                }
            }
        }
    });
}

// Initialize Flatpickr (Month Selector)
const dateInput = document.querySelector(".date-input");
if (dateInput && typeof flatpickr !== 'undefined') {
    const config = {
        disableMobile: true, // Boolean true prevents native picker on mobile
        dateFormat: "F Y",
        plugins: []
    };

    // Safely add month select plugin if loaded
    if (typeof monthSelectPlugin !== 'undefined') {
        config.plugins.push(new monthSelectPlugin({
            shorthand: true,
            dateFormat: "F Y",
            altFormat: "F Y",
            theme: "light"
        }));
    } else {
        console.warn("MonthSelectPlugin not defined. Ensure CDN is loaded.");
    }

    flatpickr(dateInput, config);
}
