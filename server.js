require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS para segurança (no Render pode ser restrito)
app.use(cors());

// Middleware para interpretar requisições JSON
app.use(express.json());

// Servir arquivos estáticos da própria raiz do projeto (HTML, CSS, JS, Assets)
app.use(express.static(path.join(__dirname, '')));

// Inicializa o cliente Gemini
// O SDK busca automaticamente por process.env.GEMINI_API_KEY se não passarmos explícito
let ai;
try {
  ai = new GoogleGenAI();
} catch (error) {
  console.warn("⚠️ Aviso: SDK GenAI falhou ao iniciar. Verifique sua chave em .env!");
}

// Rota da API de Chat do Gemini
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'A mensagem é obrigatória.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, error: 'Chave API não configurada no servidor.' });
        }

        const systemInstruction = `Você é o Assistente Virtual Oficial da Squad A, uma equipe especializada em desenvolvimento de software e criação de portfólios web com alto padrão de qualidade (Clean Code, responsividade e design moderno). 
Seu papel é recepcionar os visitantes, tirar dúvidas sobre nossos serviços e falar sobre os membros da equipe.
A equipe é composta por:
1. Luiz Fernando: Gerente de Projetos. Email: luizfernando@gmail.com, Telefone: (81) 99999-9999.
2. Joan Antonio: UX/UI Designer. Email: joanjunior91@gmail.com, GitHub: JJzinho.
3. Jonas Gabriel: Desenvolvedor Front-end. Email: jonasgabriel@gmail.com, Telefone: (81) 99999-9999.
Sempre que perguntarem sobre eles, forneça essas informações e explique seus papéis de forma simpática e profissional.
Nossos projetos usam tecnologias modernas como HTML, CSS, JavaScript e integração com IAs (Gemini).
Seja conciso, amigável, demonstre autoridade técnica e utilize emojis na medida certa.`;

        // Chama a IA Gemini usando a API recomendada (Interactions)
        const response = await ai.interactions.create({
            model: 'gemini-3.7-flash', 
            input: message,
            system_instruction: systemInstruction,
        });

        return res.status(200).json({
            success: true,
            data: {
                reply: response.output_text
            }
        });

    } catch (error) {
        console.error('Erro na API do Gemini:', error);
        return res.status(500).json({
            success: false,
            error: 'Erro interno ao processar a resposta da IA. Tente novamente mais tarde.'
        });
    }
});

// Redireciona a rota raiz ("/") para o index.html, que cuida do redirecionamento pro home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`👉 Acesse: http://localhost:${PORT}`);
});
