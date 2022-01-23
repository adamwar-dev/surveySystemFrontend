import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface TileProps {
	primaryText: string;
	linkTo: string;
	icon?: React.ReactElement;
}

export class Tile extends React.Component<TileProps> {
	public constructor(props: TileProps) {
		super(props);
	}

	public render () {
		const {
			primaryText,
			linkTo,
			icon,
		} = this.props;
		return (
			<Link href={linkTo} underline={'none'}>
				<Card sx={{ height: 210 ,ml: '30px', mr: '30px'}}>
					<CardContent sx={{ height: 210}}>
						<Typography align='center' sx={{ fontSize: 18, mt: '40px'}} color="text.primary">
							{primaryText}
						</Typography>
						<Typography align='center' sx={{ fontSize: 18, mt: '40px'}} color="text.primary">
							{icon}
						</Typography>	
					</CardContent>
				</Card>
			</Link>
		);
	}
}