import styles from './CardElement.module.css'
import cn from 'classnames'
import { propTypesCardElement } from './CardElement.types.js'
import { useEffect } from 'react'

export const CardElement = ({ open, setOpen, header, children }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                // 27 - код клавиши Esc
                setOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        // Удаляем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [setOpen])

    return (
        <div
            className={cn(styles.modal, { [styles.active]: open })}
            onClick={() => setOpen(false)}
        >
            <div
                className={cn(styles.content, { [styles.active]: open })}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h1 className={styles.header__text}>{header}</h1>
                </div>
                {children}
            </div>
        </div>
    )
}

CardElement.propTypes = propTypesCardElement
