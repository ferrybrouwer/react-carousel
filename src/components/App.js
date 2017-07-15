import React from 'react'

import Carousel from 'components/Carousel'
import CarouselSlide from 'components/CarouselSlide'

/**
 * Some random slides
 * @type {Array}
 */
const items = [...Array(10).keys()].map((key, i) => <CarouselSlide itemIndex={i} key={`slide-${i}`}/>)

const App = () => (
    <Carousel items={items} transitionSpeed={800} ease={'Power2.easeOut'} />
)

export default App