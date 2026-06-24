import { useState, useEffect } from "react";
import { getBook, createBook, updateBook } from "../api";

function BookForm({ bookId, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(bookId);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        setLoading(true);
        const book = await getBook(bookId);
        setForm({
          title: book.title,
          author: book.author,
          genre: book.genre,
          year: book.year,
          description: book.description,
        });
      } catch (err) {
        setSubmitError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookId, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.genre.trim()) newErrors.genre = "Genre is required";
    if (!String(form.year).trim()) newErrors.year = "Year is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitError("");
    if (!validate()) return;

    const payload = { ...form, year: Number(form.year) };
    try {
      setLoading(true);
      if (isEdit) {
        await updateBook(bookId, payload);
      } else {
        await createBook(payload);
      }
      onSuccess();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Book" : "Add Book"}</h2>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}

      <div>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />
        {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
      </div>

      <div>
        <label>Author</label>
        <input name="author" value={form.author} onChange={handleChange} />
        {errors.author && <span style={{ color: "red" }}>{errors.author}</span>}
      </div>

      <div>
        <label>Genre</label>
        <input name="genre" value={form.genre} onChange={handleChange} />
        {errors.genre && <span style={{ color: "red" }}>{errors.genre}</span>}
      </div>

      <div>
        <label>Year</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
        />
        {errors.year && <span style={{ color: "red" }}>{errors.year}</span>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span style={{ color: "red" }}>{errors.description}</span>
        )}
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update" : "Add Book"}
      </button>
    </div>
  );
}

export default BookForm;