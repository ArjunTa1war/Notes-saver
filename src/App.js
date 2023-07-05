import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import "./index.css"
import {notesCollection,db} from "./firebase"
import { onSnapshot,addDoc ,doc,deleteDoc,setDoc} from "firebase/firestore"


export default function App() {
    const [notes, setNotes] = React.useState(
       ()=>JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState();

    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)
    
    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            console.log("hey there")
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])
    
    
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }
    
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])
    
    
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(
            docRef, 
            { body: text, updatedAt: Date.now() }, 
            { merge: true }
            )
        }
        
        async function deleteNote(noteId) {
            const docRef = doc(db, "notes", noteId)
            await deleteDoc(docRef)
        }
        
        function findCurrentNote() {
            return notes.find(note => {
                return note.id === currentNoteId
            }) || notes[0]
        }
        
        return (
            <main>
        {
            notes.length > 0 
            ?
            <Split 
            sizes={[30, 70]} 
            direction="horizontal" 
            className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote = {deleteNote}
                    />
                <Editor 
                 currentNote={findCurrentNote()} 
                 updateNote={updateNote} 
                 />
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                    >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

// const [state,setstate] = React.useState(()=>console.log("HELLO"));
//local storage

// React.useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes))
// }, [notes])

//firebase storage

// This does not rearrange the notes
// setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    
    // function updateNote(text) {
    //     // Try to rearrange the most recently-modified
    //     // not to be at the top
    //     setNotes(oldNotes => {
    //         const newArray = []
    //         for(let i = 0; i < oldNotes.length; i++) {
    //             const oldNote = oldNotes[i]
    //             if(oldNote.id === currentNoteId) {
    //                 newArray.unshift({ ...oldNote, body: text })
    //             } else {
    //                 newArray.push(oldNote)
    //             }
    //         }
    //         return newArray
    //     })
    // }
    
    // function deleteNote(event, noteId) {
    //     //it basically stops propogation of click event the parent
    //     // event.stopPropagation()
    //     // setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId)) 
    // }
 // }))