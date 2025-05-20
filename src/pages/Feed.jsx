"use client"

import { useState, useEffect } from "react"
import PollCard from "../components/PollCard"
import { dummyPolls } from "../data/dummyData"
import "../styles/Feed.css"

const Feed = () => {
  const [polls, setPolls] = useState([])
  const [activeFilter, setActiveFilter] = useState("for-you")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setPolls(dummyPolls)
      setLoading(false)
    }, 1000)
  }, [])

  const filterPolls = (filter) => {
    setActiveFilter(filter)
    setLoading(true)

    // Simulate filtering data
    setTimeout(() => {
      switch (filter) {
        case "for-you":
          setPolls(dummyPolls)
          break
        case "trending":
          setPolls(dummyPolls.filter((poll) => poll.trending))
          break
        case "following":
          setPolls(dummyPolls.filter((poll) => poll.fromFollowing))
          break
        default:
          setPolls(dummyPolls)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="feed-container">
      <div className="feed-filters">
        <button
          className={`filter-btn ${activeFilter === "for-you" ? "active" : ""}`}
          onClick={() => filterPolls("for-you")}
        >
          For You
        </button>
        <button
          className={`filter-btn ${activeFilter === "trending" ? "active" : ""}`}
          onClick={() => filterPolls("trending")}
        >
          Trending
        </button>
        <button
          className={`filter-btn ${activeFilter === "following" ? "active" : ""}`}
          onClick={() => filterPolls("following")}
        >
          Following
        </button>
      </div>

      <div className="polls-list">
        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading polls...</p>
          </div>
        ) : polls.length > 0 ? (
          polls.map((poll) => <PollCard key={poll.id} poll={poll} />)
        ) : (
          <div className="no-polls">
            <i className="fas fa-poll"></i>
            <p>No polls found. Follow more users or create your own poll!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed
