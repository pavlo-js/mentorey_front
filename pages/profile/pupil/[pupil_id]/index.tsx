'use client';

import { useEffect, useState } from 'react';
import { cognitoIdentityServiceProvider } from '~/utils/aws';
import awsconfig from '~/aws-exports';

const UserProfilePage = ({ params }: { params: { user_id: string } }) => {
	const [users, setUsers] = useState<any[]>([]); // Replace any with the type of user attributes you expect.
	const { aws_user_pools_id } = awsconfig;
	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		try {
	// 			const argus = {
	// 				Username: params.user_id,
	// 				UserPoolId: aws_user_pools_id,
	// 			};

	// 			const data = await cognitoIdentityServiceProvider.adminGetUser(argus).promise();
	// 			console.log(data);
	// 		} catch (error) {
	// 			console.error('Error fetching user information:', error);
	// 		}
	// 	};

	// 	fetchUsers();
	// }, []);

	if (!users.length) {
		return <div>Loading...</div>;
	}

	// Render user information here
	return <div></div>;
};

export default UserProfilePage;
