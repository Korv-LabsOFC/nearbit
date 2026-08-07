# Protocolo Nearbit

Todos os eventos são objetos JSON enviados pelo WebSocket. O campo `type` identifica o evento.

## Cliente para servidor

Entrada:

```json
{ "type": "join", "username": "Israel" }
```

Mensagem:

```json
{ "type": "message", "content": "Olá!" }
```

Digitação:

```json
{ "type": "typing", "active": true }
```

Ping:

```json
{ "type": "ping" }
```

O nome é obrigatório, recebe `trim`, tem limite de 24 caracteres e não pode repetir outro nome ativo, sem diferenciar maiúsculas de minúsculas. O conteúdo tem limite de 500 caracteres. JSON inválido, eventos desconhecidos e payloads inválidos geram `error`.

## Servidor para cliente

Boas-vindas:

```json
{ "type": "welcome", "username": "Israel" }
```

Mensagem distribuída:

```json
{
	"type": "message",
	"sender": "Israel",
	"content": "Olá!",
	"timestamp": "2026-08-07T12:00:00.000Z"
}
```

Lista de usuários:

```json
{ "type": "user_list", "users": ["Israel", "Ana"] }
```

Os demais eventos são `system` (`content`), `typing` (`sender` e `active`), `pong` e `error` (`message`).
