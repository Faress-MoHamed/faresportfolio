"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import client from "../../utils/Apolloclient/index";
// import HeroImage from "@/common/components/atoms/HeroImage";

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
		<>
		<p>fares</p>
		{/* <HeroImage/> */}
		</>
	);
}
