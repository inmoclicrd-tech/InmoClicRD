// 1. Obtener el ID desde la URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

// 2. Buscar la propiedad en data.js
const property = properties.find(p => p.id == propertyId);

// 3. Validar si existe
if (!property) {
  document.querySelector(".property-detail").innerHTML =
    "<h2>Propiedad no encontrada</h2>";
  throw new Error("Propiedad no encontrada");
}

// 4. Insertar datos en el HTML
document.getElementById("title").textContent = property.title;
document.getElementById("price").textContent = property.price;
document.getElementById("location").textContent = "📍 " + property.city;
document.getElementById("description").textContent = property.description;

document.getElementById("rooms").textContent =
  "🛏 " + property.rooms + " Habitaciones";

document.getElementById("baths").textContent =
  "🚿 " + property.baths + " Baños";

document.getElementById("parking").textContent =
  "🚗 " + property.parking + " Parqueo";

document.getElementById("image").src = property.image;
document.getElementById("whatsapp").href =
  `https://wa.me/${property.whatsapp}`;
