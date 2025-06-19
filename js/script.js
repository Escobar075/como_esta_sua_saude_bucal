const perguntas = [
  "Você escova os seus dentes pelo menos 3 vezes ao dia?",
  "Você escova a sua língua diariamente?",
  "Você usa fio dental diariamente?",
  "Quando você escova os dentes ou usa fio dental a sua gengiva sangra?",
  "Você tem mau hálito?",
  "Você já sentiu dor no dente?",
  "Quando você come alimentos gelados ou doces apresenta sensibilidade nos dentes?",
  "Sua escova dental é macia?",
  "Você usa antisséptico bucal periodicamente?",
  "Você tem algum dente cariado?",
  "Seus dentes estão manchados?",
  "Você come ou bebe com frequência alimentos escuros, tipo vinho tinto, refrigerante, ketchup, açaí, café, etc?",
  "Você é fumante?",
  "Você consome bebida alcoólica com frequência?",
  "Você range ou aperta os dentes?",
  "Você utiliza os dentes para cortar linha ou durex, abrir garrafa ou outras tampas ou grampos, quebrar casquinha de caranguejo ou castanha?",
  "Você consome muitos alimentos açucarados?",
  "Você já extraiu algum dente permanente?",
  "Você já fraturou algum dente?",
  "Você vai ao dentista periodicamente (6 em 6 meses aproximadamente)?"
];

const respostasPositivas = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10,11,12,13,14,15,16,17,18,19
];

// Para cada pergunta, definimos se a resposta "sim" ou "não" é positiva (saudável)
function respostaEhPositiva(index, resposta) {
  const saudavelSim = [0,1,2,7,8,19];
  const saudavelNao = [3,4,5,6,9,10,11,12,13,14,15,16,17,18];

  if (saudavelSim.includes(index) && resposta === 'sim') return true;
  if (saudavelNao.includes(index) && resposta === 'nao') return true;
  return false;
}

// Elementos do DOM
const startBtn = document.getElementById("startBtn");
const quizContainer = document.getElementById("quizContainer");
const questionText = document.getElementById("questionText");
const answerBtns = document.querySelectorAll(".answerBtn");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");

let perguntaAtual = 0;
let pontuacao = 0;

// Iniciar quiz
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  document.getElementById("creditos").classList.remove("hidden");
  mostrarPergunta();
});

// Mostrar pergunta atual
function mostrarPergunta() {
  if (perguntaAtual < perguntas.length) {
    questionText.textContent = `${perguntaAtual + 1}) ${perguntas[perguntaAtual]}`;
  } else {
    mostrarResultado();
  }
}

// Clique em Sim ou Não
answerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const resposta = btn.getAttribute("data-answer");

    if (respostaEhPositiva(perguntaAtual, resposta)) {
      pontuacao++;
    }

    perguntaAtual++;
    mostrarPergunta();
  });
});

// Mostrar resultado ao final
function mostrarResultado() {
  quizContainer.classList.add("hidden");
  result.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  document.getElementById("imagemContato").classList.remove("hidden");
  document.getElementById("creditos").classList.add("hidden");


  let mensagem = "";
  result.className = ""; // Limpa classes antigas
  result.classList.add("result"); // base

  if (pontuacao <= 10) {
    mensagem = "😬 Sua saúde bucal pode estar muito prejudicada. Compareça imediatamente ao nosso consultório!";
    result.classList.add("ruim");
  } else if (pontuacao <= 15) {
    mensagem = "😐 Sua saúde bucal está razoável. Nos visite em breve para avaliarmos melhor!";
    result.classList.add("razoavel");
  } else {
    mensagem = "😄 Parabéns! Sua saúde bucal parece estar ótima. Continue cuidando e nos visite periodicamente.";
    result.classList.add("bom");
  }

  result.textContent = mensagem;
}

// Reiniciar quiz
restartBtn.addEventListener("click", () => {
  perguntaAtual = 0;
  pontuacao = 0;
  result.classList.add("hidden");
  restartBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  document.getElementById("imagemContato").classList.add("hidden");
  document.getElementById("creditos").classList.remove("hidden");
  mostrarPergunta();
});
