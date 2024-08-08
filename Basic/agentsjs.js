document.addEventListener('DOMContentLoaded', () => {
    const agentsGrid = document.getElementById('agents-grid');

    async function fetchAgents() {
        try {
            const response = await fetch('/api/agents');
            const data = await response.json();
            displayAgents(data);
        } catch (error) {
            console.error('Error fetching agents:', error);
            agentsGrid.innerHTML = '<p>An error occurred while fetching agents. Please try again later.</p>';
        }
    }

    function displayAgents(agents) {
        agentsGrid.innerHTML = '';

        agents.forEach(agent => {
            const agentElement = document.createElement('div');
            agentElement.classList.add('agent-item');
            agentElement.innerHTML = `
                <img src="${agent.photo}" alt="${agent.name}">
                <h3>${agent.name}</h3>
                <p>Email: ${agent.email}</p>
                <p>Phone: ${agent.phone}</p>
                <p>Specialization: ${agent.specialization}</p>
            `;
            agentsGrid.appendChild(agentElement);
        });
    }

    fetchAgents();
});