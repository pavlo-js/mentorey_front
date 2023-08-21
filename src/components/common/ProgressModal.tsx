import React from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const ProgressModal = (open: boolean) => {
	return (
		<Modal open={open}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<CircularProgress />
				<Typography sx={{ color: '#fff' }}>Uploading...</Typography>
			</div>
		</Modal>
	);
};

export default ProgressModal;
