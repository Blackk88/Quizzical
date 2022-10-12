import React, { useState, useEffect } from "react";
import TriviaSettings from "./components/TriviaSettings";
import Quiz from "./components/Quiz";
import index from "./index.css"

function App() {
  const [settings, setSettings] = useState( {amount: {queryString: 5}} ) // default settings: fetch 5 question of any type and category 
  const [isStarted, setStarted] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [questionsData, setQuestionsData] = useState()
  
  // event handler for TriviaSettings changes

  function settingsHandler(event) {
    const { options, selectedIndex, value, dataset, name } = event.target

    setSettings(prevSettings => {
      const settings = {
        value: value,
        queryString: `${options[selectedIndex].dataset.id}`
      }

      return { ...prevSettings, [name]: settings }
    })
  }

  // Generating API Url using current settings
  
  let fetchUrl = `https://opentdb.com/api.php?amount=`
  
  for (const [key, value] of Object.entries(settings)) {
    if (key === "amount") {
      fetchUrl += value.queryString
    } else {
      fetchUrl +=(`&${key}=${value.queryString}`)
    }
  }

  async function startQuiz() {
    setStarted(true)
    try {
      const response = await fetch(fetchUrl)
      const questions = await response.json()
      if (questions.response_code !== 0) {
        throw new Error(`Something went wrong, try again (response code:${questions.response_code})`)
      } else {
        setLoaded(true)
        setQuestionsData(questions.results)
      }
      
    } catch (error) {
      setLoaded(true)
      setError(error)
    }
  }
    
  function newGame() {
    setStarted(false)
    setLoaded(false)

  }


  
  return (
    <div className={'app-container'}>
      {!isStarted &&
      <div className={"setting-wrapper"}>
        <TriviaSettings
          changeHandler={settingsHandler}
          clickHandler={startQuiz}
        />
        
      </div>
      }

      {isStarted && isLoaded &&
      <Quiz
        questionsData={questionsData}
        newGameHandler={newGame}
      />
      }

      {error &&  <div>error.message</div>}
      {!isLoaded && isStarted &&
        <div class="loader">
          <div class="loader-wheel"></div>
          <div class="loader-text"></div>
        </div>
      }
    </div>
  )
}







export default App