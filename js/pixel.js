const pixelButton = document.getElementById("pixelB");
const pixelColorContainer = document.getElementById("pixelColors");
const pixelColors = [
    "#000000",
    "#FFFFFF",
    "#D83A3A",
    "#20AF25",
    "#1D3C73",
    "#EFEA35",
    "#D92EE8",
    "#FFB638"
];

let currentColorIndex = 0;

if (pixelColorContainer) {
    pixelColors.forEach(function (color) {
        const button =
            document.createElement("button");
        button.type = "button";
        button.className =
            "colorButton";
        button.style.backgroundColor =
            color;
        button.dataset.color =
            color;

        button.setAttribute(
            "aria-label",
            `${color} screen test`
        );

        pixelColorContainer.appendChild(
            button
        );
    });
}

const pixelTestScreen =
    document.createElement("div");

pixelTestScreen.id =
    "pixelTestScreen";

document.body.appendChild(
    pixelTestScreen
);

function changePixelColor(index) {
    currentColorIndex =
        (
            index +
            pixelColors.length
        ) % pixelColors.length;

    pixelTestScreen.style.backgroundColor =
        pixelColors[currentColorIndex];
}

async function beginPixelTest(
    startColor = "#000000"
) {
    currentColorIndex =
        pixelColors.indexOf(
            startColor
        );

    if (currentColorIndex === -1) {
        currentColorIndex = 0;
    }

    changePixelColor(
        currentColorIndex
    );

    pixelTestScreen.classList.add(
        "active"
    );

    try {
        if (!document.fullscreenElement) {
            await pixelTestScreen
                .requestFullscreen();
        }
    }

    catch (error) {
        console.error(
            "Fullscreen could not be started:",
            error
        );
    }
}
if (pixelButton) {
    pixelButton.addEventListener(
        "click",
        function () {
            beginPixelTest(
                "#000000"
            );
        }
    );
}

if (pixelColorContainer) {
    pixelColorContainer.addEventListener(
        "click",
        function (event) {
            const button =
                event.target.closest(
                    ".colorButton"
                );
            if (!button) {
                return;
            }

            beginPixelTest(
                button.dataset.color
            );
        }
    );
}

document.addEventListener(
    "keydown",
    function (event) {
        if (
            !pixelTestScreen.classList
                .contains("active")
        ) {
            return;
        }
        if (
            event.code === "ArrowRight" ||
            event.code === "ArrowDown" ||
            event.code === "Space"
        ) {
            event.preventDefault();
            changePixelColor(
                currentColorIndex + 1
            );
            return;
        }
        if (
            event.code === "ArrowLeft" ||
            event.code === "ArrowUp"
        ) {
            event.preventDefault();
            changePixelColor(
                currentColorIndex - 1
            );
        }
    }
);

document.addEventListener(
    "fullscreenchange",
    function () {
        if (!document.fullscreenElement) {
            pixelTestScreen.classList.remove(
                "active"
            );
        }
    }
);