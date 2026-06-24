const BASE_URL = "http://localhost:5000/api/books";

export async function getBooks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to load books");
  return res.json();
}

export async function getBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to load book");
  }
  return res.json();
}

export async function createBook(book) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to create book");
  }
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to delete book");
  }
  return res.json();
}
export async function updateBook(id, book) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to update book");
  }
  return res.json();
}