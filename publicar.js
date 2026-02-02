import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

// --- CONFIGURACIÓN DE CLOUDINARY ---
const CLOUDINARY_CLOUD_NAME = "dlvh4cobx";
const CLOUDINARY_UPLOAD_PRESET = "Inmoclic_preset";

// --- DATOS DE UBICACIÓN (Igual que en los filtros) ---
const cityData = {
    "Santo Domingo": [
        "Distrito Nacional",
        "Santo Domingo Este",
        "Santo Domingo Norte",
        "Santo Domingo Oeste"
    ]
    // Puedes agregar más provincias aquí en el futuro
};

// --- ELEMENTOS DEL DOM ---
const publishForm = document.getElementById("publish-form");
const loginWarning = document.getElementById("login-warning");
const provinceSelect = document.getElementById("province-select");
const municipalitySelect = document.getElementById("municipality-select");

// --- LÓGICA DE UBICACIÓN DINÁMICA (Selectores dependientes) ---
if (provinceSelect && municipalitySelect) {
    provinceSelect.addEventListener("change", (e) => {
        const selectedProv = e.target.value;

        // Limpiar municipios anteriores
        municipalitySelect.innerHTML = '<option value="">Selecciona Municipio</option>';

        if (selectedProv && cityData[selectedProv]) {
            // Habilitar y llenar
            municipalitySelect.disabled = false;
            municipalitySelect.style.backgroundColor = "white";

            cityData[selectedProv].forEach(mun => {
                const option = document.createElement("option");
                option.value = mun;
                option.innerText = mun;
                municipalitySelect.appendChild(option);
            });
        } else {
            // Deshabilitar
            municipalitySelect.disabled = true;
            municipalitySelect.style.backgroundColor = "#f9f9f9";
            municipalitySelect.innerHTML = '<option value="">Elige Provincia primero</option>';
        }
    });
}

// --- LÓGICA DE PUBLICACIÓN ---
if(publishForm) {
    publishForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Verificación de seguridad
        if (!auth.currentUser) {
            alert("⚠️ Error: Debes iniciar sesión para publicar.");
            return;
        }

        const btn = document.querySelector(".btn-primary.btn-large");
        const originalText = btn.innerText;
        btn.disabled = true;
        btn.innerText = "Subiendo imágenes...";

        try {
            // Recoger valores del formulario
            const title = document.getElementById("title").value;
            const type = document.getElementById("type").value;
            const price = document.getElementById("price").value;

            // Obtener ubicación de los nuevos selectores
            const province = provinceSelect.value;
            const municipality = municipalitySelect.value;

            // 2. Subir imágenes a Cloudinary
            const imageFiles = document.getElementById("prop-images").files;
            let imageUrls = [];

            if (imageFiles.length > 0) {
                for (const file of imageFiles) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method: "POST",
                        body: formData
                    });

                    const data = await res.json();
                    if (data.secure_url) {
                        imageUrls.push(data.secure_url);
                    } else {
                        throw new Error("Error subiendo imagen a Cloudinary");
                    }
                }
            }

            btn.innerText = "Guardando datos...";

            // 3. Guardar datos en Firestore
            await addDoc(collection(db, "properties"), {
                title: title,
                price: Number(price),
                type: type,
                // IMPORTANTE: Guardamos el municipio en 'city' para que los filtros funcionen
                city: municipality,
                province: province,
                rooms: Number(document.getElementById("rooms").value),
                baths: Number(document.getElementById("baths").value),
                parking: Number(document.getElementById("parking").value),
                desc: document.getElementById("desc").value,
                operation: document.getElementById("operation").value,
                whatsapp: document.getElementById("whatsapp").value,
                images: imageUrls,
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName || "Usuario",
                userEmail: auth.currentUser.email,
                createdAt: new Date()
            });

            alert("¡Propiedad publicada con éxito! 🚀");
            window.location.href = "index.html";

        } catch (error) {
            console.error("Error completo:", error);
            alert("Hubo un error al publicar: " + error.message);
            btn.disabled = false;
            btn.innerText = originalText;
        }
    });
}

// --- PREVISUALIZACIÓN DE IMÁGENES ---
const imgInput = document.getElementById("prop-images");
if(imgInput) {
    imgInput.addEventListener("change", (e) => {
        const preview = document.getElementById("image-preview");
        preview.innerHTML = "";
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.createElement("img");
                img.src = ev.target.result;
                img.style = "width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;";
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });
}

// --- CONTROL DE ACCESO (Mostrar formulario solo si hay usuario) ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        if(publishForm) publishForm.style.display = "block";
        if(loginWarning) loginWarning.style.display = "none";
    } else {
        if(publishForm) publishForm.style.display = "none";
        if(loginWarning) loginWarning.style.display = "block";
    }
});