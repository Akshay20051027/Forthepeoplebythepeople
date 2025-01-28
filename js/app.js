import { db } from './firebase.js';
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

// Add default donations to Firestore
async function addDefaultDonations() {
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

// Add data to Firestore
async function addData(storeName, data) {
  try {
    await addDoc(collection(db, storeName), data);
    console.log(`Data added to ${storeName}`);
  } catch (e) {
    console.error(`Error adding data to ${storeName}`, e);
  }
}

// Get data from Firestore
async function getData(storeName, callback) {
  try {
    const querySnapshot = await getDocs(collection(db, storeName));
    const data = [];
    querySnapshot.forEach(doc => {
      data.push(doc.data());
    });
    callback(data);
  } catch (e) {
    console.error(`Error retrieving data from ${storeName}`, e);
  }
}

// Show login form
function showLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('register').style.display = 'none';
}

// Show registration form
function showRegistration() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('register').style.display = 'block';
}

// Register user
document.getElementById('registerForm').addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  try {
    await setDoc(doc(db, 'users', username), { username, password, role });
    alert('Registration successful. Please log in.');
    showLogin();
    event.target.reset();
    console.log(`User registered: ${username}, Role: ${role}`);
  } catch (e) {
    console.error('Error adding data to users', e);
  }
});

// Login user
document.getElementById('loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const role = formData.get('role');

  try {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      if (user.password === password && user.role === role) {
        console.log(`User logged in: ${username}, Role: ${role}`);
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
    } else {
      alert('User does not exist.');
    }
  } catch (e) {
    console.error('Error retrieving user data', e);
  }
});

// Display initial data
function displayInitialData() {
  // Functions to display initial data for both donor and receiver
  renderDonationChart();
  displayEssentialNeeds();
  displayResponses();
  initMap();
  displayDonorResponses();
}

// Initialize default donations
addDefaultDonations();
