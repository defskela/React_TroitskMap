import propTypes from 'prop-types'

export const LinkTypes = {
    href: propTypes.string.isRequired,
    size: propTypes.oneOf(['small', 'middle', 'large']),
}
