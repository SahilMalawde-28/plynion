"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import "../styles/MessageThread.css"

const MessageThread = ({ conversation }) => {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState(conversation.messages || [])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")
    // In a real app, this would update Firebase
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const otherUser = conversation.participants.find((user) => user.id !== currentUser.id)

  return (
    <div className="message-thread">
      <div className="thread-header">
        <img src={otherUser.avatar || "/placeholder.svg"} alt={otherUser.name} className="thread-avatar" />
        <div className="thread-info">
          <h3>{otherUser.name}</h3>
          <span className="online-status">{otherUser.online ? "Online" : "Offline"}</span>
        </div>
        <div className="thread-actions">
          <button className="action-btn">
            <i className="fas fa-phone"></i>
          </button>
          <button className="action-btn">
            <i className="fas fa-video"></i>
          </button>
          <button className="action-btn">
            <i className="fas fa-info-circle"></i>
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser.id

          return (
            <div key={message.id} className={`message ${isCurrentUser ? "sent" : "received"}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input" onSubmit={handleSendMessage}>
        <button type="button" className="attachment-btn">
          <i className="fas fa-paperclip"></i>
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="button" className="emoji-btn">
          <i className="fas fa-smile"></i>
        </button>
        <button type="submit" className="send-btn">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  )
}

export default MessageThread
