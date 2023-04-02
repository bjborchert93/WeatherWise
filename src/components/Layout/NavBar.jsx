import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings'
import AccessTime from '@mui/icons-material/AccessTime';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useUnits } from '../../context/UnitsContext';
import {
	AppBar,
	Drawer,
	FormControl,
	Typography,
	Toolbar,
	IconButton,
	InputLabel,
	List,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

const NavLinks = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '2rem',
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
}));

const DrawerLinks = styled('div')(({ theme }) => ({
	width: 250,
	padding: theme.spacing(2),
}));

const menuItems = [
	{ text: 'Current', icon: <WbSunnyIcon />, link: '/dash/current' },
	{ text: 'Hourly', icon: <AccessTime />, link: 'dash/hourly' },
	{ text: '8-Day Forecast', icon: <CalendarMonthIcon />, link: 'dash/forecast' },
	{ text: 'Settings', icon: <SettingsIcon />, link: 'dash/settings' }
]

const handleGetCoords = () => {
	localStorage.removeItem('coords');
}

const NavBar = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const theme = useTheme();
	const { units, toggleUnits } = useUnits();

	console.log(units)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 3 }}>
						WeatherWise
					</Typography>
					<TextField
						name='search'
						label='Search Locations...'
						variant='outlined'
						// fullWidth
						size='small'
					/>
					<IconButton
						sx={{ mx: 1 }}
						onClick={handleGetCoords}
						
					>
						<MyLocationIcon color='secondary' />
					</IconButton>
					<NavLinks>
						<List sx={{ display: 'flex' }}>
						{menuItems.map((item, key) => (
							<ListItemButton component={Link} to={item.link}>
							<ListItemText>{item.text}</ListItemText>
							</ListItemButton>
							))}
							</List>
						</NavLinks>
					<IconButton
						size="large"
						edge="end"
						color="inherit"
						aria-label="menu"
						sx={{ display: { md: 'none' } }}
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<FormControl size='small'>
						<InputLabel>Units</InputLabel>
						<Select
							value={units.type}
							onChange={toggleUnits}
							variant='outlined'
						>
							<MenuItem value='imperial'>Imperial (°F / mph)</MenuItem>
							<MenuItem value='metric'>Metric (°C / m/s)</MenuItem>
						</Select>
					</FormControl>
				</Toolbar>
			</AppBar>
			<Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
				<DrawerLinks>
					<List>
						{menuItems.map((item, key) => (
							<ListItemButton component={Link} to={item.link}>
								<ListItemIcon>
									{item.icon}
								</ListItemIcon>
								<ListItemText>{item.text}</ListItemText>
							</ListItemButton>
						))}
					</List>
				</DrawerLinks>
			</Drawer>
		</>
	);
};

export default NavBar;