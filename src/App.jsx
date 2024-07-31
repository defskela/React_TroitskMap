import './App.css'
import { ZoomableCanvas } from './components/ZoomableCanvas/ZoomableCanvas'
import { CategoriesButton } from './components/СategoriesButton/CategoriesButton.jsx'

function App() {
    return (
        <div className="App">
            <CategoriesButton />
            <ZoomableCanvas />
        </div>
    )
}

export default App
