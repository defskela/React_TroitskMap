import reactLogo from './assets/react.svg'
import './App.css'
// import { PieceOfMap } from './components/pieceOfMap/pieceofMap'
import { ZoomableImage } from './components/ZoomableImage/ZoomableImage'

function App() {
    return (
        <>
            <ZoomableImage src={reactLogo} />
        </>
    )
}

export default App
