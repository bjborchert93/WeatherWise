import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import DashFooter from './DashFooter'
import { Box } from '@mui/material/'

const DashLayout = () => {
    return (
        <>
            <NavBar />
            <Box className="dash-container">
                <Outlet />
            </Box>
            <DashFooter />
        </>
    )
}
export default DashLayout