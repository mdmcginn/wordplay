 'use strict';


(function() { // Begin scoping function
   window.onload =   getQuestions('trivia',2); 
   	  	let questions = JSON.parse(document.getElementById('triviaJSON').innerHTML);
	   	let buttonString = "<article>";
	  	let questionNext = 1;
	  	let answerCount = 0;
	  	//var h, p, i;
	  	let selectedAnswer = "";
	  	let score = 0;
	  	let newScore = 0;
		let aFact = "";
	  	if (typeof answerCount === 'undefined') {
	  	    answerCount = 0;
	  	}
	  	const classes = ["a", "b", "d", "e","f","g"];
	  	if ("serviceWorker" in navigator) {
	  	    navigator.serviceWorker.register("/sw.js", {
	  	            scope: "/"
	  	        })
	  	        .then(function(reg) {
	  	            // registration worked
	  	            console.log("Registration succeeded. Scope is " + reg.scope);
	  	        }).catch(function(error) {
	  	            // registration failed
	  	            console.log("Registration failed with " + error);
	  	        });
	  	}
		
		      /**
       * Shuffles array in place.
       * @param {Array} a items The array containing the items.
       */
      function shuffle(a) {
        let j, x, i;
        for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
        }
      } 

  
    document.onclick = function(event) {
        const target = event.target || event.srcElement;
		console.log(event.composedPath());
		console.log(event.composedPath()[1].className);
		console.log(event.type);
		console.log(event.target.classList);	
        if (event.target.nodeName === "BUTTON" || event.target.nodeName === "IMG" ) {
          answerCount++;
          if (event.target.className === "c" || event.composedPath()[1].className === "c") {
            newScore = 10;
          } else {
            newScore = 0;
          }
			document.getElementById("intro").innerHTML = aFact;
			nextQuestion(questionNext,aFact);  
        }
      };
  
function getQuestions(quizType,nextSource) {	
    let nextJson = quizType + nextSource  + ".json";
    fetch(nextJson)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function(newQuestions) {
//questions.push(newQuestions);
Array.prototype.push.apply(questions, newQuestions)
	  console.log(questions);
	  nextQuestion(questions,questionNext)
    })
    .catch(function(error) {
      const p = document.createElement('p');
      p.appendChild(
        document.createTextNode('Error: ' + error.message)
      );
	  console.log(error.message);
    });
  }
  
  function nextQuestion(questions,questionNext) {
         let currentQuestion = document.querySelector('main');
  	     let question = questions[questionNext];
		  if(question.fact) {
		    let aFact = question.fact;
			} else { aFact = "";
			}

         let buttonString = "<section id='" + question.questionNumber + "'>" + "<h1>" + question.question + "<\/h1><div id='check'><\/div>";
		 // buttonString = "<section id='" + question.questionNumber + "'>" + "<p>" + question.questionNumber + "</p>"+ "<h1>" + question.question + "<\/h1>";
        questionNext = question.next;
        let answers = [];
	console.log(question);
        for (var i = question.choices.length - 1; i >= 0; i -= 1) {
           console.log(answers[i]);
		   let answer;
          if (i === 0) {
           answer = "<button class='c'>" + question.choices[i] + "<\/button>";
			let checkAnswer = question.choices[i];
			let checkQuestion = question.question;
          } else {
            answer = "<button class='" + classes[i] + "'>" + question.choices[i] + "<\/button>";
          }
          answers.push(answer);
        }
        shuffle(answers);
      console.log(answers);                         
        buttonString += answers.join("");
        buttonString += "<\/section>" + "\n";
      console.log(buttonString);
		let answerArray = [buttonString,question.next];
		document.getElementById("main").innerHTML = buttonString;
		        return answerArray;
     for(let i = 0; i < questions.length; i++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + questions[i].question + '</strong>';
        listItem.innerHTML +=' Number: ' + questions[i].questionNumber + '.';
        listItem.innerHTML +=' Next: <strong>' + questions[i].next + '</strong>';
        currentQuestion.appendChild(listItem);
      }
    }
    
	})();         // End scoping function

  