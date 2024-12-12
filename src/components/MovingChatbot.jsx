"use client"

import { useState, useRef, useEffect } from 'react';
import styles from './MovingChatbot.module.css';

const MovingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);

  const quickReplies = [
    "Gauti kainą",
    "Perkraustymo paslaugos",
    "Suplanuoti perkraustymą",
    "Pakavimo patarimai"
  ];

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const userMessage = {
      type: 'user',
      content: text
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    setMessages(prev => [...prev, { type: 'typing' }]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      
      const data = await response.json();
      setMessages(prev => 
        prev.filter(msg => msg.type !== 'typing').concat({
          type: 'bot',
          content: data.reply
        })
      );
    } catch (error) {
      console.error('Klaida:', error);
    }
  };

  return (
    <div className={styles.chatbotWrapper}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬 Reikia pagalbos?'}
      </button>
      
      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.header}>
            <h3>Perkraustymo asistentas</h3>
            <p>Klauskite bet ko apie perkraustymą!</p>
          </div>
          
          <div className={styles.messageArea}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${
                  msg.type === 'user' ? styles.userMessage : 
                  msg.type === 'typing' ? styles.typingMessage : 
                  styles.botMessage
                }`}
              >
                {msg.type === 'typing' ? 
                  'Rašo...' : 
                  msg.content
                }
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          
          <div className={styles.inputContainer}>
            <div className={styles.quickReplies}>
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className={styles.quickReply}
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Įveskite savo žinutę..."
              />
              <button 
                className={styles.sendButton}
                onClick={() => handleSend(input)}
              >
                Siųsti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovingChatbot;
