import { Outlet } from 'react-router-dom'
// import DashHeader from './DashHeader'
import NavBar from './NavBar'
import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
        <>
            <NavBar />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout