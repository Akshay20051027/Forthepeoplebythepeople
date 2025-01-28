db = event.target.result;
addDefaultDonations();
console.log("Database opened successfully");
// Call functions dependent on database being ready
displayInitialData();

request.onerror = event => {
  console.error('IndexedDB error:', event.target.errorCode);
};

function addData(storeName, data) {
  if (!db) {
    console.error('Database is not initialized');
    return;
  }
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
  if (!db) {
    console.error('Database is not initialized');
    return;
  }
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.getAll();

  request.onsuccess = event => {
    callback(event.target.result);
  };

  request.onerror = () => {
    console.error(`Error retrieving data from ${storeName}`);
  };
}

document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  if (!db) {
    console.error('Database is not initialized');
    return;
  }
  const transaction = db.transaction(['users'], 'readonly');
  const store = transaction.objectStore('users');
  const request = store.get(username);

  request.onsuccess = event => {
    const user = event.target.result;
    if (user && user.password === password && user.role === role) {
      if (user.role === 'donor') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('donorDashboard').style.display = 'block';
        displayInitialData();
      } else if (user.role === 'receiver') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('receiverDashboard').style.display = 'block';
        displayInitialData();
      }
    } else {
      alert('Invalid username, password, or role.');
    }
  };

  request.onerror = () => {
    console.error('Error retrieving user data');
  };
});

function displayInitialData() {
  // Functions to display initial data for both donor and receiver
  renderDonationChart();
  displayEssentialNeeds();
  displayResponses();
  initMap();
  displayDonorResponses();
}
