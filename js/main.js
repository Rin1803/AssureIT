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