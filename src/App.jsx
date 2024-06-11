import { useState } from 'react'
import './App.css'
import { CardElement } from './components/CardElement/CardElement'
import { textIFWD } from './texts.jsx'
// import { PieceOfMap } from './components/pieceOfMap/pieceofMap'
import { ZoomableCanvas } from './components/ZoomableCanvas/ZoomableCanvas'

function App() {
    const [open, setOpen] = useState(false)

    return (
        <div className="App">
            <button onClick={() => setOpen(true)}>
                открыть модальное окно
            </button>
            <CardElement
                open={open}
                setOpen={setOpen}
                header={'lorem'}
                images={[
                    'src/assets/ИФВД1.jpg',
                    'src/assets/ИФВД2.jpg',
                    'src/assets/ИФВД3.jpg',
                ]}
                hrefMoreDetails={'https://www.google.com/'}
            >
                {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
                {textIFWD}
            </CardElement>
            <ZoomableCanvas />
        </div>
    )
}

export default App
