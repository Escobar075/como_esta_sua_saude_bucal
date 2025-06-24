const perguntasPorIdioma = {
  pt: [
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
  ],
  en: [
    "Do you brush your teeth at least 3 times a day?",
    "Do you brush your tongue daily?",
    "Do you use dental floss daily?",
    "Does your gum bleed when you brush your teeth or use floss?",
    "Do you have bad breath?",
    "Have you ever had a toothache?",
    "Do you feel sensitivity in your teeth when eating cold or sweet foods?",
    "Is your toothbrush soft?",
    "Do you use mouthwash regularly?",
    "Do you have any decayed teeth?",
    "Are your teeth stained?",
    "Do you frequently eat or drink dark-colored items like red wine, soda, ketchup, açaí, coffee, etc?",
    "Are you a smoker?",
    "Do you frequently consume alcoholic beverages?",
    "Do you grind or clench your teeth?",
    "Do you use your teeth to cut thread or tape, open bottles, or crack nuts or shells?",
    "Do you eat a lot of sugary foods?",
    "Have you had any permanent teeth extracted?",
    "Have you ever fractured a tooth?",
    "Do you visit the dentist regularly (every 6 months approximately)?"
  ]
};

const traducoes = {
  pt: {
    titulo: "Como está sua saúde bucal?",
    iniciar: "Vamos começar?",
    sim: "Sim",
    nao: "Não",
    recomeçar: "Recomeçar",
    creditos: "– Por Dra. Jorgea M. Picanço Monteiro",
    resultado_bom: "😄 Parabéns! Sua saúde bucal parece estar ótima. Continue cuidando e nos visite periodicamente.",
    resultado_razoavel: "😐 Sua saúde bucal está razoável. Nos visite em breve para avaliarmos melhor!",
    resultado_ruim: "😬 Sua saúde bucal pode estar muito prejudicada. Compareça imediatamente ao nosso consultório!"
  },
  en: {
    titulo: "How is your oral health?",
    iniciar: "Let's start?",
    sim: "Yes",
    nao: "No",
    recomeçar: "Restart",
    creditos: "– By Dr. Jorgea M. Picanço Monteiro",
    resultado_bom: "😄 Congratulations! Your oral health seems great. Keep taking care and visit us regularly.",
    resultado_razoavel: "😐 Your oral health is reasonable. Visit us soon for a proper evaluation!",
    resultado_ruim: "😬 Your oral health might be in poor condition. Please visit our office as soon as possible!"
  }
};

let idiomaAtual = "pt";
let perguntas = perguntasPorIdioma[idiomaAtual]; // inicializa

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
const progressBarContainer = document.getElementById("progressBarContainer");
const progressBar = document.getElementById("progressBar");

let perguntaAtual = 0;
let pontuacao = 0;

// Iniciar quiz
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  document.getElementById("creditos").classList.remove("hidden");
  progressBarContainer.classList.remove("hidden");
  atualizarBarraProgresso();
  mostrarPergunta();
});

// Mostrar pergunta atual
function mostrarPergunta() {
  if (perguntaAtual < perguntas.length) {
    // Remove animação anterior
    questionText.classList.remove("show");
    void questionText.offsetWidth; // força reflow para reiniciar a animação

    // Define novo texto
    questionText.textContent = `${perguntaAtual + 1}) ${perguntas[perguntaAtual]}`;

    // Aplica animação
    questionText.classList.add("fade-slide", "show");
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
    atualizarBarraProgresso();
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
  result.className = "";
  result.classList.add("result");

  const t = traducoes[idiomaAtual];

  if (pontuacao <= 10) {
    mensagem = t.resultado_ruim;
    result.classList.add("ruim");
  } else if (pontuacao <= 15) {
    mensagem = t.resultado_razoavel;
    result.classList.add("razoavel");
  } else {
    mensagem = t.resultado_bom;
    result.classList.add("bom");
  }

  result.textContent = mensagem;
  progressBarContainer.classList.add("hidden");
}

function setAnswerButtonsEnabled(enabled) {
  answerBtns.forEach(btn => {
    btn.disabled = !enabled;
  });
}

function atualizarBarraProgresso() {
  const progresso = (perguntaAtual / perguntas.length) * 100;
  progressBar.style.width = `${progresso}%`;
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
  progressBarContainer.classList.remove("hidden");
  atualizarBarraProgresso();
});

const langDropdown = document.querySelector(".lang-dropdown");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const ptBtn = document.getElementById("ptBtn");
const enBtn = document.getElementById("enBtn");

hamburgerIcon.addEventListener("click", () => {
  langDropdown.classList.toggle("hidden");
});

ptBtn.addEventListener("click", () => {
  trocarIdioma("pt");
  langDropdown.classList.add("hidden");
});

enBtn.addEventListener("click", () => {
  trocarIdioma("en");
  langDropdown.classList.add("hidden");
});

function trocarIdioma(idioma) {
  const t = traducoes[idioma];
  idiomaAtual = idioma;
  perguntas = perguntasPorIdioma[idioma];
  mostrarPergunta();
  document.querySelector("h1").textContent = t.titulo;
  document.getElementById("startBtn").textContent = t.iniciar;
  document.querySelector('[data-answer="sim"]').textContent = t.sim;
  document.querySelector('[data-answer="nao"]').textContent = t.nao;
  document.getElementById("restartBtn").textContent = t.recomeçar;
  document.getElementById("creditos").textContent = t.creditos;
}

document.addEventListener("click", (e) => {
  const isClickInsideMenu = langDropdown.contains(e.target) || hamburgerIcon.contains(e.target);
  if (!isClickInsideMenu) {
    langDropdown.classList.add("hidden");
  }
});
