// Hero section button interaction
document.addEventListener("DOMContentLoaded", () => {
  const heroBtn = document.querySelector(".hero-btn");
  if (heroBtn) {
    heroBtn.addEventListener("click", () => {
      alert("Welcome to FinMate! Your smarter way to manage money.");
      window.location.href = "signup.html"; // redirect to signup
    });
  }

  // Google button interaction (login or signup)
  const googleBtns = document.querySelectorAll(".google-btn");
  googleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Redirecting to Google Sign-In...");
      // Here you'd integrate Google Sign-In SDK
    });
  });
});
