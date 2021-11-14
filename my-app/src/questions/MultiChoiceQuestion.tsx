import { Button, Card, CardContent } from '@mui/material';
import * as React from 'react';
import { OptionClick } from '../components/OptionClick';
import { OpenQuestion } from './OpenQuestion';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

interface MultiChoiceQuestionProps {
	placeholder?: string;
}

interface MultiChoiceQuestionState {
	options: OptionClick[];
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

		return (
			<React.Fragment>
				<OpenQuestion placeholder={placeholder}/>
				<Card>
					<CardContent style={{backgroundColor:'#E6E6FA'}} sx={{alignItems:'center', justifyContent:'center' }}>
						<OptionClick/>
						<Button 
							variant="contained"
							fullWidth
							sx={{mt: '20px', textAlign: 'center'}}
							style={{backgroundColor:'#D8BFD8'}}
							startIcon={<AddCircleRoundedIcon/>}
						/>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}

	private readonly optionAddClick = () => {
	}
}