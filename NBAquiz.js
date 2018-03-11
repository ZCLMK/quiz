const q1 = {
  intitule : "Qui est le meilleur scoreur dans l'histoire de la NBA (moyenne en carrière)?",
  propositions: ["Wilt Chamberlain", "Michael Jordan", "Elgin Baylor", "Lebron James"],
  bonneReponse: 1
}
const q2 = {
  intitule : "Quelle équipe NBA fut sacrée championne lors de la saison 2016-2017?",
  propositions: ["Cleveland Cavaliers", "Oklahoma Thunder", "Boston Celtics", "Golden State Warriors"],
  bonneReponse: 3
}
const q3 = {
  intitule : "Quel joueur a fini meilleur passeur de la NBA en 2016-17?",
  propositions: ["John Wall", "Rajon Rondo", "James Harden", "Russel Westbrook"],
  bonneReponse: 2
}
//Variables -------------------------
let current = 0;
let questions = [q1,q2,q3]
let bonneReponses = [q1.bonneReponse, q2.bonneReponse, q3.bonneReponse]
let reponses = []
const titreElt = document.getElementById("titre")
const quiz = document.getElementById('quiz')
const choix= document.getElementById('choix')
let check = document.getElementsByName('check')
let highlighted = false
//------------------------------------
quiz.addEventListener('submit', declencher)


function remplir(){

	if(current < questions.length){
	var questionActuelle = questions[current]
	var nbrChoix = questionActuelle.propositions.length
	titreElt.textContent= questionActuelle.intitule
	choix.innerHTML = ""
	for(var i = 0; i < nbrChoix; i++){
  	var divElt = document.createElement('div')
      divElt.classList.add("boxChoix")
    	divElt.classList.add(String(i))
		var pElt = document.createElement('p')
		pElt.innerHTML = `<input type="radio" name="check" class ="check" id=${String(i)}>
						<label for=${String(i)}>${questionActuelle.propositions[i]}</label>`
    divElt.appendChild(pElt)
    divElt.addEventListener('click', checkRightBox)
    choix.appendChild(divElt)

    document.getElementById('submit').classList.remove("noAnswer")
			}
		}
	}

function checkRightBox(e){
console.log(e.target.classList[1])
var boxIndex = String(e.target.classList[1])
let justChecked = document.getElementById(boxIndex)
justChecked.checked = true

}
function declencher(e){

// si une réponse a bien été selectionnée
			var coche = 0
		for(var i = 0; i < check.length; i++){
				if(check[i].checked == true){
					coche ++
					reponses.push(check[i].id)
					break
				}
			}

		 if(current == 0 || coche !== 0 ){

			remplir()
			current += 1;
//si pas aucune case n'est cochée
		}else if(coche == 0){

	document.getElementById('submit').classList.add('noAnswer')
		// var noChoiceMsg = "Veuillez choisir une réponse."
		// var pElt = document.createElement('p')
		// pElt.classList.add("error")
		// pElt.textContent = ""
		// pElt.textContent = noChoiceMsg
		// choix.appendChild(pElt)

	}
// appelle score() lorsque la dernière réponse est validée
	if(current > questions.length){

		score()
	}
	e.preventDefault();
}

function score(){
//EFFACER CONTENU
choix.innerHTML = ""
// CALCUL DU SCORE
	var points = 0;

	for(var i = 0; i < bonneReponses.length; i++){
		if(reponses[i] == bonneReponses[i]){
			points ++
		}
	}
	var pointsPCT = ` ${(points / questions.length) * 100}%`
// AFFICHAGE DU SCORE

	var scoreBox = document.createElement('p')
	scoreBox.innerHTML = `Score: ${points}/${questions.length}(${pointsPCT})`
	choix.appendChild(scoreBox)
}
