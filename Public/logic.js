async function fetchBooks() {
    const res = await fetch('/api/books');
    const books = await res.json();
    const container = document.getElementById('book-container');
    container.innerHTML = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p class="${book.status}">${book.status.toUpperCase()}</p>
            ${book.status === 'available' ? 
                `<button onclick="updateBook(${book.id}, 'issued')">Issue Book</button>` : 
                `<button style="background: #6c757d" onclick="updateBook(${book.id}, 'available')">Return Book</button>`
            }
        `;
        container.appendChild(div);
    });
}

async function updateBook(id, newStatus) {
    let person = newStatus === 'issued' ? prompt("Enter student name:") : null;
    if (newStatus === 'issued' && !person) return;

    await fetch('/api/update-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, issued_to: person })
    });
    fetchBooks();
}

fetchBooks();