import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import DashFooter from './DashFooter'
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ForecastPeriodToggle from '../toggles/ForecastPeriodToggle';
import UnitsToggle from '../toggles/UnitsToggle';

const DashLayout = () => {
	return (
		<>
			<NavBar />
			<Box className="dash-container">
				<Grid container>
					<Grid item sm={12} md={6}>
						<ForecastPeriodToggle />
					</Grid>
					<Grid item sm={12} md={6}>
						<UnitsToggle />
					</Grid>
				</Grid>
				<Outlet />
			</Box>
			<DashFooter />
		</>
	)
}
export default DashLayout