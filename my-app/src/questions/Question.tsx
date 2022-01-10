import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { OpenQuestion } from './OpenQuestion';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { MultiChoiceQuestion } from './MultiChoiceQuestion';
import { SingleChoiseQuestion } from './SingleChoiceQuestion';

export interface QuestionData {
	Content: string,
	Type: QuestionType,
	QuestionAnswers: string[],
}

type QuestionType = 'Open' | 'OneChoice' | 'MultipleChoice';
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
			Content: '',
			Type: 'Open',
			QuestionAnswers: [],
		}
	}

	public render () {
		const {
			numberOfQuestion,
			OnDeleteClick,
		} = this.props;

		const {
			Type,
			typeSelected,
			QuestionAnswers,
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
											<MenuItem value={'OneChoice'}>{'Multiple Choice Question'}</MenuItem>
											<MenuItem value={'MultipleChoice'}>{'Single Choise Question'}</MenuItem>
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
					{Type === 'Open' &&
						<OpenQuestion
							onChangeContent={this.handleContentChange}
							placeholder={'e.g. What do you think about pizza?'}
						/>
					}
					{Type === 'OneChoice' &&
						<SingleChoiseQuestion
							onChangeContent={this.handleContentChange}
							handleOptionAdd={this.handleOptionAdd}
							handleOptionChange={this.handleOptionChange}
							handleOptionDelete={this.handleOptionDelete}
							placeholder={'e.g. Which pizza you like best?'}
							optionsData={QuestionAnswers}
						/>
					}
					{Type === 'MultipleChoice' &&
						<MultiChoiceQuestion
							onChangeContent={this.handleContentChange}
							handleOptionAdd={this.handleOptionAdd}
							handleOptionChange={this.handleOptionChange}
							handleOptionDelete={this.handleOptionDelete}
							placeholder={'e.g. What pizzas do you know?'}
							optionsData={QuestionAnswers}
						/>
					}
				</Card>		
			</React.Fragment>
		);
	}

	private readonly handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({Content: event.currentTarget.value});
		const data: QuestionData = {
			Content: event.currentTarget.value,
			Type: this.state.Type,
			QuestionAnswers: this.state.QuestionAnswers,
		}
		this.props.handleQuestionChange(this.props.numberOfQuestion, data);
	}

	private readonly handleOptionAdd = () => {
		this.setState(previousState => ({
			QuestionAnswers: [...previousState.QuestionAnswers, '']
		}), () => {
			const data: QuestionData = {
				Content: this.state.Content,
				Type: this.state.Type,
				QuestionAnswers: this.state.QuestionAnswers,
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}

	private readonly handleOptionChange = (numberOfOption: number, newOption: string) => {
		const {
			QuestionAnswers,
		} = this.state;

		const updatedOptions = QuestionAnswers.map((option, index) => {
			return numberOfOption !== index ? option : newOption;
		});

		this.setState({QuestionAnswers: updatedOptions}, () => {
			const data: QuestionData = {
				Content: this.state.Content,
				Type: this.state.Type,
				QuestionAnswers: this.state.QuestionAnswers,
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}

	private readonly handleOptionDelete = (numberOfOption: number) => {
		const {
			QuestionAnswers,
		} = this.state;

		const updatedOptions: string[] = [];

		QuestionAnswers.forEach((option, index) => {
			if(index !== numberOfOption) {
				updatedOptions.push(option);
			}
		});

		this.setState({QuestionAnswers: updatedOptions}, () => {
			const data: QuestionData = {
				Content: this.state.Content,
				Type: this.state.Type,
				QuestionAnswers: this.state.QuestionAnswers,
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}

	private readonly handleChangeType = (event: SelectChangeEvent) => {
		this.setState({
			typeSelected: event.target.value,
			Content: '',
			Type: event.target.value as QuestionType,
			QuestionAnswers: [],
		}, () => {
			const data: QuestionData = {
				Content: this.state.Content,
				Type: this.state.Type,
				QuestionAnswers: this.state.QuestionAnswers,
			}
			this.props.handleQuestionChange(this.props.numberOfQuestion, data);
		});
	}
}