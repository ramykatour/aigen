// State Management
const state = {
    messages: [],
    isLoading: false,
    systemPrompt: 'You are a helpful AI assistant.'
};

// DOM Elements
const elements = {
    messagesContainer: document.getElementById('messagesContainer'),
    messagesList: document.getElementById('messagesList'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    typingIndicator: document.getElementById('typingIndicator'),
    chatForm: document.getElementById('chatForm'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    sendIcon: document.getElementById('sendIcon'),
    loadingIcon: document.getElementById('loadingIcon'),
    clearBtn: document.getElementById('clearBtn')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupEventListeners();
    renderMessages();
});

// Event Listeners
function setupEventListeners() {
    elements.chatForm.addEventListener('submit', handleSubmit);
    elements.messageInput.addEventListener('keydown', handleKeyDown);
    elements.messageInput.addEventListener('input', handleInput);
    elements.clearBtn.addEventListener('click', clearChat);
}

// Handle Form Submit
async function handleSubmit(e) {
    e.preventDefault();
    const message = elements.messageInput.value.trim();

    if (!message || state.isLoading) return;

    // Add user message
    addMessage('user', message);

    // Clear input
    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';
    updateSendButton();

    // Show typing indicator
    showTypingIndicator();

    // Create empty assistant message
    const assistantMessageId = addMessage('assistant', '');

    try {
        // Stream response
        await streamChat(message, assistantMessageId);
    } catch (error) {
        console.error('Chat error:', error);
        updateMessageContent(assistantMessageId, `Error: ${error.message}`);
    } finally {
        hideTypingIndicator();
    }
}

// Handle Keyboard Events
function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        elements.chatForm.dispatchEvent(new Event('submit'));
    }
}

// Handle Input Changes
function handleInput() {
    autoResizeTextarea();
    updateSendButton();
}

// Auto-resize Textarea
function autoResizeTextarea() {
    const textarea = elements.messageInput;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 192);
    textarea.style.height = newHeight + 'px';
}

// Update Send Button State
function updateSendButton() {
    const hasContent = elements.messageInput.value.trim().length > 0;
    elements.sendBtn.disabled = !hasContent || state.isLoading;
}

// Add Message
function addMessage(role, content) {
    const message = {
        id: generateId(),
        role,
        content,
        timestamp: Date.now()
    };

    state.messages.push(message);
    saveState();
    renderMessage(message);
    scrollToBottom();

    return message.id;
}

// Update Message Content
function updateMessageContent(messageId, content) {
    const message = state.messages.find(m => m.id === messageId);
    if (message) {
        message.content = content;
        saveState();

        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            const textElement = messageElement.querySelector('.message-text');
            if (textElement) {
                textElement.textContent = content;
            }
        }

        scrollToBottom();
    }
}

// Render All Messages
function renderMessages() {
    elements.messagesList.innerHTML = '';

    if (state.messages.length === 0) {
        elements.welcomeMessage.classList.remove('hidden');
    } else {
        elements.welcomeMessage.classList.add('hidden');
        state.messages.forEach(renderMessage);
    }

    scrollToBottom();
}

// Render Single Message
function renderMessage(message) {
    const messageElement = createMessageElement(message);
    elements.messagesList.appendChild(messageElement);
}

// Create Message Element
function createMessageElement(message) {
    const div = document.createElement('div');
    div.id = `message-${message.id}`;
    div.className = `message ${message.role}`;

    const isUser = message.role === 'user';

    div.innerHTML = `
        <div class="message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}">
            ${getAvatarIcon(isUser)}
        </div>
        <div class="message-content">
            <div class="message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}">
                <div class="message-text">${escapeHtml(message.content)}</div>
            </div>
            <div class="message-meta">
                <span>${formatTime(message.timestamp)}</span>
                ${!isUser ? `
                    <button class="copy-button" onclick="copyMessage('${message.id}')" title="Copy message">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    return div;
}

// Get Avatar Icon
function getAvatarIcon(isUser) {
    if (isUser) {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>`;
    } else {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>`;
    }
}

// Stream Chat Response
async function streamChat(userMessage, messageId) {
    state.isLoading = true;
    updateSendButton();

    try {
        const messages = [
            { role: 'system', content: state.systemPrompt },
            ...state.messages.slice(0, -1), // Exclude the empty assistant message
            { role: 'user', content: userMessage }
        ];

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);

                    if (data === '[DONE]') break;

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.content) {
                            fullContent += parsed.content;
                            updateMessageContent(messageId, fullContent);
                        }
                    } catch (e) {
                        // Skip invalid JSON
                    }
                }
            }
        }
    } finally {
        state.isLoading = false;
        updateSendButton();
    }
}

// Show Typing Indicator
function showTypingIndicator() {
    elements.typingIndicator.classList.remove('hidden');
    elements.sendIcon.classList.add('hidden');
    elements.loadingIcon.classList.remove('hidden');
}

// Hide Typing Indicator
function hideTypingIndicator() {
    elements.typingIndicator.classList.add('hidden');
    elements.sendIcon.classList.remove('hidden');
    elements.loadingIcon.classList.add('hidden');
}

// Copy Message
async function copyMessage(messageId) {
    const message = state.messages.find(m => m.id === messageId);
    if (message) {
        try {
            await navigator.clipboard.writeText(message.content);

            // Show copied state
            const button = document.querySelector(`#message-${messageId} .copy-button`);
            if (button) {
                button.classList.add('copied');
                button.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;

                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    `;
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
}

// Clear Chat
function clearChat() {
    if (confirm('Are you sure you want to clear the chat?')) {
        state.messages = [];
        saveState();
        renderMessages();
    }
}

// Scroll to Bottom
function scrollToBottom() {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

// Format Time
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
}

// Generate ID
function generateId() {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Save State to LocalStorage
function saveState() {
    try {
        localStorage.setItem('chatState', JSON.stringify({
            messages: state.messages,
            systemPrompt: state.systemPrompt
        }));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Load State from LocalStorage
function loadState() {
    try {
        const saved = localStorage.getItem('chatState');
        if (saved) {
            const parsed = JSON.parse(saved);
            state.messages = parsed.messages || [];
            state.systemPrompt = parsed.systemPrompt || state.systemPrompt;
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
}

// Make copyMessage available globally
window.copyMessage = copyMessage;
