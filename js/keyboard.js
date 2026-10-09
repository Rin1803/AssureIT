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

const keyHistory =
    document.getElementById("keyHistory");

function addKeyHistory(key) {

    if (!keyHistory || !key) {
        return;
    }

    const historyKey =
        document.createElement("span");

    historyKey.className =
        "history-key";

    historyKey.textContent =
        key.textContent.trim();

    keyHistory.prepend(
        historyKey
    );

    while (
        keyHistory.children.length > 30
    ) {
        keyHistory.removeChild(
            keyHistory.lastElementChild
        );
    }
}

document.addEventListener(
    "keydown",
    function (event) {
        if (document.fullscreenElement) {
            return;
        }
        if (!keyboard) {
            return;
        }
        if (event.repeat) {
            return;
        }

        const key =
            keyboard.querySelector(
                `[data-key="${event.code}"]`
            );
        if (!key) {
            return;
        }
        key.classList.add(
            "pressed"
        );
        key.classList.add(
            "checked"
        );
        addKeyHistory(
            key
        );
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
        key.classList.remove(
            "pressed"
        );
    }
);

document.addEventListener(
    "mousedown",
    function (event) {
        let mouseButton =
            null;

        if (event.button === 0) {
            mouseButton =
                leftMouse;
        }

        else if (event.button === 1) {
            mouseButton =
                middleMouse;
        }

        else if (event.button === 2) {
            mouseButton =
                rightMouse;

        }
        if (!mouseButton) {
            return;
        }
        mouseButton.classList.add(
            "active"
        );
        mouseButton.classList.add(
            "checked"
        );
    }
);

document.addEventListener(
    "mouseup",
    function (event) {
        let mouseButton =
            null;

        if (event.button === 0) {
            mouseButton =
                leftMouse;
        }

        else if (event.button === 1) {
            mouseButton =
                middleMouse;

        }
        else if (event.button === 2) {
            mouseButton =
                rightMouse;

        }
        if (!mouseButton) {
            return;
        }

        mouseButton.classList.remove(
            "active"
        );
    }
);

document.addEventListener(
    "wheel",
    function () {
        if (!middleMouse) {
            return;
        }
        middleMouse.classList.add(
            "checked"
        );
        middleMouse.classList.add(
            "active"
        );

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
    document.getElementById(
        "keyboardC"
    );

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
            if (keyHistory) {
                keyHistory.innerHTML =
                    "";

            }
        }
    );
}