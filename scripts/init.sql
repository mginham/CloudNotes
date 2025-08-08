-- Create the 'notes' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY, -- 'id' column: auto-incrementing unique identifier for each note
    text TEXT NOT NULL -- 'text' column: stores the note content (cannot be null)
);