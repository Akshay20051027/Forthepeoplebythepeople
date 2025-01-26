let db;
const request = indexedDB.open('DisasterReliefDB', 1);

request.onupgradeneeded = event => {
  db = event.target.result;
  db.createObjectStore('donations', { keyPath: 'id', autoIncrement: true });
  db.createObjectStore('needs', { keyPath: 'id', autoIncrement: true });
  db.createObjectStore('users', { keyPath: 'username' });
  db.createObjectStore('responses', { keyPath: 'id', autoIncrement: true });
  console.log("Database setup complete");
};

request.onsuccess = event => {
  db = event.target.result;
  addDefaultDonations();
  console.log("Database opened successfully");
};

request.onerror = event => {
  console.error('IndexedDB error:', event.target.errorCode);
};

function addData(storeName, data) {
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.add(data);
  
  request.onsuccess = () => {
    console.log(`Data added to ${storeName}`);
  };

  request.onerror = () => {
    console.error(`Error adding data to ${storeName}`);
  };
}

function getData(storeName, callback) {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = () => {
    callback(request.result);
  };

  request.onerror = () => {
    console.error(`Error retrieving data from ${storeName}`);
  };
}

function addDefaultDonations() {
  const defaultDonations = [
    { item: 'Food', amount: 100, location: 'Location A', date: new Date().toLocaleDateString() },
    { item: 'Water', amount: 200, location: 'Location B', date: new Date().toLocaleDateString() },
    { item: 'Clothing', amount: 50, location: 'Location C', date: new Date().toLocaleDateString() },
    { item: 'Medical Supplies', amount: 30, location: 'Location D', date: new Date().toLocaleDateString() },
    { item: 'Shelter', amount: 20, location: 'Location E', date: new Date().toLocaleDateString() }
  ];

  defaultDonations.forEach(donation => addData('donations', donation));
  console.log("Default donations added");
}

function showLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('register').style.display = 'none';
}

function showRegistration() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('register').style.display = 'block';
}

document.getElementById('registerForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  addData('users', { username, password, role });
  alert('Registration successful. Please log in.');
  showLogin();
  event.target.reset();
  console.log(`User registered: ${username}, Role: ${role}`);
});

document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  const transaction = db.transaction(['users'], 'readonly');
  const store = transaction.objectStore('users');
  const request = store.get(username);

  request.onsuccess = () => {
    const user = request.result;
    if (user && user.password === password && user.role === role) {
      console.log(`User logged in: ${username}, Role: ${role}`);
      if (user.role === 'donor') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('donorDashboard').style.display = 'block';
      } else if (user.role === 'receiver') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('receiverDashboard').style.display = 'block';
      }
    } else {
      alert('Invalid username, password, or role.');
    }
  };

  request.onerror = () => {
    console.error('Error retrieving user data');
  };
});
