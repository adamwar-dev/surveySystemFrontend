import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, Button, Grid } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

interface SurveyInHistoryProps {
	token: string;
	id: string;
	type: string;
	title: string;
}

export class SurveyInHistory extends React.Component<SurveyInHistoryProps> {
	public constructor(props: SurveyInHistoryProps) {
		super(props);
	}

	public render () {
		const {
			token,
			id,
			type,
			title,
		} = this.props;
		return (
			<Box sx={{ flexGrow: 1, width:'100%', mb: '20px'}}>
				<Grid
					container
					spacing={0}
					alignItems="center"
					justifyContent="center"
					columnSpacing={{ xs: 2, sm: 2, md: 3 }}
				>
					<Link href={'/preview/' + token + '/' + id} underline={'none'}>
						<Grid item xs={12} sm={12} md={12}>
							<Typography
								align='left'
								paragraph
								variant='h6'
								component='div'
								sx={{ flexGrow: 1 }}
							>
								{title}
							</Typography>
						</Grid>
					</Link>
					<Grid item xs={12} sm={12} md={12}>
						<Button 
							variant="contained"
							fullWidth
							style={{backgroundColor:'#D8BFD8'}}
							startIcon={<DeleteRoundedIcon sx={{mr: '-8px'}}/>}
							onClick={() => {}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<Button 
							variant="contained"
							fullWidth
							style={{backgroundColor:'#D8BFD8'}}
							startIcon={<ContentCopyRoundedIcon sx={{mr: '-8px'}}/>}
							onClick={() => {navigator.clipboard.writeText("http://localhost:3000/fillSurvey/" + type + '/' + id)}}
						/>
					</Grid>
				</Grid>
			</Box>
		);
	}
}