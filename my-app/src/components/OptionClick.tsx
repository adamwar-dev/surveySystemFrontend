import * as React from 'react';
import { Box, Button, Grid, Radio, TextField } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export class OptionClick extends React.Component{
	public render () {
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
							placeholder={'e.g. Jarosław Paduch'}
							multiline
							fullWidth			
						/>
					</Grid>
					<Grid item xs={1}>
						<Radio
							disabled
						/>
					</Grid>
					<Grid item xs={1}>
						<Button 
							variant="contained"
							fullWidth
							style={{backgroundColor:'#D8BFD8'}}
							startIcon={<DeleteRoundedIcon sx={{mr: '-8px'}}/>}
						/>
					</Grid>
				</Grid>
			</Box>
		);
	}
}