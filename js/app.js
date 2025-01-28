  db = event.target.result;
  addDefaultDonations();
  console.log("Database opened successfully");
  // Call functions dependent on database being ready
  displayInitialData();
};

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
@@ -35,6 +42,10 @@ function addData(storeName, data) {
}

function getData(storeName, callback) {
  if (!db) {
    console.error('Database is not initialized');
    return;
  }
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.getAll();
@@ -92,6 +103,11 @@ document.getElementById('loginForm').addEventListener('submit', event => {
  const password = formData.get('password');
  const role = formData.get('role');

  if (!db) {
    console.error('Database is not initialized');
    return;
  }
  const transaction = db.transaction(['users'], 'readonly');
  const store = transaction.objectStore('users');
  const request = store.get(username);
@@ -103,9 +119,11 @@ document.getElementById('loginForm').addEventListener('submit', event => {
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
@@ -116,3 +134,12 @@ document.getElementById('loginForm').addEventListener('submit', event => {
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
