document.addEventListener('DOMContentLoaded', () => {
  const leaderboardBody = document.getElementById('leaderboard-body');

  const parseCSV = (csvData) => {
    const rows = csvData.split('\n');
    const leaderboardData = [];

    rows.forEach((row, index) => {
      if (index !== 0) {
        const [rank, name, points] = row.split(',');
        if (rank && name && points) {
          leaderboardData.push({ rank: rank, name: name, points: points });
        }
      }
    });

    return leaderboardData;
  };

  const updateLeaderboard = (data) => {
    leaderboardBody.innerHTML = ''; // Clear existing data

    data.forEach(person => {
      leaderboardBody.innerHTML += `
        <tr>
          <td>${person.rank}</td>
          <td>${person.name}</td>
          <td>${person.points}</td>
        </tr>
      `;
    });
  };

  // Load data from CSV
  fetch('data.csv')  // Update with the correct path to your CSV file
    .then(response => response.text())
    .then(csvData => {
      const data = parseCSV(csvData);
      updateLeaderboard(data);
    });
});
