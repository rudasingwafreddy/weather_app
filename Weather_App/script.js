// Enhanced background effects for weather app
function setBackgroundByWeather(iconCode) {
  const body = document.body;
  const appContainer = document.querySelector('.app');
  body.className = '';

  // Determine weather type based on icon code
  let weatherType = 'clear';
  if (iconCode.includes('01d')) weatherType = 'clear-day';
  else if (iconCode.includes('01n')) weatherType = 'clear-night';
  else if (iconCode.includes('02d')) weatherType = 'partly-cloudy-day';
  else if (iconCode.includes('02n')) weatherType = 'partly-cloudy-night';
  else if (iconCode.includes('03') || iconCode.includes('04')) weatherType = 'cloudy';
  else if (iconCode.includes('09')) weatherType = 'rainy-heavy';
  else if (iconCode.includes('10')) weatherType = 'rainy';
  else if (iconCode.includes('11')) weatherType = 'thunderstorm';
  else if (iconCode.includes('13')) weatherType = 'snow';
  else if (iconCode.includes('50')) weatherType = 'mist';

  // Add weather type class to body
  body.classList.add(weatherType);
  
  // Apply themed gradients to app container
  applyWeatherGradient(appContainer, weatherType);
  
  // Initialize weather particles
  initWeatherEffects(weatherType);
}

function applyWeatherGradient(element, weatherType) {
  // Define gradients for different weather conditions
  const gradients = {
    'clear-day': 'linear-gradient(160deg, rgba(82,175,252,0.8) 0%, rgba(134,209,255,0.7) 100%)',
    'clear-night': 'linear-gradient(160deg, rgba(32,33,79,0.9) 0%, rgba(25,29,100,0.85) 100%)',
    'partly-cloudy-day': 'linear-gradient(160deg, rgba(103,178,245,0.8) 0%, rgba(156,195,225,0.7) 100%)',
    'partly-cloudy-night': 'linear-gradient(160deg, rgba(46,49,84,0.9) 0%, rgba(60,67,118,0.85) 100%)',
    'cloudy': 'linear-gradient(160deg, rgba(132,144,163,0.8) 0%, rgba(165,177,193,0.7) 100%)',
    'rainy': 'linear-gradient(160deg, rgba(104,128,152,0.8) 0%, rgba(71,94,115,0.7) 100%)',
    'rainy-heavy': 'linear-gradient(160deg, rgba(87,98,113,0.8) 0%, rgba(65,77,94,0.75) 100%)',
    'thunderstorm': 'linear-gradient(160deg, rgba(59,67,89,0.85) 0%, rgba(42,49,68,0.8) 100%)',
    'snow': 'linear-gradient(160deg, rgba(220,227,235,0.8) 0%, rgba(243,246,250,0.75) 100%)',
    'mist': 'linear-gradient(160deg, rgba(182,193,205,0.8) 0%, rgba(196,206,215,0.7) 100%)'
  };

  // Apply the gradient
  element.style.background = gradients[weatherType] || gradients['clear-day'];
  
  // Add glass morphism effect
  element.style.backdropFilter = 'blur(12px)';
  element.style.WebkitBackdropFilter = 'blur(12px)';
}

function initWeatherEffects(weatherType) {
  console.log(`Initializing weather effects for: ${weatherType}`);
  
  // Clear existing particles and effects
  clearWeatherEffects();
  
  // Initialize particles.js with specific weather configurations
  initParticlesEffect(weatherType);
  
  // Initialize additional weather-specific effects
  initSpecialWeatherEffects(weatherType);
}

function clearWeatherEffects() {
  // Clear particles.js
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
  
  // Clear any additional layers or effects
  clearSpecialWeatherEffects();
}

function clearSpecialWeatherEffects() {
  // Remove any existing special effect elements
  document.querySelectorAll('.weather-effect-layer').forEach(layer => {
    layer.remove();
  });
  
  // Clear any running intervals
  if (state.lightningInterval) {
    clearInterval(state.lightningInterval);
    state.lightningInterval = null;
  }
  
  if (state.animationInterval) {
    clearInterval(state.animationInterval);
    state.animationInterval = null;
  }
}

function initParticlesEffect(weatherType) {
  // Define enhanced particle configurations for different weather types
  const particleConfigs = {
    'clear-day': {
      particles: {
        number: { value: 15, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.2 } },
        size: { value: 4, random: true },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 0.8, 
          direction: "none", 
          random: true, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: { 
        detect_on: "canvas", 
        events: { 
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: false } 
        },
        modes: {
          bubble: { distance: 150, size: 6, opacity: 0.35 }
        }
      }
    },
    'clear-night': {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { 
          type: "star",
          stroke: { width: 0, color: "#ffffff" },
          polygon: { nb_sides: 5 }
        },
        opacity: { value: 0.7, random: true, anim: { enable: true, speed: 0.3 } },
        size: { value: 2, random: true, anim: { enable: true, speed: 2 } },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 0.3, 
          direction: "none", 
          random: true, 
          straight: false, 
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: { 
        detect_on: "canvas", 
        events: { 
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "repulse" } 
        },
        modes: {
          bubble: { distance: 100, size: 3, opacity: 0.8 },
          repulse: { distance: 100, duration: 0.4 }
        }
      }
    },
    'partly-cloudy-day': {
      particles: {
        number: { value: 25, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 5, random: true, anim: { enable: true, speed: 2 } },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 2, 
          direction: "left", 
          random: false, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    },
    'partly-cloudy-night': {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { 
          type: ["circle", "star"],
          stroke: { width: 0 },
          polygon: { nb_sides: 5 }
        },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 1.5, 
          direction: "left", 
          random: true, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    },
    'cloudy': {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#f5f5f5" },
        shape: { type: "circle" },
        opacity: { value: 0.25, random: true, anim: { enable: true, speed: 1 } },
        size: { value: 8, random: true, anim: { enable: true, speed: 5 } },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 2, 
          direction: "left", 
          random: false, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    },
    'rainy': {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ccdfff" },
        shape: { type: "line", stroke: { width: 1, color: "#ccdfff" } },
        opacity: { value: 0.5, random: false },
        size: { value: 10, random: true },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 15, 
          direction: "bottom", 
          random: true, 
          straight: true, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    },
    'rainy-heavy': {
      particles: {
        number: { value: 150, density: { enable: true, value_area: 800 } },
        color: { value: "#ccdfff" },
        shape: { type: "line", stroke: { width: 1.5, color: "#ccdfff" } },
        opacity: { value: 0.6, random: false },
        size: { value: 12, random: true },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 20, 
          direction: "bottom", 
          random: true, 
          straight: true, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    },
    'thunderstorm': {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#ccdfff" },
        shape: { type: "line", stroke: { width: 1, color: "#ccdfff" } },
        opacity: { value: 0.6, random: false },
        size: { value: 12, random: true },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 25, 
          direction: "bottom", 
          random: true, 
          straight: true, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    },
    'snow': {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { 
          type: "circle",
          stroke: { width: 0, color: "#000000" }
        },
        opacity: { value: 0.8, random: true },
        size: { value: 3, random: true, anim: { enable: true, speed: 2 } },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 3, 
          direction: "bottom", 
          random: true, 
          straight: false, 
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: { 
        detect_on: "canvas", 
        events: { 
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: false } 
        },
        modes: {
          bubble: { distance: 100, size: 5, opacity: 0.8 }
        }
      }
    },
    'mist': {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#e6e6e6" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.5 } },
        size: { value: 15, random: true, anim: { enable: true, speed: 2 } },
        line_linked: { enable: false },
        move: { 
          enable: true, 
          speed: 1, 
          direction: "right", 
          random: true, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } }
    }
  };

  // Initialize particles if container exists
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer && particleConfigs[weatherType] && typeof particlesJS !== 'undefined') {
    console.log('Initializing particles with config:', weatherType);
    particlesJS('particles-js', particleConfigs[weatherType]);
  } else {
    console.error('Failed to initialize particles:', {
      container: !!particlesContainer,
      config: !!particleConfigs[weatherType],
      particlesJS: typeof particlesJS
    });
  }
}

function initSpecialWeatherEffects(weatherType) {
  switch (weatherType) {
    case 'thunderstorm':
      createLightningEffect();
      break;
    case 'clear-day':
      createSunGlareEffect();
      break;
    case 'clear-night':
      createStarTwinkleEffect();
      break;
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
    case 'cloudy':
      createCloudLayerEffect(weatherType);
      break;
    case 'rainy':
    case 'rainy-heavy':
      createRainOverlayEffect(weatherType);
      break;
    case 'snow':
      createSnowOverlayEffect();
      break;
    case 'mist':
      createMistOverlayEffect();
      break;
  }
}

function createLightningEffect() {
  // Add lightning background layer
  const container = document.createElement('div');
  container.className = 'weather-effect-layer lightning-layer';
  document.body.appendChild(container);
  
  // Lightning flash effect
  state.lightningInterval = setInterval(() => {
    // Random lightning intensity and duration
    const intensity = Math.random() * 0.7 + 0.3;
    const duration = Math.random() * 150 + 50;
    
    // Create lightning flash
    document.body.classList.add('lightning-flash');
    document.body.style.setProperty('--lightning-opacity', intensity);
    
    // Add thunder sound effect (optional)
    if (Math.random() > 0.6) {
      playThunderSound(intensity);
    }
    
    // Remove flash after duration
    setTimeout(() => {
      document.body.classList.remove('lightning-flash');
    }, duration);
  }, Math.random() * 5000 + 3000);
}

function playThunderSound(intensity) {
  // This is just a placeholder function - implement actual sound if desired
  console.log(`Thunder sound at intensity: ${intensity}`);
}

function createSunGlareEffect() {
  // Create sun glare element
  const sunGlare = document.createElement('div');
  sunGlare.className = 'weather-effect-layer sun-glare';
  document.body.appendChild(sunGlare);
  
  // Animate sun glare
  state.animationInterval = setInterval(() => {
    const intensity = Math.random() * 0.3 + 0.7;
    sunGlare.style.opacity = intensity;
  }, 5000);
}

function createStarTwinkleEffect() {
  // Create additional twinkling stars layer (beyond particles.js)
  const starsContainer = document.createElement('div');
  starsContainer.className = 'weather-effect-layer twinkling-stars';
  document.body.appendChild(starsContainer);
  
  // Create random stars
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    starsContainer.appendChild(star);
  }
}

function createCloudLayerEffect(weatherType) {
  // Create cloud layers with parallax effect
  const numLayers = weatherType === 'cloudy' ? 3 : 2;
  const opacity = weatherType === 'cloudy' ? 0.9 : 0.7;
  
  for (let i = 0; i < numLayers; i++) {
    const cloudLayer = document.createElement('div');
    cloudLayer.className = `weather-effect-layer cloud-layer cloud-layer-${i+1}`;
    cloudLayer.style.opacity = opacity - (i * 0.2);
    cloudLayer.style.animationDuration = `${110 - (i * 30)}s`;
    document.body.appendChild(cloudLayer);
  }
}

function createRainOverlayEffect(weatherType) {
  // Create rain overlay
  const rainContainer = document.createElement('div');
  rainContainer.className = 'weather-effect-layer rain-container';
  document.body.appendChild(rainContainer);
  
  // Create rain drops (beyond particles.js)
  const rainCount = weatherType === 'rainy-heavy' ? 100 : 50;
  
  for (let i = 0; i < rainCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
    rainContainer.appendChild(drop);
  }
  
  // Add puddle reflections at bottom
  const puddleReflection = document.createElement('div');
  puddleReflection.className = 'weather-effect-layer puddle-reflection';
  document.body.appendChild(puddleReflection);
}

function createSnowOverlayEffect() {
  // Create additional snow depth effect
  const snowDepth = document.createElement('div');
  snowDepth.className = 'weather-effect-layer snow-depth';
  document.body.appendChild(snowDepth);
  
  // Add snow accumulated effect at bottom
  const snowAccumulation = document.createElement('div');
  snowAccumulation.className = 'weather-effect-layer snow-accumulation';
  document.body.appendChild(snowAccumulation);
}

function createMistOverlayEffect() {
  // Create multiple mist layers for depth
  for (let i = 0; i < 3; i++) {
    const mistLayer = document.createElement('div');
    mistLayer.className = `weather-effect-layer mist-layer mist-layer-${i+1}`;
    mistLayer.style.opacity = 0.3 - (i * 0.05);
    mistLayer.style.animationDuration = `${60 - (i * 15)}s`;
    document.body.appendChild(mistLayer);
  }
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'd2e2def6121cc95b4ebc25d67ab54c8e'; 

// DOM Elements
const elements = {
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#search-form-input"),
  locationButton: document.querySelector("#location-button"),
  themeToggle: document.querySelector("#theme-toggle"),
  favoriteToggle: document.querySelector("#favorite-toggle"),
  tempUnit: document.querySelector("#temperature-unit"),
  celsiusBtn: document.querySelector("#celsius-btn"),
  fahrenheitBtn: document.querySelector("#fahrenheit-btn"),
  darkModeSwitch: document.querySelector("#darkModeSwitch"),
  favoriteCitiesContainer: document.querySelector("#favorite-cities"),
  favoritesListContainer: document.querySelector("#favorites-list"),
  loadingIndicator: document.querySelector("#loading-indicator"),
  errorMessage: document.querySelector("#error-message"),
  weatherContainer: document.querySelector(".weather-data"),
  hourlyForecast: document.querySelector("#hourly-forecast"),
  dailyForecast: document.querySelector("#forecast"),
  temperatureChart: document.getElementById("temperatureChart"),
  weatherIcon: document.querySelector("#icon"),
  currentTemp: document.querySelector("#temperature"),
  currentCity: document.querySelector("#weather-city"),
  currentDescription: document.querySelector("#description"),
  currentTime: document.querySelector("#time"),
  currentFeelsLike: document.querySelector("#feels-like"),
  currentHumidityMain: document.querySelector("#humidity"),
  currentHumidityDetail: document.querySelector("#humidity-value"),
  currentWindMain: document.querySelector("#speed"),
  currentWindDetail: document.querySelector("#wind-value"),
  currentPrecipitation: document.querySelector("#precipitation"),
  currentVisibility: document.querySelector("#visibility"),
  currentPressure: document.querySelector("#pressure"),
  currentCloudiness: document.querySelector("#cloudiness"),
  currentSunrise: document.querySelector("#sunrise"),
  currentSunset: document.querySelector("#sunset"),
  appContainer: document.querySelector(".app"),
  appDetails: document.querySelector(".app-details")
};

// Application State
const state = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  units: localStorage.getItem("units") || "metric",
  currentCity: localStorage.getItem("lastCity") || "New York",
  temperatureChart: null,
  isDarkMode: localStorage.getItem("darkMode") === "true",
  weatherData: null,
  forecastData: null,
  hourlyScrollPosition: 0,
  particlesInstance: null,
  currentWeatherType: "clear",
  lightningInterval: null,
  hourlyItemWidth: 100,
  visibleHourlyItems: 5,
  totalHourlyItems: 0
};

/* ======================
   WEATHER FUNCTIONS
   ====================== */

async function fetchWeatherData(location) {
  try {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('Please configure your OpenWeatherMap API key');
    }

    showLoading();
    clearError();

    const [currentWeather, forecast] = await Promise.all([
      fetchCurrentWeather(location),
      fetchWeatherForecast(location)
    ]);

    state.currentCity = currentWeather.data.name;
    state.weatherData = processCurrentWeather(currentWeather.data);
    state.forecastData = processForecastData(forecast.data.list);

    updateCurrentWeatherUI();
    updateForecastUI();
    updateTemperatureChart();

    localStorage.setItem("lastCity", state.currentCity);
    setBackgroundByWeather(currentWeather.data.weather[0].icon);
    updateFavoriteToggle();

  } catch (error) {
    handleError(error);
  } finally {
    hideLoading();
  }
}

async function fetchCurrentWeather(location) {
  const url = `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=${state.units}`;
  const response = await axios.get(url);
  
  if (response.status !== 200 || response.data.cod !== 200) {
    throw new Error(response.data.message || "Failed to fetch weather data");
  }
  return response;
}

async function fetchWeatherForecast(location) {
  const url = `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=${state.units}`;
  const response = await axios.get(url);
  
  if (response.status !== 200 || response.data.cod !== "200") {
    throw new Error(response.data.message || "Failed to fetch forecast");
  }
  return response;
}

function processCurrentWeather(data) {
  return {
    city: data.name,
    condition: {
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    },
    timestamp: data.dt,
    timezone: data.timezone,
    temperature: {
      current: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max)
    },
    details: {
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      cloudiness: data.clouds.all,
      visibility: data.visibility / 1000,
      precipitation: data.rain ? Math.round(data.rain["1h"] || 0) : 0,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    }
  };
}

function processForecastData(forecastList) {
  const dailyForecast = {};
  let hourlyItems = [];

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString();

    if (hourlyItems.length < 24) {
      hourlyItems.push({
        time: date,
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description
      });
    }

    if (!dailyForecast[dayKey]) {
      dailyForecast[dayKey] = {
        date: date,
        items: [],
        tempMin: Infinity,
        tempMax: -Infinity
      };
    }

    dailyForecast[dayKey].tempMin = Math.min(dailyForecast[dayKey].tempMin, Math.round(item.main.temp_min));
    dailyForecast[dayKey].tempMax = Math.max(dailyForecast[dayKey].tempMax, Math.round(item.main.temp_max));
    dailyForecast[dayKey].items.push({
      time: date,
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description
    });
  });

  state.totalHourlyItems = hourlyItems.length;
  const result = Object.values(dailyForecast).slice(0, 5);
  result.hourlyItems = hourlyItems;
  return result;
}

/* ======================
   UI FUNCTIONS
   ====================== */

function updateCurrentWeatherUI() {
  const { weatherData } = state;
  if (!weatherData) return;

  const localTime = getLocalTime(weatherData.timestamp, weatherData.timezone);

  elements.currentTime.textContent = localTime.timeString;
  elements.currentDescription.textContent = localTime.dateString;
  elements.currentCity.textContent = weatherData.city;
  elements.currentTemp.textContent = weatherData.temperature.current;
  elements.currentFeelsLike.textContent = `${weatherData.temperature.feelsLike}°`;
  elements.currentHumidityMain.textContent = `${weatherData.details.humidity}%`;
  elements.currentHumidityDetail.textContent = `${weatherData.details.humidity}%`;

  let windSpeed = weatherData.details.windSpeed;
  let windUnit = state.units === 'metric' ? 'm/s' : 'mph';
  if (state.units === 'imperial') {
    windSpeed = (windSpeed * 2.23694).toFixed(1);
  } else {
    windSpeed = windSpeed.toFixed(1);
  }

  elements.currentWindMain.textContent = `${windSpeed} ${windUnit}`;
  elements.currentWindDetail.textContent = `${windSpeed} ${windUnit}`;
  elements.weatherIcon.innerHTML = `<img src="${weatherData.condition.iconUrl}" alt="${weatherData.condition.description}" />`;
  elements.currentVisibility.textContent = `${weatherData.details.visibility.toFixed(1)} km`;
  elements.currentPressure.textContent = `${weatherData.details.pressure} hPa`;
  elements.currentCloudiness.textContent = `${weatherData.details.cloudiness}%`;
  elements.currentPrecipitation.textContent = `${weatherData.details.precipitation} mm`;

  const sunrise = getLocalTime(weatherData.details.sunrise, weatherData.timezone);
  const sunset = getLocalTime(weatherData.details.sunset, weatherData.timezone);
  elements.currentSunrise.textContent = sunrise.timeString;
  elements.currentSunset.textContent = sunset.timeString;

  updateDarkModeTextColors();
}

function updateForecastUI() {
  updateHourlyForecast();
  updateDailyForecast();
}

function updateHourlyForecast() {
  if (!state.forecastData?.hourlyItems) return;

  elements.hourlyForecast.innerHTML = state.forecastData.hourlyItems.map(item => `
    <div class="hourly-item">
      <div class="hourly-time">${formatTime(item.time)}</div>
      <img src="https://openweathermap.org/img/wn/${item.icon}.png" alt="${item.description}" />
      <div class="hourly-temp">${item.temp}°</div>
    </div>
  `).join("");
}

function updateDailyForecast() {
  if (!state.forecastData) return;

  elements.dailyForecast.innerHTML = state.forecastData.map(day => `
    <div class="weather-forecast-day">
      <div class="date">${formatDay(day.date)}</div>
      <img src="https://openweathermap.org/img/wn/${day.items[0].icon}.png" alt="${day.items[0].description}" />
      <div class="weather-forecast-temperature">
        <span class="weather-max">${day.tempMax}°</span>
        <span class="weather-min">${day.tempMin}°</span>
      </div>
    </div>
  `).join("");
}

function updateTemperatureChart() {
  if (!state.forecastData || !elements.temperatureChart) return;

  if (state.temperatureChart) {
    state.temperatureChart.destroy();
  }

  const ctx = elements.temperatureChart.getContext('2d');
  const labels = state.forecastData.map(day => formatDay(day.date));
  const maxTemps = state.forecastData.map(day => day.tempMax);
  const minTemps = state.forecastData.map(day => day.tempMin);

  const textColor = state.isDarkMode ? '#e2e8f0' : '#2d3748';
  const maxColor = state.isDarkMode ? 'rgba(255, 99, 132, 0.8)' : 'rgba(255, 99, 132, 1)';
  const minColor = state.isDarkMode ? 'rgba(54, 162, 235, 0.8)' : 'rgba(54, 162, 235, 1)';

  state.temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'High',
          data: maxTemps,
          borderColor: maxColor,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Low',
          data: minTemps,
          borderColor: minColor,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            font: { size: 14 }
          }
        },
        tooltip: {
          callbacks: {
            label: context => `${context.dataset.label}: ${context.raw}°${state.units === 'metric' ? 'C' : 'F'}`
          },
          backgroundColor: state.isDarkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          titleColor: textColor,
          bodyColor: textColor
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: textColor,
            callback: value => `${value}°${state.units === 'metric' ? 'C' : 'F'}`
          },
          grid: {
            color: state.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          ticks: { color: textColor },
          grid: {
            color: state.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  });
}

/* ======================
   UTILITY FUNCTIONS
   ====================== */

function getLocalTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const localDate = new Date(utc + (timezoneOffset * 1000));

  return {
    timeString: localDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    dateString: localDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  };
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
}

function formatDay(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function showLoading() {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.style.display = "block";
    elements.loadingIndicator.classList.add("animate__pulse");
  }
}

function hideLoading() {
  if (elements.loadingIndicator) {
    elements.loadingIndicator.style.display = "none";
    elements.loadingIndicator.classList.remove("animate__pulse");
  }
}

function showError(message) {
  if (elements.errorMessage) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.display = "block";
    elements.errorMessage.classList.add("animate__shakeX");
    setTimeout(() => elements.errorMessage.classList.remove("animate__shakeX"), 500);
  }
}

function clearError() {
  if (elements.errorMessage) {
    elements.errorMessage.textContent = "";
    elements.errorMessage.style.display = "none";
  }
}

function handleError(error) {
  console.error("Weather App Error:", error);
  let errorMessage = "An error occurred while fetching weather data.";
  if (error.message.includes("404")) errorMessage = "Location not found. Please try another city.";
  else if (error.message.includes("network")) errorMessage = "Network error. Please check your internet connection.";
  else if (error.message.includes("401")) errorMessage = "Invalid API key. Please contact support.";
  showError(errorMessage);
}

function updateChartColors(textColor) {
  if (state.temperatureChart) {
    const maxColor = state.isDarkMode ? 'rgba(255, 99, 132, 0.8)' : 'rgba(255, 99, 132, 1)';
    const minColor = state.isDarkMode ? 'rgba(54, 162, 235, 0.8)' : 'rgba(54, 162, 235, 1)';

    state.temperatureChart.data.datasets[0].borderColor = maxColor;
    state.temperatureChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.2)';
    state.temperatureChart.data.datasets[1].borderColor = minColor;
    state.temperatureChart.data.datasets[1].backgroundColor = 'rgba(54, 162, 235, 0.2)';

    state.temperatureChart.options.plugins.legend.labels.color = textColor;
    state.temperatureChart.options.plugins.tooltip.titleColor = textColor;
    state.temperatureChart.options.plugins.tooltip.bodyColor = textColor;
    state.temperatureChart.options.scales.y.ticks.color = textColor;
    state.temperatureChart.options.scales.x.ticks.color = textColor;
    state.temperatureChart.options.scales.y.grid.color = state.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    state.temperatureChart.options.scales.x.grid.color = state.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    state.temperatureChart.update();
  }
}

/* ======================
   EVENT HANDLERS
   ====================== */

function handleSearchSubmit(event) {
  event.preventDefault();
  const city = elements.searchInput.value.trim();

  if (city) {
    fetchWeatherData(city);
    elements.searchInput.value = "";
    elements.searchInput.classList.add("animate__pulse");
    setTimeout(() => elements.searchInput.classList.remove("animate__pulse"), 500);
  }
}

function getCurrentLocation() {
  showLoading();
  clearError();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
      },
      error => {
        hideLoading();
        showError("Unable to retrieve your location. Please enable location services or search manually.");
      }
    );
  } else {
    hideLoading();
    showError("Geolocation is not supported by your browser.");
  }
}

async function fetchWeatherDataByCoords(lat, lon) {
  try {
    showLoading();
    const [currentWeather, forecast] = await Promise.all([
      axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${state.units}`),
      axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${state.units}`)
    ]);

    state.currentCity = currentWeather.data.name;
    state.weatherData = processCurrentWeather(currentWeather.data);
    state.forecastData = processForecastData(forecast.data.list);

    updateCurrentWeatherUI();
    updateForecastUI();
    updateTemperatureChart();

    localStorage.setItem("lastCity", state.currentCity);
    setBackgroundByWeather(currentWeather.data.weather[0].icon);
    updateFavoriteToggle();

  } catch (error) {
    handleError(error);
  } finally {
    hideLoading();
  }
}

function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  localStorage.setItem("darkMode", state.isDarkMode);

  if (state.isDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

function enableDarkMode() {
  document.body.classList.add("night");
  elements.appContainer.classList.add("night-mode");
  elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  elements.darkModeSwitch.checked = true;
  updateDarkModeTextColors();
  updateChartColors('#e2e8f0');
}

function disableDarkMode() {
  document.body.classList.remove("night");
  elements.appContainer.classList.remove("night-mode");
  elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  elements.darkModeSwitch.checked = false;
  updateDarkModeTextColors();
  updateChartColors('#2d3748');
}

function updateDarkModeTextColors() {
  const textColor = state.isDarkMode ? '#ffffff' : '';
  const secondaryTextColor = state.isDarkMode ? '#e0e0e0' : '';

  if (elements.appDetails) {
    elements.appDetails.style.color = secondaryTextColor;
  }
  if (elements.currentDescription) {
    elements.currentDescription.style.color = secondaryTextColor;
  }
  if (elements.currentTime) {
    elements.currentTime.style.color = textColor;
  }
  if (elements.currentHumidityMain) {
    elements.currentHumidityMain.style.color = textColor;
  }
  if (elements.currentWindMain) {
    elements.currentWindMain.style.color = textColor;
  }
}

function toggleFavorite() {
  if (!state.currentCity) return;

  const index = state.favorites.indexOf(state.currentCity);

  if (index === -1) {
    state.favorites.push(state.currentCity);
    elements.favoriteToggle.innerHTML = '<i class="fas fa-star"></i>';
  } else {
    state.favorites.splice(index, 1);
    elements.favoriteToggle.innerHTML = '<i class="far fa-star"></i>';
  }

  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  renderFavorites();
  elements.favoriteToggle.classList.add("animate__bounce");
  setTimeout(() => elements.favoriteToggle.classList.remove("animate__bounce"), 500);
}

function updateFavoriteToggle() {
  if (!elements.favoriteToggle || !state.currentCity) return;

  elements.favoriteToggle.innerHTML = state.favorites.includes(state.currentCity)
    ? '<i class="fas fa-star"></i>'
    : '<i class="far fa-star"></i>';
}

function renderFavorites() {
  if (!elements.favoriteCitiesContainer || !elements.favoritesListContainer) return;

  elements.favoriteCitiesContainer.innerHTML = "";
  elements.favoritesListContainer.innerHTML = state.favorites.length === 0
    ? "<p>No favorite cities yet. Add some using the star icon!</p>"
    : "";

  state.favorites.forEach((city, index) => {
    const favoriteElement = document.createElement("div");
    favoriteElement.className = "favorite-city";
    favoriteElement.innerHTML = `${city} <i class="fas fa-times remove-favorite"></i>`;
    favoriteElement.style.animationDelay = `${index * 0.1}s`;

    favoriteElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-favorite")) {
        state.favorites = state.favorites.filter(fav => fav !== city);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        renderFavorites();
        if (city === state.currentCity) updateFavoriteToggle();
      } else {
        fetchWeatherData(city);
      }
    });

    elements.favoriteCitiesContainer.appendChild(favoriteElement);

    const listItem = document.createElement("div");
    listItem.className = "favorite-item";
    listItem.innerHTML = `
      <span>${city}</span>
      <button class="remove-favorite-btn" data-city="${city}">
        <i class="fas fa-trash text-danger"></i>
      </button>
    `;
    elements.favoritesListContainer.appendChild(listItem);
  });

  document.querySelectorAll(".remove-favorite-btn").forEach(button => {
    button.addEventListener("click", () => {
      const city = button.getAttribute("data-city");
      state.favorites = state.favorites.filter(fav => fav !== city);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      renderFavorites();
      if (city === state.currentCity) updateFavoriteToggle();
    });
  });
}

function setTemperatureUnit(newUnits, reload = true) {
  state.units = newUnits;
  localStorage.setItem("units", state.units);

  elements.tempUnit.textContent = state.units === "metric" ? "°C" : "°F";
  elements.celsiusBtn.classList.toggle("active", state.units === "metric");
  elements.fahrenheitBtn.classList.toggle("active", state.units === "imperial");

  if (reload && state.currentCity) {
    fetchWeatherData(state.currentCity);
  }

  elements.tempUnit.classList.add("animate__pulse");
  setTimeout(() => elements.tempUnit.classList.remove("animate__pulse"), 500);
}

function setupEventListeners() {
  if (elements.searchForm) {
    elements.searchForm.addEventListener("submit", handleSearchSubmit);
  }
  if (elements.locationButton) {
    elements.locationButton.addEventListener("click", getCurrentLocation);
  }
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener("click", toggleTheme);
  }
  if (elements.darkModeSwitch) {
    elements.darkModeSwitch.addEventListener("change", toggleTheme);
  }
  if (elements.favoriteToggle) {
    elements.favoriteToggle.addEventListener("click", toggleFavorite);
  }
  if (elements.celsiusBtn) {
    elements.celsiusBtn.addEventListener("click", () => setTemperatureUnit("metric"));
  }
  if (elements.fahrenheitBtn) {
    elements.fahrenheitBtn.addEventListener("click", () => setTemperatureUnit("imperial"));
  }
}

function loadSavedSettings() {
  setTemperatureUnit(state.units, false);

  if (state.isDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  updateFavoriteToggle();
}

function setupAnimations() {
  document.querySelectorAll("button, .clickable").forEach(button => {
    button.addEventListener("mouseenter", () => {
      button.classList.add("animate__animated", "animate__pulse");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("animate__animated", "animate__pulse");
    });
  });
}

/* ======================
   INITIALIZATION
   ====================== */

function initApp() {
  try {
    // Verify API key first
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      showError('Please configure your OpenWeatherMap API key in script.js');
      return;
    }

    // Verify critical DOM elements exist
    if (!elements.searchForm || !elements.weatherContainer) {
      showError('Critical elements missing from page');
      return;
    }

    loadSavedSettings();
    setupEventListeners();
    setupAnimations();
    renderFavorites();

    if (state.currentCity) {
      fetchWeatherData(state.currentCity);
    }
  } catch (e) {
    console.error('Error initializing app:', e);
    showError('Failed to initialize application. Please refresh the page.');
  }
}

// Start the application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);