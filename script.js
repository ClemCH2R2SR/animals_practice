"use strict";

//creation classe Animal
class Animal {
    constructor (name, description, category, pictureLink) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.pictureLink = pictureLink;
    }
}

// 3 instanciation
const hippopotame = new Animal("Hippopotame", "c'est mignon, puis beaucoup moins en grandissant", "terrestre", "http://picsum.photos/id/200/100/100");
const anguille = new Animal("Anguille", "j'en ai jamais mangé", "aquatique", "http://picsum.photos/id/200/100/100");
const moustique = new Animal("Moustique", "truc qui pique", "volant", "http://picsum.photos/id/200/100/100");

//creation tableau pour l'acueil des animaux
let animalTab = [hippopotame, anguille, moustique];

//creation fonction affichage avec parametre un tableau
function displayAnimals(animalsArray)
{
    //creation de l'elements parent qui correspond donc à la div #animals
    let animalsElementParent = document.querySelector("#animals");
    //Nettoyage de l'element parent avant d'afficher les elements du nouveau tableau dedans
    animalsElementParent.innerHTML = "";
    //boucle pour afficher chaque animal du tableau
    animalsArray.forEach(animal =>{
        //creation element a rattacher
        const animalElement = document.createElement("div");
        //assignement d'une classe a l'element en fonction de sa categorie
        animalElement.classList.add("animal", `${animal.category}`);
        //generation du HTML pour l'affichage
        animalElement.innerHTML =`  <h2>${animal.name}</h2>
                                    <img src="${animal.pictureLink}" alt="${animal.name}">
                                    <p><strong>Description:</strong><br/> ${animal.description}</p>
                                    <p><strong>Catégorie:</strong><br/> ${animal.category}</p>`;
        
        //Attachement de chaque animalElement à l'element parent créé au debut de la fonction
        animalsElementParent.appendChild(animalElement);
    }); 
}



// fonction pour filtrer les animaux
function animalsFilter(event)
{   //empecher le formulaire de recharger la page totalement
    event.preventDefault();
    //prendre en compte la valeur du menu deroulant selectionner lors de l'écoute du formulaire
    let selectedCategory = document.querySelector("#categoryFilter").value;
    //ternaire qui selectionne le tableau si la valeure selectionné est tous, et filtre par rapport à la categorie selectionnée si une autre categories est selectionnée
    let animalFiltredTab = (selectedCategory === 'tous') ? animalTab : animalTab.filter(animal => animal.category === selectedCategory);
    //declecnche la fonction qui affiche les animaux avec le tableau filtré
    displayAnimals(animalFiltredTab);
}

// fonction pour ajouter un animal
function addAnimal(event) 
{
    //permet de ne pas declencher un reset de la page
    event.preventDefault();

    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let category = document.querySelector("#category").value;
    let pictureLink = document.querySelector("#pictureLink").value;

    let newAnimal = new Animal(name, description, category, pictureLink);

    // Ajouter le nouvel animal à la fin du tableau
    animalTab.push(newAnimal);

    // appel la fonction de sauvegarde convertir les objets en JSON et les stocker dans le LocalStorage
    saveArray();

    // appel de la fonction displayAnimals
    displayAnimals(animalTab);

    // Vidange du formulaire
    document.querySelector("#addAnimalForm").reset();

}

//fonction pour sauvegarder les données du tableau animalTab sous format JSON dans le LocalStorage
function saveArray() 
{
    // Utiliser JSON.stringify pour convertir le tableau en chaîne JSON
    let AnimalsJSON = JSON.stringify(animalTab);

    // Sauvegarder la chaîne JSON dans le localStorage
    localStorage.setItem("animals", AnimalsJSON);
}

// creation fonction pour charger les données stockées dans le LocalStorage en les parsant vers le format objet
function loadArray()
{
    // recuper les données stockées sous format JSON
    let animalsJSON = localStorage.getItem("animals");

    if (animalsJSON)
    {
        // parser les données = JSON --> Objets
        animalTab = JSON.parse(animalsJSON);
    } else {
        // charger les animaux de base
        animalTab = [hippopotame, anguille, moustique];
    }
}



//fonction principal abbrittant le processus de l'application
function main()
{
    //appel la fonction pour charger les données stockées dans le LocalStorage en les parsant vers le format objet 
    loadArray();
    //affichage du tableau initial
    displayAnimals(animalTab);
    //attribution à la variable du formulaire de filtrage
    let filter = document.querySelector("#filterForm");
    //declenchement de la fonction animalFilter lors de la soumission du formulaire
    filter.addEventListener("submit", animalsFilter);
    //attribution à la variable du formulaire d'ajout
    let addAnimalForm = document.querySelector("#addAnimalForm");
    //declenchement de la fonction addAnimal lors de la soumission du formulaire
    addAnimalForm.addEventListener("submit", addAnimal);
}



//declenchement de la fonction main lorsque le chargement complet de la page sera effectué
window.addEventListener('load', main);