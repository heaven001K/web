document.addEventListener('DOMContentLoaded', () => {
    let airplanes = JSON.parse(localStorage.getItem('airplanes')) || [];
    let currentEditingIndex = null;

    const form = document.getElementById('airplane-form');
    const searchInput = document.getElementById('search');
    const tableBody = document.querySelector('#airplane-table tbody');
    const totalPassengersElement = document.getElementById('total-passengers');
    // Додавання або редагування літака
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const fuel = parseInt(document.getElementById('fuel').value, 10);
        const passengers = parseInt(document.getElementById('passengers').value, 10);

        if (currentEditingIndex === null) {
            airplanes.push({ name, fuel, passengers });
        } else {
            airplanes[currentEditingIndex] = { name, fuel, passengers };
            currentEditingIndex = null;
        }

        saveToLocalStorage(); // Зберігаємо в LocalStorage
        form.reset();
        renderTable();
    });

    // Пошук літака
    searchInput.addEventListener('input', () => {
        renderTable();
    });

    // Сортування за назвою
    document.getElementById('sort-name').addEventListener('click', () => {
        airplanes.sort((a, b) => a.name.localeCompare(b.name));
        saveToLocalStorage();
        renderTable();
    });

    // Сортування за паливом
    document.getElementById('sort-fuel').addEventListener('click', () => {
        airplanes.sort((a, b) => a.fuel - b.fuel);
        saveToLocalStorage();
        renderTable();
    });

    // Сортування за пасажирами
    document.getElementById('sort-passengers').addEventListener('click', () => {
        airplanes.sort((a, b) => a.passengers - b.passengers);
        saveToLocalStorage();
        renderTable();
    });

    function saveToLocalStorage() {
        localStorage.setItem('airplanes', JSON.stringify(airplanes));
    }
    function calculateTotalPassengers() {
        const totalPassengers = airplanes.reduce((total, plane) => total + plane.passengers, 0);
        totalPassengersElement.textContent = `Загальна кількість пасажирів: ${totalPassengers}`;
    }

    // Функція для рендеру таблиці
    function renderTable() {
        const searchTerm = searchInput.value.toLowerCase();
        tableBody.innerHTML = '';

        airplanes
            .filter(plane => plane.name.toLowerCase().includes(searchTerm))
            .forEach((plane, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${plane.name}</td>
                    <td>${plane.fuel}</td>
                    <td>${plane.passengers}</td>
                    <td>
                        <button class="edit" data-index="${index}">Редагувати</button>
                        <button class="delete" data-index="${index}">Видалити</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });

        // Обробка редагування
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                currentEditingIndex = e.target.dataset.index;
                const airplane = airplanes[currentEditingIndex];

                document.getElementById('name').value = airplane.name;
                document.getElementById('fuel').value = airplane.fuel;
                document.getElementById('passengers').value = airplane.passengers;
            });
        });

        // Обробка видалення
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                airplanes.splice(e.target.dataset.index, 1);
                saveToLocalStorage();
                renderTable();
            });
        });
        calculateTotalPassengers();
    }

    renderTable(); // Відображаємо таблицю після завантаження сторінки
});