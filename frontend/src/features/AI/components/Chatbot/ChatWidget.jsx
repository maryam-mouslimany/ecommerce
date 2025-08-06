import React, { useState, useRef, useEffect } from 'react';
import { chatbotService } from '../../../../services/chatbotService';
import styles from './ChatWidget.module.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: userMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);

    try {
      const response = await chatbotService.sendMessage(userMessage);
      
      // Add bot response
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: response.response,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I\'m having trouble right now. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
        </svg>
        <span>Chat with us</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <h3>Perfume Assistant</h3>
              <p>Ask me about perfumes, recommendations, and more!</p>
            </div>
            <div className={styles.headerActions}>
              <button 
                onClick={clearChat}
                className={styles.clearButton}
                title="Clear chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                title="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <div className={styles.welcomeIcon}>👋</div>
                <h4>Hello! I'm your perfume assistant</h4>
                <p>I can help you find the perfect fragrance, answer questions about perfumes, and provide recommendations.</p>
                <div className={styles.suggestions}>
                  <button 
                    onClick={() => setInputMessage("What perfumes do you have?")}
                    className={styles.suggestionButton}
                  >
                    What perfumes do you have?
                  </button>
                  <button 
                    onClick={() => setInputMessage("I'm looking for a vanilla perfume")}
                    className={styles.suggestionButton}
                  >
                    I'm looking for a vanilla perfume
                  </button>
                  <button 
                    onClick={() => setInputMessage("What's the best perfume for summer?")}
                    className={styles.suggestionButton}
                  >
                    What's the best perfume for summer?
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${styles[msg.type]} ${msg.isError ? styles.error : ''}`}>
                <div className={styles.messageContent}>
                  {msg.content}
                </div>
                <div className={styles.messageTime}>
                  {msg.timestamp}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <div className={styles.inputWrapper}>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about perfumes..."
                disabled={isLoading}
                rows={1}
                className={styles.messageInput}
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className={styles.sendButton}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget; 