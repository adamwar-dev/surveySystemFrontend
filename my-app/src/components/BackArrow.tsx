import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface BackArrowProps {
	visable?: boolean;
}

export class BackArrow extends React.Component<BackArrowProps> {
	public constructor(props: BackArrowProps) {
		super(props);
	}

	public render () {
		const {
			visable,
		} = this.props;

		return (
			<React.Fragment>
				{visable &&
					<IconButton sx={{mr: 2}}>
						<ArrowBackIcon/>
					</IconButton>
				}
			</React.Fragment>
		);
	}
}