import * as React from 'react';
import { Box, Button, Grid, Radio, TextField } from '@mui/material';

interface AnswerMultiOptionProps {
	optionNumber: number;
	content: string;
	onChangeAnswerOption: (answer: string, checked: boolean) => void;
}

interface AnswerMultiOptionState {
	checked: boolean;
}


export class AnswerMultiOption extends React.Component<AnswerMultiOptionProps, AnswerMultiOptionState> {
	public constructor(props: AnswerMultiOptionProps) {
		super(props);

		this.state = {
			checked: false,
		}
	}

	public render () {
		const {
			checked,
		} = this.state;

		const {
			optionNumber,
			content,
		} = this.props;

		return (
			<Box sx={{ flexGrow: 1, width:'100%'}}>
				<Grid 
				container
				spacing={0}
				alignItems="center"
				justifyContent="center"
				columnSpacing={{ xs: 2, sm: 2, md: 3 }}
				sx={{py: '10px'}}
				>
					<Grid item xs={12} sx={{pb: '10px'}}>
						<TextField
							disabled
							multiline
							fullWidth
							value={optionNumber + '. ' + content}
							sx = {{color: '#D8BFD8', ".MuiInputBase-input.Mui-disabled": {
								WebkitTextFillColor: "black",
							}}}
						/>
					</Grid>
					<Grid item xs={1}>
						<Radio
							checked={checked}
							onChange={this.handleChange}
							value={content}
							name="radio-buttons"
							sx = {{color: '#D8BFD8', '&.Mui-checked': { color: '#916BBF'}}}
						/>
					</Grid>
					<Grid item xs={1}>
						<Button
							disabled={!checked}
							variant="contained"
							fullWidth
							style={{backgroundColor:'#D8BFD8'}}
							onClick={this.handleDisable}
						>
							{'Undo'}
						</Button>
					</Grid>
				</Grid>
			</Box>
		);
	}

	private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({checked: event.target.checked});
		this.props.onChangeAnswerOption(event.target.value, event.target.checked);
	};

	private readonly handleDisable = () => {
		this.setState({checked: false});
		this.props.onChangeAnswerOption(this.props.content, false);
	};
}