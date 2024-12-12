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
function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
}



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
    .then(response => {if (!response.ok) { // Si la réponse n'est pas OK, afficher un message d'erreur 
      return response.json().then(data => {throw new Error(data.message || 'Erreur de connexion'); }); } 
      return response.json(); 
    })
    .then(data => {
        console.log(data)
        localStorage.token=data.token
        window.location.href = "./index.html";
    }) // Afficher les données reçues
    .catch(error => {
      const errorMessage = document.querySelector('.error')
      errorMessage.style.display = 'block'
    }); // Gérer les erreurs éventuelles

}