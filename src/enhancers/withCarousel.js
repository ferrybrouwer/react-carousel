import React from 'react'
import { arrayOf, element, number, string } from 'prop-types'
import { compose, defaultProps, mapProps, setPropTypes, withHandlers, withState } from 'recompose'

import withCarouselItem from 'enhancers/withCarouselItem'

/**
 * Wrapper carousel slide
 */
const EnhancedCarouselSlide = withCarouselItem(({ children, carouselItemClassName }) => (
    <div className={carouselItemClassName}>
        {children}
    </div>
))

export default compose(
    /**
     * Should have a required `item` prop type
     */
    setPropTypes({
        items:           arrayOf(element).isRequired,
        transitionSpeed: number,
        slideDelay:      number,
        ease:            string
    }),

    /**
     * Apply default props
     */
    defaultProps({
        transitionSpeed: 800,
        slideDelay:      .08,
        ease:            'Power.easeOut'
    }),

    /**
     * Apply states
     */
    withState('index', 'setIndex', 0),
    withState('prevIndex', 'setPrevIndex', null),
    withState('direction', 'setDirection', null),

    withHandlers({

        /**
         * On navigate to left index
         *
         * @param {Array}       items
         * @param {Number}      index
         * @param {Function}    setIndex
         * @param {Function}    setPrevIndex
         * @param {Function}    setDirection
         */
        onNavigateLeft: ({ items, index, setIndex, setPrevIndex, setDirection }) => (e) => {
            e.preventDefault()
            const newIndex = (index > 0) ? index - 1 : items.length - 1
            setPrevIndex(index)
            setIndex(newIndex)
            setDirection('left')
        },

        /**
         * On navigate to right index
         *
         * @param {Array}       items
         * @param {Number}      index
         * @param {Function}    setIndex
         * @param {Function}    setPrevIndex
         * @param {Function}    setDirection
         */
        onNavigateRight: ({ items, index, setIndex, setPrevIndex, setDirection }) => (e) => {
            e.preventDefault()
            const newIndex = (index < items.length - 1) ? index + 1 : 0
            setPrevIndex(index)
            setIndex(newIndex)
            setDirection('right')
        }
    }),

    /**
     * Map `items` prop with enhancer `withCarouselItem`
     */
    mapProps(({ items, index, prevIndex, direction, transitionSpeed, slideDelay, ease, ...props }) => ({
        items: items.map((item, itemIndex) => {
            return <EnhancedCarouselSlide
                key={`carousel-slide-${itemIndex}`}
                index={index}
                itemIndex={itemIndex}
                prevIndex={prevIndex}
                direction={direction}
                transitionSpeed={transitionSpeed}
                slideDelay={slideDelay}
                ease={ease}
                totalItems={items.length}
            >{item}</EnhancedCarouselSlide>
        }),
        index,
        ...props
    }))
)