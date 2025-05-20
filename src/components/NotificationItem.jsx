import { Link } from "react-router-dom"
import "../styles/NotificationItem.css"

const NotificationItem = ({ notification }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const renderNotificationContent = () => {
    switch (notification.type) {
      case "vote":
        return (
          <Link to={`/poll/${notification.pollId}`} className="notification-link">
            <img
              src={notification.userAvatar || "/placeholder.svg"}
              alt={notification.username}
              className="notification-avatar"
            />
            <div className="notification-content">
              <p>
                <span className="username">{notification.username}</span> voted on your poll: "{notification.pollTitle}"
              </p>
              <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
            </div>
          </Link>
        )

      case "comment":
        return (
          <Link to={`/poll/${notification.pollId}`} className="notification-link">
            <img
              src={notification.userAvatar || "/placeholder.svg"}
              alt={notification.username}
              className="notification-avatar"
            />
            <div className="notification-content">
              <p>
                <span className="username">{notification.username}</span> commented on your poll: "
                {notification.comment}"
              </p>
              <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
            </div>
          </Link>
        )

      case "reaction":
        return (
          <Link to={`/poll/${notification.pollId}`} className="notification-link">
            <img
              src={notification.userAvatar || "/placeholder.svg"}
              alt={notification.username}
              className="notification-avatar"
            />
            <div className="notification-content">
              <p>
                <span className="username">{notification.username}</span> reacted with {notification.reaction} to your
                poll
              </p>
              <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
            </div>
          </Link>
        )

      case "follow":
        return (
          <Link to={`/profile/${notification.userId}`} className="notification-link">
            <img
              src={notification.userAvatar || "/placeholder.svg"}
              alt={notification.username}
              className="notification-avatar"
            />
            <div className="notification-content">
              <p>
                <span className="username">{notification.username}</span> started following you
              </p>
              <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
            </div>
            <button className="follow-back-btn">Follow Back</button>
          </Link>
        )

      default:
        return (
          <div className="notification-link">
            <img
              src={notification.userAvatar || "/placeholder.svg"}
              alt={notification.username}
              className="notification-avatar"
            />
            <div className="notification-content">
              <p>{notification.message}</p>
              <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
            </div>
          </div>
        )
    }
  }

  return <div className={`notification-item ${notification.read ? "" : "unread"}`}>{renderNotificationContent()}</div>
}

export default NotificationItem
