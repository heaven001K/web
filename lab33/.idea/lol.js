let airplanes = [];
let editIndex = -1;

class Airplane {
    constructor(title, company, fuel, passengers) {
        this.title = title;
        this.company = company;
        this.fuel = parseInt(fuel);
        this.passengers = parseInt(passengers);
    }
}

function addPlane() {
    const title = document.getElementById('title-create').value;
    const company = document.getElementById('company-create').value;
    const fuel = document.getElementById('fuel-create').value;
    const passengers = document.getElementById('passengers-create').value;

    if (title && company && fuel && passengers) {
        const airplane = new Airplane(title, company, fuel, passengers);
        airplanes.push(airplane);
        renderPlanes();
        clearInputFields('create');
        updateTotals();
        document.getElementById('create-error').style.display = 'none';
    } else {
        document.getElementById('create-error').style.display = 'block';
    }
}

function startEdit(index) {
    const airplane = airplanes[index];
    document.getElementById('title-edit').value = airplane.title;
    document.getElementById('company-edit').value = airplane.company;
    document.getElementById('fuel-edit').value = airplane.fuel;
    document.getElementById('passengers-edit').value = airplane.passengers;

    editIndex = index;
    openTab(null, 'edit');
}

function saveChanges() {
    const title = document.getElementById('title-edit').value;
    const company = document.getElementById('company-edit').value;
    const fuel = document.getElementById('fuel-edit').value;
    const passengers = document.getElementById('passengers-edit').value;

    if (title && company && fuel && passengers) {
        airplanes[editIndex] = new Airplane(title, company, fuel, passengers);
        renderPlanes();
        clearInputFields('edit');
        document.getElementById('edit-error').style.display = 'none';
        openTab(null, 'plane-list');
    } else {
        document.getElementById('edit-error').style.display = 'block';
    }
}

function renderPlanes(filteredAirplanes = airplanes) {
    const planeList = document.getElementById('plane-list-content');
    planeList.innerHTML = filteredAirplanes.length > 0
        ? filteredAirplanes.map((airplane, index) => `
            <div class="plane-item">
                <span><b>Назва:</b> ${airplane.title}</span><br>
                <span><b>Компанія:</b> ${airplane.company}</span><br>
                <span><b>Кількість пального:</b> ${airplane.fuel}</span><br>
                <span><b>Кількість пасажирів:</b> ${airplane.passengers}</span><br>
                <button onclick="startEdit(${index})">Редагувати</button>
                <button onclick="deletePlane(${index})">Видалити</button>
            </div>
        `).join('')
        : `<p>Літаків не знайдено</p>`;
}

function deletePlane(index) {
    airplanes.splice(index, 1);
    renderPlanes();
}
function updateTotals() {
    const totalFuel = airplanes.reduce((total, airplane) => total + airplane.fuel, 0);
    const totalPassengers = airplanes.reduce((total, airplane) => total + airplane.passengers, 0);

    document.getElementById('total-fuel').innerText = totalFuel;
    document.getElementById('total-passengers').innerText = totalPassengers;
}

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.classList.add("active");
    }
}

function clearInputFields(type) {
    document.getElementById(`${type === 'create' ? 'title-create' : 'title-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'company-create' : 'company-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'fuel-create' : 'fuel-edit'}`).value = '';
    document.getElementById(`${type === 'create' ? 'passengers-create' : 'passengers-edit'}`).value = '';
}

function searchPlane() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredAirplanes = airplanes.filter(airplane =>
        airplane.title.toLowerCase().includes(searchTerm) ||
        airplane.company.toLowerCase().includes(searchTerm)
    );
    renderPlanes(filteredAirplanes);
}

function resetSearch() {
    document.getElementById('search').value = '';
    renderPlanes();
}

function sortPlanes() {
    airplanes.sort((a, b) => a.passengers - b.passengers);
    renderPlanes();
}


openTab(null, 'plane-list'); // Відкриваємо вкладку "Мої літаки" за замовчуванням
