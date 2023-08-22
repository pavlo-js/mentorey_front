'use client';

import React from 'react';
import {
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	Paper,
	Divider,
	Chip,
	Card,
} from '@mui/material';

const LessonData = [
	{
		id: '1',
		type: 'English',
		title: 'Trial Lesson',
	},
];

export default function LessonType() {
	const [lessonType, setLessonType] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setLessonType(event.target.value);
	};
	return (
		<>
			<div className="mx-auto max-w-2xl">
				<h3 className="mb-3 text-center text-xl">Select your lesson type</h3>
				<FormControl className="w-60" size="small">
					<InputLabel id="lessonTypeLabel">Lesson type</InputLabel>
					<Select
						labelId="lessonTypeLabel"
						id="lessonType"
						value={lessonType}
						label="Lesson type"
						onChange={handleChange}
					>
						<MenuItem value={10}>Fitness</MenuItem>
						<MenuItem value={20}>Well being</MenuItem>
						<MenuItem value={30}>Life Style</MenuItem>
					</Select>
				</FormControl>
				<Card className="my-4 rounded-lg hover:shadow-lg">
					<div className="flex cursor-pointer border p-4">
						<div className="w-10/12">
							<h4 className="truncate text-lg text-slate-600">Trial Lesson</h4>
							<Divider />
							<p className="mt-1 text-sm">382 lessons</p>
						</div>
						<div className="flex w-2/12 items-center justify-end">
							<Chip label="$ 10.40" className="bg-primary-100 px-4 font-semibold text-primary-500" />
						</div>
					</div>
				</Card>
				<Card className="my-4 rounded-lg hover:shadow-lg">
					<div className="flex cursor-pointer rounded-lg border p-4">
						<div className="w-10/12">
							<h4 className="truncate text-lg text-slate-600">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae laudantium voluptate ducimus, tempora
								accusamus nihil consequatur aliquam fugiat enim! At debitis vitae laudantium id exercitationem
								consectetur perferendis dolorum, modi impedit?
							</h4>
							<Divider />
							<p className="mt-1 text-sm">General 382 lessons</p>
						</div>
						<div className="flex w-2/12 items-center justify-end">
							<Chip label="$ 10.40" className="bg-pink-100 px-4 font-semibold text-pink-500" />
						</div>
					</div>
				</Card>
				<Card className="my-4 rounded-lg hover:shadow-lg">
					<div className="flex cursor-pointer rounded-lg border p-4">
						<div className="w-10/12">
							<h4 className="truncate text-lg text-slate-600">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae laudantium voluptate ducimus, tempora
								accusamus nihil consequatur aliquam fugiat enim! At debitis vitae laudantium id exercitationem
								consectetur perferendis dolorum, modi impedit?
							</h4>
							<Divider />
							<p className="mt-1 text-sm">General 382 lessons</p>
						</div>
						<div className="flex w-2/12 items-center justify-end">
							<Chip label="$ 10.40" className="bg-pink-100 px-4 font-semibold text-pink-500" />
						</div>
					</div>
				</Card>
				<Card className="my-4 rounded-lg hover:shadow-lg">
					<div className="flex cursor-pointer rounded-lg border p-4">
						<div className="w-10/12">
							<h4 className="truncate text-lg text-slate-600">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae laudantium voluptate ducimus, tempora
								accusamus nihil consequatur aliquam fugiat enim! At debitis vitae laudantium id exercitationem
								consectetur perferendis dolorum, modi impedit?
							</h4>
							<Divider />
							<p className="mt-1 text-sm">General 382 lessons</p>
						</div>
						<div className="flex w-2/12 items-center justify-end">
							<Chip label="$ 10.40" className="bg-pink-100 px-4 font-semibold text-pink-500" />
						</div>
					</div>
				</Card>
				<Card className="my-4 rounded-lg hover:shadow-lg">
					<div className="flex cursor-pointer rounded-lg border p-4">
						<div className="w-10/12">
							<h4 className="truncate text-lg text-slate-600">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae laudantium voluptate ducimus, tempora
								accusamus nihil consequatur aliquam fugiat enim! At debitis vitae laudantium id exercitationem
								consectetur perferendis dolorum, modi impedit?
							</h4>
							<Divider />
							<p className="mt-1 text-sm">General 382 lessons</p>
						</div>
						<div className="flex w-2/12 items-center justify-end">
							<Chip label="$ 10.40" className="bg-pink-100 px-4 font-semibold text-pink-500" />
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}
