import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { OpenQuestion } from './OpenQuestion';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { MultiChoiceQuestion } from './MultiChoiceQuestion';
import { SingleChoiseQuestion } from './SingleChoiceQuestion';

export interface QuestionData {
	content: string,
	type: QuestionType,
	questionAnswers: string[],
	respondentsAnswers: string[],
}

type QuestionType = 'Open' | 'Single' | 'Multi';
export interface QuestionProps {
	numberOfQuestion: number;
	OnDeleteClick: (numberOfQuestion: number) => void;
	handleQuestionChange: (numberOfOption: number, updatedQuestion: QuestionData) => void;
}

interface QuestionState extends QuestionData {
	typeSelected: string;
}
export class Question extends React.Component<QuestionProps, QuestionState> {
	public constructor(props: QuestionProps) {
		super(props);
		this.state = {
			typeSelected: 'Open',
			content: '',
			type: 'Open',
			questionAnswers: [],
			respondentsAnswers: [],
		}
	}

	public render () {
		const {
			numberOfQuestion,
			OnDeleteClick,
		} = this.props;

		const {
			type,
			typeSelected,
			questionAnswers,
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
											value={typeSelected}
											label='Type'
											onChange={this.handleChangeType}
										>
											<MenuItem value={'Open'}>{'Open Question'}</MenuItem>
											<MenuItem value={'Multi'}>{'Multiple Choice Question'}</MenuItem>
											<MenuItem value={'Single'}>{'Single Choise Question'}</MenuItem>
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
					{type === 'Open' &&
						<OpenQuestion
							onChangeContent={this.handleContentChange}
							placeholder={'e.g. What do you think about pizza?'}
						/>
					}
					{type === 'Single' &&
						<SingleChoiseQuestion
							onChangeContent={this.handleContentChange}
							handleOptionAdd={this.handleOptionAdd}
							handleOptionChange={this.handleOptionChange}
							handleOptionDelete={this.handleOptionDelete}
							placeholder={'e.g. Which pizza you like best?'}
							optionsData={questionAnswers}
						/>
					}
					{type === 'Multi' &&
						<MultiChoiceQuestion
							onChangeContent={this.handleContentChange}
							handleOptionAdd={this.handleOptionAdd}
							handleOptionChange={this.handleOptionChange}
							handleOptionDelete={this.handleOptionDelete}
							placeholder={'e.g. What pizzas do you know?'}
							optionsData={questionAnswers}
						/>
					}
				</Card>		
			</React.Fragment>
		);
	}

	private readonly handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({content: event.currentTarget.value});
		const data: QuestionData = {
			content: event.currentTarget.value,
			type: this.state.type,
			questionAnswers: this.state.questionAnswers,
			respondentsAnswers: [],
		}
		this.props.handleQuestionChange(this.props.numberOfQuestion, data);
	}

	private readonly handleOptionAdd = () => {
		this.setState(previousState => ({
			questionAnswers: [...previousState.questionAnswers, '']
		}), () => {
			const data: QuestionData = {
				content: this.state.content,
				type: this.state.type,
				questionAnswers: this.state.questionAnswers,
				respondentsAnswers: [],
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}

	private readonly handleOptionChange = (numberOfOption: number, newOption: string) => {
		const {
			questionAnswers,
		} = this.state;

		const updatedOptions = questionAnswers.map((option, index) => {
			return numberOfOption !== index ? option : newOption;
		});

		this.setState({questionAnswers: updatedOptions}, () => {
			const data: QuestionData = {
				content: this.state.content,
				type: this.state.type,
				questionAnswers: this.state.questionAnswers,
				respondentsAnswers: [],
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}

	private readonly handleOptionDelete = (numberOfOption: number) => {
		const {
			questionAnswers,
		} = this.state;

		const updatedOptions: string[] = [];

		questionAnswers.forEach((option, index) => {
			if(index !== numberOfOption) {
				updatedOptions.push(option);
			}
		});

		this.setState({questionAnswers: updatedOptions}, () => {
			const data: QuestionData = {
				content: this.state.content,
				type: this.state.type,
				questionAnswers: this.state.questionAnswers,
				respondentsAnswers: [],
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}

	private readonly handleChangeType = (event: SelectChangeEvent) => {
		this.setState({
			typeSelected: event.target.value,
			content: '',
			type: event.target.value as QuestionType,
			questionAnswers: [],
		}, () => {
			const data: QuestionData = {
				content: this.state.content,
				type: this.state.type,
				questionAnswers: this.state.questionAnswers,
				respondentsAnswers: [],
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}
}