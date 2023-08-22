import { Paper } from '@mui/material';

export default function LessonOption() {
	return (
		<>
			<div className="flex w-full flex-wrap">
				<div className="w-1/2 px-2 text-center lg:w-1/4">
					<p className="text-2xl">30min</p>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>1 Lesson</p>
						<p>$ 14.86</p>
					</Paper>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>10 Lessons</p>
						<div>
							<p>$ 124.86</p>
							<p className="text-sm text-primary-500">SAVE 10%</p>
						</div>
					</Paper>
				</div>
				<div className="w-1/2 px-2 text-center lg:w-1/4">
					<p className="text-2xl">45min</p>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>1 Lesson</p>
						<p>$ 14.86</p>
					</Paper>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>10 Lessons</p>
						<div>
							<p>$ 124.86</p>
							<p className="text-sm text-primary-500">SAVE 10%</p>
						</div>
					</Paper>
				</div>
				<div className="w-1/2 px-2 text-center lg:w-1/4">
					<p className="text-2xl">60min</p>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>1 Lesson</p>
						<p>$ 14.86</p>
					</Paper>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>10 Lessons</p>
						<div>
							<p>$ 124.86</p>
							<p className="text-sm text-primary-500">SAVE 10%</p>
						</div>
					</Paper>
				</div>
				<div className="w-1/2 px-2 text-center lg:w-1/4">
					<p className="text-2xl">90min</p>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>1 Lesson</p>
						<p>$ 14.86</p>
					</Paper>
					<Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
						<p>10 Lessons</p>
						<div>
							<p>$ 124.86</p>
							<p className="text-sm text-primary-500">SAVE 10%</p>
						</div>
					</Paper>
				</div>
			</div>
		</>
	);
}
