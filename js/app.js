// app.js

function showLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('register').style.display = 'none';
}

function showRegistration() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('register').style.display = 'block';
}

document.getElementById('registerForm').addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  // Simulate adding user to a database
  console.log(`User registered: ${username}, Role: ${role}`);
  alert('Registration successful. Please log in.');
  showLogin();
  event.target.reset();
});

document.getElementById('loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  // Simulate user login
  console.log(`User logged in: ${username}, Role: ${role}`);
  if (role === 'donor') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('donorDashboard').style.display = 'block';
  } else if (role === 'receiver') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('receiverDashboard').style.display = 'block';
  }
});
