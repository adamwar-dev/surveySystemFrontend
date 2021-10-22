import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeSwitchButton } from './ThemeSwitchButton';


interface MainPageBarProps {
	barText: string;
}

export class MainPageBar extends React.Component<MainPageBarProps> {
	public constructor(props: MainPageBarProps) {
		super(props);
	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}

	public render () {
		const {
			barText,
		} = this.props;

		return (
			<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
					{barText}
					</Typography>
					<ThemeSwitchButton/>
					<Button 
						color="inherit"
					>
						Log out
					</Button>
				</Toolbar>
			</AppBar>
			</Box>
		);
	}
}