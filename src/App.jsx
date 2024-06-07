import { useState } from 'react'
import './App.css'
import { CardElement } from './components/CardElement/CardElement'
// import { PieceOfMap } from './components/pieceOfMap/pieceofMap'
// import { ZoomableCanvas } from './components/ZoomableCanvas/ZoomableCanvas'

function App() {
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    return (
        <div className="App">
            <button onClick={() => setOpen(true)}>
                открыть модальное окно
            </button>
            <button onClick={() => setOpen2(true)}>
                открыть модальное окно 2
            </button>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit eveniet iure nemo quo beatae culpa assumenda, aliquam
                debitis dolore magnam voluptatibus recusandae, minus ipsa cum
                exercitationem fuga aut error odit?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit eveniet iure nemo quo beatae culpa assumenda, aliquam
                debitis dolore magnam voluptatibus recusandae, minus ipsa cum
                exercitationem fuga aut error odit?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit eveniet iure nemo quo beatae culpa assumenda, aliquam
                debitis dolore magnam voluptatibus recusandae, minus ipsa cum
                exercitationem fuga aut error odit?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit eveniet iure nemo quo beatae culpa assumenda, aliquam
                debitis dolore magnam voluptatibus recusandae, minus ipsa cum
                exercitationem fuga aut error odit?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit eveniet iure nemo quo beatae culpa assumenda, aliquam
                debitis dolore magnam voluptatibus recusandae, minus ipsa cum
                exercitationem fuga aut error odit?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit eveniet iure nemo quo beatae culpa assumenda, aliquam
                debitis dolore magnam voluptatibus recusandae, minus ipsa cum
                exercitationem fuga aut error odit?
            </p>
            <CardElement open={open} setOpen={setOpen} header={'lorem'}>
                <h1>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iusto cum consequuntur deleniti tempore, laboriosam corporis
                    odio, incidunt blanditiis placeat dicta illo tempora at
                    nobis, labore nisi unde quo corrupti illum? Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Ipsam eaque
                    totam ea a placeat deserunt? Facilis doloremque molestiae
                    maiores aliquid. Tenetur, quo modi. Cum optio provident quis
                    quisquam fugiat eveniet?
                </h1>
            </CardElement>
            <CardElement open={open2} setOpen={setOpen2} header={'lorem2'}>
                <h1>22222222222222222-----------2222222222222222</h1>
            </CardElement>
        </div>
    )
}

export default App
