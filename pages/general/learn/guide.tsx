import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import findCoachImage from '~/assets/images/choose_lesson.svg';
import bookingImage from '~/assets/images/book_lesson.svg';
import journeyImage from '~/assets/images/start_journey.svg';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Guide = () => {
	return (
		<>
			<Box>
				<Container className="py-8 lg:pb-4 lg:pt-12">
					<Typography variant="h4" className="mb-8 font-bold">
						Your Coaching Journey starts now!
					</Typography>

					<div className="block md:flex">
						<div className="mx-auto flex max-w-sm flex-1 my-2 px-2">
							<div className="w-1/4">
								<Image src={findCoachImage} width={80} height={80} alt="findCoachImage" />
							</div>
							<div className="w-3/4">
								<Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
									Step 1: Choose your coach
								</Typography>
								<Typography variant="body2" className="font-semibold text-slate-600">
									Watch coach introduction videos and read reviews from the others.
								</Typography>
							</div>
						</div>
						<div className="mx-auto flex max-w-sm flex-1 my-2 px-2">
							<div className="w-1/4">
								<Image src={bookingImage} width={80} height={80} alt="findCoachImage" />
							</div>
							<div className="w-3/4">
								<Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
									Step 2: Book your lesson
								</Typography>
								<Typography variant="body2" className="font-semibold text-slate-600">
									Schedule your lesson for a time and date that suit you.
								</Typography>
							</div>
						</div>
						<div className="mx-auto flex max-w-sm flex-1 my-2 px-2">
							<div className="w-1/4">
								<Image src={journeyImage} width={80} height={80} alt="findCoachImage" />
							</div>
							<div className="w-3/4">
								<Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
									Step 3: Start your journey
								</Typography>
								<Typography variant="body2" className="font-semibold text-slate-600">
									Connect with your teacher via a video call, and start learning!
								</Typography>
							</div>
						</div>
					</div>
					{/* <Box className="text-center">
						<Button
							startIcon={<KeyboardArrowUpIcon />}
							className="mx-auto mt-4 rounded-xl font-extrabold text-primary-900"
							size="small"
						>
							Got it
						</Button>
					</Box> */}
				</Container>
			</Box>
		</>
	);
};

export default Guide;
