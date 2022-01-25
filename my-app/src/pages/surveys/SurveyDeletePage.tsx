import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { NavBar } from '../../components/NavBar';

interface SurveyDeletePageProps {
	status: string;
    token: string;
}

export class SurveyDeletePage extends React.Component<SurveyDeletePageProps> {
	public constructor(props: SurveyDeletePageProps) {
		super(props);
	}

	public render () {
		const {
			status,
            token,
		} = this.props;
		return (
            <React.Fragment>
                <NavBar linkTo={'/history/' + token} backArrowVisable={true}/>
                <Card sx={{ height: 300 ,ml: '30px', mr: '30px', mt: '30px'}}>
                    <CardContent sx={{ height: 300}}>
                        <Typography align='center' sx={{ fontSize: 18, mt: '50px'}} color={status === 'deleted' ? '#47d147' : '#ff1a1a'}>
                            {status === 'deleted' &&
                                'Survey has been deleted successfully!'
                            }
                            {status !== 'deleted' &&
                                'Error occurred while deleting survey :('
                            }
                        </Typography>
                        <Typography align='center' sx={{ fontSize: 18, mt: '50px'}} color="text.primary">
                            {status === 'deleted' &&
                                <DoneRoundedIcon sx={{color: '#47d147'}}/>
                            }
                            {status !== 'deleted' &&
                                <ErrorRoundedIcon sx={{color: '#ff1a1a'}}/>
                            }
                        </Typography>	
                    </CardContent>
                </Card>
            </React.Fragment>
		);
	}
}