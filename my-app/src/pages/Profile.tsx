import { Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import * as React from 'react';
import { NavBar } from '../components/NavBar';
import '../styles/Pages.css'

interface ProfileState {
	password: string;
	showPassword: boolean;
}

interface ProfileProps {

}

export class Profile extends React.Component<ProfileProps,ProfileState>{
	public constructor(props: ProfileProps) {
		super(props);
		this.state = {
			password: 'dupa',
			showPassword: true,
		}
	}
	public render () {
		const {
			password,
			showPassword,
		} = this.state;
		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'Welcome to your Profile'} linkTo='/'/>
				<Box sx={{ flexGrow: 1, width:'100%'}}>
					<Grid container spacing={3} alignContent='center' columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12} textAlign='center'>
							<div className='circle'>
								<AccountCircleRoundedIcon fontSize='inherit'/>
							</div>
						</Grid>
						<Grid item xs={12}>
							
						</Grid>
						<Grid item xs={12}>
							
						</Grid>
						<Grid item xs={12}>

						</Grid>
						<Grid item xs={12} textAlign='center'>
							<FormControl variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
								<OutlinedInput
									id="outlined-adornment-password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={this.handleChangePassword()}
									endAdornment={
									<InputAdornment position="end">
										<IconButton
										aria-label="toggle password visibility"
										onClick={this.handleChangeShowPassword(!showPassword)}
										onMouseDown={this.handleMouseDownPassword}
										edge="end"
										>
										{showPassword ? <VisibilityOffRoundedIcon/> : <VisibilityRoundedIcon/>}
										</IconButton>
									</InputAdornment>
									}
									label="Password"
								/>
							</FormControl>
						</Grid>
					</Grid>
				</Box>
            </React.Fragment>
		);
	}

	private readonly handleChangePassword =  () => (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({password: event.target.value});
	};

	private readonly handleChangeShowPassword =  (showPassword: boolean) => () => {
		this.setState({showPassword});
	};

	private readonly handleMouseDownPassword =  (event: React.MouseEvent<HTMLButtonElement>)  => {
		event.preventDefault();
	};
}