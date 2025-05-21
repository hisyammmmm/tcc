const API_URL = 'https://be-hisyam-691768696804.us-central1.run.app';

async function register() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registration successful! Please login.");
    window.location.href = 'index.html';
  } else {
    alert("Registration failed: " + data.message);
  }
}

async function login() {
  const name = document.getElementById('login-name').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('accessToken', data.accessToken);
    window.location.href = 'notes.html';
  } else {
    alert("Login failed: " + data.message);
  }
}

function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = 'index.html';
}

async function fetchNotes() {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_URL}/note`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const notes = await res.json();
  const list = document.getElementById('notes-list');
  list.innerHTML = '';

  notes.forEach(note => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="note-content">
        <strong>${note.title}</strong><br>${note.note}
      </div>
      <div class="note-actions">
        <button onclick="editNote(${note.id})">Edit</button>
        <button onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function addNote() {
  const title = document.getElementById('title').value;
  const note = document.getElementById('note').value;
  const token = localStorage.getItem('accessToken');

  await fetch(`${API_URL}/tambah-note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, note })
  });

  document.getElementById('title').value = '';
  document.getElementById('note').value = '';
  fetchNotes();
}

async function editNote(id) {
  const newTitle = prompt('New Title:');
  const newNote = prompt('New Note:');
  const token = localStorage.getItem('accessToken');

  if (newTitle && newNote) {
    await fetch(`${API_URL}/edit-note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: newTitle, note: newNote })
    });
    fetchNotes();
  }
}

async function deleteNote(id) {
  if (confirm("Delete this note?")) {
    const token = localStorage.getItem('accessToken');
    await fetch(`${API_URL}/delete-note/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    fetchNotes();
  }
}

// Auto fetch notes if on notes.html
if (window.location.pathname.includes('notes.html')) {
  if (!localStorage.getItem('accessToken')) {
    window.location.href = 'index.html';
  } else {
    fetchNotes();
  }
}
