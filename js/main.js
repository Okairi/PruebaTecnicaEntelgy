class Country extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    getContry().then((data) => {
      data.map((element) => {
        this.innerHTML += `
            <div class="element">
                <span class="continents" >
                    ${element.continents[0]}
                </span>
              <span onclick="showContinents(${element.area})">${element.name.common}</span>
              <img src="${element.flags.svg}" alt="${element.name.common}"> 
            </div>
             `;
      });
    });
  }
}

const getContry = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return data.slice(0, 12);
};

const showContinents = (val) => {
  const continents = document.querySelector(".continents");

  getContry().then((data) => {
    data.filter((element) => {
      if (element.area === val) {
        continents.style.display = "block";
        continents.style.marginBottom = "10px";

        setTimeout(() => {
          continents.style.display = "none";
        }, 1000);
      }
    });
  });
};

window.customElements.define("country-element", Country);
