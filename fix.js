const fs = require('fs');

const jsPath = 'src/scripts/main.js';
let content = fs.readFileSync(jsPath, 'utf8');

const injectedJS = `
/**
 * Injeta o widget de Chat com IA na página.
 * 
 * Cria um botão flutuante e uma janela de chat.
 * A lógica de envio se comunica com o backend Node.js (Render/Local).
 */
function injetarChatIA() {
    const chatHtml = \`
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
    \`;
    
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
        messages.insertAdjacentHTML('beforeend', \`<div class="chat-msg user">\${msg}</div>\`);
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Adiciona indicador de "digitando..."
        const typingId = 'typing-' + Date.now();
        messages.insertAdjacentHTML('beforeend', \`<div id="\${typingId}" class="chat-msg ai">Digitando...</div>\`);
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
                messages.insertAdjacentHTML('beforeend', \`<div class="chat-msg ai">\${data.data.reply}</div>\`);
            } else {
                messages.insertAdjacentHTML('beforeend', \`<div class="chat-msg ai" style="color: red;">Erro: \${data.error}</div>\`);
            }
        } catch (error) {
            document.getElementById(typingId).remove();
            messages.insertAdjacentHTML('beforeend', \`<div class="chat-msg ai" style="color: red;">Erro de conexão com o servidor.</div>\`);
        }
        
        messages.scrollTop = messages.scrollHeight;
    };

    sendBtn.addEventListener('click', enviarMensagem);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });
}
`;

// Replace `function inicializarPagina() {` with the call to injetarChatIA()
content = content.replace('function inicializarPagina() {', 'function inicializarPagina() {\n    injetarChatIA();');
content += injectedJS;

fs.writeFileSync(jsPath, content, 'utf8');
console.log('main.js injected successfully in UTF-8');
