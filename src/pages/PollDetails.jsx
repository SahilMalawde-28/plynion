"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import PollCard from "../components/PollCard"
import { dummyPolls } from "../data/dummyData"
import "../styles/PollDetails.css"

const PollDetails = () => {
  const { id } = useParams()
  const [poll, setPoll] = useState(null)
  const [relatedPolls, setRelatedPolls] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      const foundPoll = dummyPolls.find((p) => p.id === id)
      setPoll(foundPoll)

      if (foundPoll && foundPoll.hashtags) {
        // Find related polls with similar hashtags
        const related = dummyPolls
          .filter((p) => p.id !== id && p.hashtags && p.hashtags.some((tag) => foundPoll.hashtags.includes(tag)))
          .slice(0, 3)

        setRelatedPolls(related)
      }

      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="poll-details-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading poll...</p>
        </div>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="poll-details-container">
        <div className="poll-not-found">
          <i className="fas fa-exclamation-circle"></i>
          <h3>Poll Not Found</h3>
          <p>The poll you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="poll-details-container">
      <div className="poll-details-main">
        <div className="poll-details-header">
          <Link to="/" className="back-btn">
            <i className="fas fa-arrow-left"></i> Back
          </Link>
          <h2>Poll Details</h2>
        </div>

        <div className="poll-details-card">
          <PollCard poll={poll} />
        </div>

        <div className="poll-analytics">
          <h3>Poll Analytics</h3>
          <div className="analytics-grid">
            <div className="analytics-card">
              <i className="fas fa-vote-yea"></i>
              <div className="analytics-info">
                <span className="analytics-value">{poll.votes?.length || 0}</span>
                <span className="analytics-label">Total Votes</span>
              </div>
            </div>

            <div className="analytics-card">
              <i className="fas fa-comment"></i>
              <div className="analytics-info">
                <span className="analytics-value">{poll.comments?.length || 0}</span>
                <span className="analytics-label">Comments</span>
              </div>
            </div>

            <div className="analytics-card">
              <i className="fas fa-share"></i>
              <div className="analytics-info">
                <span className="analytics-value">{poll.shares || 0}</span>
                <span className="analytics-label">Shares</span>
              </div>
            </div>

            <div className="analytics-card">
              <i className="fas fa-eye"></i>
              <div className="analytics-info">
                <span className="analytics-value">{poll.views || 0}</span>
                <span className="analytics-label">Views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedPolls.length > 0 && (
        <div className="related-polls">
          <h3>Related Polls</h3>
          <div className="related-polls-list">
            {relatedPolls.map((relatedPoll) => (
              <PollCard key={relatedPoll.id} poll={relatedPoll} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PollDetails
