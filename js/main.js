const logoutButton =
    document.getElementById("logoutb");

let sessionTimer;

function clearSession() {

    sessionStorage.removeItem(
        "assureit_authenticated"
    );

    sessionStorage.removeItem(
        "assureit_expires_at"
    );
}

function logout() {

    clearSession();

    window.location.replace(
        "index.html"
    );
}

function protectPage() {
    const authenticated =
        sessionStorage.getItem(
            "assureit_authenticated"
        );

    const expiresAt =
        Number(
            sessionStorage.getItem(
                "assureit_expires_at"
            )
        );
    if (
        authenticated !== "true" ||
        !expiresAt
    ) {
        logout();
        return;
    }

    if (Date.now() >= expiresAt) {
        logout();
        return;
    }

    const remainingTime =
        expiresAt - Date.now();

    sessionTimer =
        setTimeout(
            logout,
            remainingTime
        );
}

if (logoutButton) {
    logoutButton.addEventListener(
        "click",
        logout
    );
}
protectPage();

const cheatSheetButton =
    document.getElementById("cheatSheetB");

const cheatSheetModal =
    document.getElementById("cheatSheetModal");

const closeCheatSheet =
    document.getElementById("closeCheatSheet");


function openCheatSheet() {
    if (!cheatSheetModal) {
        return;
    }

    cheatSheetModal.classList.add(
        "active"
    );

    cheatSheetModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeCheatSheetModal() {
    if (!cheatSheetModal) {
        return;
    }
    cheatSheetModal.classList.remove(
        "active"
    );
    cheatSheetModal.setAttribute(
        "aria-hidden",
        "true"
    );
}


if (cheatSheetButton) {
    cheatSheetButton.addEventListener(
        "click",
        openCheatSheet
    );
}


if (closeCheatSheet) {
    closeCheatSheet.addEventListener(
        "click",
        closeCheatSheetModal
    );
}

if (cheatSheetModal) {
    cheatSheetModal.addEventListener(
        "click",
        function (event) {
            if (
                event.target ===
                cheatSheetModal
            ) {
                closeCheatSheetModal();
            }
        }
    );
}
document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key === "Escape" &&
            cheatSheetModal &&
            cheatSheetModal.classList.contains(
                "active"
            )
        ) {
            closeCheatSheetModal();
        }

    }
);