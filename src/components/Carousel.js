import React from 'react'
import withCarousel from 'enhancers/withCarousel'

const Carousel = ({ index, onNavigateLeft, onNavigateRight, items }) => (
    <div className="carousel">

        <div>Index: {index}</div>
        
        <button onClick={onNavigateLeft}>Navigate Left</button>
        
        <div className="item-container">{items}</div>

        <button onClick={onNavigateRight}>Navigate Right</button>

    </div>
)

export default withCarousel(Carousel)