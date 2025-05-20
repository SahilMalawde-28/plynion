"use client"

import { useState, useEffect } from "react"
import PollCard from "../components/PollCard"
import { dummyPolls } from "../data/dummyData"
import "../styles/TrendingPolls.css"

const TrendingPolls = () => {
  const [trendingPolls, setTrendingPolls] = useState([])
  const [trendingTags, setTrendingTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      // Get trending polls
      const trending = dummyPolls.filter((poll) => poll.trending)
      setTrendingPolls(trending)

      // Extract and count hashtags
      const tags = {}
      trending.forEach((poll) => {
        if (poll.hashtags) {
          poll.hashtags.forEach((tag) => {
            if (tags[tag]) {
              tags[tag]++
            } else {
              tags[tag] = 1
            }
          })
        }
      })

      // Convert to array and sort by count
      const tagArray = Object.entries(tags).map(([tag, count]) => ({
        tag,
        count,
      }))
      tagArray.sort((a, b) => b.count - a.count)

      setTrendingTags(tagArray)
      setLoading(false)
    }, 1000)
  }, [])

  const filterByTag = (tag) => {
    setActiveTag(tag)
    setLoading(true)

    // Simulate filtering data
    setTimeout(() => {
      if (tag) {
        const filtered = dummyPolls.filter((poll) => poll.hashtags && poll.hashtags.includes(tag))
        setTrendingPolls(filtered)
      } else {
        setTrendingPolls(dummyPolls.filter((poll) => poll.trending))
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="trending-container">
      <div className="trending-header">
        <h2>Trending Now</h2>
        <p>See what's popular in the Plynion community</p>
      </div>

      <div className="trending-tags">
        <button className={`tag-btn ${activeTag === null ? "active" : ""}`} onClick={() => filterByTag(null)}>
          All Trending
        </button>

        {trendingTags.map(({ tag, count }) => (
          <button key={tag} className={`tag-btn ${activeTag === tag ? "active" : ""}`} onClick={() => filterByTag(tag)}>
            {tag} <span className="tag-count">{count}</span>
          </button>
        ))}
      </div>

      <div className="trending-polls">
        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading trending polls...</p>
          </div>
        ) : trendingPolls.length > 0 ? (
          trendingPolls.map((poll) => <PollCard key={poll.id} poll={poll} />)
        ) : (
          <div className="no-polls">
            <i className="fas fa-fire-alt"></i>
            <p>No trending polls found for this tag</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrendingPolls
