import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyADDo7xxarlsQcZ37ZEQRBaM1U_rVm8ngg",
    authDomain: "inmoclicrd-e58e8.firebaseapp.com",
    projectId: "inmoclicrd-e58e8",
    storageBucket: "inmoclicrd-e58e8.firebasestorage.app",
    messagingSenderId: "780365012646",
    appId: "1:780365012646:web:2e0feff94c426f8287de67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- ELEMENTOS DEL DOM ---
const form = document.getElementById("auth-form");
const emailInput = document.getElementById("auth-email");
const passwordInput = document.getElementById("auth-password");
const nameInput = document.getElementById("auth-name");
const submitBtn = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");
const toggleLink = document.getElementById("toggle-link");
const toggleText = document.getElementById("toggle-text");
const errorMsg = document.getElementById("error-msg");

let isRegistering = false; // Estado inicial: Login

// --- 1. CAMBIAR ENTRE LOGIN Y REGISTRO ---
toggleLink.addEventListener("click", () => {
    isRegistering = !isRegistering;
    errorMsg.style.display = "none"; // Limpiar errores
    form.reset();

    if (isRegistering) {
        formTitle.innerText = "Crear Cuenta";
        submitBtn.innerText = "Registrarse";
        toggleText.innerText = "¿Ya tienes cuenta?";
        toggleLink.innerText = "Inicia sesión";
        nameInput.style.display = "block";
        nameInput.required = true;
    } else {
        formTitle.innerText = "Iniciar Sesión";
        submitBtn.innerText = "Entrar";
        toggleText.innerText = "¿No tienes cuenta?";
        toggleLink.innerText = "Regístrate aquí";
        nameInput.style.display = "none";
        nameInput.required = false;
    }
});

// --- 2. MANEJAR EL ENVÍO DEL FORMULARIO ---
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.innerText = "Procesando...";

    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;

    try {
        if (isRegistering) {
            // REGISTRO
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            console.log("Usuario registrado:", userCredential.user);
        } else {
            // LOGIN
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario logueado");
        }

        // Si todo sale bien, redirigir
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error Auth:", error);
        submitBtn.disabled = false;
        submitBtn.innerText = isRegistering ? "Registrarse" : "Entrar";

        errorMsg.style.display = "block";
        // Mensajes de error en español
        switch (error.code) {
            case 'auth/wrong-password':
                errorMsg.innerText = "Contraseña incorrecta.";
                break;
            case 'auth/user-not-found':
                errorMsg.innerText = "No existe una cuenta con este correo.";
                break;
            case 'auth/email-already-in-use':
                errorMsg.innerText = "Este correo ya está registrado.";
                break;
            case 'auth/weak-password':
                errorMsg.innerText = "La contraseña es muy débil (usa al menos 6 caracteres).";
                break;
            case 'auth/invalid-email':
                errorMsg.innerText = "El correo electrónico no es válido.";
                break;
            default:
                errorMsg.innerText = "Error: " + error.message;
        }
    }
});

// --- 3. REDIRECCIÓN AUTOMÁTICA SI YA ESTÁ LOGUEADO ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario entra a login.html pero ya tiene sesión activa, lo mandamos al index
        // Pequeño timeout para evitar rebotes instantáneos si acabamos de loguear
        setTimeout(() => {
             window.location.href = "index.html";
        }, 500);
    }
});