import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

interface FinalPageProps {
	status: string;
}

export class FinalPage extends React.Component<FinalPageProps> {
	public constructor(props: FinalPageProps) {
		super(props);
	}

	public render () {
		const {
			status,
		} = this.props;
		return (
			<Card sx={{ height: 300 ,ml: '30px', mr: '30px', mt: '30px'}}>
				<CardContent sx={{ height: 300}}>
					<Typography align='center' sx={{ fontSize: 18, mt: '50px'}} color={status === '201' ? '#47d147' : '#ff1a1a'}>
						{status === '201' &&
							'Survey has been send successfully!'
						}
						{status !== '201' &&
							'Error occurred while sending survey :('
						}
					</Typography>
					<Typography align='center' sx={{ fontSize: 18, mt: '50px'}} color="text.primary">
						{status === '201' &&
							<DoneRoundedIcon sx={{color: '#47d147'}}/>
						}
						{status !== '201' &&
							<ErrorRoundedIcon sx={{color: '#ff1a1a'}}/>
						}
					</Typography>	
				</CardContent>
			</Card>
		);
	}
}