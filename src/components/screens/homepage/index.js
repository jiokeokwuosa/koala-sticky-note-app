import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, clearAllNotes } from './../../../redux/actions/noteActions';
import NoteBox from '../../includes/noteItem';
import DrawCanvas from '../../includes/drawCanvas';
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
          image.draggable = "true";
          image.onload = function(ev){
            let canvas = document.getElementById('imageCanvas')
            let context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;           
            context.drawImage(image,0,0)
          }
        }
      }
      
  }

  return (
    <div id="stickyArea" onDragOver={handleDragOver}>  
      <div className="formArea">
        <form onSubmit={handleAddNote}>
          <textarea placeholder="Take a note..." value={noteItem} onChange={e=>setNoteItem(e.target.value)}>

          </textarea>
          <div className="option1">
            <input type="submit" value="Add Note"/>         
          </div>             
        </form>
        <div className="option2">
          <button onClick={handleClearAllNotes}>Clear All</button>
          <input type="file" id="imageUpload" className="off" onChange={uploadImageToCanvas} accept = "image/*"/>
          <label htmlFor="imageUpload">Upload</label>         
        </div>
      </div>   
      <DrawCanvas/>         
      {handleNoteList()}
      <canvas id= "imageCanvas"> </canvas> 
    </div> 
  );
}

export default StickyApp;
