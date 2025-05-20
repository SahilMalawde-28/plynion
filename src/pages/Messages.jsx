"use client"

import { useState, useEffect } from "react"
import MessageThread from "../components/MessageThread"
import { dummyConversations } from "../data/dummyData"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Messages.css"

const Messages = () => {
  const { currentUser } = useAuth()
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setConversations(dummyConversations)
      if (dummyConversations.length > 0) {
        setActiveConversation(dummyConversations[0])
      }
      setLoading(false)
    }, 1000)
  }, [])

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation)
  }

  const getLastMessage = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return "No messages yet"
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]
    return lastMessage.text
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const getLastMessageTime = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return ""
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]
    return formatTimestamp(lastMessage.timestamp)
  }

  const getOtherUser = (conversation) => {
    return conversation.participants.find((user) => user.id !== currentUser.id)
  }

  const filteredConversations = conversations.filter((conversation) => {
    const otherUser = getOtherUser(conversation)
    return (
      otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      otherUser.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="messages-container">
      <div className="conversations-sidebar">
        <div className="conversations-header">
          <h2>Messages</h2>
          <button className="new-message-btn">
            <i className="fas fa-edit"></i>
          </button>
        </div>

        <div className="search-messages">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="conversations-list">
          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading conversations...</p>
            </div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => {
              const otherUser = getOtherUser(conversation)
              const isActive = activeConversation && activeConversation.id === conversation.id

              return (
                <div
                  key={conversation.id}
                  className={`conversation-item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="conversation-avatar">
                    <img src={otherUser.avatar || "/placeholder.svg"} alt={otherUser.name} />
                    {otherUser.online && <span className="online-indicator"></span>}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <h4>{otherUser.name}</h4>
                      <span className="last-message-time">{getLastMessageTime(conversation)}</span>
                    </div>
                    <p className="last-message">{getLastMessage(conversation)}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-conversations">
              <i className="fas fa-comments"></i>
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      <div className="message-content">
        {activeConversation ? (
          <MessageThread conversation={activeConversation} />
        ) : (
          <div className="no-conversation-selected">
            <i className="fas fa-comment-dots"></i>
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the list or start a new one</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
