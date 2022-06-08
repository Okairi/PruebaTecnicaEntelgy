class Country extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    getContry().then((data) => {
      data.map((element) => {
        this.innerHTML += `
            <div class="element">
              ${element.name.common}
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

  const finalData = data.slice(0, 12).sort((a, b) => {
    return a.name.common > b.name.common ? 1 : -1;
  });

  console.log(finalData);
  return finalData;
};

window.customElements.define("country-element", Country);
