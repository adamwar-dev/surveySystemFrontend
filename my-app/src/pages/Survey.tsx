import { Button, Card, CardContent, TextField } from '@mui/material';
import * as React from 'react';
import { NavBar } from '../components/NavBar';
import { Question, QuestionProps } from '../questions/Question';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface SurveyProps {
	surveyType: string;
}

interface SurveyState {
	questions: QuestionProps[];
}

export class Survey extends React.Component<SurveyProps, SurveyState> {
	public constructor(props: SurveyProps) {
		super(props);

		this.state = {
			questions: [],
		}
	}

	public render () {
		const {
			surveyType,
		} = this.props;

		const {
			questions,
		} = this.state;

		const renderQuestion = this.state.questions.map((question, index) => {
			return <Question key={index} numberOfQuestion={index} OnDeleteClick={question.OnDeleteClick}/>
		});
	
		return (
			<React.Fragment>
                <NavBar 
					backArrowVisable={true}
					barText={surveyType === 'public' ?
						'Public Survey' :
						surveyType === 'private' ?
							'Private Survey' :
							'Distributed Survey'
					}
					linkTo='/create'
				/>
				<Card>
					<CardContent style={{backgroundColor: '#DDA0DD'}}>
						<TextField
							id='title'
							label='Title'
							placeholder='e.g. Survey about tasty food!'
							multiline
							fullWidth			
						/>
					</CardContent>
				</Card>
				{questions.length < 1 &&
				 	this.questionAddClick()
				}
				{renderQuestion}
				{questions.length < 20 &&
					<Button 
						variant="contained"
						fullWidth
						sx={{mt: '20px', textAlign: 'center'}}
						style={{backgroundColor:'#DDA0DD'}}
						startIcon={<AddCircleRoundedIcon/>}
						onClick={this.questionAddClick}
					/>
				}
            </React.Fragment>
		);
	}

	private readonly questionAddClick = () => {
		const another: QuestionProps = {
			numberOfQuestion: this.state.questions.length,
			OnDeleteClick: this.questionDeleteClick,
		}
		this.setState({questions: [...this.state.questions, another]});
	}

	private readonly questionDeleteClick = (numberOfQuestion: number) => {
		const questionAfterDeleteItem = this.state.questions;
		questionAfterDeleteItem.splice(numberOfQuestion, 1);
		this.setState({questions: questionAfterDeleteItem});
	}
}