let page = 1;

async function fetchSocks() {
    try {
        const response = await fetch(`http://localhost:9000/api/socks/${page}/10`);
        const data = await response.json();

        if (data.length === 0) {
            throw new Error('No more data to fetch!');
        }

        updateHTML(data);
        page++;
    } catch (error) {
        console.error('Error:', error);
        alert('No more data to fetch! Starting over from the beginning.');
        page = 1;
        fetchSocks(); // retry from beginning
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', fetchSocks);
});


function updateHTML(socks) {
    const container = document.getElementById('data');
    container.innerHTML = '';

    const sockDiv = document.createElement('div');
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered', 'mt-3');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const allKeys = new Set();
    for (let i = 0; i < socks.length; i++) {
        const details = socks[i].sockDetails;
        if (details && typeof details === 'object') {
            Object.keys(details).forEach(key => allKeys.add(key));
        }
    }
    const keysArray = Array.from(allKeys);

    for (let i = 0; i < keysArray.length; i++) {
        const th = document.createElement('th');
        th.textContent = keysArray[i].charAt(0).toUpperCase() + keysArray[i].slice(1);
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let i = 0; i < socks.length; i++) {
        const row = document.createElement('tr');
        const details = socks[i].sockDetails;

        for (let j = 0; j < keysArray.length; j++) {
            const td = document.createElement('td');
            const value = details ? details[keysArray[j]] : '';
            td.textContent = value !== undefined ? value : '';
            row.appendChild(td);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    sockDiv.appendChild(table);
    container.appendChild(sockDiv);
}
