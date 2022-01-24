import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {palettePro} from '../../styles/PalettePro';
import { Redirect } from 'react-router-dom';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

interface DistributedTokenPageProps {
    token: string;
    surveyId: string;
}

interface DistributedTokenPagState  {
	redirect?: boolean;
    surveyToken: string;
}

export class DistributedTokenPage extends React.Component<DistributedTokenPageProps, DistributedTokenPagState> {
	public constructor(props: DistributedTokenPageProps) {
		super(props);

		this.state = {
            surveyToken: '',
		}
	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}

	public render () {
		const {
            surveyToken,
		} = this.state;

        const {
            token,
            surveyId,
		} = this.props;

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
						<VpnKeyRoundedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{'Token Verification'}
					</Typography>
					<Box component='form' onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='surveyToken'
							label='Token'
							name='surveyToken'
							autoComplete='Token'
							autoFocus
							value={surveyToken}
							onChange={this.handleEmailChange}
							helperText={this.state.surveyToken === '' ? 'Enter Survey Token' : ''}
							error={this.state.surveyToken === ''}
						/>
						<Button
							disabled={this.state.surveyToken === ''}
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2, backgroundColor: palettePro.button.buttonPrimary, floodColor: palettePro.button.buttonPrimary }}
						>
							{'Go to Survey'}
						</Button>
						{ this.state.redirect ? (<Redirect push to={"/fillDistributedSurvey/" + token + '/' + surveyId + '/' + surveyToken}/>) : null }
					</Box>
				</Box>
			</Container>
		);
	}

	private readonly handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({surveyToken: event.currentTarget.value});
	}

	private readonly handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const {
            surveyToken,
		} = this.state;

		event.preventDefault();
        if (surveyToken !== '') {
            this.setState({redirect: true});
        }
	};
}