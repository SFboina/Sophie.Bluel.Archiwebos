const emailHtml=document.querySelector("form #email");
const passwordHtml=document.querySelector("form #password");
const form=document.querySelector("form")
// Ajouter un écouteur d'événement sur la soumission du formulaire
form.addEventListener("submit", function(event) {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();
  login()
    // Récupérer le formulaire
    console.log(form);
  
    // Faire d'autres traitements avec le formulaire
  });
const errorMessage=document.querySelector(".login p");



// Créer un objet JSON avec l'email et le mot de passe de l'utilisateur
  function login(){
    const valueEmail = emailHtml.value
    console.log(valueEmail)

    const valuePassword = passwordHtml.value
    console.log(valuePassword)
    const user = {
        email: valueEmail,
        password: valuePassword
      };
  // Envoyer une requête HTTP de type POST à l'URL du serveur, avec l'objet JSON comme corps de la requête
 fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        console.log(data)
        localStorage.token=token.data
    }) // Afficher les données reçues
    .catch(error => console.error(error)); // Gérer les erreurs éventuelles

}