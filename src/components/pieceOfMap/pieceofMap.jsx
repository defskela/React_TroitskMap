import { useRef } from 'react'
import styles from './pieceOfMap.module.css'
import PropTypes from 'prop-types'

export const PieceOfMap = ({ name, image }) => {
    const imgRef = useRef()
    const scaleRef = useRef(1)

    const handleWheel = (e) => {
        e.preventDefault()

        if (e.deltaY > 0) {
            scaleRef.current += 0.02 // увеличиваем масштаб
        } else {
            scaleRef.current -= 0.02 // уменьшаем масштаб
        }
        const rect = e.target.getBoundingClientRect()
        const x = e.pageX - rect.left - window.scrollX
        const y = e.pageY - rect.top - window.scrollY

        e.target.style.transformOrigin = `${x}px ${y}px`
        e.target.style.transform = `scale(${scaleRef.current})`
    }

    return (
        <div className={styles.pieceOfMap}>
            <img
                ref={imgRef}
                src={image}
                alt={name}
                className={styles.image}
                onWheel={handleWheel}
            />
        </div>
    )
}

PieceOfMap.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}
