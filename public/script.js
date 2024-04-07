document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messageContainer = document.getElementById('messageContainer');

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            await fetch('/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            messageInput.value = '';
            fetchMessages();
        }
    });

    const fetchMessages = async () => {
        messageContainer.innerHTML = '';
        const response = await fetch('/messages');
        const messages = await response.json();
        messages.forEach(message => {
            const div = document.createElement('div');
            div.textContent = message;
            div.classList.add('message');
            messageContainer.appendChild(div);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        });
    };

    fetchMessages();
});
