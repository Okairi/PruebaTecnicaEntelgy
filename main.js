class Country extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    getContry().then((data) => {
      data.map((element) => {
        this.innerHTML += `
            <div class="element">
              <span onclick="modal(${element.area})">
              ${element.name.common}</span>
              <img src="${element.flags.svg}" alt="${element.name.common}"> 
            </div>
             `;
      });
    });
  }

  static get obserdAtributes() {
    return [
      (continents = {
        type: String,
        value: modal(),
      }),
    ];
  }
}

const getContry = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  console.log(data.slice(0, 12));
  return data.slice(0, 12);
};

function modal(val) {
  let continents;
  getContry().then((data) => {
    data.filter((element) => {
      if (element.area === val) {
        continents = element.continents[0];
        console.log(continents);
      }
    });
  });
  return continents;
}

window.customElements.define("country-element", Country);
