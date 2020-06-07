	var start = performance.now();

// code being timed...


	   	let buttonString = "<article>";
	  	let answer;
	  	let question;
	  	let questionNext = 1;
	  	let nextSource = 0;
	  	let answerCount = 0;
	  	//var h, p, i;
		quiztype = "trivia";
	  	let jsonObj = JSON.parse(document.getElementById('triviaJSON').innerHTML);
	  	// console.log(jsonObj);
	  	let newMessagesArray = {};
	  	let messagesArray = fixJSON(jsonObj);
		console.log(messagesArray);
	  	//	var messagesArray = jsonObj.results;
	  	messagesArray.current = 0;
	  	let selectedAnswer = "";
	  	let score = 0;
	  	let newScore = 0;
		let hPause = 1;  // for pausing to read correct ansswer and aFact
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
	  	document.addEventListener("DOMContentLoaded", function() {
	  	    //	function getQuestions(){
	  	    //				console.log(getQuestions("trivia3.json"));
	  	    // Gets URL parameter for q 
	  	    const searchParams = new URLSearchParams(window.location.search); //?q=123
	  	    questionParam = Number(searchParams.get("q"));
	  	    console.log(questionParam);
	  	    //	if(Number.isNaN(questionParam))|| (typeof questionParam != 'undefined')) {
	  	    if ((Number.isNaN(questionParam)) || (typeof questionParam == 'undefined') || (questionParam === 0)) {
	  	        questionParam = 1;
	  	    }
	  	    console.log(questionParam);
	  	    quizQuestion = messagesArray[questionParam - 1];
	  	    // getQuestions("trivia5.json");
	  	    //	
	  	    console.log(quizQuestion);
	  	    questionNext = quizQuestion.next;
	  	    console.log(questionNext);
	  	    question = makeQuestion(quizQuestion)[0];
	  	    document.getElementById("main").innerHTML = question;
	  	});

      document.onclick = function(event) {
        const target = event.target || event.srcElement;
//		const target = event.currentTarget;
		console.log(event.composedPath());
		console.log(event.composedPath()[1].className);
		console.log(event.type);
		console.log(event.target.classList);
// Allows for some questions to be answered by clicking on images instead of buttons		
        if (event.target.nodeName === "BUTTON" || event.target.nodeName === "IMG" ) {
          answerCount++;
 //         selectedAnswer = target.innerHTML;
 //   composedPath code gets the classname from the parent/button for the image
          if (event.target.className === "c" || event.composedPath()[1].className === "c") {
            newScore = 10;
//			hWait = 2 * hPause; 
		//	target.style.background = '#B0CF1C';
          } else {
            newScore = 0;
//			hWait = 2 * hPause;
          }
//		  	checkStuff = "<strong class='c" + newScore + "'><br />" + checkAnswer + "</strong>";
//			document.getElementById("check").innerHTML = "<p>" + checkStuff + "<\/p>" ;
			document.getElementById("intro").innerHTML = aFact;
//          nextQuestion(answerCount);
		console.log(questionNext);
//		setTimeout(function(){   // for pausing to read correct answer and aFact
			nextQuestion(questionNext,aFact);  
//			}, hWait);
        }
      };

function getQuestions(nextSource) {
	console.log(nextSource);
    filenm = quiztype + nextSource  + ".json";
	console.log(filenm);
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filenm, true); 
	console.log(xobj);
    xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
     // Required use of fixJSON callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              jsonObj = JSON.parse(xobj.responseText);
              fixJSON(jsonObj);
			  console.log(jsonObj);
        } 
    };
    xobj.send(null);
}

function countProperties(jsonObj){
    let length = 0;
    if(typeof jsonObj != 'object'){
        return false;
    }
    for(var i in jsonObj) {
       length++;
    }
    return length;
}

function fixJSON(jsonObj) {
   console.log(jsonObj); 
	newMessagesArray = jsonObj;
	    console.log(newMessagesArray);
	return newMessagesArray;
};
	  
		Array.prototype.nextItem = function(i) {
			this.current = (this.current + i) % this.length;
			return this[this.current];
		};
		
function makeQuestion(question) {
	      console.log(question);
		  if(question.fact) {
			aFact = question.fact;
			} else { aFact = "";
			}
          buttonString = "<section id='" + question.questionNumber + "'>" + "<h1>" + question.question + "<\/h1><div id='check'><\/div>";
		 // buttonString = "<section id='" + question.questionNumber + "'>" + "<p>" + question.questionNumber + "</p>"+ "<h1>" + question.question + "<\/h1>";
        questionNext = question.next;
        let answers = [];
//		console.log(question);
        for (var i = question.choices.length - 1; i >= 0; i -= 1) {
          //  console.log(answers[i]);
          if (i === 0) {
            answer = "<button class='c'>" + question.choices[i] + "<\/button>";
			checkAnswer = question.choices[i];
			checkQuestion = question.question;
          } else {
            answer = "<button class='" + classes[i] + "'>" + question.choices[i] + "<\/button>";
          }
          answers.push(answer);
        }
        shuffle(answers);
        //console.log(answers);                         
        buttonString += answers.join("");
        buttonString += "<\/section>" + "\n";
        //console.log(buttonString);
		answerArray = [buttonString,question.next];
        return answerArray;
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
	  
	  function getQuestion(questionNumber) {
        return messagesArray.filter(
         function(messagesArray){ return messagesArray.questionNumber == questionNumber }
      );
     }


	function nextQuestion(questionNext,aFact) {
				document.getElementById('header').className = "slim";
	    console.log(questionNext);
		console.log(nextSource);
			document.getElementById("check").innerHTML = "";
            document.getElementById("next").innerHTML = "Next";
			checkStuff = checkQuestion +" <strong class='c" + newScore + "'>" + checkAnswer + "</strong><br />";
			document.getElementById("intro").innerHTML = checkStuff + "<span>" + aFact + "</span>";
            document.getElementById("main").style.display = 'block';
	    score = score + newScore;
	    console.log(answerCount);
//       if (typeof messagesArray === 'undefined') { 
//	      messagesArray = newMessagesArray;
//	    }
//	    console.log(Math.round(messagesArray.length/2));
	    if (answerCount === Math.round(messagesArray.length/2)) {
			console.log(nextSource);
			nextSource = (nextSource + 1);
//			nextSource = Math.ceil(answerCount/10)*10;
//			nextSource = Math.ceil((questionNext+2)/10)*10;
//			nextSource = (questionNext - 1) + Math.round(messagesArray.length/2);
			console.log(nextSource);
			console.log(getQuestions(nextSource));
			newMessagesArray = getQuestions(nextSource);
			console.log(nextSource);
			console.log(messagesArray);
			console.log(newMessagesArray);
        }
		console.log(messagesArray.length);
		console.log(answerCount - 1);
        if (answerCount  === messagesArray.length) { 
			console.log(messagesArray);
			answerCount = 0; 
		    messagesArray = newMessagesArray;
//			console.log(newMessagesArray);
        }
		  	console.log(messagesArray);
			console.log(answerCount);
		//	quizQuestion = messagesArray[getQuestion("nextthing")];
			quizQuestion = messagesArray[answerCount];
			console.log(quizQuestion); 
//			timeoutID = window.setTimeout("showAnswer(quizQuestion)", 20000);
			answerArray = makeQuestion(quizQuestion);
			question = answerArray[0];
			questionNext = answerArray[1];
			console.log(questionNext);
			// Displays question and answer choices
			document.getElementById("main").innerHTML = question;	
			// document.getElementById("result").innerHTML = "Score: " + score + " Count: " + answerCount;			
			document.getElementById("result").innerHTML = score;
			newScore = 0;    
	}
	
let duration = performance.now() - start;
