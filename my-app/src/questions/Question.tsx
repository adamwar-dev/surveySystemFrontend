import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { OpenQuestion } from './OpenQuestion';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { MultiChoiceQuestion } from './MultiChoiceQuestion';
import { SingleChoiseQuestion } from './SingleChoiceQuestion';

export interface QuestionProps {
	numberOfQuestion: number;
	OnDeleteClick: (numberOfQuestion: number) => void;
}

interface QuestionState {
	optionSelected: string;
}


export class Question extends React.Component<QuestionProps,QuestionState>{
	public constructor(props: QuestionProps) {
		super(props);
		this.state = {
			optionSelected: 'Open'
		}
	}

	public render () {
		const {
			numberOfQuestion,
			OnDeleteClick,
		} = this.props;

		const {
			optionSelected,
		} = this.state;

		return (
			<React.Fragment>
				<Card sx={{my: '40px'}}>
					<CardContent style={{backgroundColor:'#D8BFD8'}}>
						<Box sx={{ flexGrow: 1, width:'100%'}}>
							<Grid container spacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>	
								<Grid item xs={2} sm={2} xl={2}>
									<Typography align={'center'} sx={{textAlign: 'center'}}>
										{"Question " + (numberOfQuestion + 1)}
									</Typography>
								</Grid>
								<Grid item xs={8} sm={8} xl={9}>
									<FormControl fullWidth>
										<InputLabel id='label-type'>Type</InputLabel>
										<Select
											labelId='label-type'
											id='select'
											value={optionSelected}
											label='Type'
											onChange={this.handleChangeOption}
										>
											<MenuItem value={'Open'}>Open Question</MenuItem>
											<MenuItem value={'Multi'}>Multiple Choice Question</MenuItem>
											<MenuItem value={'Single'}>Single Choise Question</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={2} sm={2} xl={1}>
									<Button 
										variant="contained"
									 	fullWidth
										sx={{my: '10%', textAlign: 'center'}}
										style={{backgroundColor:'#916BBF'}}
										startIcon={<DeleteRoundedIcon sx={{mr: '-8px'}}/>}
										onClick={() => OnDeleteClick(numberOfQuestion)}
									/>
								</Grid>
							</Grid>
						</Box>
					</CardContent>
					{optionSelected === 'Open' &&
						<OpenQuestion placeholder={'e.g. What do you think about Zmitac?'}/>
					}
					{optionSelected === 'Single' &&
						<SingleChoiseQuestion placeholder={'e.g. Which ZMITAC teacher is the best?'}/>
					}
					{optionSelected === 'Multi' &&
						<MultiChoiceQuestion placeholder={'e.g. Which ZMITAC teacher do you know?'}/>
					}
				</Card>		
			</React.Fragment>
		);
	}

	private readonly handleChangeOption = (event: SelectChangeEvent) => {
		this.setState({optionSelected: event.target.value as string});
	}
}