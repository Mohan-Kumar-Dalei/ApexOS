// js/auth.js
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('osUser', JSON.stringify({ username, password }));
    Toastify({
        text: "Registration Successful! Now login.",
        duration: 2000,
        gravity: "top",
        position: "center",
        backgroundColor: "#16a34a",
        stopOnFocus: true,
        style: { color: '#fff', fontWeight: 'bold' }
    }).showToast();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1800);
});

// --- Login Spinner Logic: Only show after successful login ---
(function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            const spinner = document.getElementById('loginSpinner');
            if (spinner) spinner.classList.add('hidden'); // Always hide first
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            // Fetch registered user from localStorage
            const storedUser = localStorage.getItem('osUser');
            let errorMsg = '';
            if (!username || !password) {
                errorMsg = 'Please enter username and password.';
            } else if (!storedUser) {
                errorMsg = 'No user registered. Please register first!';
            } else {
                try {
                    const userObj = JSON.parse(storedUser);
                    if (username !== userObj.username) {
                        errorMsg = 'Wrong user id.';
                    } else if (password !== userObj.password) {
                        errorMsg = 'Wrong password.';
                    }
                } catch (err) {
                    errorMsg = 'Corrupted user data. Please register again.';
                }
            }
            if (errorMsg) {
                Toastify({
                    text: errorMsg,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#dc2626",
                    stopOnFocus: true,
                    style: { color: '#fff', fontWeight: 'bold' }
                }).showToast();
                return;
            }
            // Passed validation, show spinner and proceed
            setTimeout(() => {
                if (spinner) spinner.classList.remove('hidden');
                setTimeout(() => {
                    if (spinner) spinner.classList.add('hidden');
                    document.getElementById('loginSound').play();
                    Toastify({
                        text: "Login Successful!",
                        duration: 2000,
                        gravity: "top",
                        position: "center",
                        backgroundColor: "#16a34a",
                        stopOnFocus: true,
                        style: { color: '#fff', fontWeight: 'bold' }
                    }).showToast();
                    setTimeout(() => {
                        localStorage.setItem('apexShowWelcome', '1');
                        localStorage.setItem('apexLoggedIn', '1');
                        window.location.href = 'welcome.html';
                    }, 1800);
                }, 1500);
            }, 300);
        });
    }
})();
