import { Paper } from '@mui/material';
import { IoLogoSkype } from 'react-icons/io';
import { FaWeixin } from 'react-icons/fa';

export default function Communication() {
	return (
		<>
			<h5 className="text-center text-slate-500 mt-4">
				Your teacher can use any of the these communication tools. Which communication tool would you like to use for
				your lesson?
			</h5>
			<div className="flex flex-wrap mt-4">
				<div className="w-1/4 px-2">
					<Paper className="flex w-full cursor-pointer items-center justify-center py-4 hover:shadow-md">
						<IoLogoSkype size={40} color="#00AFF0" />
						<p className="ml-4 font-semibold">Skype</p>
					</Paper>
				</div>
				<div className="w-1/4 px-2">
					<Paper className="flex w-full items-center justify-center py-4 cursor-pointer hover:shadow-md">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="3" y="3" width="18" height="18" rx="4" fill="#2D8CFF"></rect>
							<mask id="IconZoom_e984" maskUnits="userSpaceOnUse" x="6" y="8" width="12" height="8">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M6.022 9.133v4.335c0 .975.799 1.765 1.783 1.765h6.321c.18 0 .324-.143.324-.321v-4.335c0-.975-.799-1.765-1.782-1.765H6.346a.323.323 0 00-.324.321zm8.83 1.69l2.608-1.902c.228-.187.402-.144.402.2v5.81c0 .385-.217.342-.401.2l-2.61-1.903v-2.404z"
									fill="#fff"
								></path>
							</mask>
							<g mask="url(#IconZoom_e984)">
								<path d="M5.58 8.33h21.232v12.924H5.58V8.33z" fill="#fff"></path>
							</g>
						</svg>
						<p className="ml-4 font-semibold">Zoom</p>
					</Paper>
				</div>
				<div className="w-1/4 px-2">
					<Paper className="flex w-full items-center justify-center py-4 cursor-pointer hover:shadow-md">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M20 10.636C20 5.866 16.189 2 11.497 2 6.804 2 3 5.867 3 10.636c0 4.518 4.051 8.182 8.497 8.182V22C16.66 19.339 20 15.056 20 10.636z"
								fill="#0F9D58"
							></path>
							<path
								d="M12.168 8.363V12h2.012v2.046c.877 0 1.566-1.137 1.566-2.273v-3.41h-3.578zM7.248 8.363V12h2.013v2.046c.877 0 1.565-1.137 1.565-2.273v-3.41H7.248z"
								fill="#fff"
							></path>
						</svg>
						<p className="ml-4 font-semibold">Hangout</p>
					</Paper>
				</div>
				<div className="w-1/4 px-2">
					<Paper className="flex w-full items-center justify-center py-4 cursor-pointer hover:shadow-md">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="3" y="3" width="18" height="18" rx="4" fill="url(#IconWeChatSquare_dff7)"></rect>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.452 7c-2.59 0-4.689 1.75-4.689 3.908 0 1.178.632 2.237 1.62 2.953.08.057.132.15.132.255l-.017.1-.211.788-.025.114c0 .087.07.156.156.156l.09-.029 1.027-.592a.493.493 0 01.249-.073l.137.02c.48.139.996.216 1.531.216l.258-.007a3.004 3.004 0 01-.157-.957c0-1.968 1.914-3.564 4.276-3.564l.255.006C14.73 8.428 12.792 7 10.452 7zM8.89 10.282a.626.626 0 110-1.25.626.626 0 010 1.25zm3.127 0a.625.625 0 110-1.25.625.625 0 010 1.25z"
								fill="#fff"
							></path>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M17.387 16.312c.823-.596 1.35-1.48 1.35-2.46 0-1.799-1.75-3.257-3.908-3.257s-3.907 1.458-3.907 3.256c0 1.799 1.749 3.257 3.907 3.257a4.64 4.64 0 001.276-.179l.114-.017c.075 0 .144.023.208.06l.855.494.076.024a.13.13 0 00.13-.13l-.021-.095-.176-.657-.014-.083a.26.26 0 01.11-.213zm-3.861-2.982a.52.52 0 110-1.04.52.52 0 010 1.04zm2.605 0a.52.52 0 110-1.04.52.52 0 010 1.04z"
								fill="#fff"
							></path>
							<defs>
								<linearGradient
									id="IconWeChatSquare_dff7"
									x1="12"
									y1="3"
									x2="12"
									y2="21"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#02E26E"></stop>
									<stop offset="1" stop-color="#05CE66"></stop>
								</linearGradient>
							</defs>
						</svg>
						<p className="ml-4 font-semibold">WeChat</p>
					</Paper>
				</div>
			</div>
		</>
	);
}
