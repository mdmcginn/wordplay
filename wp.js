  window.onload =   getQuestions('trivia',0); 
  
function getQuestions(quizType,nextSource) {
  let currentQuestion = document.querySelector('main');
    filenm = quizType + nextSource  + ".json";
    fetch('trivia2.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();

    })
    .then(function(questions) {
     for(let i = 0; i < questions.length; i++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + questions[i].question + '</strong>';
        listItem.innerHTML +=' Number: ' + questions[i].questionNumber + '.';
        listItem.innerHTML +=' Next: <strong>' + questions[i].next + '</strong>';
        currentQuestion.appendChild(listItem);
      }
    })
    .catch(function(error) {
      const p = document.createElement('p');
      p.appendChild(
        document.createTextNode('Error: ' + error.message)
      );
      document.body.insertBefore(p, myList);
    });
  }