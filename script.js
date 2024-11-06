// Lista de países da SADC em inglês e seus respectivos nomes em português
const countriesSADC = {
    "South Africa": "África do Sul",
    "Angola": "Angola",
    "Botswana": "Botsuana",
    "Lesotho": "Lesoto",
    "Malawi": "Malawi",
    "Mauritius": "Maurício",
    "Mozambique": "Moçambique",
    "Namibia": "Namíbia",
    "Democratic Republic of the Congo": "República Democrática do Congo",
    "Seychelles": "Seicheles",
    "Eswatini": "Suazilândia",
    "Tanzania": "Tanzânia",
    "Zambia": "Zâmbia",
    "Zimbabwe": "Zimbábue"
};

let correctCountry;
let options = [];
let score = 0;

// Função para buscar os países da SADC
function getRandomCountries() {
    fetch("https://restcountries.com/v3.1/region/africa")
        .then(response => response.json())
        .then(data => {
            // Filtra os países da SADC
            const filteredCountries = data.filter(country => countriesSADC.hasOwnProperty(country.name.common));
            if (filteredCountries.length === 0) {
                alert("Erro: Não foi possível carregar os países da SADC.");
                return;
            }

            // Escolhe um país aleatório da SADC
            const randomIndex = Math.floor(Math.random() * filteredCountries.length);
            correctCountry = filteredCountries[randomIndex];
            options = [correctCountry];

            // Adiciona 3 países aleatórios
            while (options.length < 4) {
                const randomOption = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            // Embaralha as opções
            options.sort(() => Math.random() - 0.5);
            displayQuestion();
        })
        .catch(error => console.error("Erro ao carregar dados:", error));
}

// Exibe a questão com a bandeira e opções de resposta
function displayQuestion() {
    // Exibe a bandeira do país correto
    document.getElementById("flagImage").src = correctCountry.flags.png;
    document.getElementById("flagImage").style.display = "block";
    
    // Limpa as opções anteriores
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    // Cria os botões de opções
    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = countriesSADC[option.name.common]; // Nome em português
        button.classList.add("btn", "btn-light", "btn-option");
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

// Verifica se a resposta está correta
function checkAnswer(selected) {
    const resultDiv = document.getElementById("result");

    // Verifica se a resposta é correta
    if (selected.name.common === correctCountry.name.common) {
        resultDiv.innerHTML = "<p style='color: green;'>Correto!</p>";
        score++;
    } else {
        resultDiv.innerHTML = `<p>Incorreto! O país correto era: ${countriesSADC[correctCountry.name.common]}</p>`;
    }

    // Atualiza o contador
    document.getElementById("contador").innerText = `Acertos: ${score}`;

    // Desabilita os botões de resposta
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => button.disabled = true);

    // Exibe o botão de próximo
    document.getElementById("nextButton").style.display = "block";
}

// Carrega uma nova pergunta ao clicar no botão "Próximo"
document.getElementById("nextButton").onclick = () => {
    document.getElementById("result").innerHTML = ""; // Limpa a resposta
    document.getElementById("nextButton").style.display = "none"; // Esconde o botão "Próximo"
    getRandomCountries(); // Carrega uma nova bandeira
};

// Função para reiniciar o jogo
function reset() {
    score = 0;
    document.getElementById("contador").innerText = `Acertos: ${score}`;
    getRandomCountries();
}

// Inicia o jogo ao carregar a página
getRandomCountries();
