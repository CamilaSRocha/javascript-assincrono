const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags")
const listaTags = document.getElementById("lista-tags")

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover)
    }
})

const tagsDisponiveis = ["Front-end", "Back-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)    
   }) 
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const novaTag = document.createElement("li");
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(novaTag);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag.");
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})

document.getElementById('imageUpload').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
    }
})
