"use client"

import { useState, useEffect } from "react"
import NotificationItem from "../components/NotificationItem"
import { dummyNotifications } from "../data/dummyData"
import "../styles/Notifications.css"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setNotifications(dummyNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const filterNotifications = (filter) => {
    setActiveFilter(filter)
    setLoading(true)

    // Simulate filtering data
    setTimeout(() => {
      switch (filter) {
        case "all":
          setNotifications(dummyNotifications)
          break
        case "unread":
          setNotifications(dummyNotifications.filter((notification) => !notification.read))
          break
        case "votes":
          setNotifications(dummyNotifications.filter((notification) => notification.type === "vote"))
          break
        case "comments":
          setNotifications(dummyNotifications.filter((notification) => notification.type === "comment"))
          break
        case "reactions":
          setNotifications(dummyNotifications.filter((notification) => notification.type === "reaction"))
          break
        case "follows":
          setNotifications(dummyNotifications.filter((notification) => notification.type === "follow"))
          break
        default:
          setNotifications(dummyNotifications)
      }
      setLoading(false)
    }, 500)
  }

  const markAllAsRead = () => {
    // In a real app, this would update Firebase
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button className="mark-read-btn" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>

      <div className="notification-filters">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => filterNotifications("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === "unread" ? "active" : ""}`}
          onClick={() => filterNotifications("unread")}
        >
          Unread
        </button>
        <button
          className={`filter-btn ${activeFilter === "votes" ? "active" : ""}`}
          onClick={() => filterNotifications("votes")}
        >
          Votes
        </button>
        <button
          className={`filter-btn ${activeFilter === "comments" ? "active" : ""}`}
          onClick={() => filterNotifications("comments")}
        >
          Comments
        </button>
        <button
          className={`filter-btn ${activeFilter === "reactions" ? "active" : ""}`}
          onClick={() => filterNotifications("reactions")}
        >
          Reactions
        </button>
        <button
          className={`filter-btn ${activeFilter === "follows" ? "active" : ""}`}
          onClick={() => filterNotifications("follows")}
        >
          Follows
        </button>
      </div>

      <div className="notifications-list">
        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)
        ) : (
          <div className="no-notifications">
            <i className="fas fa-bell-slash"></i>
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
