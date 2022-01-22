import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { Footer } from '../../components/Footer';
import { QuestionsAnswers, SurveyDataProvider } from '../../data/SurveyDataProvider';
import { AnswerChoiceQuestion } from '../../questions/AnswerChoiceQuestion';
import { AnswerOpenQuestion } from '../../questions/AnswerOpenQuestion';

interface FillPublicProps {
	surveyId: string;
}

interface QuestionToAnswer {
    id: string;
    type: string;
    content: string;
    questionAnswers: string[];
    currentAnswers: string[];
    number: number;
}

interface FillPublicSurveyState {
    title: string;
    type: string;
    questions: QuestionToAnswer[];
}

export class FillPublicSurvey extends React.Component<FillPublicProps, FillPublicSurveyState> {
	public constructor(props: FillPublicProps) {
		super(props);

        this.state = {
            title: '',
            type: '',
            questions: [],
        }
	}

    public componentDidMount () {
        return SurveyDataProvider.getPublicSurvey(this.props.surveyId)
        .then(survey => {
            this.setState({
              title: survey.Title,
              type: survey.Type,
            });
            survey.Questions.forEach((questionData: any) => {
                const question: QuestionToAnswer = {
                    id: questionData._id,
                    type: questionData.Type,
                    content: questionData.Content,
                    questionAnswers: questionData.QuestionAnswers,
                    number: survey.Questions.indexOf(questionData) + 1,
                    currentAnswers: [],
                }
                this.setState(previousState => ({
                    questions: [...previousState.questions, question],
                }));
            });
        });
    }

	public render () {
        const renderQuestions = this.state.questions.map((question, index) => {
			return (
                <React.Fragment>
                    {question.type === 'Open' &&
                        <AnswerOpenQuestion
                            key={index}
                            questionId={question.id}
                            questionValue={question.content}
                            onChangeAnswer={this.handleQuestionAnswerChange}
                            number={question.number}
                        />
                    }
                    {question.type === 'OneChoice' &&
                        <AnswerChoiceQuestion
                            multi={false}
                            key={index}
                            questionId={question.id}
                            questionValue={question.content}
                            questionAnswers={question.questionAnswers}
                            onChangeAnswer={this.handleQuestionAnswerChange}
                            number={question.number}
                        />
                    }
                    {question.type === 'MultipleChoice' &&
                        <AnswerChoiceQuestion
                            multi={true}
                            key={index}
                            questionId={question.id}
                            questionValue={question.content}
                            questionAnswers={question.questionAnswers}
                            onChangeAnswer={this.handleQuestionAnswerChange}
                            number={question.number}
                        />
                    }
                </React.Fragment>
			)
		});

        const {
            title,
        } = this.state;

        const {
            surveyId,
        } = this.props;
		return (
			<React.Fragment>
                <Box textAlign='center'>
                    <Card>
                        <CardContent style={{backgroundColor:'#E6E6FA'}}>
                        <Typography variant="h5" component="h5">
                                {'Survey id: ' + surveyId}
                            </Typography>
                            <Typography variant="h5" component="h5">
                                {'Title: '+ title}
                            </Typography>
                        </CardContent>
				    </Card>
                    {renderQuestions}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{mt: '30px', textAlign: 'center'}}
                        style={{backgroundColor:'#916BBF', maxWidth: '240px'}}
                        onClick={this.sendAnswers}
                    >
                    {'Send'}
                    </Button>
                </Box>
                <Footer/>
            </React.Fragment>
		);
	}

    private readonly handleQuestionAnswerChange = (questionId: string, currentAnswers: string[]) => {
		const {
			questions,
		} = this.state;

        console.log(currentAnswers);
		const updatedQuestions = questions.map((question) => {
            const updatedQuestion: QuestionToAnswer = {
                id: question.id,
                type: question.type,
                content: question.content,
                questionAnswers: question.questionAnswers,
                currentAnswers: currentAnswers,
                number: question.number,
            }
			return questionId !== question.id ? question : updatedQuestion;
		});
		this.setState({questions: updatedQuestions});
	}

    private readonly sendAnswers = () => {
        const questionsAnswers: QuestionsAnswers[] = [];
        this.state.questions.forEach(question => {
            const questionAnswers: QuestionsAnswers = {
                questionId: question.id,
                Answers: question.currentAnswers,
            }
            questionsAnswers.push(questionAnswers);
        })
        return SurveyDataProvider.answerPublicSurvey(this.props.surveyId, questionsAnswers);
    }
}