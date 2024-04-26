import { useState, useEffect, React } from 'react'
import './App.css'
import { useRoutes, Link } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import ReadPosts from './pages/ReadPosts'
import PostInfo from './pages/PostInfo'
import WelcomePage from './pages/WelcomePage'
import Navbar from './components/Navbar'
import EditPost from './pages/EditPost'

function App() {

  let element = useRoutes([
    {
      path: "",
      element:<ReadPosts />
    },
    {
      path:"/create",
      element: <CreatePost />
    },
    {
      path: "/post/:id",
      element:<PostInfo />
    },
    {
      path: "/edit/:id",
      element:<EditPost />
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
