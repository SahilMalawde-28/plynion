"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/PollCard.css"

const PollCard = ({ poll }) => {
  const { currentUser } = useAuth()
  const [selectedOption, setSelectedOption] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(poll.comments || [])
  const [reactions, setReactions] = useState(
    poll.reactions || {
      wow: { count: poll.reactions?.wow?.count || 0, users: poll.reactions?.wow?.users || [] },
      meh: { count: poll.reactions?.meh?.count || 0, users: poll.reactions?.meh?.users || [] },
      love: { count: poll.reactions?.love?.count || 0, users: poll.reactions?.love?.users || [] },
    },
  )

  const handleVote = (optionId) => {
    setSelectedOption(optionId)
    // In a real app, this would update Firebase
  }

  const calculatePercentage = (optionId) => {
    if (!poll.votes || poll.votes.length === 0) return 0

    const votesForOption = poll.votes.filter((vote) => vote.optionId === optionId).length
    return Math.round((votesForOption / poll.votes.length) * 100)
  }

  const handleReaction = (type) => {
    const hasReacted = reactions[type].users.includes(currentUser.id)

    if (hasReacted) {
      // Remove reaction
      setReactions({
        ...reactions,
        [type]: {
          count: reactions[type].count - 1,
          users: reactions[type].users.filter((id) => id !== currentUser.id),
        },
      })
    } else {
      // Add reaction
      setReactions({
        ...reactions,
        [type]: {
          count: reactions[type].count + 1,
          users: [...reactions[type].users, currentUser.id],
        },
      })
    }
    // In a real app, this would update Firebase
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text: newComment,
      timestamp: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment("")
    // In a real app, this would update Firebase
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="poll-card">
      <div className="poll-header">
        <Link to={`/profile/${poll.userId}`} className="user-info">
          <img src={poll.userAvatar || "/placeholder.svg"} alt={poll.username} className="user-avatar" />
          <div>
            <h4>{poll.username}</h4>
            <span className="timestamp">{formatTimestamp(poll.timestamp)}</span>
          </div>
        </Link>
        <div className="poll-actions">
          <button className="action-btn">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>

      <div className="poll-content">
        <h3 className="poll-question">{poll.question}</h3>

        {poll.hashtags && (
          <div className="hashtags">
            {poll.hashtags.map((tag, index) => (
              <Link key={index} to={`/hashtag/${tag.replace("#", "")}`} className="hashtag">
                {tag}
              </Link>
            ))}
          </div>
        )}

        <div className="poll-options">
          {poll.options.map((option) => (
            <div
              key={option.id}
              className={`poll-option ${selectedOption === option.id ? "selected" : ""}`}
              onClick={() => handleVote(option.id)}
            >
              <div className="option-text">{option.text}</div>
              {selectedOption && (
                <div className="option-stats">
                  <div className="option-progress" style={{ width: `${calculatePercentage(option.id)}%` }}></div>
                  <span className="option-percentage">{calculatePercentage(option.id)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="poll-footer">
        <div className="reaction-buttons">
          <button
            className={`reaction-btn ${reactions.wow.users.includes(currentUser.id) ? "active" : ""}`}
            onClick={() => handleReaction("wow")}
          >
            <span className="emoji">😮</span>
            <span className="count">{reactions.wow.count}</span>
          </button>
          <button
            className={`reaction-btn ${reactions.meh.users.includes(currentUser.id) ? "active" : ""}`}
            onClick={() => handleReaction("meh")}
          >
            <span className="emoji">😐</span>
            <span className="count">{reactions.meh.count}</span>
          </button>
          <button
            className={`reaction-btn ${reactions.love.users.includes(currentUser.id) ? "active" : ""}`}
            onClick={() => handleReaction("love")}
          >
            <span className="emoji">❤️</span>
            <span className="count">{reactions.love.count}</span>
          </button>
        </div>

        <button className="comments-toggle" onClick={() => setShowComments(!showComments)}>
          <i className="fas fa-comment"></i>
          <span>{comments.length} comments</span>
        </button>

        <button className="share-btn">
          <i className="fas fa-share"></i>
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <img src={comment.userAvatar || "/placeholder.svg"} alt={comment.username} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-time">{formatTimestamp(comment.timestamp)}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={handleAddComment}>
            <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} className="comment-avatar" />
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PollCard
