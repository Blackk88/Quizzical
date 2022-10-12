import React from "react";
import { useState, useEffect } from "react"

function TriviaSettings(props) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [categories, setCategories] = useState([])

  // Retrieve trivia categories from API 

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php')
        if (response.status === 200) {
          const categories = await response.json()
          setIsLoaded(true)
          setCategories(categories.trivia_categories)
        } else {
          throw new Error(`Error: ${response.status}`)
        }
      } catch (error) {
        setIsLoaded(true)
        setError(error)
      }
    }
    getCategories()
  }, [])

  // Other trivia settings
  
  const numberOfQuestions = [...Array(11).keys()].map(x => x+5)
  
  // id needs for creating API endpoint using State in TriviaSetting component

  const difficulty = [
    {name: "Easy", id: "easy"},
    {name: "Medium", id: "medium"},
    {name: "Hard", id: "hard"}
  ]

  const type = [
    {name: "Multiple Choice", id: "multiple"},
    {name: "True / False", id: "boolean"}
  ]

  // Generating list of options (reusable function for all settings)
  // ? What is better way to provide "key" 

  function getOptions(group) {
    return group.map((item, index) => (
      <option 
      key={index} 
      value={item.name}
      data-id={item.id}
    >
      {item.name}
    </option>
    ))
  }
  

  if (error) {
    return <h2>Error: {error.message}</h2>
  } else if (!isLoaded) {
    return (
      <div class="loader">
        <div class="loader-wheel"></div>
        <div class="loader-text"></div>
      </div>
    ) 
  } else {
    return (

      <div className={"settings-container"}>
        <div className="title">
          <h1>Quzzical</h1>
          <h1>Quzzical</h1>
        </div>
        
        {/* <label htmlFor="amount">Number of questions:</label> */}
          <select name="amount" id="amount" onChange={props.changeHandler}>
            <option value="Select number of question">Number of questions</option>
            {numberOfQuestions.map(num => <option key={num} value={num} data-id={num}>{num}</option>)}
          </select>

        <select name="category" id="category" onChange={props.changeHandler}>
          <option value="Any Category" data-id=''>Any Category</option> 
          {getOptions(categories)}
        </select>

        <select name="difficulty" id="difficulty" onChange={props.changeHandler}>
          <option value="Any Difficulty" data-id=''>Any Difficulty</option> 
          {getOptions(difficulty)}
        </select>

        <select name="type" id="type" onChange={props.changeHandler}>
          <option value="Any Type" data-id=''>Any Type</option> 
          {getOptions(type)}
        </select>
        <button className={'btn start-btn'} onClick={props.clickHandler}>Start quiz</button>
      </div>
    )
  }
}

export default TriviaSettings