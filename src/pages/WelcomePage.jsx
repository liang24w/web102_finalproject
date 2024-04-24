import { useState, useEffect, React } from 'react'
import { useRoutes, Link } from 'react-router-dom'

function WelcomePage() {

  return (
    <>
      <div>
        <h1>Welcome to SimsSocial!</h1>
          <img src="https://assets-staging.ts4quiz.com/shared/plumbob.gif" className="logo" alt="Sims logo" />
        <Link to="/home"><p>See what's happening!</p></Link>
      </div>
    </>
  )
}

export default WelcomePage
