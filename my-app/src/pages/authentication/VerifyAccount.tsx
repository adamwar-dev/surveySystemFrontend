import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {palettePro} from '../../styles/PalettePro';
import { AuthenticationDataProvider } from '../../data/AuthenticationDataProvider';
import { Redirect } from 'react-router-dom';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

interface VerifyAccountProps {
	email?: string;
}

export interface VerifyAccountState {
	email: string;
	verificactionCode: string;
	emailError: boolean;
	verificactionCodeError: boolean;
	resetStatus?: boolean;
}

export class VerifyAccount extends React.Component<VerifyAccountProps, VerifyAccountState> {
	public constructor(props: VerifyAccountProps) {
		super(props);

		this.state = {
			email: '',
			verificactionCode: '',
			emailError: false,
			verificactionCodeError: true,
			resetStatus: undefined,
		}
	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}

	public render () {
		const {
			email,
			verificactionCode,
			emailError,
			verificactionCodeError,
		} = this.state;

		return (
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{'Verify Account'}
					</Typography>
					{this.props.email !== undefined &&
						<Typography component='h1' variant='subtitle2' sx={{color: 'secondary.main'}}>
							{'Code send to: ' + this.props.email}
						</Typography>
					}
					<Box component='form' onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
						{this.props.email === undefined &&
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								value={email}
								onChange={this.handleEmailChange}
								helperText={emailError ? 'Invalid address email' : ''}
								error={emailError}
							/>
						}
						<TextField
							margin='normal'
							required
							fullWidth
							id='code'
							label='Verification Code'
							name='code'
							autoComplete='Verification Code'
							autoFocus
							value={verificactionCode}
							onChange={this.handleVerificationCodeChange}
							helperText={verificactionCodeError ? 'Invalid Verification Code' : ''}
								error={verificactionCodeError}
						/>
							<Button
								disabled={emailError || verificactionCodeError}
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2, backgroundColor: palettePro.button.buttonPrimary, floodColor: palettePro.button.buttonPrimary }}
							>
								{'Verify'}
							</Button>
							{ this.state.resetStatus ? (<Redirect push to="/signIn/verify"/>) : null }
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/signIn' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Account Verified? Sign In'}
								</Link>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/signUp' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Do not have an account? Sign Up'}
								</Link>
							</Grid>
						</Grid>
						{this.state.resetStatus === false &&
							<Grid container>
								<Grid item xs>
								</Grid>
								<Grid item>
									<div style={{
										marginTop: '10px',
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										color: '#ff6666',
									}}>
										<ErrorRoundedIcon htmlColor='#ff6666'/>
										<span>{'Invalid Address Email or Verification Code'}</span>
									</div>
								</Grid>
							</Grid>
						}
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		);
	}

	private readonly handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({email: event.currentTarget.value});
		this.validateEmail(event.currentTarget.value);
	}

	private readonly handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({verificactionCode: event.currentTarget.value});
		this.validateVerificationCode(event.currentTarget.value);
	}

	private readonly validateEmail = (email: string) => {
		if (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			this.setState({emailError: false});
		} else {
			this.setState({emailError: true});
		}
	}

	private readonly validateVerificationCode = (verificactionCode: string) => {
		if (verificactionCode !== '') {
			this.setState({verificactionCodeError: false});
		} else {
			this.setState({verificactionCodeError: true});
		}
	}

	private readonly handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const {
			email,
			verificactionCode,
		} = this.state;
		event.preventDefault();
		return AuthenticationDataProvider.verifyAccount(this.props.email !== undefined ? this.props.email : email, verificactionCode)
		.then(status => {
			console.log({
				email: this.state.email,
			});
			if (status===201) {
				this.setState({resetStatus: true});
			} else {
				this.setState({resetStatus: false});
			}
		}).catch(error => {
			console.log({error});
		});
	};
}

const Copyright = (props: any) => {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://platforma2.polsl.pl/rau2/course/view.php?id=878'>
				{'Survey Surf Project'}
			</Link>{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}