import styles from './CardElement.module.css'
import cn from 'classnames'
import { propTypesCardElement } from './CardElement.types.js'
import { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { LinkButton } from '../LinkButton/LinkButton.jsx'

export const CardElement = ({
    open,
    setOpen,
    images,
    // imagesLegens = [],
    hrefMoreDetails,
    header,
    children,
}) => {
    // Кнопочки "Изображение 1" в карусели и их стилизация
    const spanIndicator = (onClickHandler, isSelected, index, label) => {
        const defStyle = {
            marginLeft: 20,
            color: 'rgb(0, 0, 139)',
            cursor: 'pointer',
        }
        const style = isSelected
            ? { ...defStyle, color: 'rgb(0, 157, 255)' }
            : { ...defStyle }
        return (
            <span
                style={style}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`${label} ${index + 1}`}
            >
                {'Изображение ' + index}
            </span>
        )
    }
    // Обработчик нажатия клавиши Esc для закрытия модального окна
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
                <Carousel
                    autoPlay
                    infiniteLoop
                    interval={3000}
                    showArrows={false}
                    showThumbs={true}
                    showIndicators={true}
                    stopOnHover={false}
                    renderIndicator={spanIndicator}
                >
                    {/* Создаем карусель из изображений, переданных в props images. Также можно сделать подписи к изображениям, если передать props imagesLegends */}
                    {images.map((image, index) => (
                        <div key={index} className={styles.slide}>
                            <img src={image} />
                            {/* можно добавить подпись к изображениям */}
                            {/* {images.length == imagesLegens.length ? (
                                <p className="legend">{imagesLegens[index]}</p>
                            ) : null} */}
                        </div>
                    ))}
                </Carousel>
                <div className={styles.header}>
                    <h1 className={styles.header__text}>{header}</h1>
                </div>
                <div className={styles.text}>
                    {children}
                    <LinkButton size={'middle'} href={hrefMoreDetails} />
                </div>
            </div>
        </div>
    )
}

CardElement.propTypes = propTypesCardElement
