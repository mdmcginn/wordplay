  window.onload =   runit(); 
  
  function runit() {
  var myList = document.querySelector('main');

    fetch('trivia2.json')
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();

    })
    .then(function(questions) {
				 console.log(questions[1].choices);
     for(var i = 0; i < questions.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = '<strong>' + questions[i].question + '</strong>';
        listItem.innerHTML +=' Number: ' + questions[i].questionNumber + '.';
        listItem.innerHTML +=' Next: <strong>' + questions[i].next + '</strong>';
							  console.log(myList);
        myList.appendChild(listItem);
      }
    })
    .catch(function(error) {
      var p = document.createElement('p');
      p.appendChild(
        document.createTextNode('Error: ' + error.message)
      );
      document.body.insertBefore(p, myList);
    });
  }