// 1. Referencias al HTML
const filterType = document.getElementById("filter-type");
const filterCity = document.getElementById("filter-city");
const filterOperation = document.getElementById("filter-operation");
const btnSearch = document.getElementById("btnSearch");
const propertyList = document.getElementById("property-list");
const btnClear = document.getElementById("btn-clear");

// 2. Función para ir al detalle
function goToDetail(id) {
  window.location.href = `property.html?id=${id}`;
}

// 3. Renderizar tarjetas
function renderProperties(list) {
  propertyList.innerHTML = "";

  if (!list || list.length === 0) {
    propertyList.innerHTML = `
      <div class="no-results">
        <h3>No se encontraron resultados</h3>
        <p>Intenta cambiar los filtros de búsqueda</p>
      </div>
    `;
    return;
  }

  list.forEach(p => {
  propertyList.innerHTML += `
    <article class="property-card" onclick="goToDetail(${p.id})">
      <img src="${p.image}" alt="${p.title}">

      <div class="property-body">

        <!-- CONTENIDO -->
        <div class="property-main">
          <h3 class="property-title">${p.title}</h3>

          <div class="badge-space">
            ${p.verified ? `<span class="verified-badge">✔ Propietario verificado</span>` : ""}
          </div>

          <p class="price">${p.price}</p>
          <p class="location">📍 ${p.city}</p>

          <div class="trust-row">
            <span>🔒 Contacto seguro</span>
            <span>🚫 Sin comisiones</span>
          </div>
        </div>

        <!-- ACCIONES -->
        <div class="property-actions">
          <a
            href="https://wa.me/${p.whatsapp}?text=Hola,%20vi%20esta%20propiedad%20en%20InmoClicRD%20y%20me%20interesa.%20¿Está%20disponible?"
            target="_blank"
            class="whatsapp-btn"
            onclick="event.stopPropagation()"
          >
            🟢 Contactar por WhatsApp
          </a>

          <small class="contact-note">
            Contacto directo con el propietario
          </small>
        </div>

      </div>
    </article>
  `;
});
}

// 4. Mostrar todas al cargar
renderProperties(properties);

// 5. BOTÓN BUSCAR
btnSearch.addEventListener("click", () => {
  const type = filterType.value;
  const city = filterCity.value;
  const operation = filterOperation.value;

  const filtered = properties.filter(p => {
    return (
      (type === "" || p.type === type) &&
      (city === "" || p.city === city) &&
      (operation === "" || p.operation === operation)
    );
  });

  renderProperties(filtered);
});

// 6. BOTÓN LIMPIAR BÚSQUEDA
btnClear.addEventListener("click", () => {
  filterType.value = "";
  filterCity.value = "";
  filterOperation.value = "";

  renderProperties(properties);
});
const loginBtn = document.getElementById("login-btn");
const modal = document.getElementById("coming-soon-modal");
const closeModal = document.getElementById("close-modal");

// 7. Modal Proximamente...
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const modal = document.getElementById("coming-soon-modal");
  const closeModal = document.getElementById("close-modal");

  if (loginBtn && modal && closeModal) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

