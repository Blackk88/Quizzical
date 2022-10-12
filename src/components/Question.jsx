import React from "react";

// function for decoding format of questions and answers

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function Question(props) {
  const {question, allAnswers, clickHandler, id, answerState, showCorrect} = props
  


  return (
    <div className={'question-container'}>
      <h4 className={'question'}>{htmlDecode(question)}</h4>
      <div className="answers">
        {allAnswers.map((answer, i) =>(
          <p 
            id={i} 
            key={i} 
            onClick={() => clickHandler(answer, id)} 
            data-question-id={id}
            className={`
                        ${!showCorrect && answerState[i].isSelected ? "selected" : "answer"}
                        ${(showCorrect && answerState[i].isCorrect) ? "correct" : "answer"}
                        ${showCorrect && !answerState[i].isCorrect && answerState[i].isSelected ? "incorrect" : "answer"}
                      `}
          >
            {htmlDecode(answer.answer)}
          </p>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default Question

// ${props.showCorrect && props.answerState[index].isCorrect ? "correct" 
//                         : props.answerState[index].isSelected ? "selected" : "answer"} 
//                         ${props.answerState[index].isSelected && !props.answerState[index].isCorrect ? "incorrect" : ""}