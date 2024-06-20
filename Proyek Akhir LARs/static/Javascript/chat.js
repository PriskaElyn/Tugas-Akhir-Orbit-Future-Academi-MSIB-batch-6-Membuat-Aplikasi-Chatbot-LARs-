const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-input textarea');
const sendButton = document.querySelector('.chat-input button');

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Prevent new line on Enter key
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message !== '') {
    addMessageToChat(message, 'user');
    chatInput.value = ''; // Reset input after sending message

    // Send the message to the backend and get the response
    fetch('/get_response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
    })
    .then(response => response.json())
    .then(data => {
      const botReply = data.response || 'Maaf, saya tidak mengerti pertanyaan Anda.';
      addMessageToChat(botReply, 'bot');
    })
    .catch(error => {
      console.error('Error:', error);
      const botReply = 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.';
      addMessageToChat(botReply, 'bot');
    });

    chatInput.style.height = 'fit-content';
  }
}

function addMessageToChat(message, sender) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('chat-message', `${sender}-message`);
  messageContainer.innerHTML = 
  `<div class="message-container"> 
    <p>${message.replace(/\n/g, '<br>')}</p> 
  </div>`;
  chatBody.appendChild(messageContainer);
  chatBody.scrollTop = chatBody.scrollHeight;

  if (chatBody.childElementCount === 2) {
    chatBody.classList.add('has-messages');
  }
}

function checkForMessages() {
  if (chatBody.childElementCount === 0) {
    chatBody.classList.remove('has-messages');
  }
}

chatInput.addEventListener('input', adjustTextareaHeight);

function adjustTextareaHeight() {
  chatInput.style.height = 'auto'; // Set textarea height to auto
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Set textarea height based on content
}
