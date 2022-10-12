import React, {useState, useEffect} from "react";
import Question from "./Question";

function Quiz(props) {
  const [updatedQuestionsData, setUpdatedQuestionsData] = useState([])
  const [isSelected, setSelected] = useState([])
  const [finished, setFinished] = useState(false)
  const [showCorrect, setShowCorrect] = useState(false)


  useEffect(() => {
    // Merge two arrays of answers into new one
    const newData = props.questionsData.map(item => {
      return {...item, allAnswers: shuffleAnswers(item.incorrect_answers, item.correct_answer)}
    })
  
    // shuffle indexes in new array of answers
    function shuffleAnswers(incorrectAnswers, correctAnswer) {
      const allAnswers = [...incorrectAnswers, correctAnswer]
      
      let currentIndex = allAnswers.length
      let randomIndex
  
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
  
        [allAnswers[currentIndex], allAnswers[randomIndex]] = [allAnswers[randomIndex], allAnswers[currentIndex]]
      }

      const newAnswers = []
      allAnswers.map(item => {
        newAnswers.push({answer: item, isSelected: false, isCorrect: item === correctAnswer})})
      
      return newAnswers
    }
    
    setSelected(newData.map(item => item.allAnswers)) // set initial state of answers
    setUpdatedQuestionsData(newData)
    
  },[props.QuestionData])


  function selectAnswer(answerData, questionId) {
    if (!showCorrect) {
      setSelected(prevState => {
        const answers = prevState[questionId].map(answer => { // answers array for selected question ID 
          if (answerData.answer === answer.answer) {
            return {...answer, isSelected: true}
          } else {
            return {...answer, isSelected: false}
          }
        })
  
    
        const answersArray = prevState.map((question, index) => { // change selected array of answers in allAnswers array
          if (questionId === index) {
            return answers
          } else return question
        })
  
        return answersArray
      })
    }
  }

  // Checking if all of answers are selected

  useEffect(() => {
    setFinished(() => {
      return isSelected.every(item => item.some(item => item.isSelected))
    })
  },[isSelected])



  // TODO Saving stats in localStorage


  function checkAnswers() {
    setShowCorrect(true)
  }


  return (
    <div className={'quiz-container'}>
      {updatedQuestionsData.map((question, index) => (
        <Question 
          key={index}
          id={index}
          question={question.question}
          allAnswers={question.allAnswers}
          answerState={isSelected[index]}
          clickHandler={selectAnswer}
          showCorrect={showCorrect}
          
        />
      ))}
        <div className={'button-container'}>
      {finished && !showCorrect &&
          <button
            className={"btn"}
            onClick={checkAnswers}
          >
            Check answers
          </button>
      }
          {showCorrect && 
          <button
            className={"btn"}
            onClick={props.newGameHandler}
          >
            New game
          </button>}
        </div>
      

        
        {/* {showCorrect &&
          stats.map((item, index) => (
          <div key={index}>
            <h4>{item.categoryName}</h4>
            <p>Questions: {item.numberOfQuestion}</p>
            <p>Correct: {`${(item.isCorrect / item.numberOfQuestion) * 100}%`}</p>

        </div>

          ))} */}
    </div>
  )
}

export default Quiz