import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BackArrow } from './BackArrow';

interface NavBarProps {
	barText?: string;
	backArrowVisable?: boolean;
}

export class NavBar extends React.Component<NavBarProps> {
	public constructor(props: NavBarProps) {
		super(props);
	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}

	public render () {
		const {
			barText,
			backArrowVisable,
		} = this.props;

		return (
			<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<BackArrow visable={backArrowVisable}/>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
						{barText}
						</Typography>
					<Button 
						color="inherit"
					>
						{'Log out'}
					</Button>
				</Toolbar>
			</AppBar>
			</Box>
		);
	}
}