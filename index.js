const countryList = document.querySelector(".__countriesList");
const searchInput = document.getElementById("__searchInput");

const renderPost = (post) => {
  const country = document.createElement("div");
  country.classList.add("col");
  country.innerHTML = `
    <div class="card shadow border-0 d-flex flex-column gap-2 __myCard h-100">
      <img src=${post.flags.svg} class="card-img-top" alt="..." />
      <div class="card-body d-flex flex-column gap-3">
        <h5 class="card-title __countryName">${post.name}</h5>
        <div class="__details">
          <p class="card-text __countryPopulation">Population: ${post.population}</p>
          <p class="card-text __countryRegion">Region: ${post.region}</p>
          <p class="card-text __countryCapital">Capital: ${post.capital}</p>
        </div>
      </div>
    </div>`;
  countryList.appendChild(country);
};

async function getCountries() {
  let query = searchInput.value;
  console.log(query);
  const url = await fetch("/data.json");
  const response = await url.json();
  console.log(response);
  response
    .filter((eventData) => {
      if (query === "") {
        return eventData;
      } else if (eventData.name.toLowerCase().includes(query.toLowerCase())) {
        return eventData;
      }
    })
    .map((api) => {
      renderPost(api);
    });
}

getCountries();

// toggle function to change theme

const icon = document.getElementById("__icon");
const modeText = document.getElementById("__mode");
console.log(modeText);
icon.onclick = () => {
  document.body.classList.toggle("white_theme");
  if (document.body.classList.contains("white_theme")) {
    modeText.textContent = "Light Mode";
  } else {
    modeText.textContent = "Dark Mode";
  }
};

// Implementing the search function
// const countryName = document.getElementsByClassName("__countryName");
// searchInput.addEventListener("input", () => {
//   Array.from(countryName).forEach((country) => {
//     if (
//       country.innerText.toLowerCase().includes(searchInput.value.toLowerCase())
//     ) {
//       country.parentElement.parentElement.style.display = "flex";
//     } else {
//       country.parentElement.parentElement.style.display = "none";
//     }
//   });
// });
