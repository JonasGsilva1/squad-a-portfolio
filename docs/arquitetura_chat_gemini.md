# Documentação de Arquitetura: Integração do Chat IA (Gemini API)

Esta documentação descreve a engenharia de integração de um assistente virtual inteligente baseado na API do Google Gemini para o portfólio web da Squad A. O design segue o padrão de Microsserviços para o backend, garantindo segurança, escalabilidade e separação clara de responsabilidades.

---

## 1. Premissas Técnicas e Stack Tecnológica

A arquitetura foi projetada com foco principal na **segurança da chave de API** e na **eficiência de comunicação**. 

*   **Frontend:** Aplicação web estática hospedada na **Vercel** (ou GitHub Pages). Responsável exclusivamente pela interface de usuário (UI) e por enviar as requisições HTTP via Fetch API.
*   **Backend (Middle Tier):** Microsserviço hospedado no **Render**. Atua como intermediário seguro entre o cliente e o serviço do Google.
*   **Stack do Backend:** Node.js, Express.js (roteamento), `cors` (segurança de origem), `dotenv` (gestão de segredos).
*   **Integração IA:** SDK Oficial `@google/genai`, utilizando o modelo `gemini-3.7-flash` através do método recomendado (ex: `ai.interactions.create`).
*   **Versionamento:** Git e GitHub.

---

## 2. Fluxo de Dados Detalhado (Data Flow)

O ciclo de vida completo de uma mensagem, desde a ação do usuário até a exibição da resposta, ocorre no seguinte fluxo (Step-by-Step):

1.  **Ação do Usuário:** O usuário digita uma mensagem no frontend (ex: *"Quais são os serviços da Squad A?"*) e clica em "Enviar".
2.  **Requisição Frontend (POST):** O JavaScript do cliente captura o texto e dispara uma requisição HTTP `POST` para o microsserviço no Render (ex: `https://squad-a-chat-backend.onrender.com/api/chat`).
3.  **Interceptação e Validação (Backend):** 
    *   O servidor Express no Render recebe a requisição.
    *   O middleware `cors` verifica se a requisição veio da origem permitida (o domínio do frontend na Vercel/GitHub Pages).
    *   O Express faz o parse do body da requisição para JSON.
4.  **Comunicação com o Google Gemini (SDK):** 
    *   O backend injeta a chave privada do Google (via variável de ambiente `process.env.GEMINI_API_KEY`).
    *   O SDK `@google/genai` constrói o prompt, define o modelo (`gemini-3.7-flash`) e chama o método de geração correspondente.
5.  **Processamento da IA:** O Google Gemini processa o texto e devolve a resposta gerada para o servidor Node.js.
6.  **Resposta do Backend:** O backend formata a resposta do Google e devolve ao frontend um objeto JSON padronizado com o status de sucesso.
7.  **Atualização da Interface (UI):** O frontend recebe o JSON, extrai o texto da resposta e renderiza o balão de mensagem da IA no chat da tela do usuário.

---

## 3. Estrutura de Diretórios do Microsserviço (Backend)

O backend deve ser criado como um repositório separado (ou pasta isolada) com a seguinte estrutura mínima para garantir a manutenção e o isolamento de pacotes:

```text
backend-gemini/
├── .env                # Armazena variáveis de ambiente locais (NUNCA commitado)
├── .gitignore          # Define arquivos ignorados pelo Git (ex: .env, node_modules/)
├── node_modules/       # Dependências instaladas pelo npm (criado automaticamente)
├── package.json        # Metadados do projeto e lista de dependências
├── package-lock.json   # Árvore exata de versões das dependências
└── server.js           # Arquivo principal contendo o servidor Express e lógica do Gemini
```

---

## 4. Diretrizes de Segurança

Para evitar o vazamento de credenciais e abusos da API, as seguintes políticas de segurança são **obrigatórias**:

*   **Proteção do `.env` (Segredos):** A chave de API do Gemini (`GEMINI_API_KEY`) deve residir exclusivamente no arquivo `.env`. Em produção (no Render), ela deve ser configurada nos *Environment Variables* do painel de controle. **Nunca coloque a chave diretamente no código.**
*   **Uso Correto do `.gitignore`:** O arquivo `.env` e a pasta `node_modules` devem estar obrigatoriamente listados no arquivo `.gitignore` do repositório do backend. Caso a chave seja commitada acidentalmente, ela deve ser revogada imediatamente no Google Cloud Console.
*   **Restrição de Origens (CORS):** O middleware `cors` não deve ser configurado como "aberto" (`*`) em produção. Ele deve validar e aceitar requisições APENAS do domínio onde o frontend está hospedado (ex: `https://seu-portfolio.vercel.app`), bloqueando requisições de outras origens.

---

## 5. Exemplo de Payload JSON (Comunicação)

Abaixo estão os formatos exatos que o Frontend enviará e que o Backend responderá.

### Request (Frontend -> Backend)
**Endpoint:** `POST /api/chat`
**Headers:** `Content-Type: application/json`

```json
{
  "message": "Quais as tecnologias que vocês usam nos projetos?"
}
```

### Response Sucesso (Backend -> Frontend)
**Status HTTP:** `200 OK`

```json
{
  "success": true,
  "data": {
    "reply": "Nós utilizamos tecnologias modernas como HTML, CSS Vanilla, JavaScript, além de Node.js e integrações com IAs generativas como o Gemini para oferecer as melhores soluções."
  }
}
```

### Response Erro (Backend -> Frontend)
**Status HTTP:** `500 Internal Server Error`

```json
{
  "success": false,
  "error": "Erro ao se comunicar com o serviço de inteligência artificial. Tente novamente mais tarde."
}
```
