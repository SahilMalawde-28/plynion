"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { dummyUsers } from "../data/dummyData"

// Create the auth context
const AuthContext = createContext()

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext)
}

// Auth provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // This would be replaced with Firebase auth
  function login(email, password) {
    // Simulate login with dummy data
    const user = dummyUsers.find((user) => user.email === email && user.password === password)

    if (user) {
      const { password, ...userWithoutPassword } = user
      setCurrentUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return Promise.resolve(userWithoutPassword)
    }

    return Promise.reject(new Error("Invalid email or password"))
  }

  function register(name, username, email, password) {
    // Simulate registration
    const newUser = {
      id: `user-${dummyUsers.length + 1}`,
      name,
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: "",
      followers: [],
      following: [],
    }

    // In a real app, this would add to Firebase
    setCurrentUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    return Promise.resolve(newUser)
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    return Promise.resolve()
  }

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
