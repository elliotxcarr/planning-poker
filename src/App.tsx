import { useState } from 'react'
import './App.css'
import { CardSelect } from './CardSelect'
import { PickedCards } from './PickedCards'

function App() {
  const [picked, setPicked] = useState<number[]>([]);
  const [reveal, setRevealed] = useState<boolean>(false);
  return (
    <div className='flex flex-col h-screen justify-center'>
      <h1 className='py-10'>Planning Poker</h1>
      <button onClick={() => setRevealed(!reveal)} className='hover:cursor-pointer'>Reveal</button>
      <PickedCards cards={picked} reveal={reveal}/>
      <div className='flex justify-center items-end h-full pb-10'>
        
        <CardSelect setPicked={(a) => setPicked([...picked, a])}/>
      </div>
      
    </div>
      
  )
}

export default App
