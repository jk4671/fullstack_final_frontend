import React, {useState, useEffect} from "react";
import axios from 'axios';
import Note from "./components/note";

const App = () => {
  const [notes, setNotes] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get('https://fullstack-final-backend.onrender.com/notes').then((res) => {
      setNotes(res.data);

    }).catch((err) => {
      console.log(err);
    });
  });

  const deleteNote = (id) => {
    axios
      .delete(`https://fullstack-final-backend.onrender.com/notes/${id}`)
      .then((res) => {
        console.log(res.data);
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updateNote = (id, updatedTitle, updatedContent) => {
    axios
      .patch(`http://localhost:8000/notes/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      })
      .then((res) => {
        console.log(res.data);
        const updatedNotes = notes.map((note) =>
          note._id === id
            ? { ...note, title: updatedTitle, content: updatedContent }
            : note
        );
        setNotes(updatedNotes);
      })
      .catch((err) => console.log(err));
  };


  const addNote = (e) => {
    e.preventDefault();
    console.log('Note added - ', notes);
    axios
      .post('https://fullstack-final-backend.onrender.com/notes', {
        title,
        content,
      })
      .then((res) => {
        console.log(res.data);
        setNotes([...notes, res.data]);
        setTitle('');
        setContent('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div >
      <h1 className="bg-yellow-400 w-screen text-xl font-medium py-4 mx-auto text-center">
        Notes Keeper
      </h1>
      <form onSubmit={addNote} className="py-2 shadow-xl rounded-lg px-5 w-1/3 mx-auto text-left mt-10">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="block shadow w-full mx-auto px-2 py-2 rounded-lg" type="text"/>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your note here..." className="block shadow w-full mx-auto my-2 px-2 py-4 rounded-lg" type="text" />
        <button type="submit" className="bg-yellow-400 text-2xl px-2 rounded py-1">
          Add Note
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4 p-2">
      {notes &&
          notes.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              deleteNote={() => deleteNote(note._id)}
              updateNote={updateNote}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
