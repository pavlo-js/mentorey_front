import styled from '@emotion/styled';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function StackBar() {
	return (
		<>
			<p className="mb-2 mr-4 text-sm font-semibold text-slate-500">
				<WorkspacePremiumIcon sx={{ color: '#facc15' }} className="mr-1" />
				Teaches :
			</p>
			<div className="flex">
				<div className="justify-starts flex flex-wrap items-center text-xs font-medium text-white">
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Life style</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Personal Development</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Fitness</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Football</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Wellbeing</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Sports</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Writing</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Foreign Culture</span>
					<span className="m-1 cursor-default rounded bg-primary-500 px-2 py-1">Diet</span>
				</div>
			</div>
		</>
	);
}
