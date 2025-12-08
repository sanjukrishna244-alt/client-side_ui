document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions
    const indicatorSchema = [
        "V MPPT 1 (A)", "I MPPT 1 (A)", "Ua (V)", "I AC 1 (A)",
        "F AC 1 (Hz)", "Power (W)", "Working Mode", "Temperature (*C)",
        "Total Generation (kWh)", "H Total (h)", "RSSI", "PF"
    ];

    // Dummy Data for Inverter Tree
    const inverterData = [
        {
            name: "BINU",
            status: "green",
            children: [
                {
                    name: "GW3300-XS",
                    status: "green",
                    children: [
                        { name: "53300SSX228W1357", type: "device" }
                    ]
                }
            ]
        },
        {
            name: "Biju Ramachandran",
            children: [
                { name: "GW4000-DT", children: [{ name: "SN-BIJU-001", type: "device" }] }
            ]
        },
        {
            name: "CAPITAL ASSOCIATES",
            status: "green",
            children: [
                { name: "GW50K-MT", status: "green", children: [{ name: "SN-CAP-001", type: "device" }] }
            ]
        },
        {
            name: "DR KASIM",
            children: [
                { name: "GW3000-NS", children: [{ name: "SN-KASIM-001", type: "device" }] }
            ]
        },
        {
            name: "DR RAVI",
            children: [
                { name: "GW6000-ES", children: [{ name: "SN-RAVI-001", type: "device" }] }
            ]
        },
        {
            name: "GIRIJA",
            children: [
                { name: "GW3600-DS", children: [{ name: "SN-GIRI-001", type: "device" }] }
            ]
        },
        {
            name: "HARIS",
            status: "green",
            children: [
                { name: "GW5000-MS", status: "green", children: [{ name: "SN-HARIS-001", type: "device" }] }
            ]
        },
        {
            name: "Hyfa",
            status: "green",
            children: [
                { name: "GW8000-DT", status: "green", children: [{ name: "SN-HYFA-001", type: "device" }] }
            ]
        },
        {
            name: "Junaid Thalassery",
            children: [
                { name: "GW10K-ET", children: [{ name: "SN-JUNA-001", type: "device" }] }
            ]
        },
        {
            name: "KRISHNAN",
            status: "green",
            children: [
                { name: "GW4200-NS", status: "green", children: [{ name: "SN-KRISH-001", type: "device" }] }
            ]
        },
        {
            name: "Karthika",
            children: [
                { name: "GW3000-SS", children: [{ name: "SN-KARTH-001", type: "device" }] }
            ]
        },
        {
            name: "MAKKAL",
            children: [
                { name: "GW5000-ES", children: [{ name: "SN-MAKK-001", type: "device" }] }
            ]
        },
        {
            name: "MITHUN",
            status: "green",
            children: [
                { name: "GW2500-XS", status: "green", children: [{ name: "SN-MITH-001", type: "device" }] }
            ]
        },
        {
            name: "MOHAMMAD",
            status: "green",
            children: [
                { name: "GW6000-EH", status: "green", children: [{ name: "SN-MOHD-001", type: "device" }] }
            ]
        }
    ];

    // 2. DOM Elements
    const treeContainer = document.querySelector('.tree-view');
    const selectedListContainer = document.querySelector('.selected-list');
    const indicatorContainer = document.querySelector('.checkbox-list');

    // Clear initial states
    treeContainer.innerHTML = '';
    selectedListContainer.innerHTML = '';
    indicatorContainer.innerHTML = ''; // Default empty

    // 3. Helper Functions

    // Get different indicators based on name (Dummy logic)
    function getIndicatorsFor(name) {
        // Base list
        let indicators = [...indicatorSchema];

        // Modify for specific dummy requirement
        if (name === "BINU" || name.includes("GW3300") || name.includes("53300")) {
            // Full list
            return indicators;
        } else if (name.includes("CAP") || name.includes("SN-CAP")) {
            // Subset
            return indicators.slice(0, 6); // First 6
        } else if (name.includes("KASIM") || name.includes("SN-KASIM")) {
            // Check Different ones (simulate by reversing or changing param)
            return indicators.map(i => i.replace("(A)", "(mA)"));
        } else {
            // Random subset for others
            return indicators.filter((_, i) => i % 2 === 0);
        }
    }

    // Render Indicators
    function renderIndicators(name) {
        indicatorContainer.innerHTML = '';
        if (!name) return;

        const data = getIndicatorsFor(name);
        data.forEach(text => {
            const label = document.createElement('label');
            label.className = 'checkbox-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' ' + text));
            indicatorContainer.appendChild(label);
        });
    }

    // Render Tree
    function renderTree(container, nodes, level = 0) {
        nodes.forEach(node => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'tree-node-wrapper';

            const rowDiv = document.createElement('div');
            rowDiv.className = level === 0 ? 'tree-item' : (node.type === 'device' ? 'tree-sub-item active-sub' : 'tree-item');
            if (level > 0 && node.type !== 'device') rowDiv.classList.add('tree-child-item');

            // Icon
            const hasChildren = node.children && node.children.length > 0;
            if (hasChildren) {
                const icon = document.createElement('i');
                // Default collapsed per request ("sont show default")
                icon.className = 'fa-solid fa-angle-right toggle-icon';
                rowDiv.appendChild(icon);
            } else if (level === 0) {
                // Spacing for alignment if top level has no children (should not happen in this data)
                const spacer = document.createElement('i');
                spacer.style.width = '15px';
                spacer.style.display = 'inline-block';
                rowDiv.appendChild(spacer);
            }

            // Status
            if (node.status) {
                const dot = document.createElement('span');
                dot.className = `status-dot ${node.status}`;
                rowDiv.appendChild(dot);
            }

            // Content
            if (node.type === 'device') {
                const box = document.createElement('div');
                box.className = 'sub-item-box';
                box.textContent = node.name;
                rowDiv.appendChild(box);

                const addIcon = document.createElement('i');
                addIcon.className = 'fa-solid fa-file-import add-icon';
                addIcon.title = "Add to selection";
                addIcon.onclick = (e) => {
                    e.stopPropagation();
                    addToSelected(node);
                };
                rowDiv.appendChild(addIcon);
            } else {
                const paramSpan = document.createElement('span');
                paramSpan.className = 'item-name';
                paramSpan.textContent = node.name;
                rowDiv.appendChild(paramSpan);
                // No add icon on group
            }

            itemDiv.appendChild(rowDiv);

            if (hasChildren) {
                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'tree-children hidden'; // Default Hidden
                renderTree(childrenContainer, node.children, level + 1);
                itemDiv.appendChild(childrenContainer);

                rowDiv.addEventListener('click', () => {
                    const icon = rowDiv.querySelector('.toggle-icon');
                    if (icon) { // Check if icon exists
                        if (childrenContainer.classList.contains('hidden')) {
                            childrenContainer.classList.remove('hidden');
                            icon.classList.remove('fa-angle-right');
                            icon.classList.add('fa-angle-down');
                        } else {
                            childrenContainer.classList.add('hidden');
                            icon.classList.remove('fa-angle-down');
                            icon.classList.add('fa-angle-right');
                        }
                    }
                });
            }

            container.appendChild(itemDiv);
        });
    }

    // Active Selection State
    let activeSelectedName = null;
    const selectedItems = new Set();

    function addToSelected(node) {
        if (selectedItems.has(node.name)) return;
        selectedItems.add(node.name);
        renderSelected();
        // Auto-select the newly added item
        simulateSelection(node.name);
    }

    function removeFromSelected(name) {
        selectedItems.delete(name);
        if (activeSelectedName === name) {
            activeSelectedName = null;
            renderIndicators(null); // Clear indicators
        }
        renderSelected();
    }

    function simulateSelection(name) {
        activeSelectedName = name;
        renderSelected(); // Re-render to show active stat styling (if any)
        renderIndicators(name); // Show indicators for this item
    }

    function renderSelected() {
        selectedListContainer.innerHTML = '';

        selectedItems.forEach(deviceName => {
            const div = document.createElement('div');
            div.className = 'tree-item selected-list-item';
            if (deviceName === activeSelectedName) {
                div.style.backgroundColor = '#e6fffa'; // Highlight active
                div.style.border = '1px solid #00bc9c';
                div.style.borderRadius = '4px';
            }

            // Simplified rendering for selected list
            const content = `
                <span class="item-name" style="flex:1">${deviceName}</span>
                <i class="fa-solid fa-trash-can delete-icon"></i>
            `;
            div.innerHTML = content;

            // Click to select/activate
            div.addEventListener('click', () => {
                simulateSelection(deviceName);
            });

            // Delete
            const delBtn = div.querySelector('.delete-icon');
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromSelected(deviceName);
            });

            selectedListContainer.appendChild(div);
        });
    }

    // Initial Tree Render
    renderTree(treeContainer, inverterData);


    // Footer & Global Buttons
    document.querySelector('.column-card:nth-child(2) .clear-all').addEventListener('click', (e) => {
        e.preventDefault();
        selectedItems.clear();
        activeSelectedName = null;
        renderIndicators(null);
        renderSelected();
    });

    document.querySelector('.column-card:nth-child(3) .select-all').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.checkbox-list input').forEach(cb => cb.checked = true);
    });

    document.querySelector('.column-card:nth-child(3) .clear-all').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.checkbox-list input').forEach(cb => cb.checked = false);
    });

    document.querySelector('.btn-secondary').addEventListener('click', () => {
        // Reset
        location.reload(); // Simple reset
    });

    document.querySelector('.btn-primary').addEventListener('click', () => {
        alert("Generating Data...");
    });
});
