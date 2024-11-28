"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import client from "../../utils/Apolloclient/index";
import ModeSwitch from "@/common/components/molecules/mode-switch";

const GET_USERS = gql`
	query GetUsers {
		users {
			id
			name
			email
		}
	}
`;
export default function UsersPage() {
	const { loading, error, data } = useQuery(GET_USERS, { client });
	useEffect(() => {
		console.log(data, loading, error);
	}, [data, loading, error]);
	return (
		<div className="w-[500px] h-[500px] bg-green-500 flex items-center justify-center">
			<div className="flex items-center space-x-4">
				<ModeSwitch />
				<label htmlFor="airplane-mode" className="text-white">
					Airplane Mode
				</label>
			</div>
		</div>
	);
}
