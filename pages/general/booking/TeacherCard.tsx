import { Avatar, Paper, Badge, Tooltip, Button } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import Overview from './Overview';

export default function TeacherCard() {
	return (
		<>
			<Paper className="mx-auto my-4 flex max-w-2xl p-4">
				<div className="flex w-[75px] items-center justify-center">
					<Tooltip title="Austria">
						<Badge
							overlap="circular"
							className="rounded-full shadow-md"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							badgeContent={
								<ReactCountryFlag
									countryCode="at"
									svg
									style={{
										width: '25px',
										height: '25px',
										border: '1px solid white',
										borderRadius: '20px',
										objectFit: 'cover',
									}}
								/>
							}
						>
							<Avatar
								sx={{ width: '75px', height: '75px' }}
								alt="Travis Howard"
								src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
							/>
						</Badge>
					</Tooltip>
				</div>
				<div className="w-calc-100-minus-75 pl-4">
					<div className="mb-2 flex items-center justify-between">
						<h4 className="text-xl font-semibold text-slate-600">
							Silver Girl&nbsp;<span className="text-sm font-normal text-slate-500">Professional Fitness Tutor</span>
						</h4>
						<Button size='small' variant="outlined">
							View Profile
						</Button>
					</div>
					<Overview />
				</div>
			</Paper>
		</>
	);
}
