import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEffect, useState } from 'react'
import { CardElement } from '../CardElement/CardElement'
import reactImage from './react.svg' // Импорт изображения
import {
    textIAI,
    textIFT,
    textIFWD,
    textIZMIRAN,
    textMNS,
    textTISNYM,
} from './texts.jsx'
import map from 'C://React_projects/TroitskMap/src/assets/jpgmax.jpg'
import iai from 'C://React_projects/TroitskMap/src/assets/map/logos/iai.webp'
import ift from 'C://React_projects/TroitskMap/src/assets/map/logos/ift.webp'
import izmiran from 'C://React_projects/TroitskMap/src/assets/map/logos/izmiran.webp'
import mns from 'C://React_projects/TroitskMap/src/assets/map/logos/mns.webp'
import tisnym from 'C://React_projects/TroitskMap/src/assets/map/logos/tisnym.webp'

// Сам холст с объектами на нём
export const ZoomableCanvas = () => {
    // Специальный canvas из библиотеки fabric
    const { editor, onReady } = useFabricJSEditor()
    const [open, setOpen] = useState(false)
    const [openMNS, setOpenMNS] = useState(false)
    const [openIAI, setOpenIAI] = useState(false)
    const [openIFT, setOpenIFT] = useState(false)
    const [openIZMIRAN, setOpenIZMIRAN] = useState(false)
    const [openTISNYM, setOpenTISNYM] = useState(false)

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
                    img.scaleToWidth(100) // Масштабируем объект
                    img.scaleToHeight(100) // Масштабируем объект
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
                            const objects = canvas.getObjects()
                            // Смотрим границы с двух сторон по осям X и Y
                            if (
                                img.left + delta_move_coords_x <= 0 &&
                                img.left + delta_move_coords_x >=
                                    -img.width * img.scaleX + window.innerWidth
                            ) {
                                lastPosX = e.clientX
                                objects.forEach((obj) => {
                                    // Проверяем, является ли объект изображением
                                    if (obj.type === 'image') {
                                        obj.left += delta_move_coords_x
                                        obj.setCoords()
                                    }
                                })
                            }
                            if (
                                img.top + delta_move_coords_y <= 0 &&
                                img.top + delta_move_coords_y >=
                                    -img.height * img.scaleY +
                                        window.innerHeight
                            ) {
                                lastPosY = e.clientY
                                objects.forEach((obj) => {
                                    // Проверяем, является ли объект изображением
                                    if (obj.type === 'image') {
                                        obj.top += delta_move_coords_y
                                        obj.setCoords()
                                    }
                                })
                            }
                            // Обновляем объект
                            this.requestRenderAll()
                        }
                    })
                    // img.scaleToHeight(canvas.height)
                }
                canvas.add(img)

                // После добавления карты отправляем ее на задний план
                if (path === map) {
                    canvas.sendToBack(img)
                } else {
                    // После добавления объектов карты, перемещаем их выше карты
                    canvas.bringToFront(img)
                }
            })
        }

        addToCanvas(map)
        // картинка, смещение по x и y, функция открытия. Можно просто вставлять это везде
        addToCanvas(reactImage, 400, 400, () => setOpen(true))
        addToCanvas(mns, 1461, 1044, () => setOpenMNS(true))
        addToCanvas(iai, 746, 1565, () => setOpenIAI(true))
        addToCanvas(ift, 1818, 770, () => setOpenIFT(true))
        addToCanvas(tisnym, 1894, 856, () => setOpenTISNYM(true))
        addToCanvas(izmiran, 2164, 706, () => setOpenIZMIRAN(true))

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
            <CardElement
                open={openMNS}
                setOpen={setOpenMNS}
                header={'Памятник младшему научному сотруднику (МНС)'}
                images={[
                    'src/assets/map/photos/mns/p1.png',
                    'src/assets/map/photos/mns/p2.png',
                ]}
                hrefMoreDetails={'https://www.google.com/'}
            >
                {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
                {textMNS}
            </CardElement>
            <CardElement
                open={openIAI}
                setOpen={setOpenIAI}
                header={'ФГБУН «Институт ядерных исследований РАН» (ИЯИ РАН)'}
                images={[
                    'src/assets/map/photos/iai/p1.jpg',
                    'src/assets/map/photos/iai/p2.jpg',
                    'src/assets/map/photos/iai/p3.jpg',
                ]}
                hrefMoreDetails={'https://www.google.com/'}
            >
                {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
                {textIAI}
            </CardElement>
            <CardElement
                open={openIFT}
                setOpen={setOpenIFT}
                header={
                    'Отделение «Институт фотонных технологий» Курчатовского комплекса кристаллографии и фотоники (КККиФ) НИЦ «Курчатовский институт»'
                }
                images={[
                    'src/assets/map/photos/ift/p1.png',
                    'src/assets/map/photos/ift/p2.png',
                ]}
                hrefMoreDetails={'https://www.google.com/'}
            >
                {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
                {textIFT}
            </CardElement>
            <CardElement
                open={openIZMIRAN}
                setOpen={setOpenIZMIRAN}
                header={
                    'ФГБУН «Институт земного магнетизма, ионосферы и распространения радиоволн им. Н.В. Пушкова РАН» (ИЗМИРАН)'
                }
                images={[
                    'src/assets/map/photos/izmiran/p1.jpg',
                    'src/assets/map/photos/izmiran/p2.jpg',
                    'src/assets/map/photos/izmiran/p3.jpg',
                    'src/assets/map/photos/izmiran/p4.jpg',
                    'src/assets/map/photos/izmiran/p5.jpg',
                ]}
                hrefMoreDetails={'https://www.google.com/'}
            >
                {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
                {textIZMIRAN}
            </CardElement>
            <CardElement
                open={openTISNYM}
                setOpen={setOpenTISNYM}
                header={
                    'Государственный научный центр Российской Федерации «Технологический институт сверхтвёрдых и новых углеродных материалов» (ТИСНУМ) '
                }
                images={[
                    'src/assets/map/photos/tisnym/p1.png',
                    'src/assets/map/photos/tisnym/p2.png',
                ]}
                hrefMoreDetails={'https://www.google.com/'}
            >
                {/* тексты хранятся в файле texts.jsx, чтобы не засорять тут код */}
                {textTISNYM}
            </CardElement>
        </div>
    )
}
