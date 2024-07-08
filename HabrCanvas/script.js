// Инициализация canvas с помощью Fabric.js
var canvas = new fabric.Canvas('c')

// Добавление объекта для демонстрации
canvas.add(
    new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
    }),
)

canvas.forEachObject(function (obj) {
    obj.set({
        hasControls: false,
        hoverCursor: 'pointer',
    })
})

// Обработка события прокрутки для масштабирования
canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY
    var zoom = canvas.getZoom()
    zoom *= 0.999 ** delta
    if (zoom > 20) zoom = 20
    if (zoom < 0.01) zoom = 0.01
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
    opt.e.preventDefault()
    opt.e.stopPropagation()
})

canvas.on('mouse:down', function (opt) {
    opt.e.preventDefault()
    opt.e.stopPropagation()
    console.log('down')
})
