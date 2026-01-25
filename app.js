import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyADDo7xxarlsQcZ37ZEQRBaM1U_rVm8ngg",
    authDomain: "inmoclicrd-e58e8.firebaseapp.com",
    projectId: "inmoclicrd-e58e8",
    storageBucket: "inmoclicrd-e58e8.firebasestorage.app",
    messagingSenderId: "780365012646",
    appId: "1:780365012646:web:2e0feff94c426f8287de67"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- ELEMENTOS DE LA UI ---
const loginBtn = document.getElementById("login-btn");
const authModal = document.getElementById("auth-modal");
const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("auth-title");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const toggleAuthLink = document.getElementById("toggle-auth");
const closeAuthBtn = document.getElementById("close-auth");
const nameInput = document.getElementById("auth-name");
const userInfo = document.getElementById("user-info");
const userDisplayName = document.getElementById("user-display-name");
const propertiesGrid = document.getElementById("properties-grid");

let isLoggingIn = true;

// --- GESTIÓN DE ESTADO DE USUARIO (HEADER) ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario Online
        userInfo.style.display = "flex";
        userDisplayName.innerText = user.displayName || user.email.split('@')[0];
        loginBtn.innerText = "Cerrar Sesión";
        loginBtn.classList.add("logout-text"); // Clase para el color rojo si existe en tu CSS
    } else {
        // Usuario Offline
        userInfo.style.display = "none";
        loginBtn.innerText = "Iniciar sesión";
        loginBtn.classList.remove("logout-text");
    }
});

// --- LÓGICA DEL MODAL DE AUTENTICACIÓN ---

// Abrir modal o cerrar sesión
loginBtn.onclick = (e) => {
    e.preventDefault();
    if (auth.currentUser) {
        signOut(auth);
    } else {
        authModal.style.display = "flex";
    }
};

// Cerrar modal
closeAuthBtn.onclick = () => authModal.style.display = "none";
window.onclick = (e) => { if (e.target == authModal) authModal.style.display = "none"; };

// Cambiar entre Login y Registro
toggleAuthLink.onclick = (e) => {
    e.preventDefault();
    isLoggingIn = !isLoggingIn;

    if (isLoggingIn) {
        authTitle.innerText = "Iniciar Sesión";
        authSubmitBtn.innerText = "Entrar";
        nameInput.style.display = "none";
        nameInput.required = false;
        toggleAuthLink.innerText = "Regístrate aquí";
        document.querySelector(".auth-switch").firstChild.textContent = "¿No tienes cuenta? ";
    } else {
        authTitle.innerText = "Crear Cuenta";
        authSubmitBtn.innerText = "Registrarse";
        nameInput.style.display = "block";
        nameInput.required = true;
        toggleAuthLink.innerText = "Inicia sesión aquí";
        document.querySelector(".auth-switch").firstChild.textContent = "¿Ya tienes cuenta? ";
    }
};

// Enviar Formulario (Login / Registro)
authForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value;
    const pass = document.getElementById("auth-password").value;
    const msg = document.getElementById("auth-msg");

    try {
        if (isLoggingIn) {
            // LOGIN
            await signInWithEmailAndPassword(auth, email, pass);
        } else {
            // REGISTRO
            const name = nameInput.value;
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(userCredential.user, { displayName: name });
        }
        authModal.style.display = "none";
        authForm.reset();
        msg.style.display = "none";
    } catch (err) {
        msg.innerText = "Error: " + err.message;
        msg.style.display = "block";
    }
};

// --- CARGAR PROPIEDADES EN EL GRID ---
function loadProperties() {
    if (!propertiesGrid) return;
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        propertiesGrid.innerHTML = "";
        snapshot.forEach((doc) => {
            const p = doc.data();
            const id = doc.id;
            const mainPhoto = (p.images && p.images.length > 0) ? p.images[0] : 'https://via.placeholder.com/400x300';

            const card = document.createElement("div");
            card.className = "property-card";
            card.innerHTML = `
                <div class="card-image">
                    <img src="${mainPhoto}" alt="${p.title}" loading="lazy">
                    <div class="badge">${p.operation || 'Disponible'}</div>
                </div>
                <div class="card-content">
                    <span class="card-price">RD$ ${Number(p.price).toLocaleString()}</span>
                    <h3 class="card-title">${p.title}</h3>
                    <p class="card-location">📍 ${p.city}</p>
                    <div class="card-features">
                        <span>🛏️ ${p.rooms} Hab</span>
                        <span>🚿 ${p.baths} Baños</span>
                        <span>🚗 ${p.parking} Pq</span>
                    </div>
                    <a href="property.html?id=${id}" class="btn-details">Ver Detalles</a>
                </div>
            `;
            propertiesGrid.appendChild(card);
        });
    });
}

loadProperties();