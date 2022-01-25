import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, Button, Grid, Menu, MenuItem, Card, CardContent } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import {ColoredLine} from "./Utils";

interface SurveyInHistoryProps {
	token: string;
	id: string;
	type: string;
	title: string;
	tokens?: string[];
	onDelete: (surveyId: string, token: string) => void;
}

interface SurveyInHistoryState {
	redirect: boolean;
}

export class SurveyInHistory extends React.Component<SurveyInHistoryProps, SurveyInHistoryState> {
	public constructor(props: SurveyInHistoryProps) {
		super(props);

		this.state = {
			redirect: false,
		}
	}

	public render () {
		const {
			token,
			id,
			type,
			title,
			tokens,
		} = this.props;

		return (
			<Box sx={{ flexGrow: 1, width:'100%', mb: '20px'}}>
				<Card sx={{ml: '30px', mr: '30px'}}>
					<CardContent>
						<Grid
							container
							spacing={0}
							alignItems="center"
							justifyContent="center"
							columnSpacing={{ xs: 2, sm: 2, md: 3 }}
						>
							<Link href={'/preview/' + token + '/' + id} underline={'none'}>
								<Grid item xs={12} sm={12} md={12}>
									<Typography
										align='left'
										paragraph
										variant='h6'
										component='div'
										sx={{ flexGrow: 1 }}
									>
										{title}
									</Typography>
								</Grid>
							</Link>
							<Grid item xs={12} sm={12} md={12}>
								<Box sx={{mb: '5px'}}>
								<Button
									variant="contained"
									fullWidth
									style={{backgroundColor:'#D8BFD8'}}
									startIcon={<DeleteRoundedIcon sx={{mr: '-8px'}}/>}
									onClick={this.handleSurveyDelete}
								/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Box sx={{mb: '5px'}}>
								<Button 
									variant="contained"
									fullWidth
									style={{backgroundColor:'#D8BFD8'}}
									startIcon={<ContentCopyRoundedIcon sx={{mr: '-8px'}}/>}
									onClick={() => {navigator.clipboard.writeText("http://localhost:3000/fillSurvey/" + type + '/' + id)}}
								/>
								</Box>
							</Grid>
							{type === 'Distributed' &&
								<Grid item xs={12} sm={12} md={12}>
									<Box sx={{mb: '5px'}}>
									<LongMenu
										tokens={tokens !== undefined ? tokens : []}
									/>
									</Box>
								</Grid>
							}
						</Grid>
					</CardContent>
				</Card>
				{ColoredLine('#d0b3ff')}
			</Box>
		);
	}

	private readonly handleSurveyDelete = () => {
		this.props.onDelete(this.props.id, this.props.token);
	}
}

  const ITEM_HEIGHT = 48;

export default function LongMenu(props: {tokens: string[]}) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};
  
	return (
	  <React.Fragment>
		<Button
		  variant="contained"
		  fullWidth
		  aria-label="more"
		  id="long-button"
		  aria-controls={open ? 'long-menu' : undefined}
		  aria-expanded={open ? 'true' : undefined}
		  aria-haspopup="true"
		  onClick={handleClick}
		  style={{backgroundColor:'#D8BFD8'}}
		  startIcon={<VpnKeyRoundedIcon sx={{mr: '-8px', color: '#FFF'}}/>}
		/>
		<Menu
		  id="long-menu"
		  MenuListProps={{
			'aria-labelledby': 'long-button',
		  }}
		  anchorEl={anchorEl}
		  open={open}
		  onClose={handleClose}
		  PaperProps={{
			style: {
			  maxHeight: ITEM_HEIGHT * 4.5,
			  width: '20ch',
			},
		  }}
		>
		  {props.tokens.map((option) => (
			<MenuItem key={option} selected={option === 'Pyxis'} onClick={() => {navigator.clipboard.writeText(option)}}>
			  {option}
			</MenuItem>
		  ))}
		</Menu>
	  </React.Fragment>
	);
}
