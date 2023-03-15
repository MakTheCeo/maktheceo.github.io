const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const chatResponse = document.getElementById('chat-response');
let context = "";

form.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevent form submission and page refresh

	const message = messageInput.value.trim(); // Get the message from the input field

	// Send the message to the OpenAI chat API
	fetch('https://api.openai.com/v1/engines/davinci/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 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',
		},
		body: JSON.stringify({
			prompt: `Chat with ChatGPT:\n${context}You: ${message}\nChatGPT:`,
			max_tokens: 64,
			temperature: 0.7,
			stop: ['\n']
		}),
	})
	.then(response => response.json()) // Parse the JSON response
	.then(data => {
		const chatMessage = data.choices[0].text.trim(); // Get the response message from the OpenAI API
		chatResponse.innerHTML += `<p><strong>You:</strong> ${message}</p><p><strong>ChatGPT:</strong> ${chatMessage}</p>`; // Display the response in the chat response div
		context = `You: ${message}\nChatGPT: ${chatMessage}\n`;
	})
	.catch(error => {
		console.error(error);
		alert('Error fetching OpenAI chat response.');
	});

	messageInput.value = ''; // Clear the input field
});