"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/CreatePoll.css"

const CreatePoll = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [hashtags, setHashtags] = useState("")
  const [duration, setDuration] = useState("1d")
  const [isPrivate, setIsPrivate] = useState(false)
  const [allowComments, setAllowComments] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options]
      newOptions.splice(index, 1)
      setOptions(newOptions)
    }
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!question.trim()) {
      alert("Please enter a question")
      return
    }

    if (options.some((option) => !option.trim())) {
      alert("Please fill in all options")
      return
    }

    // Create poll object
    const newPoll = {
      id: `poll-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      question: question.trim(),
      options: options.map((text, index) => ({
        id: `option-${index}`,
        text: text.trim(),
      })),
      hashtags: hashtags.trim() ? hashtags.split(" ").map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)) : [],
      timestamp: new Date().toISOString(),
      duration,
      isPrivate,
      allowComments,
      votes: [],
      comments: [],
      reactions: {
        wow: { count: 0, users: [] },
        meh: { count: 0, users: [] },
        love: { count: 0, users: [] },
      },
    }

    setLoading(true)

    // Simulate saving to Firebase
    setTimeout(() => {
      console.log("New poll created:", newPoll)
      setLoading(false)
      navigate("/")
    }, 1500)
  }

  return (
    <div className="create-poll-container">
      <div className="create-poll-header">
        <h2>Create a Poll</h2>
        <p>Ask a question and let the community vote!</p>
      </div>

      <form className="create-poll-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Your Question</label>
          <input
            type="text"
            id="question"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={150}
          />
          <div className="character-count">{question.length}/150</div>
        </div>

        <div className="form-group">
          <label>Poll Options</label>
          {options.map((option, index) => (
            <div key={index} className="option-input">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                maxLength={50}
              />
              {options.length > 2 && (
                <button type="button" className="remove-option-btn" onClick={() => handleRemoveOption(index)}>
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          ))}

          {options.length < 6 && (
            <button type="button" className="add-option-btn" onClick={handleAddOption}>
              <i className="fas fa-plus"></i> Add Option
            </button>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="hashtags">Hashtags</label>
          <input
            type="text"
            id="hashtags"
            placeholder="Add hashtags separated by spaces (e.g. #tech #opinion)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Poll Duration</label>
            <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="1h">1 hour</option>
              <option value="6h">6 hours</option>
              <option value="12h">12 hours</option>
              <option value="1d">1 day</option>
              <option value="3d">3 days</option>
              <option value="7d">1 week</option>
              <option value="0">No expiration</option>
            </select>
          </div>

          <div className="form-group toggle-group">
            <label htmlFor="private">Private Poll</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <label htmlFor="private" className="toggle-label"></label>
            </div>
          </div>
        </div>

        <div className="form-group toggle-group">
          <label htmlFor="comments">Allow Comments</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="comments"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
            />
            <label htmlFor="comments" className="toggle-label"></label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Creating...
              </>
            ) : (
              "Create Poll"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePoll
