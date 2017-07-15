import { findDOMNode } from 'react-dom'
import { number, string } from 'prop-types'
import { TweenLite } from 'gsap'
import { compose, lifecycle, mapProps, setPropTypes, withState } from 'recompose'

export default compose(
    /**
     * Should have prop types
     */
    setPropTypes({
        index:           number.isRequired,
        itemIndex:       number.isRequired,
        totalItems:      number.isRequired,
        prevIndex:       number,
        direction:       string,
        transitionSpeed: number,
        slideDelay:      number,
        ease:            string
    }),

    /**
     * Apply states
     */
    withState('stateClasses', 'setStateClasses', []),

    /**
     * Map `carouselItemClassName`
     */
    mapProps(({ transitionSpeed, stateClasses, ...props }) => ({
        carouselItemClassName: stateClasses.length > 0 ? `carousel-item ${stateClasses.join(' ')}` : `carousel-item`,
        transitionSpeed:       transitionSpeed / 1000,
        stateClasses,
        ...props
    })),

    lifecycle({

        /**
         * Store itemNode reference
         * Show first carousel item
         */
        componentDidMount() {
            this.itemNode = findDOMNode(this)
            const { itemIndex, setStateClasses } = this.props
            if (itemIndex === 0) {
                setStateClasses([
                    'carousel-item--active',
                    'carousel-item--in-view'
                ])
            }
        },

        /**
         * When index changes, update animation states
         * @param {Object} nextProps
         */
        componentWillReceiveProps(nextProps) {

            // destruct props from nextProps
            const {
                index,
                itemIndex,
                prevIndex,
                direction,
                stateClasses,
                setStateClasses,
                transitionSpeed,
                slideDelay,
                ease,
                totalItems
            } = nextProps

            // when index changes
            if (this.props.index !== index) {

                const stateProps = [
                    {
                        id: 'animate-from-left-in',
                        enabled: (index === itemIndex && direction === 'right'),
                        tweenMethod: 'fromTo',
                        tweenParams: [{ x: '-100%' }, { ease, x: '0%' }],
                        stateClasses: [
                            'carousel-item--active',
                            'carousel-item--direction-right',
                            'carousel-item--in-view'
                        ]
                    },
                    {
                        id: 'animate-from-right-in',
                        enabled: (index === itemIndex && direction === 'left'),
                        tweenMethod: 'fromTo',
                        tweenParams: [{ x: '100%' }, { ease, x: '0%' }],
                        stateClasses: [
                            'carousel-item--active',
                            'carousel-item--direction-left',
                            'carousel-item--in-view'
                        ]
                    },
                    {
                        id: 'animate-left-out',
                        enabled: (itemIndex === prevIndex && direction === 'left'),
                        tweenMethod: 'to',
                        tweenParams: [{ 
                            delay: slideDelay, 
                            ease, 
                            x: '-100%', 
                            onComplete: () => {
                                setStateClasses([]) 
                                this.itemNode.style.zIndex = ''
                            }
                        }],
                        stateClasses: [
                            'carousel-item--direction-left',
                            'carousel-item--in-view'
                        ]
                    },
                    {
                        id: 'animate-right-out',
                        enabled: (itemIndex === prevIndex && direction === 'right'),
                        tweenMethod: 'to',
                        tweenParams: [{ 
                            delay: slideDelay, 
                            ease, x: '100%', 
                            onComplete: () => {
                                setStateClasses([]) 
                                this.itemNode.style.zIndex = ''
                            }
                        }],
                        stateClasses: [
                            'carousel-item--direction-right',
                            'carousel-item--in-view'
                        ]
                    }
                ]

                stateProps.filter((obj) => obj.enabled).forEach((obj) => {
                    setStateClasses(obj.stateClasses)

                    if (['animate-left-out', 'animate-right-out'].indexOf(obj.id) !== -1) {
                        this.itemNode.style.zIndex = (direction === 'left') ? totalItems - itemIndex - 1 : itemIndex
                    }

                    TweenLite[obj.tweenMethod].apply(null, [this.itemNode, transitionSpeed, ...obj.tweenParams])
                })
            }
        }
    })
)