/**
 * Dicionário de contatos (Tabela Hash).
 * Esta estrutura de dados garante uma complexidade computacional O(1)
 * na busca, evitando o uso de loops que gerariam complexidade O(n).
 * @constant {Object}
 */
const contatosDaEquipe = {
    "luiz": {
        nome: "Luiz Fernando",
        telefone: "(81) 99999-9999",
        email: "luizfernando@gmail.com",
        github: "#",
        instagram: "#",
        website: "#"
    },
    "joan": {
        nome: "Joan Antonio",
        telefone: "(81) 99999-9999",
        email: "joanjunior91@gmail.com",
        github: "https://github.com/JJzinho",
        instagram: "https://www.instagram.com/joan.junih?igsh=MWxvc3M1M3pqcWo1aQ==",
        website: "#"
    },
    "jonas": {
        nome: "Jonas Gabriel",
        telefone: "(81) 99999-9999",
        email: "jonasgabriel@gmail.com",
        github: "#",
        instagram: "#",
        website: "#"
    }
};

/**
 * Busca os dados de um membro da equipe com complexidade O(1).
 * O Princípio aplicado aqui foca em otimizar a estrutura de busca
 * para que o computador encontre o resultado instantaneamente,
 * independentemente do tamanho da equipe.
 * 
 * @param {string} nome - O primeiro nome do membro (ex: 'Luiz').
 * @returns {Object|null} Retorna o objeto contendo os dados do membro ou null se não encontrado.
 */
function buscarContato(nome) {
    // Transforma para minúsculo para a chave bater com a tabela hash
    const chave = nome.toLowerCase().trim();
    
    // Acesso direto em O(1) usando notação de colchetes no objeto
    const contato = contatosDaEquipe[chave];
    
    return contato ? contato : null;
}

/**
 * Renderiza dinamicamente o menu de navegação no cabeçalho.
 * Este método aplica o Princípio de Responsabilidade Única (Fazer apenas uma coisa)
 * e o Princípio DRY (Don't Repeat Yourself), permitindo que o HTML do menu exista 
 * apenas aqui e não copiado em 9 arquivos HTML diferentes.
 * 
 * @returns {void} Não retorna nenhum valor. Apenas injeta o HTML no DOM.
 */
function renderizarMenu() {
    const headerElement = document.getElementById("main-header");
    
    if (headerElement) {
        headerElement.innerHTML = `
            <div class="menu">
                <h2><a href="home.html">Home</a></h2>
                <h2><a href="sobre.html">Sobre</a></h2>
                <h2><a href="contato.html">Contatos</a></h2>
                <h2><a href="projetos.html">Projetos</a></h2>
                <h2><a href="case-de-sucesso.html">Case de Sucesso</a></h2>
                <h2><a href="habilidades.html">Habilidades</a></h2>
                <h2><a href="servicos.html">Serviços</a></h2>
                <h2><a href="depoimentos.html">Depoimentos</a></h2>
            </div>
        `;
    }
}

// Inicializa o menu quando o documento carregar
document.addEventListener("DOMContentLoaded", () => {
    renderizarMenu();

    // Lógica para a aba de contatos (Busca otimizada)
    const btnBuscar = document.getElementById("btnBuscarContato");
    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            const inputNome = document.getElementById("inputBuscaContato").value;
            const resultadoDiv = document.getElementById("resultadoBusca");
            
            // Complexidade O(1)
            const membro = buscarContato(inputNome);
            
            if (membro) {
                resultadoDiv.innerHTML = `
                    <div class="card" style="margin-top: 10px; border: 2px solid #4CAF50;">
                        <h2>${membro.nome} (Encontrado em O(1))</h2>
                        <p><strong>Telefone:</strong> ${membro.telefone}</p>
                        <p><strong>Email:</strong> ${membro.email}</p>
                    </div>
                `;
            } else {
                resultadoDiv.innerHTML = `<p style="color: red;">Membro não encontrado.</p>`;
            }
        });
    }
});
