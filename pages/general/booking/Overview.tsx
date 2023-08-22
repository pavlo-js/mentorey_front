import StarIcon from '@mui/icons-material/Star';

const Overview = () => {
	return (
		<>
			<div className="mx-auto my-2 items-start flex flex-wrap justify-between w-full">
				<div className="mt-2 text-center md:mt-0 w-fit">
					<div className="mx-auto flex h-5 items-center justify-center">
						<StarIcon
							sx={{
								color: '#facc15',
								fontSize: '20px',
							}}
						/>
						<p className="ml-1 text-base leading-none" style={{ color: '#facc15' }}>
							5.0
						</p>
					</div>
					<p className="text-sm font-semibold text-slate-700 md:text-sm">Rating</p>
				</div>
				<div className="mt-2 text-center md:mt-0 w-fit">
					<p className="h-5 text-sm font-bold md:text-base">236</p>
					<p className="text-sm font-semibold text-slate-700 md:text-sm">Students</p>
				</div>
				<div className="mt-2 text-center md:mt-0 w-fit">
					<p className="h-5 text-sm font-bold md:text-base">236</p>
					<p className="text-sm font-semibold text-slate-700 md:text-sm">Lessons</p>
				</div>
				<div className="mt-2 text-center md:mt-0 w-fit">
					<p className="h-5 text-sm font-bold md:text-base">100%</p>
					<p className="text-sm font-semibold text-slate-700 md:text-sm">Attendance</p>
				</div>
				<div className="mt-2 text-center md:mt-0 w-fit">
					<p className="h-5 text-sm font-bold md:text-base">100%</p>
					<p className="text-sm font-semibold text-slate-700 md:text-sm">Response</p>
				</div>
			</div>
		</>
	);
};

export default Overview;
