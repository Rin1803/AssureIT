import { supabase } from "./supabase.js";

const loginForm =
    document.getElementById("loginForm");

const passwordInput =
    document.getElementById("password");

const loginButton =
    document.getElementById("loginButton");

const message =
    document.getElementById("message");


function showMessage(text, type = "error") {
    message.textContent = text;
    message.className = type;
}


function redirectIfAlreadyLoggedIn() {

    const authenticated =
        sessionStorage.getItem(
            "assureit_authenticated"
        );

    if (authenticated === "true") {
        window.location.replace("main.html");
    }
}


loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const accessCode =
            passwordInput.value.trim();

        if (!accessCode) {

            showMessage(
                "Please enter the access code."
            );

            passwordInput.focus();

            return;
        }

        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
        showMessage("");

        try {

            const { data, error } =
                await supabase.rpc(
                    "verify_access_code",
                    {
                        plain_code: accessCode
                    }
                );

            console.log("RPC data:", data);
            console.log("RPC error:", error);


            if (error) {
                throw error;
            }


            if (data !== true) {

                showMessage(
                    "Incorrect access code."
                );

                passwordInput.value = "";
                passwordInput.focus();

                return;
            }


            const fourH = 4 * 60 * 60 * 1000;

            const expiresAt = Date.now() + fourH;

            sessionStorage.setItem(
                "assureit_authenticated",
                "true"
            );

            sessionStorage.setItem(
                "assureit_expires_at",
                expiresAt.toString()
            );

            console.log(
                "Session created:",
                sessionStorage.getItem(
                    "assureit_authenticated"
                )
            );


            showMessage(
                "Login successful.",
                "success"
            );


            window.location.replace(
                "main.html"
            );

        }

        catch (error) {

            console.error(
                "Login error:",
                error
            );

            showMessage(
                "Unable to verify access code."
            );

            passwordInput.value = "";
            passwordInput.focus();

        }

        finally {

            loginButton.disabled = false;
            loginButton.textContent = "Log In";
        }
    }
);


redirectIfAlreadyLoggedIn();