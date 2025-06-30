#!/usr/bin/env node

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    maxHttpBufferSize: 5e7, 
    transports: ['websocket'], // Use only WebSocket transport
});

io.on('connection', (socket) => {
    socket.on('joinNest', async ({ projectId, userId }) => {
        try {
            console.log('Joining project room:', projectId, userId);
            socket.join(projectId.toString());
            console.log('Joined room', projectId);
        } catch (error) {
            console.error('Error joining project room:', error);
        }
    });

    socket.on('leaveNest', ({ projectId, userId }) => {
        console.log(userId, 'leaving project room:', projectId);
        socket.leave(projectId.toString());
        console.log('Left room', projectId);
    });

    socket.on('testUpdate', (data, callback) => {
        console.log('testUpdate', data);
        console.log('forwarding to', data.projectId);
        io.to(data.projectId).emit('testUpdate', data);
        if (callback) {
            callback();
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const SOCKET_PORT = process.env.PIGEON_SERVER_PORT || 3004;

server.listen(SOCKET_PORT, () => {
    console.log(`Pigeon server listens at http://localhost:${SOCKET_PORT}`);
});
