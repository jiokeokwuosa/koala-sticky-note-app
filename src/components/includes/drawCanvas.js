import React, { useRef, useState, useEffect, useCallback }  from 'react';

const DrawCanvas = (props) => {
   const {toggleCanvas} = props
   const canvasRef = useRef(null)
   const ctx = useRef(null)

   const [selectedColor, setSelectedColor]= useState('black')
   const [mouseDown, setMouseDown]= useState(false)
   const [lastPosition, setLastPosition]= useState({x:0,y:0})
   const drawColor = ['red','green','aqua','black']

   useEffect(()=>{
     // on component mount get context from the canvas ref
     if(canvasRef.current){
       ctx.current = canvasRef.current.getContext('2d')
     }
   },[])
   
   const getMousePoint = (ex, ey)=>{
    let offsetX = 0
    let offsetY = 0;

    const canvasElement = document.getElementById('canvas');   
    offsetX += canvasElement.offsetLeft;
    offsetY += canvasElement.offsetTop;

    return {x: ex-offsetX,y: ey-offsetY};  

   }

   const handleOnMouseDown = (e) =>{    
      setLastPosition({
        x:e.pageX,
        y:e.pageY
      })   
      setMouseDown(true)
   }

   const handleOnMouseUp = (e) =>{   
    setMouseDown(false)
   }

   const handleOnMouseLeave = (e) =>{   
    setMouseDown(false)
   }

   const handleClearCanvas= (e) =>{      
     ctx.current.clearRect(0, 0, window.screen.width, window.screen.height);
   }


   const handleDrawing = useCallback((x,y) =>{   
    // x and y above represents the position we are drawing to
    // inorder to get the exact position of the mouse i need to calculate the offset
     const moveToOffset  = getMousePoint(lastPosition.x, lastPosition.y);   
     const drawToOffset  = getMousePoint(x,y);   
       
     if(mouseDown){       
      ctx.current.beginPath() // Creates a new path. Once created, future drawing commands are directed into the path      
      ctx.current.strokeStyle = selectedColor
      ctx.current.lineWidth = 1
      ctx.current.lineJoin = 'round' // Specify how two line join
      ctx.current.moveTo(moveToOffset.x,moveToOffset.y) // move to the last recorded position
      ctx.current.lineTo(drawToOffset.x, drawToOffset.y) // we are drawing a line from the last recorded position to this new position supplied to this function
      ctx.current.closePath() // adds a straight line to the created path which will not be visible till we stroke it
      ctx.current.stroke() // draws the shape by stroking its outline.
      setLastPosition({x,y})
     }
   },[mouseDown,selectedColor,lastPosition])
   
   
   const handleOnMouseMove= (e) =>{          
    handleDrawing(e.pageX,e.pageY)
   }

   const handleDownload = async() =>{
     //convert the canvas content to png image
     const image = canvasRef.current.toDataURL('image/png')     
     const blob = await(await fetch(image)).blob()
     const blobURL = URL.createObjectURL(blob)
     const downloadLink = document.createElement('a')
     downloadLink.href=blobURL
     downloadLink.download = 'canvasImage';
     downloadLink.click()
   }
   

   return (
    <>
      <canvas id="canvas" 
        ref={canvasRef}
        onMouseUp={handleOnMouseUp}
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}
        width={800}
        height={450}
      >
        Sorry, Canvas is not supported in your browser. please update your browser
      </canvas>
      <div className="option2 drawCanvasOptions">       
        <select name='selectedColor' onChange={e=>setSelectedColor(e.target.value)} defaultValue={selectedColor}>
          <option value="black">Select Color</option>
          {drawColor.map((color, index)=><option value={color} key={index}>{color}</option>)}
        </select>
        <button onClick = {handleClearCanvas}>Clear Canvas</button>
        <button onClick = {handleDownload}>Download</button>
        <button onClick = {toggleCanvas}>Go Back</button>
      </div> 
    </>
  );
}

export default DrawCanvas;
