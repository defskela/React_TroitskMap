import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './ZoomableImage.module.css'

export const ZoomableImage = ({ src }) => {
    const imgRef = useRef(null)
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleWheel = (e) => {
        e.preventDefault()
        let newScale = scale
        newScale *= e.deltaY > 0 ? 1.1 : 0.9
        setScale(newScale)
    }

    const handleMouseDown = (e) => {
        const startX = e.clientX - position.x
        const startY = e.clientY - position.y
        const mouseMoveHandler = (moveEvent) => {
            moveEvent.preventDefault()
            setPosition({
                x: moveEvent.clientX - startX,
                y: moveEvent.clientY - startY,
            })
        }
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener(
            'mouseup',
            () => {
                document.removeEventListener('mousemove', mouseMoveHandler)
            },
            { passive: false }
        )
    }

    return (
        <div className={styles.img}>
            <img
                ref={imgRef}
                src={src}
                alt=""
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                }}
            />
        </div>
    )
}

ZoomableImage.propTypes = {
    src: PropTypes.string.isRequired,
}
