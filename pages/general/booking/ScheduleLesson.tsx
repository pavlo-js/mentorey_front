import { Box, Button, Paper, Tooltip, Typography } from '@mui/material';

export default function ScheduleLesson() {
	return (
		<>
			<Paper className="rounded-lg p-2 py-4 md:py-8 lg:m-4">
				<Typography className="mb-1 text-center text-lg font-bold md:mb-3 md:text-2xl">Schedule Your Lesson</Typography>
				<div className="mx-auto flex max-w-3xl">
					<div className="w-[16%]">
						<div className="h-10 md:h-12"></div>
						<div className="flex h-6 items-center justify-center text-sm md:h-8 md:text-base">00 - 04</div>
						<div className="flex h-6 items-center justify-center text-sm md:h-8 md:text-base">04 - 08</div>
						<div className="flex h-6 items-center justify-center text-sm md:h-8 md:text-base">08 - 12</div>
						<div className="flex h-6 items-center justify-center text-sm md:h-8 md:text-base">12 - 16</div>
						<div className="flex h-6 items-center justify-center text-sm md:h-8 md:text-base">16 - 20</div>
						<div className="flex h-6 items-center justify-center text-sm md:h-8 md:text-base">20 - 24</div>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Mon</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Tue</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Wed</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Thr</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Fri</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500 md:h-8"></div>
						</Tooltip>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Sat</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
					</div>
					<div className="w-[12%]">
						<div className="h-10 text-center text-sm md:h-12 md:text-base">
							<p className="font-semibold text-slate-600">Sun</p>
							<p>23</p>
						</div>
						<Tooltip title="3 hrs">
							<div className="h-6 border bg-emerald-500  md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
						<Tooltip title="3 hrs">
							<div className="h-6 border md:h-8"></div>
						</Tooltip>
					</div>
				</div>
				<Typography className="my-2 text-center text-sm text-slate-500">Based on your timezone (UTC+09:00)</Typography>
			</Paper>
		</>
	);
}
