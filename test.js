const preguntas = document.querySelectorAll("input");
const enviar = document.querySelector(".enviar");

const tarjetas = document.querySelectorAll(".card");
const titulos = document.querySelectorAll(".card-title");

const resultadoFinal = document.querySelector(".resultadoFinal");

const play1 = document.querySelector(".play1");
const play2 = document.querySelector(".play2");
const play3 = document.querySelector(".play3");
const play4 = document.querySelector(".play4");

const audio1 = document.querySelector(".audio1");
const audio2 = document.querySelector(".audio2");
const audio3 = document.querySelector(".audio3");
const audio4 = document.querySelector(".audio4");

const malo =
  "te vendría bien empezar con los fundamentos del lenguaje, desde un nivel básico, repasando los conceptos más importantes.";
const medio =
  "tenés una buena base! Ideal para reforzar tus conocimientos, deberías adelantar lo básico con un intensivo, o si te animás, saltar al intermedio.";
const bueno =
  "gran nivel! Quizás ya sepas conversar y escribir en inglés, sin duda es hora de profundizar el idioma y animarte a rendir los exámenes internacionales.";

const respuestas = [
  { pregunta1: "" },
  { pregunta2: "" },
  { pregunta3: "" },
  { pregunta4: "" },
  { pregunta5: "" },
  { pregunta6: "" },
  { pregunta7: "" },
  { pregunta8: "" },
  { pregunta9: "" },
  { pregunta10: "" },
  { pregunta11: "" },
  { pregunta12: "" },
];

const respuestasCorrectas = [
  "Parrot",
  "Who",
  "27",
  "software",
  "on",
  "Abogada",
  "opcion tres",
  "This",
  "Libros",
  "all",
  "friend's",
  "Vegetariana",
];

localStorage.setItem("respuestas", JSON.stringify(respuestas));

for (let index = 0; index < preguntas.length; index++) {
  preguntas[index].addEventListener("click", function (event) {
    //Si le ponia el preventDefault, no me tomaba el checked en el radioButton
    //event.preventDefault();
    let arr = JSON.parse(localStorage.getItem("respuestas"));
    for (let index = 0; index < arr.length; index++) {
      if (Object.keys(arr[index])[0] == event.target.name) {
        //console.log(event.target.value);
        arr[index][event.target.name] = event.target.value;
      }
    }
    localStorage.setItem("respuestas", JSON.stringify(arr));
  });
}

enviar.addEventListener("click", function (event) {
  event.preventDefault();
  funcionEnviar();
});

play1.addEventListener("click", function (event) {
  audio1.play();
});

play2.addEventListener("click", function (event) {
  audio2.play();
});

play3.addEventListener("click", function (event) {
  audio3.play();
});

play4.addEventListener("click", function (event) {
  audio4.play();
});

function funcionEnviar() {
  let arr = JSON.parse(localStorage.getItem("respuestas"));
  let arrValues = [];
  let vocabulario = 0;
  let listening = 0;
  let gramatica = 0;
  for (let index = 0; index < arr.length; index++) {
    arrValues.push(Object.values(arr[index])[0]);
  }
  for (let index = 0; index < respuestasCorrectas.length; index++) {
    if (arrValues[index] == "") {
      //console.log(`${index}: sin respuesta`);
      tarjetas[index].childNodes[3].className = "card-body sinRespuesta";
    } else if (respuestasCorrectas[index] == arrValues[index]) {
      //console.log(`${index}: correcta`);
      tarjetas[index].childNodes[3].className = "card-body correcta";
      if (index == 0 || index == 3 || index == 6 || index == 9) vocabulario++;
      else if (index == 1 || index == 4 || index == 7 || index == 10)
        gramatica++;
      else listening++;
    } else {
      //console.log(`${index}: incorrecta`);
      tarjetas[index].childNodes[3].className = "card-body incorrecta";
    }
    titulos[
      index
    ].innerHTML = `Respuesta correcta: ${respuestasCorrectas[index]}`;
  }
  let texto;
  puntaje = vocabulario + listening + gramatica;
  if (puntaje >= 9) texto = bueno;
  else if (puntaje >= 4) texto = medio;
  else texto = malo;
  resultadoFinal.innerHTML = `
    <h2> Tus resultados fueron los siguientes: </h2>
    <h5>Vocabulario: ${vocabulario}/4</h5>
    <h5>Gramática: ${gramatica}/4</h5>
    <h5>Listening: ${listening}/4</h5>
    <h5>Tu desempeño: ${texto}</h5>
  `;
  document.body.scrollTop = 200; // For Safari
  document.documentElement.scrollTop = 200;
}
