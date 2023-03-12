import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AppBar, Drawer, Typography, Toolbar, IconButton, List, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings'

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
	{ text: 'Current Conditions', icon: <WbSunnyIcon />, link: '/dash/current' },
	{ text: 'Forecast', icon: <CalendarMonthIcon />, link: 'dash/forecast' },
	{ text: 'Settings', icon: <SettingsIcon />, link: 'dash/settings' }
]

const NavBar = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const theme = useTheme();
	
	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						WeatherWise
					</Typography>
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