# Arquitetura

Nearbit é uma aplicação web servida por um único processo Node.js na rede local.

```text
Navegador
	| HTTP: arquivos estáticos
	v
Express + HTTP Server
	| WebSocket
	v
Gerenciador de clientes em memória
```

## Servidor

`src/server/index.js` cria o servidor HTTP, serve `public/` e expõe `/health`. O módulo `websocket.js` anexa um `WebSocketServer` ao mesmo servidor, portanto HTTP e WebSocket usam a mesma porta (`5050` por padrão).

`clients.js` mantém as conexões ativas em memória. Cada socket começa sem nome e só pode publicar mensagens depois de enviar um evento `join`. Ao fechar, o cliente é removido e os demais recebem um evento de sistema e uma nova lista de usuários.

## Cliente

O navegador é uma aplicação Vanilla JavaScript dividida por responsabilidade:

* `socket.js` controla conexão, eventos e reconexão.
* `messages.js` cria mensagens com `textContent`.
* `users.js` renderiza a lista de pessoas online.
* `ui.js` atualiza status, contadores e digitação.
* `app.js` coordena formulários e estado da tela.

Não há banco de dados: mensagens são transmitidas em tempo real e não persistem quando o servidor é reiniciado.

## Segurança básica

O servidor analisa JSON, aceita somente os tipos documentados e limita nomes a 24 caracteres e mensagens a 500. O navegador nunca interpreta texto recebido como HTML.
