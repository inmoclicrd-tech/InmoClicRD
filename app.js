// 1. Referencias al HTML
const filterType = document.getElementById("filter-type");
const filterCity = document.getElementById("filter-city");
const filterOperation = document.getElementById("filter-operation");
const btnSearch = document.getElementById("btnSearch");
const propertyList = document.getElementById("property-list");
const btnClear = document.getElementById("btn-clear");


// 2. Renderizar tarjetas
function renderProperties(list) {
  propertyList.innerHTML = "";

  if (list.length === 0) {
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
      <a href="property.html?id=${p.id}" class="property-link">
        <article class="property-card">
          <img src="${p.image}" alt="${p.title}">
          <div class="property-body">
            <h3>${p.title}</h3>
            <p class="price">${p.price}</p>
            <p class="location">📍 ${p.city}</p>
          </div>
        </article>
      </a>
    `;
  });
}


// 3. Mostrar todas al cargar
renderProperties(properties);

// 4. BOTÓN BUSCAR (ESTE ES TU CÓDIGO)
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

// 5. BOTON LIMPIAR BSQUEDA
btnClear.addEventListener("click", () => {
  filterType.value = "";
  filterCity.value = "";
  filterOperation.value = "";

  renderProperties(properties);
});
