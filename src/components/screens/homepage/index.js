import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, clearAllNotes } from './../../../redux/actions/noteActions';
import NoteBox from '../../includes/noteItem';
import './styles.css';

const StickyApp = () => {
  const dispatch = useDispatch();
  const [noteItem, setNoteItem] = useState('');
  const noteList = useSelector(state=>state.note.noteList)

  const handleAddNote = (e) =>{
    e.preventDefault()
    const data = {
      text: noteItem,
      backgroundColor:'white',
      rotationDeg: Math.floor(Math.random()*20)
    }
    dispatch(addNote(data))
    setNoteItem('')
  }

  const handleNoteList = () =>{
    if(noteList && noteList.length){
      return noteList.map((noteItem, index)=>{
        return <NoteBox item={noteItem} key={index} index={index}/>
      })
    }
  }

  const handleClearAllNotes = (e) =>{
     e.preventDefault()
     e.stopPropagation()
     dispatch(clearAllNotes())
  }

  const handleDragOver = (e) =>{
    e.stopPropagation();
    e.preventDefault();
  }

  const uploadImageToCanvas = (e) =>{
      e.preventDefault();
      if(e.target.files){
        const file = e.target.files[0];
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = function (e){
          let image = new Image();
          image.src = e.target.result;
          image.onload = function(ev){
            let canvas = document.getElementById('canvas')
            let context = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 300;           
            context.drawImage(image,0,0)
          }
        }
      }
      
  }

  return (
    <>
      <div id="stickyArea" onDragOver={handleDragOver}>   
        <form onSubmit={handleAddNote}>
          <textarea placeholder="Take a note..." value={noteItem} onChange={e=>setNoteItem(e.target.value)}>

          </textarea>
          <input type="submit" value="Add Note"/>
          <div className="option2">
            <button onClick={handleClearAllNotes}>Clear All</button>
            <input type="file" id="imageUpload" className="off" onChange={uploadImageToCanvas} accept = "image/*"/>
            <label htmlFor="imageUpload">Upload</label>
            <canvas id= "canvas"></canvas>
          </div>
         
          {handleNoteList()}
        </form>     
      </div>          
        
    </>
  );
}

export default StickyApp;
