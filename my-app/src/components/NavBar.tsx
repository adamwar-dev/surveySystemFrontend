import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BackArrow } from './BackArrow';
import { Link } from '@mui/material';

interface NavBarProps {
	barText?: string;
	backArrowVisable?: boolean;
	linkTo?: string;
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
			linkTo,
		} = this.props;

		return (
			<Box sx={{ flexGrow: 1, mb: '50px' }}>
			<AppBar position="static" sx={{ backgroundColor:'#916BBF'}}>
				<Toolbar>
					<Link href={linkTo}>
						<BackArrow visable={backArrowVisable}/>
					</Link>
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