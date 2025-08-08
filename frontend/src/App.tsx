import { useEffect, useState } from 'react';

// Define the shape of a Note object
interface Note {
    text: string;
}

function App() {
    const [notes, setNotes] = useState<Note[]>([]); // State to hold the list of notes fetched from the server
    const [newNote, setNewNote] = useState(''); // State to hold the current value of the new note input field

    // useEffect to fetch notes from the API when component mounts
    useEffect(() => {
        fetch('/api/notes') // Call the backend API to get notes
            .then(res => res.json()) // Parse the response as JSON
            .then(setNotes); // Update the notes state with the fetched data
    }, []); // Empty dependency array means this runs only once on mount

    // Function to handle adding a new note
    const addNote = () => {
        if (!newNote.trim()) return; // Prevent adding empty or whitespace-only notes
        
        // POST the new note to the backend API
        fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Tell server we’re sending JSON
            body: JSON.stringify({ text: newNote }) // Convert newNote to JSON string
        }).then(() => {
            setNotes([...notes, { text: newNote }]); // Update the local notes state optimistically by adding the new note
            setNewNote(''); // Clear the input field after adding the note
        });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>CloudNotes</h1>
            <input
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Enter a note"
                style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
            />
            <button onClick={addNote} style={{ padding: '0.5rem 1rem' }}>Add Note</button>
            <ul style={{ marginTop: '1rem' }}>
                {notes.map((note, i) => (
                <li key={i}>{note.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;