const batteryB =
    document.getElementById("batteryB");

const designCapacity =
    document.getElementById("designCapacity");

const fullCapacity =
    document.getElementById("fullCapacity");

const batteryResult =
    document.getElementById("batteryResult");

if (
    batteryB &&
    designCapacity &&
    fullCapacity &&
    batteryResult
) {
    batteryB.addEventListener("click", function () {
        const design =
            Number(designCapacity.value);

        const full =
            Number(fullCapacity.value);

        if (
            !design ||
            design <= 0 ||
            full < 0 ||
            fullCapacity.value === ""
        ) {

            batteryResult.innerHTML =
                "<span>Please enter valid capacity values.</span>";

            return;
        }

        const health =
            (full / design) * 100;

        const percentage =
            health.toFixed(1);

        let status;

        if (health <= 50) {
            status = "Defective";
        } else if (health < 70) {
            status = "Minimal";
        } else {
            status = "Good";
        }

        batteryResult.innerHTML = `
            <div class="battery-percentage">
                ${percentage}%
            </div>
            <div class="battery-status">
                ${status}
            </div>
        `;
    });

}