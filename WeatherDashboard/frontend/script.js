const API_KEY = "9e7779050c74b0c9ab7e3f52cb136a32";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const windEl = document.getElementById("wind");

const favoritesList = document.getElementById("favorites-list");

// --- Buscar clima automaticamente pela localização do usuário ---
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      // Exibir dados iniciais
      cityNameEl.textContent = data.name;
      tempEl.textContent = `Temperature: ${data.main.temp} °C`;
      descEl.textContent = `Weather: ${data.weather[0].description}`;
      windEl.textContent = `Wind: ${data.wind.speed} m/s`;

    } catch (err) {
      console.error("Erro ao buscar localização:", err);
    }
  }, (err) => {
    console.warn("Usuário negou acesso à localização.");
  });
}

// --- Função principal para buscar o clima ---
async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    cityNameEl.textContent = data.name;
    tempEl.textContent = `Temperature: ${data.main.temp} °C`;
    descEl.textContent = `Weather: ${data.weather[0].description}`;
    windEl.textContent = `Wind: ${data.wind.speed} m/s`;

    // ✅ Cálculo correto da hora local
    const localTimestampMs = (data.dt + data.timezone) * 1000; // segundos -> ms
    const localDate = new Date(localTimestampMs);
    const hours = localDate.getUTCHours().toString().padStart(2, "0");
    const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");

    // cria um elemento novo ou atualiza se já existir
    let timeEl = document.getElementById("local-time");
    if (!timeEl) {
      timeEl = document.createElement("p");
      timeEl.id = "local-time";
      cityNameEl.parentNode.insertBefore(timeEl, tempEl);
    }
    timeEl.textContent = `Local Time: ${hours}:${minutes}`;

  } catch (err) {
    console.error("Erro ao buscar clima:", err);
  }
}

// --- Eventos e favoritos ---
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    saveFavorite(city);
  }
});

async function saveFavorite(city) {
  try {
    const res = await fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city }),
    });
    const data = await res.json();
    updateFavoritesUI(data.favorites);
  } catch (err) {
    console.error("Erro ao salvar favorito:", err);
  }
}

function updateFavoritesUI(list) {
  favoritesList.innerHTML = "";
  list.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      getWeather(city);
    });
    favoritesList.appendChild(li);
  });
}
