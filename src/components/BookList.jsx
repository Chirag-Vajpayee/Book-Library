import { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../api";

function BookList({ onView, onEdit }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const genres = [...new Set(books.map((b) => b.genre))];

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter ? book.genre === genreFilter : true;
    return matchesSearch && matchesGenre;
  });

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid">
          {filtered.map((book) => (
            <div className="card" key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <div className="card-buttons">
                <button onClick={() => onView(book._id)}>View</button>
                <button onClick={() => onEdit(book._id)}>Edit</button>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;