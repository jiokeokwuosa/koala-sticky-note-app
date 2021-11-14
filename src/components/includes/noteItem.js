import React,{ useState, useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from './../../redux/actions/noteActions';
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const NoteBox = (props) => {
  const dispatch =  useDispatch()
  const {item, index} = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newNoteItem, setNewNoteItem] = useState('')
  const [itemColor, setItemColor] = useState('')
  
  const getMousePoint = (ex, ey)=>{
    let offsetX = 0
    let offsetY = 0;

    const canvasElement = document.getElementById('body');   
    offsetX += canvasElement.offsetLeft;
    offsetY += canvasElement.offsetTop;

    return {x: ex-offsetX,y: ey-offsetY};  

  }

  const handleDragEnd = (e) =>{
    const actualMousePoint = getMousePoint(e.pageX,e.pageY)
    e.target.style.left = `${actualMousePoint.x}px`;
    e.target.style.top = `${actualMousePoint.y}px`;
  }

  const toggleModal = ()=>{  
    setOpenEditModal(!openEditModal)
  }

  const openEditModalNow = () =>{
    setOpenEditModal(true)
  }
  
  const handleDelete = (e) =>{
    e.preventDefault()
    dispatch(deleteNote(index))
  }

  const handleUpdate= (e) =>{
    e.stopPropagation()
    e.preventDefault()
   const data = {
     text:newNoteItem,
     backgroundColor:itemColor,
     rotationDeg: Math.floor(Math.random()*20)
   }
    dispatch(updateNote(data, index))
    setOpenEditModal(false)
  }
  
  const handleColorChange= (color,e) =>{
    e.stopPropagation()
    e.preventDefault()
   const data = {
     text:newNoteItem,
     backgroundColor:color,
     rotationDeg: Math.floor(Math.random()*20)
   }
    dispatch(updateNote(data, index))   
  }
  useEffect(()=>{
    setNewNoteItem(item.text)  
    setItemColor(item.backgroundColor) 
  },[item.text, item.backgroundColor])
   return (
     <>
    <div
      className={`noteBox ${item.backgroundColor}`}
      style={{transform:`rotate(${item.rotationDeg}deg)`}}
      draggable="true"
      onDragEnd={handleDragEnd}
      >
      <div className="optionArea">
          <div className="gold" onClick={handleColorChange.bind(this,'gold')}>G</div>
          <div className="pink" onClick={handleColorChange.bind(this,'pink')}>P</div>
          <div onClick={openEditModalNow}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            </div>
          <div onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
      </div>     
      <p className="noteText">{item.text}</p>
    </div>
    <Modal isOpen={openEditModal} toggle={toggleModal} className="noteModal">
        <ModalHeader toggle={toggleModal}>Edit Note</ModalHeader>
        <ModalBody>
          <form onSubmit={handleUpdate}>           
            <div className="col-md-12">
              <textarea id="newNoteItem"  placeholder="Update note" name="newNoteItem"
                value={newNoteItem} onChange={(e) => setNewNoteItem(e.target.value)} required>

              </textarea>            
            </div>           
            <div className="col-md-12">
              <input type="submit" value="Update" />             
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default NoteBox;
