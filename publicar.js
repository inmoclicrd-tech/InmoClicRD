import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const IMGBB_API_KEY = '52450d4b78681341306c42e1f8e41218';

// Función para subir a ImgBB
async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (result.success) return result.data.url;
    else throw new Error("Error en ImgBB: " + result.error.message);
}

const form = document.getElementById("publish-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Verificación de campos antes de empezar
    const fields = ["title", "price", "type", "city", "desc", "operation", "rooms", "baths", "parking"];
    for (let id of fields) {
        if (!document.getElementById(id)) {
            return alert("ERROR: Falta el campo con ID '" + id + "' en tu HTML.");
        }
    }

    const btn = form.querySelector("button");
    const files = document.getElementById("prop-images").files;

    if (files.length === 0) return alert("Selecciona al menos una foto.");

    btn.disabled = true;
    btn.innerText = "Publicando... ⏳";

    try {
        const imageUrls = [];
        for (const file of files) {
            const url = await uploadToImgBB(file);
            imageUrls.push(url);
        }

        await addDoc(collection(db, "properties"), {
            title: document.getElementById("title").value,
            price: Number(document.getElementById("price").value),
            type: document.getElementById("type").value,
            city: document.getElementById("city").value,
            rooms: document.getElementById("rooms").value,
            baths: document.getElementById("baths").value,
            parking: document.getElementById("parking").value,
            desc: document.getElementById("desc").value,
            operation: document.getElementById("operation").value,
            images: imageUrls,
            userId: auth.currentUser ? auth.currentUser.uid : "anonimo",
            createdAt: new Date()
        });

        alert("¡Propiedad publicada con éxito!");
        window.location.href = "index.html";

    } catch (error) {
        alert("Fallo: " + error.message);
        btn.disabled = false;
        btn.innerText = "Publicar propiedad";
    }
});