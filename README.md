# React Carousel

> A higher order component for React


## Usage

1. We can create our new Carousel component with the use of a higher order component `withCarousel`, which provide some carousel props as `index`, `onNavigateLeft`, `onNavigateRight` and `items`:

		import withCarousel from 'enhancers/withCarousel'
		
		const MyCarousel = withCarousel(({ index, onNavigateLeft, onNavigateRight, items }) => (
		
			<div className="carousel">
			
				<button onClick={onNavigateLeft}>Left</button>
		
				<div className="slides">{items}</div>
		
				<button onClick={onNavigateRight}>Right</button>
		
			</div>
		
		))

2. In order to use our `MyCarousel` component, we must pass slides as `item` prop to this component. Example of constructing the slides array:

		const MySlideComponent = () => <div>My Slide</div>
	
		const slides = [
			<MySlideComponent />,
			<MySlideComponent />,
			<MySlideComponent />,
			<MySlideComponent />,
			<MySlideComponent />,
			<MySlideComponent />
		]
	
3. Use our `MyCarousel` component:

		const App = () => (
			<div>
	
				<h1>Carousel with slides</h1>
	
				<MyCarousel 
					items={slides} 
					transitionSpeed={500}
					ease={'Power.easeOut'}
					slideDelay={0}
				/>
	
				<h1>Carousel with other slides</h1>
	
				<MyCarousel 
					items={otherSlides} 
					transitionSpeed={500}
					ease={'Power.easeOut'}
					slideDelay={0}
				/>
			</div>
		)