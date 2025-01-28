// receiver.js

// Initialize the map and display markers for donations
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 }, // Set to initial coordinates
    zoom: 2,
  });

  getData('donations', donations => {
    donations.forEach(donation => {
      new google.maps.Marker({
        position: getLatLngFromLocation(donation.location),
        map: map,
        title: `${donation.item} - ${donation.amount} units`
      });
    });
  });
}

// Dummy function to convert location names to lat-lng coordinates
function getLatLngFromLocation(location) {
  const locations = {
    'Location A': { lat: 10.0, lng: 10.0 },
    'Location B': { lat: 20.0, lng: 20.0 },
    'Location C': { lat: 30.0, lng: 30.0 },
    'Location D': { lat: 40.0, lng: 40.0 },
    'Location E': { lat: 50.0, lng: 50.0 }
  };
  return locations[location] || { lat: 0, lng: 0 };
}

// Display donor responses
function displayDonorResponses() {
  getData('responses', responses => {
    const donorResponses = document.getElementById('donorResponses');
    donorResponses.innerHTML = '';
    responses.forEach(response => {
      const listItem = document.createElement('li');
      listItem.textContent = `Need ID: ${response.needId} - Response: ${response.response} (Date: ${response.date})`;
      donorResponses.appendChild(listItem);
    });
  });
}

// Handle need form submission
document.getElementById('needForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const need = {
    item: formData.get('item'),
    urgency: parseInt(formData.get('urgency'))
  };
  addData('needs', need);
  alert('Your need has been submitted.');
  event.target.reset();
});

// Fetch and display data upon receiver login
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  displayDonorResponses();
});

// Add data to Firestore
async function addData(storeName, data) {
  try {
    await firebase.firestore().collection(storeName).add(data);
    console.log(`Data added to ${storeName}`);
  } catch (e) {
    console.error(`Error adding data to ${storeName}`, e);
  }
}

// Get data from Firestore
async function getData(storeName, callback) {
  try {
    const querySnapshot = await firebase.firestore().collection(storeName).get();
    const data = [];
    querySnapshot.forEach(doc => {
      data.push(doc.data());
    });
    callback(data);
  } catch (e) {
    console.error(`Error retrieving data from ${storeName}`, e);
  }
}
