document.addEventListener('DOMContentLoaded', () => {
    const listingsGrid = document.getElementById('listings-grid');

    async function fetchListings() {
        try {
            const response = await fetch('/api/properties');
            const data = await response.json();
            displayListings(data);
        } catch (error) {
            console.error('Error fetching listings:', error);
            listingsGrid.innerHTML = '<p>An error occurred while fetching listings. Please try again later.</p>';
        }
    }

    function displayListings(properties) {
        listingsGrid.innerHTML = '';

        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property-item');
            propertyElement.innerHTML = `
                <img src="${property.image}" alt="${property.title}">
                <h3>${property.title}</h3>
                <p>Price: R${property.price.toLocaleString()}</p>
                <p>Location: ${property.location}</p>
                <p>Type: ${property.type}</p>
            `;
            listingsGrid.appendChild(propertyElement);
        });
    }

    fetchListings();
});