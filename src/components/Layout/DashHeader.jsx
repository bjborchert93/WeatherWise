import { Link } from 'react-router-dom'

const DashHeader = () => {

	const content = (
		<header className="dash-header">
			<div className="dash-header__container">
				<Link to="/dash">
					<h1 className="dash-header__title">WeatherWise</h1>
				</Link>
				<form >
					<input id='search-location' placeholder='Search Locations...'/>
				</form>
				<nav className="dash-header__nav">
					{/* add nav buttons later */}
				</nav>
			</div>
		</header>
	)

	return content
}
export default DashHeader