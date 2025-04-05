// This is for auth.js file - keeps track of where to go after login

// Check if user is logged in
function checkAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        resolve(true);
      } else {
        // No user is signed in
        resolve(false);
      }
    }, (error) => {
      reject(error);
    });
  });
}

// Function to handle "Learn More" clicks
async function learnMoreClick(servicePage) {
  try {
    const isLoggedIn = await checkAuth();
    if (isLoggedIn) {
      // User is logged in, redirect to service page
      window.location.href = servicePage;
    } else {
      // User is not logged in, redirect to login page
      // Store the page they wanted to visit
      localStorage.setItem('redirectAfterLogin', servicePage);
      // Add a direct parameter to prevent auto-redirect if already logged in
      window.location.href = 'login.html?direct=true';
    }
  } catch (error) {
    console.error("Authentication error:", error);
    // Default to login page on error
    window.location.href = 'login.html?direct=true';
  }
}

// Add this to all "Learn More" buttons
document.addEventListener('DOMContentLoaded', function() {
  // Get all "Learn More" buttons in services section
  const learnMoreButtons = document.querySelectorAll('.service-card .btn-primary');
  
  // Add click handler to each button
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const servicePage = this.getAttribute('href');
      learnMoreClick(servicePage);
    });
  });
});