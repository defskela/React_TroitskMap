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
    let takts = 0
    let myMoveX = 0
    let myMoveY = 0

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
                    canvas.on('mouse:move', function (opt) {
                        if (isDragging) {
                            const e = opt.e
                            const vpt = this.viewportTransform
                            vpt[4] += e.clientX - lastPosX
                            vpt[5] += e.clientY - lastPosY
                            myMoveX += e.clientX - lastPosX
                            myMoveY += e.clientY - lastPosY
                            console.log('myMoveX', myMoveX, 'myMoveY', myMoveY)
                            this.requestRenderAll()
                            lastPosX = e.clientX
                            lastPosY = e.clientY
                            // Поставить ограничение, чтобы изображение не уходило за пределы холста
                        }
                    })
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
            delta > 0 ? takts++ : takts--
            var zoom = canvas.getZoom()
            zoom *= 0.999 ** delta
            if (delta > 0) {
                console.log()
                const vpt = canvas.viewportTransform
                vpt[4] += myMoveX / takts
                vpt[5] += myMoveY / takts
                myMoveX += myMoveX / takts
                myMoveY += myMoveY / takts
                console.log('myMoveX2', myMoveX, 'myMoveY2', myMoveY)
            }
            if (zoom > 20) zoom = 20
            if (zoom < 1) zoom = 1
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
            opt.e.preventDefault()
            opt.e.stopPropagation()
        }

        canvas.on('mouse:wheel', handleMouseWheel)
        let isDragging = false
        let lastPosX = 0
        let lastPosY = 0

        canvas.on('mouse:down', function (opt) {
            const evt = opt.e
            isDragging = true
            lastPosX = evt.clientX
            lastPosY = evt.clientY
            canvas.selection = false // Отключить выбор объектов на холсте при перетаскивании
        })

        canvas.on('mouse:up', function () {
            isDragging = false
            canvas.selection = true // Включить обратно выбор объектов на холсте
        })

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
