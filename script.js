// code for showing menu
function toggleMenu() {
    var nav = document.querySelector("nav");
    var navMenuImg = document.querySelector(".navMenu img"); // Select the menu icon image

    if (nav.style.display === "block") {
        nav.style.display = "none";
        navMenuImg.style.transform = "rotate(0deg)"; // puts back to normal when menu closes
    } else {
        nav.style.display = "block";
        navMenuImg.style.transform = "rotate(90deg)"; // rotates menu icon when open
    }
}
// only runs when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // event listener for clicking register link
    document
        .getElementById("showRegisterForm")
        .addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default anchor click behavior
            var loginFormContainer =
                document.getElementById("loginFormContainer"); // select both form containers
            var registerFormContainer = document.getElementById(
                "registerFormContainer"
            );

            // Toggle visibility
            if (
                registerFormContainer.style.display === "none" ||
                registerFormContainer.style.display === ""
            ) {
                registerFormContainer.style.display = "block"; // show  register form
                loginFormContainer.style.display = "none"; // hide login form
            } else {
                registerFormContainer.style.display = "none"; // show  register form
                loginFormContainer.style.display = "block"; // hide login form
            }
        });

    // Event listener for the close button
    document
        .getElementById("closeButton")
        .addEventListener("click", function () {
            window.close(); // close the page
        });
});

function login() {
    document.getElementById("registerLink").style.display = "none"; // hides register if login attempted 

    fetch("test.json") // path to json file
        .then((response) => response.json())
        .then((credentials) => {
            // get input from login form
            var usernameInput = document.getElementById("username").value;
            var passwordInput = document.getElementById("password").value;

            if (
                // compare input with json
                usernameInput === credentials.username &&
                passwordInput === credentials.password
            ) {
                document.getElementById("loginForm").style.display = "none"; // Hide the login form
                document.getElementById("loggedInContent").style.display =
                    "block"; // Show logged-in content
            } else {
                alert("Invalid username or password!");
                document.getElementById("registerLink").style.display = "block"; // Optionally show the link again if login fails
            }
        })
        .catch((error) => {
            console.error("Error loading the credentials:", error);
            document.getElementById("registerLink").style.display = "block"; // Optionally show the link again if there's an error fetching credentials
        });
}

// validate inputs before the timer can start
function validateInputsAndStartTimer() {
    var sessionName = document.getElementById('sessionName').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var timerInput = document.getElementById('timerInput').value;
    // remove whitespace from words
    if (!sessionName || !subject) { // check if empty
        alert('Please fill in all fields.');
        return; // exit if fails
    }

    var timerMinutes = parseInt(timerInput); // parse timer input
    if (isNaN(timerMinutes) || timerMinutes <= 0) { // validate
        alert('Please enter a valid positive integer for the timer.');
        return; // exit if invalid
    }
    // start timer if all is correct
    startTimer(timerMinutes, sessionName, subject);  // Now start the timer with all required info
}
        
// timer function
function startTimer() {
    var timerInput = document.getElementById('timerInput').value;
    var timerMinutes = parseInt(timerInput);
    
    if (isNaN(timerMinutes) || timerMinutes <= 0) { // validate its a number
        alert('Please enter a valid positive integer for the timer.');
        return; // exit if not
    }

    var timerDuration = timerMinutes * 60 * 1000; //duration in milliseconds
    var startTime = Date.now();
    var endTime = startTime + timerDuration;
        // setup for circle graphic with text
    var progressCircle = document.getElementById('progressCircle');
    var progressText = document.getElementById('progressText');
    progressCircle.style.strokeDashoffset = 565; // reset progress

    var timerInterval = setInterval(function() { // timer update function
        var now = Date.now();
        //
        var elapsed = now - startTime;
        var progress = (elapsed / timerDuration) * 100;
        var offset = (565 * (1 - (elapsed / timerDuration)));
        // update circle based off time
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = Math.floor(progress) + '%';

        // change colour over time
        var greenToRed = 120 * (1 - (elapsed / timerDuration)); // 120 is green hue, 0 is red hue
        progressCircle.style.stroke = `hsl(${greenToRed}, 100%, 50%)`;
        // check if timer has finished
        if (now >= endTime) {
            clearInterval(timerInterval); // end timer
            progressCircle.style.strokeDashoffset = 0;
            progressText.textContent = '100%';
            progressCircle.style.stroke = 'red'; // set to red when done
        }
    }, 100);
}
// add event listen to start button
document.getElementById('startButton').addEventListener('click', startTimer);

function exportToJsonFile() { // exports session data as JSON
    var sessionName = document.getElementById('sessionName').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var timerMinutes = document.getElementById('timerInput').value.trim();

    // create a JSON object
    var jsonData = {
        sessionName: sessionName,
        subject: subject,
        durationMinutes: timerMinutes
    };

    // convert the object to a string
    var dataStr = JSON.stringify(jsonData);

    //create a data URI specifying its JSON
    var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    // trigger the download
    var linkElement = document.createElement('a'); // initate download
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'sessionData.json');
    linkElement.click(); // makes the user download the JSON
}
    // reset the timer fields
function resetTimerSettings() {
    // clear inputs
    document.getElementById('sessionName').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('timerInput').value = '';

    // reset the circle and text display
    var progressCircle = document.getElementById('progressCircle');
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = 565; 
    }

    var progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = '0%'; // reset the text back to 0%
    }
}
