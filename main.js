class Country extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    getContry().then((data) => {
      data.map((element) => {
        this.innerHTML += `
            <div>
               
                ${element.name.common}
            </div>
             `;
      });
    });
  }
}

const getContry = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  const finalData = data.slice(0, 12);

  console.log(finalData);
  return finalData;
};

window.customElements.define("country-element", Country);
