const API_BASE = 'http://localhost:8081';

// Auth Logic
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

async function handleAuth(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE}/auth/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = endpoint === 'login' ? await response.json() : await response.text();
            if (endpoint === 'login') {
                localStorage.setItem('userId', result.userId);
                window.location.href = 'dashboard.html';
            } else {
                showMessage('Signup successful! Please login.', 'success');
                switchTab('login');
            }
        } else {
            const error = endpoint === 'login' ? await response.json() : await response.text();
            showMessage(error.message || error, 'error');
        }
    } catch (err) {
        showMessage('Connection error', 'error');
    }
}

function showMessage(msg, type) {
    const el = document.getElementById('message');
    if (el) {
        el.textContent = msg;
        el.style.color = type === 'error' ? 'red' : 'green';
    }
}

// Dashboard Logic
async function loadPatients() {
    try {
        const response = await fetch(`${API_BASE}/patients`);
        const patients = await response.json();
        const tbody = document.querySelector('#patientTable tbody');
        tbody.innerHTML = '';

        patients.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.disease}</td>
                <td>
                    <button onclick="editPatient(${p.id}, '${p.name}', '${p.disease}')" class="action-btn edit-btn">Edit</button>
                    <button onclick="deletePatient(${p.id})" class="action-btn delete-btn">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Failed to load patients', err);
    }
}

function showAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Patient';
    document.getElementById('patientId').value = '';
    document.getElementById('patientForm').reset();
    document.getElementById('patientModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('patientModal').classList.add('hidden');
}

function editPatient(id, name, disease) {
    document.getElementById('modalTitle').textContent = 'Edit Patient';
    document.getElementById('patientId').value = id;
    document.getElementById('patientName').value = name;
    document.getElementById('patientDisease').value = disease;
    document.getElementById('patientModal').classList.remove('hidden');
}

async function deletePatient(id) {
    if (confirm('Are you sure?')) {
        await fetch(`${API_BASE}/patients/${id}`, { method: 'DELETE' });
        loadPatients();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            handleAuth('login', { username, password });
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const password = document.getElementById('signupPassword').value;
            handleAuth('signup', { username, password });
        });
    }

    const patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = patientForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Saving...';

            try {
                const id = document.getElementById('patientId').value;
                const name = document.getElementById('patientName').value;
                const disease = document.getElementById('patientDisease').value;
                const method = id ? 'PUT' : 'POST';
                const url = id ? `${API_BASE}/patients/${id}` : `${API_BASE}/patients`;

                await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, disease })
                });

                closeModal();
                loadPatients();
            } catch (err) {
                console.error(err);
                alert('Failed to save');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Save';
            }
        });
    }
});

function logout() {
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
}
