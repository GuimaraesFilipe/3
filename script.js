let currentPageURL = 'https://swapi.dev/api/people/'


window.onload = async () => {
    try {
        await loadCharacter(currentPageURL);
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carregar cards')
    }
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);

};

async function loadCharacter(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';// limpar os resultados anteriores 

    try {
        const response = await fetch(url);
        const reponseJson = await response.json();

        reponseJson.results.forEach(character => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, '')}.jpg')`
            card.className = 'cards';

            const characterNameBg = document.createElement("div");
            characterNameBg.className = 'character-name-bg';

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            characterNameBg.appendChild(characterName);
            card.appendChild(characterNameBg);

            card.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible';


                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';
                const characterimage = document.createElement("div");
                characterimage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, '')}.jpg')`
                characterimage.className = 'character-image'

                const name = document.createElement("span");
                name.className = 'character-details'
                name.innerText = `Name: ${character.name}`

                const height = document.createElement("span");
                height.className = 'character-details'
                height.innerText = `Altura: ${convertHeight(character.height)}`


                const mass = document.createElement("span");
                mass.className = 'character-details'
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span");
                eyeColor.className = 'character-details'
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`


                const birthYear = document.createElement("span");
                birthYear.className = 'character-details'
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterimage);
                modalContent.appendChild(name);
                modalContent.appendChild(height);
                modalContent.appendChild(mass);
                modalContent.appendChild(eyeColor);
                modalContent.appendChild(birthYear);



            }


            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !reponseJson.next;
        nextButton.style.visibility = reponseJson.next ? 'visible' : 'hidden';
        backButton.disabled = !reponseJson.previous;
        console.log(nextButton.disable)
        backButton.style.visibility = reponseJson.previous ? 'visible' : 'hidden';
        currentPageURL = url;
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carregar personagens')
    }

}

async function loadNextPage() {
    console.log('called')
    if (!currentPageURL) {
        return;
    }
    try {
        const response = await fetch(currentPageURL);
        const reponseJson = await response.json();

        await loadCharacter(reponseJson.next);
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carregar a proxima pagina')
    }

}

async function loadPreviousPage() {
    if (!currentPageURL) {
        return;
    }
    try {
        const response = await fetch(currentPageURL);
        const reponseJson = await response.json();

        await loadCharacter(reponseJson.previous);
    }
    catch (error) {
        console.log(error);
        alert('Erro ao carregar a pagina anterior')
    }

}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.visibility = 'hidden'
}



function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida";
    }

    return (height / 100).toFixed(2);
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido";
    }

    return `${mass} kg`;
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido";
    }

    return birthYear;
}