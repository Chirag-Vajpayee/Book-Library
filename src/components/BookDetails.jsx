import { useState, useEffect } from "react";
import { getBook, deleteBook } from "../api";

function BookDetails({ bookId, onBack, onEdit, onDeleted }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBook(bookId);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookId]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(bookId);
      onDeleted();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return null;

  return (
    <div>
      <button onClick={onBack}>Back to list</button>
      <h2>{book.title}</h2>
      <p>by {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Year: {book.year}</p>
      <p>{book.description}</p>
      <button onClick={() => onEdit(book._id)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default BookDetails;