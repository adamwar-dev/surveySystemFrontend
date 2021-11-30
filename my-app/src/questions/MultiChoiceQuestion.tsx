import * as React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import { OptionClick, OptionClickProps } from '../components/OptionClick';
import { OpenQuestion } from './OpenQuestion';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface MultiChoiceQuestionProps {
	placeholder?: string;
}

interface MultiChoiceQuestionState {
	options: OptionClickProps[];
}

export class MultiChoiceQuestion extends React.Component<MultiChoiceQuestionProps, MultiChoiceQuestionState> {
	public constructor(props: MultiChoiceQuestionProps) {
		super(props);

		this.state = {
			options: [],
		}
	}

	public render () {
		const {
			placeholder,
		} = this.props;

		const {
			options,
		} = this.state;

		const renderOptions = this.state.options.map((option, index) => {
			return <OptionClick key={index} optionNumber={index} OnDeleteClick={option.OnDeleteClick}/>
		});

		return (
			<React.Fragment>
				<OpenQuestion placeholder={placeholder}/>
				<Card>
					<CardContent style={{backgroundColor:'#E6E6FA'}} sx={{alignItems:'center', justifyContent:'center' }}>
						{options.length < 2 &&
							this.optionAddClick()
						}
						{renderOptions}
						{options.length < 10 &&
							<Button 
								variant="contained"
								fullWidth
								sx={{mt: '20px', textAlign: 'center'}}
								style={{backgroundColor:'#D8BFD8'}}
								startIcon={<AddCircleRoundedIcon/>}
								onClick={this.optionAddClick}
							/>
						}
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}

	private readonly optionAddClick = () => {
		const another: OptionClickProps = {
			optionNumber: this.state.options.length,
			OnDeleteClick: this.optionDeleteClick,
		}
		this.setState({options: [...this.state.options, another]});
	}

	private readonly optionDeleteClick = (optionNumber: number) => {
		const optionAfterDeleteItem = this.state.options;
		optionAfterDeleteItem.splice(optionNumber, 1);
		this.setState({options: optionAfterDeleteItem});
	}
}