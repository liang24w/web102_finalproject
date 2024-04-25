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
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/create",
      element: <CreatePost />
    },
    {
      path: "/post/:id",
      element:<PostInfo data={posts} />
    }
  ]);

  return (
    <>
      {element}
      <Navbar />
    </>
  )
}

export default App
