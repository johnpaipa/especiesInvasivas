// script.js

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api-colombia.com/api/v1/Invasivespecie';
    const speciesList = document.getElementById('species-list');

    // Function to fetch and display the data
    async function fetchInvasiveSpecies() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            displaySpecies(data);
        } catch (error) {
            speciesList.innerHTML = `<div class="alert alert-danger" role="alert">Error fetching data: ${error.message}</div>`;
        }
    }

    // Function to display species data in cards with toggle button
    function displaySpecies(species) {
        speciesList.innerHTML = ''; // Clear loading message

        species.forEach(specie => {
            const speciesCard = document.createElement('div');
            speciesCard.classList.add('col-md-4', 'mb-4');

            speciesCard.innerHTML = `
                <div class="card">
                    <img src="${specie.urlImage}" class="card-img-top" alt="${specie.name}">
                    <div class="card-body">
                        <h5 class="card-title">${specie.name} (${specie.scientificName})</h5>
                        <p class="card-text"><strong>Common Names:</strong> ${specie.commonNames}</p>
                        <div class="toggle-content">
                            <p><strong>Impact:</strong> ${specie.impact}</p>
                            <p><strong>Management:</strong> ${specie.manage}</p>
                        </div>
                        <button class="btn btn-primary" onclick="toggleContent(this)">Show Details</button>
                        <p class="card-text"><strong>Risk Level:</strong> ${specie.riskLevel}</p>
                    </div>
                </div>
            `;

            speciesList.appendChild(speciesCard);
        });
    }

    // Function to toggle visibility of impact and manage sections
    window.toggleContent = function (button) {
        const cardBody = button.parentElement;
        const toggleContent = cardBody.querySelector('.toggle-content');
        const isVisible = toggleContent.style.display === 'block';

        if (isVisible) {
            toggleContent.style.display = 'none';
            button.textContent = 'Show Details';
        } else {
            toggleContent.style.display = 'block';
            button.textContent = 'Hide Details';
        }
    }

    // Fetch data on page load
    fetchInvasiveSpecies();
});
