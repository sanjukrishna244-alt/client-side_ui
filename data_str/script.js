document.addEventListener("DOMContentLoaded", () => {

    // ⭐ STAR FAVORITE TOGGLE
    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });

    // EXPAND / COLLAPSE ROW
    document.querySelectorAll(".expand-btn").forEach(btn => {
        btn.addEventListener("click", function () {

            const row = this.closest("tr");

            // Close other expanded rows
            document.querySelectorAll(".expanded-row").forEach(r => r.remove());

            // If already opened → close it
            if (row.nextElementSibling && row.nextElementSibling.classList.contains("expanded-row")) {
                row.nextElementSibling.remove();
                return;
            }

            // Create expanded row
            const expandRow = document.createElement("tr");
            expandRow.classList.add("expanded-row");

            expandRow.innerHTML = `
                <td colspan="9">

                    <div class="expanded-content">

                        <div class="graph-box">GRAPH</div>

                        <div class="details">
                            <p><strong>YOSUF V T</strong></p>
                            <p>550000D2N860B004</p>
                            <p>GW5000-DNS</p>
                            <p>Inverter</p>
                            <p>Vac Fail</p>
                            <p>Alarm</p>
                            <p>Production Events</p>
                            <p>Occurrence: 12.01.2025 14:04:55</p>
                            <p>Recovery: --</p>
                        </div>

                        <div class="reasons">
                            <strong>Possible Reasons:</strong>
                            <ol>
                                <li>Safety country of inverter is set wrong.</li>
                                <li>Grid voltage is too unstable.</li>
                                <li>AC drop cable too small or too long → high resistance.</li>
                                <li>AC cables not connected well → abnormal voltage on AC side.</li>
                            </ol>
                        </div>

                    </div>

                    <div class="history-btn-row">
                        <button class="history-btn">History Curve</button>
                    </div>

                </td>
            `;

            row.insertAdjacentElement("afterend", expandRow);
        });
    });
});
