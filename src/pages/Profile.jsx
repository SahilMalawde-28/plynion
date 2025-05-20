"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import PollCard from "../components/PollCard"
import { useAuth } from "../contexts/AuthContext"
import { dummyPolls } from "../data/dummyData"
import "../styles/Profile.css"

const Profile = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState("polls")
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    bio: currentUser.bio || "",
    avatar: currentUser.avatar,
  })

  const userPolls = dummyPolls.filter((poll) => poll.userId === currentUser.id)
  const votedPolls = dummyPolls.filter(
    (poll) => poll.votes && poll.votes.some((vote) => vote.userId === currentUser.id),
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleSaveProfile = () => {
    // In a real app, this would update Firebase
    setEditMode(false)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "polls":
        return (
          <div className="profile-polls">
            {userPolls.length > 0 ? (
              userPolls.map((poll) => <PollCard key={poll.id} poll={poll} />)
            ) : (
              <div className="no-content">
                <i className="fas fa-poll"></i>
                <p>You haven't created any polls yet</p>
                <Link to="/create" className="create-poll-btn">
                  Create Your First Poll
                </Link>
              </div>
            )}
          </div>
        )

      case "voted":
        return (
          <div className="profile-polls">
            {votedPolls.length > 0 ? (
              votedPolls.map((poll) => <PollCard key={poll.id} poll={poll} />)
            ) : (
              <div className="no-content">
                <i className="fas fa-vote-yea"></i>
                <p>You haven't voted on any polls yet</p>
                <Link to="/" className="browse-polls-btn">
                  Browse Polls
                </Link>
              </div>
            )}
          </div>
        )

      case "followers":
        return (
          <div className="profile-users">
            {currentUser.followers && currentUser.followers.length > 0 ? (
              currentUser.followers.map((follower) => (
                <div key={follower.id} className="user-item">
                  <Link to={`/profile/${follower.id}`} className="user-link">
                    <img src={follower.avatar || "/placeholder.svg"} alt={follower.name} className="user-avatar" />
                    <div className="user-info">
                      <h4>{follower.name}</h4>
                      <span>@{follower.username}</span>
                    </div>
                  </Link>
                  <button className="follow-btn">{follower.isFollowing ? "Unfollow" : "Follow"}</button>
                </div>
              ))
            ) : (
              <div className="no-content">
                <i className="fas fa-user-friends"></i>
                <p>You don't have any followers yet</p>
              </div>
            )}
          </div>
        )

      case "following":
        return (
          <div className="profile-users">
            {currentUser.following && currentUser.following.length > 0 ? (
              currentUser.following.map((following) => (
                <div key={following.id} className="user-item">
                  <Link to={`/profile/${following.id}`} className="user-link">
                    <img src={following.avatar || "/placeholder.svg"} alt={following.name} className="user-avatar" />
                    <div className="user-info">
                      <h4>{following.name}</h4>
                      <span>@{following.username}</span>
                    </div>
                  </Link>
                  <button className="follow-btn following">Unfollow</button>
                </div>
              ))
            ) : (
              <div className="no-content">
                <i className="fas fa-user-plus"></i>
                <p>You're not following anyone yet</p>
                <Link to="/" className="find-users-btn">
                  Find Users to Follow
                </Link>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <img src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
          </div>
        </div>

        <div className="profile-info">
          {editMode ? (
            <div className="edit-profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} rows="3"></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
                <button type="button" className="save-btn" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="profile-details">
                <h2>{profileData.name}</h2>
                <span className="username">@{profileData.username}</span>
                {profileData.bio && <p className="bio">{profileData.bio}</p>}
              </div>

              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">{userPolls.length}</span>
                  <span className="stat-label">Polls</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{currentUser.followers?.length || 0}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{currentUser.following?.length || 0}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>

              <button className="edit-profile-btn" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`tab-btn ${activeTab === "polls" ? "active" : ""}`} onClick={() => setActiveTab("polls")}>
          Polls
        </button>
        <button className={`tab-btn ${activeTab === "voted" ? "active" : ""}`} onClick={() => setActiveTab("voted")}>
          Voted
        </button>
        <button
          className={`tab-btn ${activeTab === "followers" ? "active" : ""}`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
        <button
          className={`tab-btn ${activeTab === "following" ? "active" : ""}`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>

      <div className="profile-content">{renderTabContent()}</div>
    </div>
  )
}

export default Profile
