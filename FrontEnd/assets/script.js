const filter = document.querySelector(".filter");

let allWorks = [];
const getWorks = async () => {
  const res = await fetch("http://localhost:5678/api/works");
  const data = await res.json();
  console.log(data);
  allWorks = data;
  displayWorks(allWorks);
};
getWorks();

const getCategories = async () => {
  const res2 = await fetch("http://localhost:5678/api/categories");
  const result = await res2.json();
  console.log(result);
  const categories = result;
  
  categories.forEach((category) => {
    // Créer un élément bouton
    const button = document.createElement("button");
    // Définir le texte du bouton avec le nom de la catégorie
    button.textContent = category.name;
    // Définir l'id du bouton avec l'id de la catégorie
    button.id = category.id;
    filter.appendChild(button);

    // Ajouter l'écouteur d'événement click
    button.addEventListener("click", function () {
      // Filtrer les travaux de la catégorie correspondante
      // Utiliser l'id de la catégorie plutôt que le nom
      let worksByCategory = allWorks.filter(
        (work) => work.category.id == category.id
      );
      // Afficher les travaux filtrés
      displayWorks(worksByCategory);
    });
  });
};
getCategories();

const displayWorks = (works) => {
  const gallery = document.querySelector(".gallery");
  console.log(gallery);
  console.log(works);
  // Vider la galerie avant d'afficher les travaux filtrés
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
  for (let work of works) {
    // Crée un élément figure
    let figure = document.createElement("figure");
    // Crée un élément img avec l'URL
    let img = document.createElement("img");
    img.src = work.imageUrl;
    // Crée un élément figcaption avec le titre
    let figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    // Ajoute l'élément img et figcaption à l'élément figure
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // Ajoute l'élément figure à l'élément gallery
    gallery.appendChild(figure);
  }
};

const buttonAll= document.querySelector("#All");
// Ajouter un écouteur d'événement click au bouton Tous
buttonAll.addEventListener("click", function () {
  // Afficher tous les travaux sans les filtrer
  displayWorks(allWorks);
});

const modification= document.querySelector('.open-modal');
modification.addEventListener("click", () => {
  // pour modifier la modale
  document.querySelector('.overlay').style.display = 'flex'
});

const close= document.querySelector('.fa-xmark');
close.addEventListener("click", () => {
  //fermeture de la modale
document.querySelector('.overlay').style.display = 'none'
});

fetch("http://localhost:5678/api/works/1", {
  method: "DELETE",
  headers: {
    accept: "*/*",
  },
})
  .then((response) => {
    // Traiter la réponse
    console.log(response);
  })
  .catch((error) => {
    // Gérer l'erreur
    console.error(error);
  });

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4",
      "Content-Type": "multipart/form-data",
    },
    body: new FormData(document.getElementById("form")),
  })
    .then((response) => {
      // Traiter la réponse
      console.log(response);
    })
    .catch((error) => {
      // Gérer l'erreur
      console.error(error);
    });





