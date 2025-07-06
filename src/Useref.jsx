import React from 'react'
import { useRef } from 'react'

export default function Useref() {
 
  const count=useRef(0);

  console.log("Initial count value:", count.current);

  const incrementCount = () => {
    count.current += 1;
    console.log("Updated count value:", count.current);
  }

  const lorem = useRef();

  const changeColor = () => {
    lorem.current.style.color = 'blue';
    lorem.current.style.backgroundColor = 'pink';
    lorem.current.style.fontSize = '2rem';
  }

 
  return (
    <>
    <h1 className='text-4xl '>{count.current}</h1>
    <button onClick={incrementCount}>
      click to increment count
    </button>

    <h2 ref={lorem} className='text-4xl'>hell world</h2>

    <p ref={lorem} className='text-3xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consectetur similique quae rem quas ea error a vitae nesciunt assumenda?</p>

    <button onClick={changeColor} className='bg-blue-500 text-white p-2 rounded'>click to change color</button>
    </>
  )
}



