# Nearbit


Nearbit is a lightweight real-time messaging application designed for devices connected to the same local network.

The project focuses on simple LAN communication, real-time messaging, responsive interfaces, and learning how networking technologies such as HTTP, TCP, WebSockets, and local IP addressing work in practice.

## Goals

Nearbit aims to provide:

* Real-time messaging over a local network
* Communication without requiring an external cloud service
* Responsive interfaces for desktop and mobile devices
* Simple device access through a local IP address
* A clear and documented communication protocol
* A lightweight architecture built with standard web technologies

## Architecture

```text
Mobile / Desktop Client
        |
        | HTTP
        v
Nearbit Server
        |
        | WebSocket
        v
Connected Clients
```

The Nearbit server runs on one device in the local network.

Other devices access the application through the server's local IP address.

Example:

```text
http://192.168.1.50:5050
```

After loading the interface, clients communicate through WebSocket connections.

## Technology Stack

### Backend

* Node.js
* Express
* ws
* Native Node.js HTTP server

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* WebSocket API

### Networking

* HTTP
* TCP
* WebSocket
* LAN communication

## Project Structure

```text
nearbit/
├── src/
│   ├── server/
│   │   ├── index.js
│   │   ├── websocket.js
│   │   ├── clients.js
│   │   └── protocol.js
│   │
│   └── shared/
│       └── constants.js
│
├── public/
│   ├── index.html
│   │
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── socket.js
│   │   ├── messages.js
│   │   ├── users.js
│   │   └── ui.js
│   │
│   └── assets/
│       └── icons/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PROTOCOL.md
│   └── ROADMAP.md
│
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── package-lock.json
```

## Nearbit Protocol

Nearbit uses JSON messages over WebSocket.

Example message:

```json
{
  "type": "message",
  "sender": "Israel",
  "content": "Hello!"
}
```

Initial event types:

```text
join
message
user_list
typing
leave
ping
error
```

The protocol will be documented in:

```text
docs/PROTOCOL.md
```

## Initial Features

The current alpha supports:

* Username selection
* Joining a Nearbit server
* Real-time messaging
* Online user list
* Join and leave events
* Connection status
* Responsive mobile interface
* Responsive desktop interface
* Basic message validation
* Automatic scrolling
* Basic reconnection handling

## Security Principles

Even though Nearbit initially operates only on a LAN, incoming data must never be trusted automatically.

The project should:

* Validate WebSocket messages
* Reject malformed JSON
* Limit username length
* Limit message length
* Never render incoming messages using unsafe HTML
* Prefer `textContent` over `innerHTML`
* Handle disconnected clients correctly
* Avoid exposing unnecessary server functionality

## Development

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

During development:

```bash
npm run dev
```

The default Nearbit port is:

```text
5050
```

## Development Roadmap

### v0.1.0-alpha

* HTTP server
* WebSocket server
* Username selection
* Real-time messages
* Connected users
* Responsive interface
* Basic Nearbit protocol

### v0.2

* Typing indicator
* Better reconnection
* Message timestamps
* Notification sounds
* System messages

### v0.3

* Rooms
* File transfer
* Images
* Device discovery

### v0.4

* PWA support
* Browser notifications
* Installable mobile interface

### Future

Possible future experiments include:

* End-to-end encryption
* QR pairing
* Peer-to-peer communication
* WebRTC
* Native clients
* Automatic LAN discovery

## Project Status

Nearbit is currently under active development, with the v0.1.0-alpha MVP available.

Current target:

```text
v0.1.0-alpha
```

## License

License to be defined.
