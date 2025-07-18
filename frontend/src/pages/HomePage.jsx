import React from 'react'
import Navbar from '../components/navbar'
import RateLimitedUI from "../components/RateLimitedUI";
import { useState,useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotes = async () =>{
      try{
          const res = await api.get("/notes")
        //  const data = await res.json();    only if we use fetch
          console.log(res.data);
          setNotes(res.data)
          setIsRateLimited(false)
          
      }
      catch(error){
        console.log("Error fetching notes");
        console.log(error);
        if(error.response && error.response.status === 429){
          setIsRateLimited(true)
        }
        else{
            toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false)
      }
     }
     fetchNotes();
  },[])
  return (
    <div className="min-h-screen">
        <Navbar/>

        {isRateLimited && <RateLimitedUI />}

        {notes.length === 0 && !isRateLimited && <NotesNotFound/> }

        {notes.length>0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
          </div> 
        )}
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className="text-center text-primary py-10"> Loading notes...</div>}
        </div>
    </div>
  )
}

export default HomePage


//CORS error: Cross Origin Resource sharing 
// When a website tries to get data from another website - like your frontend calling
// an API ona diffferent domain - the browser might block it foor secuirity reasons
