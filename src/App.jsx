import { useState, useEffect, React } from 'react'
import './App.css'
import { useRoutes, Link } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import ReadPosts from './pages/ReadPosts'
import PostInfo from './pages/PostInfo'
import WelcomePage from './pages/WelcomePage'
import Navbar from './components/Navbar'

function App() {
  const posts = []

  let element = useRoutes([
    {
      path: "",
      element:<WelcomePage />
    },
    {
      path: "/home",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"home/create",
      element: <CreatePost />
    },
    {
      path: "home/post/:id",
      element:<PostInfo data={posts} />
    }
  ]);

  return (
    <>
      <Navbar />
      <div>
        <h2>SimsSocial</h2>
      </div>
      {element}
    </>
  )
}

export default App
