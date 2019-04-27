import React from 'react'
import { BrowserRouter as Router, Route, Link, HashRouter } from 'react-router-dom'
import ReactArchitecture from './pages/ReactArchitecture'
import JavascriptSyntaxGuide from './pages/JavascriptSyntaxGuide'


function App() {
  return (
    <div>
      <header className="text-center gradient p-6">
        <h1 className="text-white mt-5 text-4xl font-bold"> Web Guide & Tips</h1>
      </header>
      <div className="flex items-center justify-center">
        <div className="w-1000 flex mt-12">
          <nav className="flex flex-col w-250 min-w-250">
            <p className="font-bold mb-3"> JAVASCRIPT </p>
            <Link to="/" className="font-regular text-dolphin-blue mb-2 no-underline hover:underline">React Architecture</Link>
            <Link to="/javascript-syntax-guide" className="font-regular text-dolphin-blue mb-2 no-underline hover:underline">Javascript Syntax Guide</Link>
            <p className="font-bold mt-3 mb-3"> CSS </p>
          </nav>
          <Route exact path="/" component={ ReactArchitecture } />
          <Route path="/javascript-syntax-guide" component={ JavascriptSyntaxGuide } />
        </div>
      </div>
    </div>
  );
}

export default App
