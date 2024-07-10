import './App.css'
// import { PieceOfMap } from './components/pieceOfMap/pieceofMap'
import { ZoomableCanvas } from './components/ZoomableCanvas/ZoomableCanvas'
import { CategoriesButton } from './components/СategoriesButton/CategoriesButton.jsx'

function App() {
    // описание метки на карте
    // const [open, setOpen] = useState(false)

    return (
        <div className="App">
            {/* <button onClick={() => setOpen(true)}>
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
            > */}
            {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
            {/* {textIFWD} */}
            {/* </CardElement> */}
            {/* Добавить эту кнопку в layouts т,к от того, в каком места она добавлена, ничего не меняется */}
            <CategoriesButton />
            {/* <h1 className="fontans">Фонтан 1</h1>
            <h1 className="laboratories">Лаборатория 1</h1>
            <h1 className="universities">Университет 3</h1>
            <h1 className="fontans">Фонтан 2</h1>
            <h1 className="universities">Университет 1</h1>
            <h1 className="fontans">Фонтан 3</h1>
            <h1 className="universities">Университет 2</h1>
            <h1 className="laboratories">Лаборатория 3</h1>
            <h1 className="laboratories">Лаборатория 2</h1> */}
            <ZoomableCanvas />
        </div>
    )
}

export default App
