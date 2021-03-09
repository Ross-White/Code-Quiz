// Questions are declared in global scope

// Page is loaded
    // High scores element is shown on page
        // High scores are retrieved from local storage
    // Start game button is shown

// Button click starts quiz
    // High scores element is hidden
    // Score is set to zero
        // Score element is shown on page
    // Timer resets to 60 seconds and starts counting down
            // Timer function checks if =0 every second
                // If timer =0 quiz ends. gemeOver function is called
        // Timer element is shown on page
    // Question element is shown with question and answers displayed

// Question answered
    // If incorrect, 10 seconds is subtracted from clock
    // Else. If correct, score is increased by 1
        // If all questions are answered, then end quiz. gameOver function is called.
    // Else. Next question appears
    
// gameOver function
    // Question, timer, score sesctions are hidden
    // User initials input box is shown
        // on Button clock, Initials and score are saved to local storage
            // Resets back to initial page