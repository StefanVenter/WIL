document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const location = document.getElementById('location').value;
        const propertyType = document.getElementById('property-type').value;
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;

        try {
            const response = await fetch(`/api/properties/search?location=${location}&type=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            const data = await response.json();

            displaySearchResults(data);
        } catch (error) {
            console.error('Error searching properties:', error);
            searchResults.innerHTML = '<p>An error occurred while searching for properties. Please try again later.</p>';
        }
    });

    function displaySearchResults(properties) {
        searchResults.innerHTML = '';

        if (properties.length === 0) {
            searchResults.innerHTML = '<p>No properties found matching your criteria.</p>';
            return;
        }

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
            searchResults.appendChild(propertyElement);
        });
    }
});