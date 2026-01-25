import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

async function loadPropertyDetails() {
    if (!propertyId) {
        window.location.href = "index.html";
        return;
    }

    const docRef = doc(db, "properties", propertyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const p = docSnap.data();

        // Llenar textos
        document.getElementById("prop-title").innerText = p.title;
        document.getElementById("prop-price").innerText = `RD$ ${Number(p.price).toLocaleString()}`;
        document.getElementById("prop-location").innerText = `📍 ${p.city} | ${p.type}`;
        document.getElementById("feat-rooms").innerText = `🛏️ ${p.rooms} Hab`;
        document.getElementById("feat-baths").innerText = `🚿 ${p.baths} Baños`;
        document.getElementById("feat-parking").innerText = `🚗 ${p.parking} Parq`;
        document.getElementById("prop-desc").innerText = p.desc;

        // WhatsApp
        const wsPhone = p.whatsapp || "18090000000";
        document.getElementById("whatsapp-link").href = `https://wa.me/${wsPhone}?text=Hola, me interesa la propiedad: ${p.title}`;

        // Carrusel de Imágenes
        const mainImg = document.getElementById("main-display");
        const thumbList = document.getElementById("thumb-list");

        if (p.images && p.images.length > 0) {
            mainImg.src = p.images[0];
            thumbList.innerHTML = ""; // Limpiar
            p.images.forEach((url, index) => {
                const imgThumb = document.createElement("img");
                imgThumb.src = url;
                imgThumb.style = "width: 80px; height: 60px; object-fit: cover; cursor: pointer; border-radius: 5px; border: 2px solid transparent;";
                if(index === 0) imgThumb.style.borderColor = "#1dd1a1";

                imgThumb.onclick = () => {
                    mainImg.src = url;
                    Array.from(thumbList.children).forEach(t => t.style.borderColor = "transparent");
                    imgThumb.style.borderColor = "#1dd1a1";
                };
                thumbList.appendChild(imgThumb);
            });
        }

        // Reportar
        const btnReport = document.getElementById("btn-report");
        if (btnReport) {
            btnReport.onclick = async () => {
                const motivo = prompt("¿Cuál es el motivo del reporte?");
                if (motivo) {
                    await addDoc(collection(db, "reports"), {
                        propertyId: propertyId,
                        reason: motivo,
                        date: new Date()
                    });
                    alert("Reporte enviado. Gracias por informarnos.");
                }
            };
        }
    } else {
        alert("La propiedad ya no está disponible.");
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", loadPropertyDetails);