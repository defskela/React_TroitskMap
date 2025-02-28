import PropTypes from 'prop-types'

export const propTypesCardElement = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    hrefMoreDetails: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    imagesLegens: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
    header: PropTypes.string,
}
