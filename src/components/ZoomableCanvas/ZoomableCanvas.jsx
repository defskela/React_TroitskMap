import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEffect, useState } from 'react'
import { CardElement } from '../CardElement/CardElement'
import reactImage from './react.svg' // Импорт изображения
import { textIFWD } from './texts.jsx'
import map from 'C://React_projects/TroitskMap/src/assets/jpgmax.jpg'

export const ZoomableCanvas = () => {
    const { editor, onReady } = useFabricJSEditor()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!editor) return

        const canvas = editor.canvas
        canvas.setWidth(window.innerWidth) // Ширина холста
        canvas.setHeight(window.innerHeight) // Высота холста

        function addToCanvas(
            path,
            left = 0,
            top = 0,
            onClickFunction = () => {}
        ) {
            // Добавление объекта для демонстрации
            fabric.Image.fromURL(path, function (img) {
                // Можно задать начальные параметры для изображения
                if (path != map) {
                    img.set({
                        left: left,
                        top: top,
                        angle: 0,
                        opacity: 4.0,
                        hasControls: false,
                        selectable: true,
                        lockMovementX: true,
                        lockMovementY: true, // Блокирует перемещение по обеим осям
                        hoverCursor: 'pointer',
                    })

                    img.on('mousedown', function () {
                        onClickFunction()
                    })
                } else {
                    img.set({
                        left: 0,
                        top: 0,
                        angle: 0,
                        opacity: 4.0,
                        hasControls: false,
                        selectable: false,
                        lockMovementX: true,
                        lockMovementY: true, // Блокирует перемещение по обеим осям
                        hoverCursor: 'default',
                    })
                }
                if (path == map) {
                    img.scaleToWidth(canvas.width)
                    // img.scaleToHeight(canvas.height)
                }
                canvas.add(img)
                if (path != map) {
                    canvas.moveTo(img, 1) // Установка z-index для изображения
                }
            })
        }

        addToCanvas(map)
        addToCanvas(reactImage, 400, 400, () => setOpen(true))

        // Обработка события прокрутки для масштабирования
        const handleMouseWheel = (opt) => {
            var delta = opt.e.deltaY
            var zoom = canvas.getZoom()
            zoom *= 0.999 ** delta
            if (zoom > 20) zoom = 20
            if (zoom < 0.01) zoom = 0.01
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
            opt.e.preventDefault()
            opt.e.stopPropagation()
        }

        canvas.on('mouse:wheel', handleMouseWheel)

        // canvas.on('mouse:down', function (opt) {
        //     opt.e.preventDefault()
        //     opt.e.stopPropagation()
        //     if (opt.target == fstImg) {
        //         console.log('fstImg')
        //     }
        //     console.log('down')
        // })

        // Очистка обработчиков
        return () => {
            canvas.off('mouse:wheel', handleMouseWheel)
            canvas.off('mouse:down')
        }
    }, [editor]) // Перезапускать эффект, если editor изменяется

    return (
        <div>
            <FabricJSCanvas className="sample-canvas" onReady={onReady} />
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
        </div>
    )
}
