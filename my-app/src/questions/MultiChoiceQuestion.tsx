import * as React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import { Option, OptionProps } from '../components/Option';
import { OpenQuestion } from './OpenQuestion';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface MultiChoiceQuestionProps {
	placeholder?: string;
	optionsData: string[];
	onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleOptionAdd: () => void;
	handleOptionChange: (numberOfOption: number, newOption: string) => void;
	handleOptionDelete: (numberOfOption: number) => void;
}

interface MultiChoiceQuestionState {
	options: OptionProps[];
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
			onChangeContent,
			placeholder,
			optionsData,
		} = this.props;

		const renderOptions = this.state.options.map((option, index) => {
			return (
				<Option
					key={index}
					optionNumber={index}
					OnDeleteClick={option.OnDeleteClick}
					handleOptionChange={option.handleOptionChange}
					content={optionsData[index]}
					placeholder={optionsData[index]}
				/>
			)
		});

		return (
			<React.Fragment>
				<OpenQuestion
					onChangeContent={onChangeContent} 
					placeholder={placeholder}
				/>
				<Card>
					<CardContent style={{backgroundColor:'#E6E6FA'}} sx={{alignItems:'center', justifyContent:'center' }}>
						{renderOptions}
						<Button 
							variant="contained"
							fullWidth
							sx={{mt: '20px', textAlign: 'center'}}
							style={{backgroundColor:'#D8BFD8'}}
							startIcon={<AddCircleRoundedIcon/>}
							onClick={this.optionAddClick}
						/>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}

	private readonly optionAddClick = () => {
		const another: OptionProps = {
			optionNumber: this.state.options.length,
			OnDeleteClick: this.optionDeleteClick,
			handleOptionChange: this.props.handleOptionChange,
			content: '',
		}
		this.setState({options: [...this.state.options, another]});
		this.props.handleOptionAdd();
	}

	private readonly optionDeleteClick = (optionNumber: number) => {
		const {
			options,
		} = this.state;
		const updatedOptions: OptionProps[] = [];
		options.forEach((option, index) => {
			if(index !== optionNumber) {
				updatedOptions.push(option);
			}
		});
		this.setState({options: updatedOptions});
		this.props.handleOptionDelete(optionNumber);
	}
}