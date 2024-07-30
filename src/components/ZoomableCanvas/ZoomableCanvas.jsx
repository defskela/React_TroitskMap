import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEffect, useState } from 'react'
import { CardElement } from '../CardElement/CardElement'
import reactImage from './react.svg' // Импорт изображения
import { textIFWD } from './texts.jsx'
import map from 'C://React_projects/TroitskMap/src/assets/jpgmax.jpg'

// Сам холст с объектами на нём
export const ZoomableCanvas = () => {
    // Специальный canvas из библиотеки fabric
    const { editor, onReady } = useFabricJSEditor()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!editor) return

        let isDragging = false
        let lastPosX = 0
        let lastPosY = 0

        const canvas = editor.canvas
        // Сохраняем пропорции картинки. 10000 и 5625 - начальные значения картинки. Посмотрел в Paint
        // Чем больше уменьшаем - тем быстрее загрузится и тем меньше будет лагов
        canvas.setWidth(10000 / 3) // Ширина холста
        canvas.setHeight(5625 / 3) // Высота холста

        function addToCanvas(
            path,
            left = 0,
            top = 0,
            onClickFunction = () => {}
        ) {
            fabric.Image.fromURL(path, function (img) {
                // Если объект не является картой (не расположен по пути map)
                if (path != map) {
                    // Используем переданные значения
                    img.set({
                        left: left,
                        top: top,
                        angle: 0,
                        opacity: 4.0,
                        // Пользователь не может изменять размеры
                        hasControls: false,
                        // Для передвижения по карте
                        selectable: true,
                        lockMovementX: true,
                        lockMovementY: true, // Блокирует перемещение по обеим осям
                        // курсор при наведении на объект карты становится pointer
                        hoverCursor: 'pointer',
                    })
                    // При нажатии вызывает функцию onClickFunction
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
                // Если объект - карта
                if (path == map) {
                    // Подстраиваем размеры под canvas
                    img.scaleToWidth(canvas.width)
                    // обработчик передвижения. Находится именно тут, чтобы мог обращаться к img
                    canvas.on('mouse:move', function (opt) {
                        // Если до перетаскивания мыши мы нажали, то начинается перемещение
                        if (isDragging) {
                            // Тут хранится много полезного о активном объекте
                            const e = opt.e
                            // С учетом zoom, чтобы при приближении всё оставалось плавным
                            const delta_move_coords_x =
                                (e.clientX - lastPosX) / canvas.getZoom()
                            const delta_move_coords_y =
                                (e.clientY - lastPosY) / canvas.getZoom()
                            // Смотрим границы с двух сторон по осям X и Y
                            if (
                                img.left + delta_move_coords_x <= 0 &&
                                img.left + delta_move_coords_x >=
                                    -img.width * img.scaleX + window.innerWidth
                            ) {
                                img.left += delta_move_coords_x
                                lastPosX = e.clientX
                            }
                            if (
                                img.top + delta_move_coords_y <= 0 &&
                                img.top + delta_move_coords_y >=
                                    -img.height * img.scaleY +
                                        window.innerHeight
                            ) {
                                img.top += delta_move_coords_y
                                lastPosY = e.clientY
                            }
                            // Обновляем объект
                            this.requestRenderAll()
                        }
                    })
                    // img.scaleToHeight(canvas.height)
                }
                canvas.add(img)
                if (path != map) {
                    // Установка z-index для изображения, чтобы объекты были поверх карты
                    canvas.moveTo(img, 1)
                }
            })
        }

        addToCanvas(map)
        // картинка, смещение по x и y, функция открытия. Можно просто вставлять это везде
        addToCanvas(reactImage, 400, 400, () => setOpen(true))

        // Масштабирование в точку
        const handleMouseWheel = (opt) => {
            const scrollDelta = opt.e.deltaY
            let zoom = canvas.getZoom()
            // scrollDelta может быть как положительной, так и отрицательной
            zoom *= 0.999 ** scrollDelta
            // Границы масштабирования
            if (zoom > 20) zoom = 20
            if (zoom < 1) zoom = 1
            // Масштабирование в точку
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
            // Просто нужные штуки, без которых будут проблемы
            opt.e.preventDefault()
            opt.e.stopPropagation()
        }
        // Обработчик прокрутки, который вызывает функцию выше
        canvas.on('mouse:wheel', handleMouseWheel)
        // Нажатие для начала перемещения по карте
        canvas.on('mouse:down', function (opt) {
            const evt = opt.e
            isDragging = true
            lastPosX = evt.clientX
            lastPosY = evt.clientY
            canvas.selection = false // Отключить выбор объектов на холсте при перетаскивании
        })
        // Отпускание для завершения перемещения по карте
        canvas.on('mouse:up', function () {
            isDragging = false
            canvas.selection = true // Включить обратно выбор объектов на холсте
        })

        // Очистка обработчиков
        return () => {
            canvas.off('mouse:wheel', handleMouseWheel)
            canvas.off('mouse:down')
        }
    }, [editor]) // Перезапускать эффект, если editor изменяется

    return (
        <div>
            <FabricJSCanvas className="sample-canvas" onReady={onReady} />
            {/* Вот такой кучкой передаем все метки на карте */}
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
