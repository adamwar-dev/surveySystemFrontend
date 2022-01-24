import * as React from 'react';
import { Box, Grid, Radio, TextField } from '@mui/material';

interface AnswerSingleOptionProps {
	optionNumber: number;
	content: string;
	value: string;
	onChangeAnswerOption: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class AnswerSingleOption extends React.Component<AnswerSingleOptionProps> {
	public constructor(props: AnswerSingleOptionProps) {
		super(props);

		this.state = {
			checked: false,
		}
	}

	public render () {

		const {
			value,
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
				columnSpacing={{ xs: 3, sm: 3, md: 3 }}
				sx={{py: '10px'}}
				>
					<Grid item xs={12}>
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
							checked={content === value}
							onChange={this.props.onChangeAnswerOption}
							value={content}
							name="radio-buttons"
							sx = {{color: '#D8BFD8', '&.Mui-checked': { color: '#916BBF'}}}
						/>
					</Grid>
					<Grid item xs={1}>
					</Grid>
				</Grid>
			</Box>
		);
	}
}