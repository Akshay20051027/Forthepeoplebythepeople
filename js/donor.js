// donor.js

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
  });
}

document.getElementById('addDonationForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const donation = {
    item: formData.get('item'),
    amount: parseInt(formData.get('amount')),
    location: formData.get('location'),
    date: new Date().toLocaleDateString()
  };
  console.log(`Donation added: ${donation.item} - ${donation.amount} units at ${donation.location}`);
  renderDonationChart();
  alert('Donation added successfully.');
  event.target.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  renderDonationChart();
  displayEssentialNeeds();
});
