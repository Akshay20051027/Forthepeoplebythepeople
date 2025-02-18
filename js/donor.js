let donationChart; // Store the chart instance globally to manage its state
function renderDonationChart() {
  const ctx = document.getElementById('donationChart').getContext('2d');
  if (donationChart) {
    donationChart.destroy(); // Destroy the previous chart instance
  }
  donationChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Food - Location A', 'Water - Location B'],
      datasets: [{
        label: 'Donations',
        data: [100, 200],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }],
    },
  getData('donations', data => {
    const ctx = document.getElementById('donationChart').getContext('2d');
    if (donationChart) {
      donationChart.destroy(); // Destroy the previous chart instance
    }
    donationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => `${item.item} - ${item.location}`),
        datasets: [{
          label: 'Donations',
          data: data.map(item => item.amount),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }],
      },
    });
  });
}
function displayEssentialNeeds() {
  const needsList = document.getElementById('needsList');
  needsList.innerHTML = '';
  const needs = [{ item: 'Food', urgency: 5 }, { item: 'Water', urgency: 4 }];
  needs.forEach(need => {
    const listItem = document.createElement('li');
    listItem.textContent = `${need.item} - Urgency: ${need.urgency}`;
    const respondButton = document.createElement('button');
    respondButton.textContent = 'Respond';
    respondButton.onclick = () => alert(`Responding to ${need.item}`);
    listItem.appendChild(respondButton);
    needsList.appendChild(listItem);
  getData('needs', needs => {
    const needsList = document.getElementById('needsList');
    needsList.innerHTML = '';
    needs.forEach(need => {
      const listItem = document.createElement('li');
      listItem.textContent = `${need.item} - Urgency: ${need.urgency}`;
      const respondButton = document.createElement('button');
      respondButton.textContent = 'Respond';
      respondButton.onclick = () => respondToNeed(need);
      listItem.appendChild(respondButton);
      needsList.appendChild(listItem);
    });
  });
}
function respondToNeed(need) {
  const response = prompt('Enter your response:');
  if (response) {
    const responseData = {
      needId: need.id,
      response,
      date: new Date().toLocaleDateString()
    };
    addData('responses', responseData);
    alert('Response submitted successfully.');
    displayResponses();
  }
}
function displayResponses() {
  getData('responses', responses => {
    const receiverRequests = document.getElementById('receiverRequests');
    receiverRequests.innerHTML = '';
    responses.forEach(response => {
      const listItem = document.createElement('li');
      listItem.textContent = `Need ID: ${response.needId} - Response: ${response.response} (Date: ${response.date})`;
      receiverRequests.appendChild(listItem);
    });
  });
}
document.getElementById('addDonationForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
@@ -44,13 +66,14 @@ document.getElementById('addDonationForm').addEventListener('submit', event => {
    location: formData.get('location'),
    date: new Date().toLocaleDateString()
  };
  console.log(`Donation added: ${donation.item} - ${donation.amount} units at ${donation.location}`);
  addData('donations', donation);
  renderDonationChart();
  alert('Donation added successfully.');
  event.target.reset();
});
// Fetch and display data upon donor login
document.addEventListener('DOMContentLoaded', () => {
  renderDonationChart();
  displayEssentialNeeds();
  displayResponses();
});
