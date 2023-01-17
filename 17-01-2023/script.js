/*Esercizio 1
1_ Con il metodo giusto per la manipolazione delle stringe limitiamo
il titolo della card a solo 10 caratteri e la descrizione della 
card a soli 30.

2_Dovremo crere anche un addEventListner al pusante di aggiunta al 
carrello, in modo da aggiungere l'elemento al vostro carrello 
const cart = [] facendo apparire un alert() che indichi l'avvenuta 
aggiunta al carrello dell'elemento.

NB: è gradita sempre la gestione degli errori per il metodo fetch() 
ed un loader
 */

const bodyEl = document.querySelector("body");

const headerEl = document.createElement("header");
headerEl.className = "header";

const productEl = document.createElement("section");

//creo il button per caricare i file
const loaderEl = document.createElement("button");
loaderEl.className = "btn-loader";
loaderEl.textContent = "Carica i prodotti";

//creo il carrello
const cartEl = document.createElement("div");
cartEl.className = "carrello";
//con la sua immagine
const cartImg = document.createElement("img");
cartImg.className = "carrello__img";
cartImg.setAttribute("src", "./1124199.png");

//creo la tendina
const tendinaEl = document.createElement("div");
tendinaEl.className = "tendina";

cartEl.addEventListener("click", () => {
  tendinaEl.classList.toggle("show");
});

const cart = [];

cartEl.appendChild(cartImg);
headerEl.append(loaderEl, cartEl, tendinaEl);
bodyEl.appendChild(headerEl);

//loader
loaderEl.addEventListener("click", () => {
  loaderEl.textContent = "loading...";

  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      dataManipulation(data);
    })
    .catch((e) => {
      loaderEl.textContent = "Errore nel caricamento della pagina";
      console.log("Errore: ", e);
    });
});

const dataManipulation = (data) => {
  loaderEl.textContent = "Prodotti caricati";

  data.forEach((item) => {
    //creo la card
    const containerEl = document.createElement("div");
    containerEl.className = "card";

    //il nome di ogni prodotto
    const titleEl = document.createElement("h1");
    titleEl.className = "name";
    titleEl.textContent = item.title.substr(0, 11);

    //l'immagine del prodotto ma non funziona
    const imageEl = document.createElement("img");
    imageEl.setAttribute("src", item.images[0]);
    imageEl.className = "image";

    //l'id
    const idEl = document.createElement("p");
    idEl.className = "id";
    idEl.textContent = "Codice prodotto: " + item.id;

    //la descrizione
    const descriptionEl = document.createElement("p");
    descriptionEl.className = "description";
    descriptionEl.textContent = item.description.substr(0, 30);

    //il prezzo
    const priceEl = document.createElement("p");
    priceEl.className = "price";
    priceEl.textContent = item.price + "$";

    //il bottone per l'acquisto
    const btnBuy = document.createElement("button");
    btnBuy.className = "btn-buy";
    btnBuy.textContent = "Aggiungi al carrello";

    btnBuy.addEventListener("click", () => {
      cart.push(item);
      cartPopulation();
      console.log(cart);
      alert("Hai aggiunto il prodotto al carrello");
    });

    containerEl.append(titleEl, imageEl, idEl, descriptionEl, priceEl, btnBuy);
    productEl.appendChild(containerEl);
    bodyEl.appendChild(productEl);
  });
};

const cartPopulation = () => {
  tendinaEl.innerHTML = "";
  cart.forEach((item) => {
    const buyEl = document.createElement("p");
    buyEl.textContent = item.title;

    const removeEl = document.createElement("button");
    removeEl.textContent = "X";

    // removeEl.addEventListener("click", () => {
    //   cart.remove()
    // });

    buyEl.appendChild(removeEl);
    tendinaEl.appendChild(buyEl);
  });
};
