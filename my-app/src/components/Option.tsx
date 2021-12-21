import * as React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export interface OptionProps {
	optionNumber: number;
	OnDeleteClick: (optionNumber: number) => void;
}
export class Option extends React.Component<OptionProps> {
	public constructor(props: OptionProps) {
		super(props);
	}
	public render () {
		const {
			optionNumber,
			OnDeleteClick,
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
					<Grid item xs={5}>
						<TextField
							id='option'
							label='option'
							placeholder={'e.g. Pepperoni'}
							multiline
							fullWidth			
						/>
					</Grid>
					<Grid item xs={1}>
						{optionNumber > 1 &&
							<Button 
								variant="contained"
								fullWidth
								style={{backgroundColor:'#D8BFD8'}}
								startIcon={<DeleteRoundedIcon sx={{mr: '-8px'}}/>}
								onClick={() => OnDeleteClick(optionNumber)}
							/>
						}
					</Grid>
				</Grid>
			</Box>
		);
	}
}