
/* =========================
   DEAD PIXEL TEST
========================= */

const pixelButton =
    document.getElementById("pixelB");

const pixelColorContainer =
    document.getElementById("pixelColors");


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


/* =========================
   CREATE TEST SCREEN
========================= */

const pixelTestScreen =
    document.createElement("div");


pixelTestScreen.id =
    "pixelTestScreen";


document.body.appendChild(
    pixelTestScreen
);


/* =========================
   START TEST
========================= */

async function beginPixelTest(
    startColor = "#000000"
) {

    currentColorIndex =
        pixelColors.indexOf(startColor);


    if (currentColorIndex === -1) {

        currentColorIndex = 0;

    }


    pixelTestScreen.style.backgroundColor =
        pixelColors[currentColorIndex];


    pixelTestScreen.classList.add(
        "active"
    );


    try {

        await pixelTestScreen.requestFullscreen();

    }

    catch (error) {

        console.error(
            "Fullscreen could not be started:",
            error
        );

    }

}


/* =========================
   START TEST BUTTON
========================= */

if (pixelButton) {

    pixelButton.addEventListener(
        "click",
        function () {

            beginPixelTest("#000000");

        }
    );

}


/* =========================
   COLOR BUTTONS
========================= */

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
