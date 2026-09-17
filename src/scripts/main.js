/**
 * main.js - Script principal do portfólio Squad A.
 * 
 * Este módulo centraliza toda a lógica JavaScript do projeto,
 * aplicando os seguintes princípios de engenharia de software:
 * 
 * 1. Clean Code (Uncle Bob): Nomes descritivos, funções pequenas
 *    com responsabilidade única e princípio DRY.
 * 2. Complexidade Computacional: Uso de Tabela Hash (Objeto JS)
 *    para busca em O(1) em vez de loops O(n).
 * 3. Docstrings (JSDoc): Toda função possui documentação formal
 *    descrevendo o que faz, seus parâmetros e retorno.
 */

/**
 * Dicionário de contatos da equipe (Tabela Hash).
 * 
 * Estrutura de dados escolhida por garantir complexidade O(1) na busca,
 * evitando loops (for/while) que teriam complexidade O(n).
 * Mesmo que a equipe cresça para centenas de membros, o tempo de busca
 * permanece constante.
 * 
 * @constant {Object.<string, {nome: string, telefone: string, email: string, github: string, instagram: string, website: string}>}
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
 * Busca os dados de um membro da equipe pelo primeiro nome.
 * 
 * Utiliza acesso direto por chave no objeto (Tabela Hash),
 * garantindo complexidade O(1) — tempo constante —
 * independentemente do tamanho da equipe.
 * 
 * @param {string} nome - O primeiro nome do membro a buscar (ex: "Luiz").
 * @returns {Object|null} O objeto com os dados do membro, ou null se não encontrado.
 */
function buscarContato(nome) {
    const chave = nome.toLowerCase().trim();
    const contato = contatosDaEquipe[chave];

    return contato || null;
}

/**
 * Renderiza dinamicamente o menu de navegação no cabeçalho da página.
 * 
 * Aplica o Princípio DRY (Don't Repeat Yourself): o HTML do menu
 * é definido apenas aqui, em vez de ser copiado manualmente
 * em cada um dos 8 arquivos HTML do projeto.
 * 
 * Aplica também o Princípio de Responsabilidade Única:
 * esta função faz apenas UMA coisa — injetar o menu no DOM.
 * 
 * @returns {void} Não retorna valor. Injeta HTML no elemento com id "main-header".
 */
function renderizarMenu() {
    const headerElement = document.getElementById("main-header");

    if (!headerElement) {
        return;
    }

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

/**
 * Inicializa todos os componentes da página quando o DOM estiver pronto.
 * 
 * Responsabilidade Única: esta função apenas orquestra a inicialização,
 * delegando cada tarefa para sua respectiva função especializada.
 * 
 * @returns {void}
 */
function inicializarPagina() {
    injetarChatIA();
    renderizarMenu();
}

// Aguarda o carregamento completo do DOM antes de inicializar
document.addEventListener("DOMContentLoaded", inicializarPagina);

/**
 * Injeta o widget de Chat com IA na página.
 * 
 * Cria um botão flutuante e uma janela de chat.
 * A lógica de envio se comunica com o backend Node.js (Render/Local).
 */
function injetarChatIA() {
    const chatHtml = `
        <div id="chat-widget-btn" class="chat-widget-btn">💬</div>
        <div id="chat-window" class="chat-window">
            <div class="chat-header">
                <span>IA Assistente - Squad A</span>
                <button id="chat-close-btn" class="chat-close-btn">&times;</button>
            </div>
            <div id="chat-messages" class="chat-messages">
                <div class="chat-msg ai">Olá! Sou a inteligência artificial da Squad A. Como posso te ajudar hoje?</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Digite sua dúvida...">
                <button id="chat-send-btn">➤</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHtml);
    
    const chatBtn = document.getElementById('chat-widget-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close-btn');
    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    // Alternar janela
    chatBtn.addEventListener('click', () => chatWindow.classList.add('open'));
    closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

    // Enviar mensagem
    const enviarMensagem = async () => {
        const msg = input.value.trim();
        if (!msg) return;

        // Adiciona mensagem do usuário
        messages.insertAdjacentHTML('beforeend', `<div class="chat-msg user">${msg}</div>`);
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Adiciona indicador de "digitando..."
        const typingId = 'typing-' + Date.now();
        messages.insertAdjacentHTML('beforeend', `<div id="${typingId}" class="chat-msg ai">Digitando...</div>`);
        messages.scrollTop = messages.scrollHeight;

        try {
            // URL do backend (ajusta automaticamente no ambiente local/render)
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:3000/api/chat' 
                : '/api/chat';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });

            const data = await response.json();
            document.getElementById(typingId).remove();

            if (data.success) {
                messages.insertAdjacentHTML('beforeend', `<div class="chat-msg ai">${data.data.reply}</div>`);
            } else {
                messages.insertAdjacentHTML('beforeend', `<div class="chat-msg ai" style="color: red;">Erro: ${data.error}</div>`);
            }
        } catch (error) {
            document.getElementById(typingId).remove();
            messages.insertAdjacentHTML('beforeend', `<div class="chat-msg ai" style="color: red;">Erro de conexão com o servidor.</div>`);
        }
        
        messages.scrollTop = messages.scrollHeight;
    };

    sendBtn.addEventListener('click', enviarMensagem);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });
}
