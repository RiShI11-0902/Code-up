import React from 'react'
import Navbar from './Navbar'

const About = () => {
    return (
        <>
        <Navbar/>
            <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Our Multiplayer Quiz App</h1>
      <p className="text-lg mb-6">
        Welcome to our multiplayer quiz app! We're thrilled to have you here. Our app is designed to provide an engaging and competitive experience for players of all ages. Whether you're a trivia enthusiast or just looking for some fun, our app has something for everyone.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What Makes Us Unique</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Real-Time Multiplayer Gameplay</li>
          <li className="mb-2">Diverse Categories</li>
          <li className="mb-2">Dynamic Question Database</li>
          <li className="mb-2">Social Features</li>
        </ul>
      </div>
      <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
      <ol className="list-decimal list-inside mb-6">
        <li className="mb-2">Sign Up or Log In</li>
        <li className="mb-2">Choose a Quiz</li>
        <li className="mb-2">Answer Questions</li>
        <li className="mb-2">Compete and Win</li>
        <li className="mb-2">Climb the Leaderboard</li>
      </ol>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-lg">
          Have questions, feedback, or suggestions? We'd love to hear from you! Feel free to reach out to our support team at <a href="mailto:rbagade911@gmail.com" className="text-blue-500 hover:underline">rbagade911@gmail.com</a> with any inquiries.
        </p>
        <p className='text-lg'>
            Or Contribute to us, here: <a href="https://github.com/RiShI11-0902/Code-up"> <span className='text-blue-500 font-bold'>Github Link</span></a>
        </p>
      </div>
    </div>
        </>
    )
}

export default About