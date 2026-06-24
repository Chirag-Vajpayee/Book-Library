import { useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BookDetails from "./components/BookDetails";
import "./App.css";

function App() {
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const goToDetails = (id) => {
    setSelectedId(id);
    setView("details");
  };

  const goToEdit = (id) => {
    setSelectedId(id);
    setView("edit");
  };

  return (
    <div>
      <h1>Book Library</h1>

      {view === "list" && (
        <div>
          <button onClick={() => setView("add")}>+ Add Book</button>
          <BookList
            key={refreshKey}
            onView={goToDetails}
            onEdit={goToEdit}
          />
        </div>
      )}

      {view === "add" && (
        <div>
          <BookForm
            onSuccess={() => {
              setRefreshKey((k) => k + 1);
              setView("list");
            }}
          />
          <button onClick={() => setView("list")}>Back to list</button>
        </div>
      )}

      {view === "edit" && (
  <div>
    <BookForm
      bookId={selectedId}
      onSuccess={() => {
        setRefreshKey((k) => k + 1);
        setView("list");
      }}
    />
    <button onClick={() => setView("list")}>Back to list</button>
  </div>
)}

      {view === "details" && (
        <BookDetails
          bookId={selectedId}
          onBack={() => setView("list")}
          onEdit={goToEdit}
          onDeleted={() => {
            setRefreshKey((k) => k + 1);
            setView("list");
          }}
        />
      )}
    </div>
  );
}

export default App;