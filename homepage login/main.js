// Function to handle course button clicks
function handleCourseButton(courseTitle, progress) {
  // Check if course is in progress or not started
  if (progress > 0) {
    alert(`Continuing "${courseTitle}" course. Current progress: ${progress}%`);
    // Here you would redirect to the course content or resume where they left off
  } else {
    alert(`Starting "${courseTitle}" course. Good luck!`);
    // Here you would redirect to the beginning of the course
  }
  
  // In a real app, you would save this interaction to the user's profile
  console.log(`User interacted with course: ${courseTitle}`);
}

// Function to handle challenge tracking
function updateChallengeProgress(challengeId, newProgress) {
  const progressBar = document.querySelector(`#${challengeId} .progress-bar`);
  const progressText = document.querySelector(`#${challengeId} small`);
  
  progressBar.style.width = `${newProgress}%`;
  
  // Update text based on challenge type
  if (challengeId === 'expenseChallenge') {
    const days = Math.round((newProgress / 100) * 7);
    progressText.textContent = `${days}/7 days completed`;
  } else if (challengeId === 'courseChallenge') {
    const courses = Math.round((newProgress / 100) * 2);
    progressText.textContent = `${courses}/2 courses completed`;
  } else if (challengeId === 'savingsChallenge') {
    if (newProgress > 0) {
      progressText.textContent = 'In progress';
    } else {
      progressText.textContent = 'Not started';
    }
  }
}

// Function to handle rewards redemption
function redeemReward(rewardName, pointsCost) {
  const currentPoints = parseInt(document.querySelector('.card-body h2').textContent);
  
  if (currentPoints >= pointsCost) {
    const newPoints = currentPoints - pointsCost;
    document.querySelector('.card-body h2').textContent = newPoints;
    
    // Update progress bar and text
    const levelProgress = Math.min(Math.round((newPoints % 1000) / 10), 100);
    document.querySelector('.progress-bar.bg-warning').style.width = `${levelProgress}%`;
    document.querySelector('.d-flex.justify-content-between span:last-child').textContent = 
      `${newPoints % 1000} / 1000 points to Level ${Math.floor(newPoints / 1000) + 3}`;
    
    alert(`You've successfully redeemed: ${rewardName}`);
  } else {
    alert(`Not enough points to redeem ${rewardName}. You need ${pointsCost - currentPoints} more points.`);
  }
}

// Function to handle quiz submission
function submitQuiz() {
  const selectedAnswer = document.querySelector('input[name="quizQuestion"]:checked');
  
  if (!selectedAnswer) {
    alert("Please select an answer to submit the quiz.");
    return;
  }
  
  // Check if the answer is correct (in this case, the 50/30/20 rule is about allocating income)
  if (selectedAnswer.id === 'answer2') {
    alert("Correct! You've earned 50 points!");
    
    // Update points
    const currentPoints = parseInt(document.querySelector('.card-body h2').textContent);
    document.querySelector('.card-body h2').textContent = currentPoints + 50;
    
    // Update progress
    updateLevelProgress(currentPoints + 50);
    
  } else {
    alert("Sorry, that's not correct. The 50/30/20 rule refers to allocating 50% of income to needs, 30% to wants, and 20% to savings.");
  }
  
  // Disable the quiz after submission
  document.querySelectorAll('input[name="quizQuestion"]').forEach(input => {
    input.disabled = true;
  });
  document.querySelector('.card:last-child .btn').disabled = true;
  document.querySelector('.card:last-child .btn').textContent = "Quiz Completed";
}

// Function to update level progress
function updateLevelProgress(points) {
  const level = Math.floor(points / 1000) + 2;
  const pointsToNextLevel = 1000 - (points % 1000);
  const progressPercent = Math.min(Math.round(((points % 1000) / 1000) * 100), 100);
  
  // Update progress bar
  document.querySelector('.progress-bar.bg-warning').style.width = `${progressPercent}%`;
  
  // Update level text
  document.querySelector('.d-flex.justify-content-between .badge').textContent = 
    `Level ${level}: ${getLevelTitle(level)}`;
  
  // Update points to next level
  document.querySelector('.d-flex.justify-content-between span:last-child').textContent = 
    `${points % 1000} / 1000 points to Level ${level + 1}`;
}

// Helper function to get level title
function getLevelTitle(level) {
  const titles = [
    "Financial Novice",
    "Finance Enthusiast",
    "Money Manager",
    "Financial Strategist",
    "Wealth Builder"
  ];
  
  return titles[Math.min(level - 1, titles.length - 1)];
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Course buttons
  const courseButtons = document.querySelectorAll('.learn-card .btn');
  courseButtons.forEach(button => {
    const card = button.closest('.learn-card');
    const courseTitle = card.querySelector('.card-title').textContent;
    const progressBar = card.querySelector('.progress-bar');
    const progress = parseInt(progressBar.style.width) || 0;
    
    button.addEventListener('click', function() {
      handleCourseButton(courseTitle, progress);
    });
  });
  
  // Add IDs to challenges for easier reference
  const challenges = document.querySelectorAll('.border-start.border-3');
  challenges[0].id = 'expenseChallenge';
  challenges[1].id = 'courseChallenge';
  challenges[2].id = 'savingsChallenge';
  
  // Reward buttons
  const rewardButtons = document.querySelectorAll('.card:nth-of-type(3) .btn-outline-light');
  const rewardTitles = document.querySelectorAll('.card:nth-of-type(3) h6');
  
  rewardButtons.forEach((button, index) => {
    const pointsCost = parseInt(button.textContent.match(/\d+/)[0]);
    const rewardName = rewardTitles[index].textContent;
    
    button.addEventListener('click', function() {
      redeemReward(rewardName, pointsCost);
    });
  });
  
  // Quiz submit button
  const quizButton = document.querySelector('.card:last-child .btn');
  quizButton.addEventListener('click', submitQuiz);
});