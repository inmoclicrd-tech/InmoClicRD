// 1. Obtener ID
const params = new URLSearchParams(window.location.search);
const propertyId = parseInt(params.get("id"));

// 2. Buscar propiedad
const property = properties.find(p => p.id === propertyId);

// 3. Validar
if (!property) {
  document.querySelector(".property-detail").innerHTML = `
    <h2>Propiedad no encontrada</h2>
    <a href="index.html" class="btn-primary">Volver</a>
  `;
  throw new Error("Propiedad no encontrada");
}

// 4. Datos
document.getElementById("title").textContent = property.title;
document.getElementById("price").textContent = property.price;
document.getElementById("location").textContent = "📍 " + property.city;

document.getElementById("rooms").textContent = `🛏 ${property.rooms} habitaciones`;
document.getElementById("baths").textContent = `🚿 ${property.baths} baños`;
document.getElementById("parking").textContent = `🚗 ${property.parking} parqueo`;

document.getElementById("description").textContent =
  property.description || "Descripción no disponible";

// 5. WhatsApp
document.getElementById("whatsapp").href =
  `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(
    `Hola, vi esta propiedad en InmoClicRD y me interesa: ${property.title}`
  )}`;

// 6. Galería
const mainImage = document.getElementById("main-image");
const thumbsContainer = document.getElementById("gallery-thumbs");
// 🛡️ Protección: si no hay galería, usar imagen principal
const galleryImages = property.images && property.images.length
  ? property.images
  : [property.image];

function renderGallery(images) {
  mainImage.src = images[0];
  thumbsContainer.innerHTML = "";

  images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;

    if (index === 0) thumb.classList.add("active");

    thumb.onclick = () => {
      mainImage.src = img;
      document
        .querySelectorAll(".gallery-thumbs img")
        .forEach(i => i.classList.remove("active"));
      thumb.classList.add("active");
    };

    thumbsContainer.appendChild(thumb);
  });
}

renderGallery(property.images);
