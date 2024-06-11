import styles from './LinkButton.module.css'
import cn from 'classnames'
import { LinkTypes } from './LinkButton.types.js'

/**
 * Компонент LinkButton.
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.href - URL-адрес для ссылки.
 * @param {('small'|'middle'|'large')} props.size - Размер кнопки.
 */

export const LinkButton = ({ href, size }) => {
    return (
        <a
            className={cn(styles.link, {
                [styles.small]: size === 'small',
                [styles.middle]: size === 'middle',
                [styles.large]: size === 'large',
            })}
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            Подробнее
        </a>
    )
}

LinkButton.propTypes = LinkTypes
