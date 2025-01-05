const filter = document.querySelector(".filter");
const contentInputFile = document.querySelector(".content-input-file");
let allWorks = [];
let categories = [];
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
  let categories = result;
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
      const allButton = document.querySelectorAll(".filter button");
      allButton.forEach((item) => {
        item.classList.remove("active");
      })
      button.classList.add("active");
      // Afficher les travaux filtrés
      displayWorks(worksByCategory);
    });
    // on ajoute au select les categories
    document.getElementById('category').innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}
getCategories();

const displayWorks = (works) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
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
// Ajouter un écouteur d'événement click au bouton 
buttonAll.addEventListener("click", function () {
  // Afficher tous les travaux sans les filtrer
  displayWorks(allWorks);
});

const modification= document.querySelector('.open-modal');
// Définir une fonction pour afficher les travaux dans la modale
const displayWorksInGallery = (works) => {
  // Sélectionner l'élément qui contient la gallery
  const gallery = document.querySelector(".overlay .content-gallery");
  
  // Vider la gallery avant d'afficher les projets
  gallery.innerHTML = "";
  // Parcourir le tableau des projets
  works.forEach((work) => {
    // Création élément div pour le projet
    console.log(work)
    const div = document.createElement("div");
    // Ajout de l'image du projet 
    div.innerHTML = `
        <span id="${work.id}" class="btn-delete">
          <i class="fa-solid fa-trash-can"></i>
        </span>
        <img src="${work.imageUrl}" alt="${work.title}">
    `;// Sélectionner tous les éléments i avec la classe fa-trash
    
    // Ajouter le div à la gallery
    gallery.appendChild(div);  
  });
};
modification.addEventListener("click", () => {
  // pour acceder à la modale
  document.querySelector('.overlay').style.display = 'flex'
displayWorksInGallery(allWorks);
const trashIcons = document.querySelectorAll(".btn-delete");
    // Ajouter un écouteur d'événement click sur chaque icône
    trashIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        deleteWork(icon.id);
      });
    });
});

const close= document.querySelector('.fa-xmark');
close.addEventListener("click", () => {
  //fermeture de la modale
document.querySelector('.overlay').style.display = 'none'
  contentInputFile.style.display = "block";
  imagePreview.src = "";
  imagePreview.classList.remove("active");
});
function removeWork(event) {
  // Récupérer l'id du travail à supprimer
  let workId = event.target.id;
  // Filtrer le tableau allWorks
  allWorks = allWorks.filter(work => work.id != workId);
  // Appeler la fonction displayWorks
  displayWorksInGallery(allWorks);
};

const buttonAdd = document.querySelector(".unlock-modal");
const modalAddPhoto = document.querySelector(".modal-add-photo");
const modalGallery = document.querySelector(".modal-gallery");
const buttonBack = document.querySelector(".fa-arrow-left");
const closeSecond = document.querySelector(".add-picture .fa-xmark");
// Ajouter un écouteur d'événement click sur l'élément
closeSecond.addEventListener("click", function () {
  document.querySelector('.overlay').style.display = 'none'
  contentInputFile.style.display = "block";
  imagePreview.src = "";
  imagePreview.classList.remove("active");

});

// Ajouter un click sur le bouton
buttonAdd.addEventListener("click", function () {
  
  modalAddPhoto.style.display = 'block'
  modalGallery.style.display = 'none'
});

buttonBack.addEventListener("click", function () {
  modalAddPhoto.style.display = 'none'
  modalGallery.style.display = 'block'
  contentInputFile.style.display = "block";
  imagePreview.src = "";
  imagePreview.classList.remove("active");
});

const deleteWork = (id) => {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization:
          `Bearer ${localStorage.token}`,
    },
  })
    .then((response) => {
      // Traiter la réponse
      console.log(response);
      if(response.status < 400){
        // supprimer la photo de allWorks
        allWorks = allWorks.filter((work) => work.id != id);
        displayWorks(allWorks);
        displayWorksInGallery(allWorks);
      } else {
        // redict à la page login
        alert('Vous devez vous connecter pour supprimer une photo')
        window.location.href = 'connexion.html'
      }
    })
    .catch((error) => {
      // Gérer l'erreur
      console.error(error);
    });
}
// Sélectionner les éléments de formulaire avec les id image, name et category
const imageInput = document.getElementById(".add-picture img");
const nameInput = document.getElementById(" .add-picture input");
const categoryInput = document.getElementById(".add-picture label");
const form = document.querySelector(".form-add");
// Sélectionner l'élément fa-image
const faImage = document.querySelector(".fa-regular.fa-image");

// Ajouter un écouteur d'événement click sur l'élément fa-image
faImage.addEventListener("click", showImage);

// Définir la fonction showImage
function showImage() {
  // Récupérer l'URL de l'image choisie dans le formulaire
  const url = document.getElementById("image").value;

  // Créer un nouvel élément img avec l'URL comme source
  const img = document.createElement("img");
  img.src = url;

  // Afficher l'image dans la page
  document.body.appendChild(img);
}
const addWork = () => {
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization:
      `Bearer ${localStorage.token}`,
    },
    body: new FormData(form),
  })
    .then((response) => {
      // Traiter la réponse
      console.log(response);
      // Convertir la réponse en JSON
      return response.json();
    })
    .then((data) => {
      // Récupérer le nouvel objet work
      const newWork = data;
      // Ajouter le nouvel objet au tableau allWorks
      allWorks.push(newWork);
      // Afficher les travaux dans la galerie
      displayWorks(allWorks);
      displayWorksInGallery(allWorks);
      closeModal()
    })
    .catch((error) => {
      // Gérer l'erreur
      console.error(error);
    });

};
const inputTitle = document.getElementById('title')
const selectCategory = document.getElementById('category')
// Sélectionner l'élément input de type file
const input = document.getElementById("image");

// Sélectionner l'élément img
const img = document.querySelector(".add-picture img");

// Ajouter un écouteur d'événement sur l'input
input.addEventListener("change", function() {
  validForm()
  // Récupérer le fichier choisi
  const file = this.files[0];

  // Vérifier que le fichier est bien une image
  if (file && file.type.match("image.*")) {
    // Créer une URL temporaire pour l'image
    const url = URL.createObjectURL(file);

    // Assigner l'URL à la propriété src de l'img
    img.src = url;
  }
}); 
inputTitle.addEventListener('input', function(){
  validForm()
})
function validForm() {
  console.log(inputTitle.value , selectCategory.value , input.files.length)
  const btnValidate = document.querySelector('.btn-validate')
  if (inputTitle.value !== '' && input.files.length > 0){
    btnValidate.removeAttribute('disabled')
  } else {
    btnValidate.setAttribute('disabled',true)
  }
}
// Sélectionner l'élément modal-add-photo
const modal = document.querySelector(".modal-add-photo");

// Sélectionner l'élément add-picture
const picture = document.querySelector(".add-picture");

// Sélectionner l'élément img dans la modale
const modalImg = document.querySelector(".modal-add-photo img");

// Ajouter un écouteur d'événement sur l'élément picture
picture.addEventListener("click", function() {
  // Copier l'URL de l'image dans la modale
  modalImg.src = img.src;
});

// Ajouter un écouteur d'événement submit sur le formulaire
form.addEventListener("submit", function(event) {
  // Empêcher le comportement par défaut du formulaire
  event.preventDefault();
  // Appeler la fonction addWork
  addWork();
});

//fonction qui retourne 'true' si l'utilisateur est connecté
console.log(localStorage.token);
if (localStorage.token) {
  // cacher les filtres
  filter.style.display = 'none';
  // Affiche la barre
  document.querySelector('.bar-side').style.display = 'block';
  document.querySelector('.log').innerHTML = 'Déconnexion';
  document.querySelector('.log').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'connexion.html';

    // Affiche l'icône et le bouton "modifier" 
    document.querySelector('.icon-edit').style.display = 'inline'; 
    document.querySelector('.open-modal').style.display = 'inline';
  });
} else {
  // Cache la barre
  document.querySelector('.bar-side').style.display = 'none';
  // Cache l'icône et le bouton "modifier" 
  document.querySelector('.icon-edit').style.display = 'none'; 
  document.querySelector('.open-modal').style.display = 'none'
}

const inputImage = document.getElementById("image");
const preview = document.querySelector(".preview");
const imagePreview = preview.querySelector("img");
inputImage.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      imagePreview.setAttribute("src", reader.result);
      imagePreview.classList.add("active");
    });
    contentInputFile.style.display = "none";
    reader.readAsDataURL(file);
  }
});
function closeModal() {
  document.querySelector('.overlay').style.display = 'none'
  contentInputFile.style.display = "block";
  imagePreview.src = "";
  imagePreview.classList.remove("active");
  input.value = ''
  inputTitle.value = ''
  const btnValidate = document.querySelector('.btn-validate')
  btnValidate.setAttribute('disabled',)
}
