import { writable } from 'svelte/store';

const messageStore = writable('');

const socket = new WebSocket('ws:109.68.212.208/webapi');

// Connection opened
socket.addEventListener('open', function (event) {
	console.log("It's open");
});

// Listen for messages
socket.addEventListener('message', function (event) {
	messageStore.set(event.data);
});

const sendMessage = (message: string) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
};

export default {
	subscribe: messageStore.subscribe,
	sendMessage
};
