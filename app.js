import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// ==========================================
// DATOS DE UBICACIÓN (Provincias y Municipios)
// ==========================================
const cityData = {
    "Santo Domingo": [
        "Distrito Nacional",
        "Santo Domingo Este",
        "Santo Domingo Norte",
        "Santo Domingo Oeste"
    ]
};

// ==========================================
// SECCIÓN 1: GESTIÓN DE USUARIO (HEADER)
// ==========================================
const loginBtn = document.getElementById("login-btn");
const userInfo = document.getElementById("user-info");
const userDisplayName = document.getElementById("user-display-name");

onAuthStateChanged(auth, (user) => {
    if (user) {
        if(loginBtn) loginBtn.style.display = "none";
        if(userInfo) {
            userInfo.style.display = "flex";
            userDisplayName.innerText = user.displayName || user.email.split('@')[0];

            if (!document.getElementById("logout-btn")) {
                const logoutBtn = document.createElement("a");
                logoutBtn.id = "logout-btn";
                logoutBtn.innerText = "Salir";
                logoutBtn.href = "#";
                logoutBtn.className = "btn-logout";

                // Lógica de cierre de sesión directa (Sin confirmación)
                logoutBtn.onclick = async (e) => {
                    e.preventDefault();
                    await signOut(auth);
                    window.location.reload();
                };
                userInfo.appendChild(logoutBtn);
            }
        }
    } else {
        if(loginBtn) loginBtn.style.display = "inline-block";
        if(userInfo) userInfo.style.display = "none";
        if(userDisplayName) userDisplayName.innerText = "";
        const existingLogout = document.getElementById("logout-btn");
        if(existingLogout) existingLogout.remove();
    }
});

// ==========================================
// SECCIÓN 2: LÓGICA DE PROPIEDADES Y FILTROS
// ==========================================

const propertiesGrid = document.getElementById("properties-grid");

const filterType = document.getElementById("filter-type");
const filterProvince = document.getElementById("filter-province");
const filterMunicipality = document.getElementById("filter-municipality");
const filterMinPrice = document.getElementById("filter-min-price");
const filterMaxPrice = document.getElementById("filter-max-price");
const btnClear = document.getElementById("btn-clear-filters");

let allProperties = [];

if (filterProvince && filterMunicipality) {
    filterProvince.addEventListener("change", (e) => {
        const selectedProv = e.target.value;
        filterMunicipality.innerHTML = '<option value="">📍 Municipio (Todos)</option>';
        if (selectedProv && cityData[selectedProv]) {
            filterMunicipality.disabled = false;
            filterMunicipality.style.backgroundColor = "white";
            cityData[selectedProv].forEach(mun => {
                const option = document.createElement("option");
                option.value = mun;
                option.innerText = mun;
                filterMunicipality.appendChild(option);
            });
        } else {
            filterMunicipality.disabled = true;
            filterMunicipality.style.backgroundColor = "#f9f9f9";
            filterMunicipality.innerHTML = '<option value="">Selecciona Provincia primero</option>';
        }
        applyFilters();
    });
    filterMunicipality.addEventListener("change", applyFilters);
}

function loadProperties() {
    if(!propertiesGrid) return;
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        allProperties = [];
        snapshot.forEach((doc) => {
            allProperties.push({ id: doc.id, ...doc.data() });
        });
        applyFilters();
    }, (error) => {
        console.error("Error cargando propiedades:", error);
        propertiesGrid.innerHTML = `<p style='color:red; text-align:center;'>Error: ${error.message}</p>`;
    });
}

function applyFilters() {
    if(!propertiesGrid) return;
    const typeVal = filterType ? filterType.value : "";
    const minVal = filterMinPrice ? Number(filterMinPrice.value) : 0;
    const maxVal = filterMaxPrice ? Number(filterMaxPrice.value) : 0;
    const provVal = filterProvince ? filterProvince.value : "";
    const munVal = filterMunicipality ? filterMunicipality.value : "";

    const filtered = allProperties.filter(p => {
        const matchesType = typeVal === "" || p.type === typeVal;
        let matchesLocation = true;
        const pCity = (p.city || "").toLowerCase();
        if (munVal !== "") {
            matchesLocation = pCity.includes(munVal.toLowerCase());
        } else if (provVal !== "") {
            const municipalities = cityData[provVal] || [];
            const isInsideProvince = municipalities.some(m => pCity.includes(m.toLowerCase())) || pCity.includes(provVal.toLowerCase());
            matchesLocation = isInsideProvince;
        }
        const pPrice = Number(p.price) || 0;
        const matchesMin = minVal === 0 || pPrice >= minVal;
        const matchesMax = maxVal === 0 || pPrice <= maxVal;
        return matchesType && matchesLocation && matchesMin && matchesMax;
    });
    renderGrid(filtered);
}

function renderGrid(properties) {
    propertiesGrid.innerHTML = "";
    if (properties.length === 0) {
        propertiesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>No se encontraron resultados 🔍</h3>
                <p>Intenta cambiar los filtros de ubicación o precio.</p>
            </div>`;
        return;
    }
    properties.forEach((p) => {
        const mainPhoto = (p.images && p.images.length > 0) ? p.images[0] : 'https://via.placeholder.com/400x300';
        const priceFormatted = p.price ? Number(p.price).toLocaleString() : "0";
        const card = document.createElement("div");
        card.className = "property-card";
        card.innerHTML = `
            <div class=\"card-image\">
                <img src=\"${mainPhoto}\" alt=\"${p.title}\" loading=\"lazy\">
                <div class=\"badge\">${p.operation || 'Disponible'}</div>
            </div>
            <div class=\"card-content\">
                <span class=\"card-price\">RD$ ${priceFormatted}</span>
                <h3 class=\"card-title\">${p.title}</h3>
                <p class=\"card-location\">📍 ${p.city}</p>
                <p style=\"font-size: 0.85rem; color: #666; margin-bottom: 10px; display: flex; align-items: center; gap: 5px;\">
                    👤 <span style=\"font-weight: 500;\">${p.userName || "Usuario InmoClic"}</span>
                </p>
                <div class=\"card-features\">
                    <span>🛏️ ${p.rooms} Hab</span>
                    <span>🚿 ${p.baths} Baños</span>
                </div>
                <a href=\"property.html?id=${p.id}\" class=\"btn-details\">Ver Detalles</a>
            </div>
        `;
        propertiesGrid.appendChild(card);
    });
}

loadProperties();
if(filterType) filterType.addEventListener("change", applyFilters);
if(filterMinPrice) filterMinPrice.addEventListener("input", applyFilters);
if(filterMaxPrice) filterMaxPrice.addEventListener("input", applyFilters);

if(btnClear) {
    btnClear.addEventListener("click", () => {
        if(filterType) filterType.value = "";
        if(filterProvince) {
            filterProvince.value = "";
            if(filterMunicipality) {
                filterMunicipality.innerHTML = '<option value="">Selecciona Provincia primero</option>';
                filterMunicipality.disabled = true;
                filterMunicipality.style.backgroundColor = "#f9f9f9";
            }
        }
        if(filterMinPrice) filterMinPrice.value = "";
        if(filterMaxPrice) filterMaxPrice.value = "";
        applyFilters();
    });
}