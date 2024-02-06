function msToTime (seconds) {
    const ms = seconds % 1000
    seconds = (seconds - ms) / 1000
    const secs = seconds % 60
    seconds = (seconds - secs) / 60
    const mins = seconds % 60
    const hrs = (seconds - mins) / 60

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
}

function pad (n, z) {
    z = z || 2
    return ('00' + n).slice(-z)
}

function getWindowSlotsCoords() {

    const windowSlotsCoords = {
        inventory: {},
        chest: {},
        'large-chest': {},
        'crafting-table': {},
        furnace: {}
    }

    windowSlotsCoords.inventory = {
        // Crafting slots
        0: [307, 55],
        1: [195, 35],
        2: [231, 35],
        3: [195, 71],
        4: [231, 71],

        5: [15, 15], // Helmet
        9: [15, 167], // Inventory
        18: [15, 203], // Inventory
        27: [15, 239], // Inventory
        36: [15, 283], // Tool bar
        45: [153, 123] // Left hand
    }
    // Add armor slots (5 - 8)
    for (let i = 5 + 1; i <= 8; i++) {
        windowSlotsCoords.inventory[i] = [windowSlotsCoords.inventory[i - 1][0], windowSlotsCoords.inventory[i - 1][1] + 36]
    }
    // Add inventory and tool bar slots
    for (let i = 9; i < 5 * 9; i += 9) {
        for (let j = 1; j <= 8; j++) {
            windowSlotsCoords.inventory[i + j] = [windowSlotsCoords.inventory[i][0] + 36 * j, windowSlotsCoords.inventory[i][1]]
        }
    }

    windowSlotsCoords.chest = {
        // Chest slots
        0: [15, 35],
        9: [15, 71],
        18: [15, 107],
        // Inventory slots
        27: [15, 169],
        36: [15, 205],
        45: [15, 241],
        // Tool bar slots
        54: [15, 285]
    }
    for (let i = 0; i < 7 * 9; i += 9) {
        for (let j = 1; j <= 8; j++) {
            windowSlotsCoords.chest[i + j] = [windowSlotsCoords.chest[i][0] + 36 * j, windowSlotsCoords.chest[i][1]]
        }
    }

    windowSlotsCoords['large-chest'] = {
        // Chest slots
        0: [15, 35],
        9: [15, 71],
        18: [15, 107],
        27: [15, 143],
        36: [15, 179],
        45: [15, 215],
        // Inventory slots
        54: [15, 277],
        63: [15, 313],
        72: [15, 349],
        // Tool bar slots
        81: [15, 393]
    }
    for (let i = 0; i < 10 * 9; i += 9) {
        for (let j = 1; j <= 8; j++) {
            windowSlotsCoords['large-chest'][i + j] = [windowSlotsCoords['large-chest'][i][0] + 36 * j, windowSlotsCoords['large-chest'][i][1]]
        }
    }

    windowSlotsCoords['crafting-table'] = {
        0: [239, 61], // Output slot
        1: [59, 33], // Input slots
        4: [59, 69], // Input slots
        7: [59, 105], // Input slots
        // Inventory slots
        10: [15, 167],
        19: [15, 203],
        28: [15, 239],
        // Tool bar slots
        37: [15, 283]
    }
    // Add input slots (1-9)
    for (let i = 1; i < 3 * 3; i += 3) {
        for (let j = 1; j <= 2; j++) {
            windowSlotsCoords['crafting-table'][i + j] = [windowSlotsCoords['crafting-table'][i][0] + 36 * j, windowSlotsCoords['crafting-table'][i][1]]
        }
    }
    // Add inventory slots (10-45)
    for (let i = 10; i < 5 * 9; i += 9) {
        for (let j = 1; j <= 8; j++) {
            windowSlotsCoords['crafting-table'][i + j] = [windowSlotsCoords['crafting-table'][i][0] + 36 * j, windowSlotsCoords['crafting-table'][i][1]]
        }
    }

    windowSlotsCoords.furnace = {
        0: [111, 33], // Input slot
        1: [111, 105], // Fuel slot
        2: [223, 61], // Output slot
        // Inventory slots
        3: [15, 167],
        12: [15, 203],
        21: [15, 239],
        // Tool bar slots
        30: [15, 283]
    }
    // Add inventory slots (3-38)
    for (let i = 3; i < 4 * 9; i += 9) {
        for (let j = 1; j <= 8; j++) {
            windowSlotsCoords.furnace[i + j] = [windowSlotsCoords.furnace[i][0] + 36 * j, windowSlotsCoords.furnace[i][1]]
        }
    }
    return windowSlotsCoords

}

async function update(window, canvas, windowSlotsCoords, assets){
    if (!window) return;

    const ctx = canvas.getContext("2d");

    // Draw background
    await new Promise((resolve) => {
        const windowImage = new Image();
        windowImage.addEventListener("load", function () {
            canvas.width = windowImage.width;
            canvas.height = windowImage.height;
            ctx.drawImage(windowImage, 0, 0);

            resolve();
        });
        windowImage.src = `windows/${window?.type ?? "inventory"}.png`;
    });

    // Draw slots
    for (const slot in window.slots) {
        if (!window.slots[slot]) continue;

        const slotCoordinates =
            windowSlotsCoords[window.type][window.slots[slot].slot];

        if (window.slots[slot].texture && slotCoordinates) {
            const slotImage = new Image();
            slotImage.src = window.slots[slot].nbt.value.ExtraAttributes && window.slots[slot].nbt.value.ExtraAttributes.value.id.value && assets[window.slots[slot].nbt.value.ExtraAttributes.value.id.value.toUpperCase()] ? "data:image/png;base64," + assets[window.slots[slot].nbt.value.ExtraAttributes.value.id.value.toUpperCase()] : window.slots[slot].texture;
            slotImage.onload = function () {
                // Draw slot image
                ctx.imageSmoothingEnabled = false;

                ctx.drawImage(
                    slotImage,
                    slotCoordinates[0],
                    slotCoordinates[1],
                    32,
                    32
                );

                // Draw slot count
                if (window.slots[slot].count > 1) {
                    ctx.font = "20px monospace";
                    ctx.fillStyle = "black";
                    ctx.textAlign = "end";
                    ctx.fillText(
                        window.slots[slot].count,
                        slotCoordinates[0] + 33,
                        slotCoordinates[1] + 31
                    );
                    ctx.fillStyle = "white";
                    ctx.fillText(
                        window.slots[slot].count,
                        slotCoordinates[0] + 32,
                        slotCoordinates[1] + 30
                    );
                }

                // Draw slot durability (if any)
                if (window.slots[slot].durabilityLeft != null) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(
                        slotCoordinates[0] + 3,
                        slotCoordinates[1] + 29,
                        28,
                        3
                    );

                    ctx.fillStyle = `hsl(${Math.round(window.slots[slot].durabilityLeft * 120)}, 100%, 50%)`;
                    ctx.fillRect(
                        slotCoordinates[0] + 3,
                        slotCoordinates[1] + 29,
                        Math.round(window.slots[slot].durabilityLeft * 28),
                        2
                    );
                }
            };
        }
    }
}