import { fabric } from 'fabric'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEffect } from 'react'

export const ZoomableCanvas = () => {
    const { editor, onReady } = useFabricJSEditor()

    useEffect(() => {
        if (!editor) return

        const canvas = editor.canvas

        // Добавление объекта для демонстрации
        canvas.add(
            new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'red',
                width: 20,
                height: 20,
            })
        )

        canvas.forEachObject(function (obj) {
            obj.set({
                hasControls: false,
                hoverCursor: 'pointer',
            })
        })

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

        canvas.on('mouse:down', function (opt) {
            opt.e.preventDefault()
            opt.e.stopPropagation()
            console.log('down')
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
        </div>
    )
}
