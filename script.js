// Warehouse Data (10 se 100 tak ke sorted barcodes)
const warehouseStock = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 
    150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 
    260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360,
     370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
      480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580,
       590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690,
        700, 710, 720, 730, 740, 750, 760, 770, 780, 790, 800,
         810, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 
         920, 930, 940, 950, 960, 970, 980, 990, 1000, 1010, 1020, 
         1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1110, 1120, 
         1130, 1140, 1150, 1160, 1170, 1180, 1190, 1200, 1210, 1220,]


const gridContainer = document.getElementById("warehouseGrid");
const terminalBody = document.getElementById("terminalBody");
const scanButton = document.getElementById("scanBtn");

// Grid generation logic
function generateGrid() {
    gridContainer.innerHTML = ""; 
    warehouseStock.forEach((price, index) => {
        const card = document.createElement("div");
        card.className = "rack-card";
        card.id = `rack-${index}`;
        
        card.innerHTML = `
            <div class="barcode-icon">|||||</div>
            <div class="rack-id">${price}</div>
        `;
        gridContainer.appendChild(card);
    });
}

// Initial build
generateGrid();

// Event trigger
scanButton.addEventListener("click", () => {
    generateGrid(); // reset visuals
    
    const targetInput = document.getElementById("barcodeInput").value;
    const targetPrice = parseInt(targetInput);

    if (isNaN(targetPrice)) {
        terminalBody.innerText = "[ERROR]: Please input a valid tracking number.";
        return;
    }

    terminalBody.innerHTML = `[SYS]: Scanning started securely for ID: ${targetPrice}...`;
    binarySearchSaaS(warehouseStock, targetPrice, 0, warehouseStock.length - 1);
});

// Binary Search Recursion Engine
function binarySearchSaaS(arr, target, low, high) {
    if (low > high) {
        terminalBody.innerHTML = `
            [NOT FOUND]: ID missing from database (-1).<br>
            [AI POSITION]: Insert at <b>Rack Index ${low}</b> to keep system sorted.
        `;
        if (low < arr.length) {
            document.getElementById(`rack-${low}`).classList.add("insert-state");
        }
        return;
    }

    let mid = Math.floor((low + high) / 2);
    const activeBox = document.getElementById(`rack-${mid}`);

    setTimeout(() => {
        document.querySelectorAll(".rack-card").forEach(el => el.classList.remove("scanning-state"));
        activeBox.classList.add("scanning-state");
        terminalBody.innerText = `[SCANNING]: Checking Index ${mid} (Value: ${arr[mid]})...`;

        setTimeout(() => {
            if (arr[mid] === target) {
                activeBox.className = "rack-card located-state";
                terminalBody.innerText = `[SUCCESS]: Item located at Rack Index ${mid}! Routing conveyor belt.`;
                return;
            }

            if (arr[mid] > target) {
                terminalBody.innerText = `[ENGINE]: Target is smaller than ${arr[mid]}. Splitting Left...`;
                for (let i = mid; i <= high; i++) {
                    document.getElementById(`rack-${i}`).classList.add("rejected-state");
                }
                binarySearchSaaS(arr, target, low, mid - 1);
            } else {
                terminalBody.innerText = `[ENGINE]: Target is larger than ${arr[mid]}. Splitting Right...`;
                for (let i = low; i <= mid; i++) {
                    document.getElementById(`rack-${i}`).classList.add("rejected-state");
                }
                binarySearchSaaS(arr, target, mid + 1, high);
            }
        }, 1000);
    }, 500);
}