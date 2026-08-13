document.addEventListener(
    "keydown",
    function (event) {
        if (
            !pixelTestScreen.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {
            event.preventDefault();
            currentColorIndex =
                (
                    currentColorIndex + 1
                ) % pixelColors.length;
            pixelTestScreen.style.backgroundColor =
                pixelColors[currentColorIndex];

        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            currentColorIndex =
                (
                    currentColorIndex
                    - 1
                    + pixelColors.length
                ) % pixelColors.length;
            pixelTestScreen.style.backgroundColor =
                pixelColors[currentColorIndex];
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

const keyboard =
    document.getElementById("keyboard");

const resetKeyboardButton =
    document.getElementById("resetKeyboard");

const leftMouse =
    document.getElementById("leftMouse");

const middleMouse =
    document.getElementById("middleMouse");

const rightMouse =
    document.getElementById("rightMouse");

document.addEventListener(
    "keydown",
    function (event) {
        if (document.fullscreenElement) {
            return;
        }
        if (!keyboard) {
            return;
        }
        const key =
            keyboard.querySelector(
                `[data-key="${event.code}"]`
            );
        if (!key) {
            return;
        }
        key.classList.add("pressed");
        key.classList.add("checked");

    }
);

document.addEventListener(
    "keyup",
    function (event) {
        if (!keyboard) {
            return;
        }
        const key =
            keyboard.querySelector(
                `[data-key="${event.code}"]`
            );
        if (!key) {
            return;
        }
        key.classList.remove("pressed");
    }
);

document.addEventListener(
    "mousedown",
    function (event) {
        let mouseButton = null;
        if (event.button === 0) {
            mouseButton = leftMouse;
        }
        else if (event.button === 1) {
            mouseButton = middleMouse;
        }
        else if (event.button === 2) {
            mouseButton = rightMouse;
        }
        if (!mouseButton) {
            return;
        }
        mouseButton.classList.add("active");
        mouseButton.classList.add("checked");
    }
);

document.addEventListener(
    "mouseup",
    function (event) {
        let mouseButton = null;
        if (event.button === 0) {
            mouseButton = leftMouse;
        }
        else if (event.button === 1) {
            mouseButton = middleMouse;
        }
        else if (event.button === 2) {
            mouseButton = rightMouse;
        }
        if (!mouseButton) {
            return;
        }
        mouseButton.classList.remove("active");
    }
);

document.addEventListener(
    "wheel",
    function () {
        if (!middleMouse) {
            return;
        }
        middleMouse.classList.add("checked");
        middleMouse.classList.add("active");
        setTimeout(
            function () {
                middleMouse.classList.remove(
                    "active"
                );
            },
            150
        );
    },
    {
        passive: true
    }
);

const keyboardSection =
    document.getElementById("keyboardC");

if (keyboardSection) {
    keyboardSection.addEventListener(
        "contextmenu",
        function (event) {
            event.preventDefault();
        }
    );

}

if (resetKeyboardButton) {
    resetKeyboardButton.addEventListener(
        "click",
        function () {
            if (keyboard) {
                const keys =
                    keyboard.querySelectorAll(
                        ".key"
                    );
                keys.forEach(
                    function (key) {
                        key.classList.remove(
                            "pressed",
                            "checked"
                        );
                    }
                );
            }
            const mouseButtons = [
                leftMouse,
                middleMouse,
                rightMouse
            ];
            mouseButtons.forEach(
                function (button) {
                    if (!button) {
                        return;
                    }
                    button.classList.remove(
                        "active",
                        "checked"
                    );
                }
            );
        }
    );

}
