import React, { useState, useEffect } from "react";

const useMouseHook = () => {
  const [position, setPosotion] = useState({ x: 0, y: 0 })
   useEffect(() => {
      const moveMouse = (e:MouseEvent) => {
        setPosotion({ x: e.clientX, y:e.clientY })
      }
      document.addEventListener('mousemove', moveMouse)
      return () => {
        document.removeEventListener('mousemove',moveMouse)
      }
   }, [])
   return (
    <>
      <div>
        x:{position.x}
        <hr></hr>
        y:{position.y}
      </div>
    </>
  )
}

export default useMouseHook