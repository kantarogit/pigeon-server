# pigeon-server

Pigeon Server is a simple WebSocket server that acts as a real-time bridge between [pigeon-reporter](https://www.npmjs.com/package/pigeon-reporter) (used in Playwright projects) and any number of clients. It lets you broadcast test events live so clients can visualize, store, or process results as they happen.

## Installation

Install with npm:

```bash
npm install pigeon-server
```

## Environment Setup

By default, the server runs on port `3004`. To use a different port, set the environment variable before starting the server:

```bash
export PIGEON_SERVER_PORT=4000
```


## How it works

- Each Playwright project using pigeon-reporter sends test events to the server and each messages including a `projectId`.
- The server broadcasts these events to all clients subscribed to that project's room.
- Clients (such as dashboards or databases) connect and subscribe to a project room to receive live updates (see more about [socket.io rooms](https://socket.io/docs/v3/rooms/))

![alt text](pigeon-architecture.png)

This setup allows you to:

- Visualize test results in real time
- Store results in a database
- Build custom integrations for your test events

## Usage

Start the server with npx:

```bash
npx pigeon-server
```

You should see:

```
Pigeon server listens at http://localhost:4000
```

If you want the server to be accessible over your network, make sure your firewall and network settings allow incoming connections on the chosen port.

## Author

Filip Kantardjioski

[https://github.com/kantarogit](https://github.com/kantarogit)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.


