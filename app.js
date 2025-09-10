const data = existsLocally() ? JSON.parse(localStorage.getItem('userData')) : getUserData();


async function getUserData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    localStorage.setItem('userData', JSON.stringify(data));
    return data;
}


function existsLocally() {
    return localStorage.getItem('userData') !== null;
}


function loadData(filter = "") {
    const container = document.getElementById('userList');
    container.innerHTML = "";

    data
        .filter(user => user.name.toLowerCase().includes(filter))
        .forEach(user => {
            let item = document.createElement('li');

            // Solo mostrar el nombre
            item.innerHTML = `<span class="label">👤 Name:</span> `;
            item.appendChild(highlightMatch(user.name, filter));

            item.style.cursor = "pointer";
            item.addEventListener('click', function () {
                showUserDetails(user);
            });

            container.appendChild(item);
        });
}

function showUserDetails(user) {
    let oldModal = document.getElementById('userDetailModal');
    if (oldModal) oldModal.remove();

    // modal crreado //
    const modal = document.createElement('div');
    modal.id = 'userDetailModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';

    // contenido //
    const card = document.createElement('div');
    card.style.background = '#232e27';
    card.style.color = '#e0e5d8';
    card.style.padding = '32px 40px';
    card.style.borderRadius = '18px';
    card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    card.style.maxWidth = '90vw';
    card.style.minWidth = '320px';
    card.style.position = 'relative';

    card.innerHTML = `
        <h2 style="margin-top:0;">${user.name}</h2>
        <p><span class="label"> Username:</span> ${user.username}</p>
        <p><span class="label"> Email:</span> ${user.email}</p>
        <p><span class="label"> Phone:</span> ${user.phone}</p>
        <p><span class="label"> Address:</span> ${user.address.street}, ${user.address.city}</p>
        <p><span class="label"> Company:</span> ${user.company.name}</p>
        <button id="closeModalBtn" style="margin-top:18px;padding:8px 18px;border:none;border-radius:8px;background:#7e5ca4;color:#fff;cursor:pointer;">Cerrar</button>
    `;

    card.querySelector('#closeModalBtn').onclick = () => modal.remove();

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    modal.appendChild(card);
    document.body.appendChild(modal);
}

loadData();

function highlightMatch(text, query) {
    if (!query) return document.createTextNode(text);

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    const fragment = document.createDocumentFragment();

    parts.forEach(part => {
        if (part.toLowerCase() === query.toLowerCase()) {
            let mark = document.createElement("mark");
            mark.textContent = part; // safe
            fragment.appendChild(mark);
        } else {
            fragment.appendChild(document.createTextNode(part));
        }
    });

    return fragment;
}

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = data.filter(user => user.name.toLowerCase().includes(searchTerm));
    const container = document.getElementById('userList');
    container.innerHTML = '';
    if (!filteredData || filteredData.length === 0) {
        container.innerHTML = '<li>No tengo a nadie que se llame asi pibe, escribí bien, o fijate de nuevo.</li>';
        return;
    }
    loadData(searchTerm);
});