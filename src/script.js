import { HUGGINGFACE_API_TOKEN } from "./token.js";

const buttonMode = document.querySelector(".colorMode");
const iconMode = document.querySelector(".colorMode i");
const promptBtn = document.getElementById("promptBtn");
const promptUser = document.getElementById("messageUser");
const modelSelect = document.getElementById("modelSelect");
const countSelect = document.getElementById("countSelect");
const ratioSelect = document.getElementById("ratioSelect");
const generateBtn = document.getElementById("generateBtn");

const API_KEY = HUGGINGFACE_API_TOKEN;


const gridGallery = document.querySelector(".container-images");
const exemplePrompts = [
  "Uma floresta mágica com plantas brilhantes e casas de fadas entre cogumelos gigantes",
  "Um antigo dirigível steampunk flutuando por entre nuvens douradas ao pôr do sol",
  "Uma futura colônia em Marte com cúpulas de vidro e jardins diante de montanhas vermelhas",
  "Um dragão dormindo sobre moedas de ouro em uma caverna de cristal",
  "Um reino subaquático com seres marinhos e construções de corais brilhantes",
  "Uma ilha flutuante com cachoeiras caindo nas nuvens abaixo",
  "A cabana de uma bruxa no outono, com ervas mágicas no jardim",
  "Um robô pintando em um estúdio ensolarado com materiais de arte ao redor",
  "Uma biblioteca mágica com livros brilhantes flutuando e escadas em espiral",
  "Um santuário japonês durante a temporada de flores de cerejeira, com lanternas e montanhas enevoadas",
  "Uma praia cósmica com areia brilhante e uma aurora no céu noturno",
  "Um mercado medieval com tendas coloridas e artistas de rua",
  "Uma cidade cyberpunk com letreiros de néon e carros voadores à noite",
  "Uma floresta de bambu tranquila com um antigo templo escondido",
  "Uma tartaruga gigante carregando uma vila nas costas no oceano",
];

//fim variaveis

//funções de tema
buttonMode.addEventListener("click", () => {
  if (iconMode.classList.contains("fa-moon")) {
    iconMode.classList.remove("fa-moon");
    iconMode.classList.add("fa-sun");
    darkMode();
  } else {
    iconMode.classList.remove("fa-sun");
    iconMode.classList.add("fa-moon");
    lightMode();
  }
});
function darkMode() {
  document.body.style.backgroundColor = "var(--dark-background)";
  document.querySelector(".containerIaGenerator").style.backgroundColor =
    "var(--dark)";
  document.querySelector("h1").style.color = "var(--light)";
  document.querySelector(".messageUserDiv").style.backgroundColor =
    "var(--dark-background)";
  document.querySelector(".messageUserDiv textarea").style.color = "#fff";
  document.querySelectorAll(".selectorsGenerator select").forEach((el) => {
    el.style.backgroundColor = "var(--dark-background)";
    el.style.color = "#fff";
  });
  document.querySelectorAll(".selectorsGenerator option").forEach((el) => {
    el.style.backgroundColor = "var(--dark-background)";
  });
  document.querySelectorAll(".images").forEach((el) => {
    el.style.backgroundColor = "var(--dark-background)";
  });
}
function lightMode() {
  document.body.style.backgroundColor = "var(--light-background)";
  document.querySelector(".containerIaGenerator").style.backgroundColor =
    "var(--light)";
  document.querySelector("h1").style.color = "black";
  document.querySelector(".messageUserDiv").style.backgroundColor =
    "var(--light-background)";
  document.querySelector(".messageUserDiv textarea").style.color = "#000";
  document.querySelectorAll(".selectorsGenerator select").forEach((el) => {
    el.style.backgroundColor = "var(--light-background)";
    el.style.color = "#000";
  });
  document.querySelectorAll(".selectorsGenerator option").forEach((el) => {
    el.style.backgroundColor = "#fff";
  });
  document.querySelectorAll(".images").forEach((el) => {
    el.style.backgroundColor = "var(--light-background)";
  });
}
const getImageDimesions = (aspectRatio, baseSize = 512) => {
  
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculateWidht = Math.round(width * scaleFactor);
  let calculateHeight = Math.round(height * scaleFactor);

  calculateWidht = Math.floor(calculateWidht / 16) * 16;
  calculateHeight = Math.floor(calculateHeight / 16) * 16;

  return { width: calculateWidht, height: calculateHeight };
};

const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
  const MODEL_URL = `https://api-inference.huggingface.co/models/${selectedModel}`;
  const { width, height } = getImageDimesions(aspectRatio);

  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: promptText,
          parameters: { width, height },
          options: { wait_for_model: true }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);

      const imgCard = document.getElementById(`img-card-${i}`);
      imgCard.innerHTML = `<img src="${imgUrl}" alt="Imagem gerada por IA">`;

    } catch (error) {
      console.error("Erro na geração da imagem:", error);
    }
  });

  await Promise.allSettled(imagePromises);
};

// criando os cards de imagem e esperas
const createImageCards = (
  selectedModel,
  imageCount,
  aspectRatio,
  promptText
) => {
  gridGallery.innerHTML = "";
  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `
     <div class="images" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
              <div class="loader"></div>
              </div>
    `;
  }
  generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

//preeche o prompt do usuário com exemplo aleatório
promptBtn.addEventListener("click", () => {
  const prompt =
    exemplePrompts[Math.floor(Math.random() * exemplePrompts.length)];
  promptUser.value = prompt;
  promptUser.focus();
});

const handleFormSubmit = () => {
  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptUser.value.trim();

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

generateBtn.addEventListener("click", handleFormSubmit);
