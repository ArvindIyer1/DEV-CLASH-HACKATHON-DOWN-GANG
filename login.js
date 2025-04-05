document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.getElementById('signupLink');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Here you would typically make an API call to your backend
            console.log('Login attempt with:', { email, password });
            
            // Simulate successful login
            alert('Login successful!');
            // Redirect to dashboard or home page
            // window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    });

    // Google Sign-in button click handler
    document.querySelector('.google-btn').addEventListener('click', () => {
        // Implement Google Sign-in logic here
        console.log('Google Sign-in clicked');
        // window.location.href = '/auth/google';
    });

    // Signup link click handler
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Redirect to signup page
        // window.location.href = '/signup';
        console.log('Redirect to signup page');
    });
}); 