import { Box, Container, Button } from '@mui/material';
import CoachCard from '~/components/common/CoachCard';
const Coaches = () => {
	return (
		<>
			<Box className="bg-slate-100">
				<Container className="px-4 py-2 lg:py-4">
					<h2 className="mt-5 text-2xl font-semibold">Start learining with one of these top coaches.</h2>
					<p className="my-3 text-sm text-slate-600">
						There isn&apos;t a single way to teach a language. Book a regular lesson or a trial lessons to get an
						introduction to a teacher&apos;s style. WE have teachers who specialize in teaching the foundations of
						English all the way to advanced topics.
					</p>
					<div className="mb-0 grid items-start gap-4 dark:text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<CoachCard />
						<CoachCard />
						<CoachCard />
						<CoachCard />
						<CoachCard />
						<CoachCard />
						<CoachCard />
						<CoachCard />
					</div>
					<Button variant="outlined" size="small" className="mx-auto w-fit block mt-6 hover:bg-primary-600 hover:text-white mb-4">
						Explore more coaches
					</Button>
				</Container>
			</Box>
		</>
	);
};

export default Coaches;
