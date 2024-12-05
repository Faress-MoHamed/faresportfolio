"use client";
import {  useSession } from "next-auth/react";
import React from "react";
import DropDownUser from "../../molecules/dropdown-user";

export default  function  UserDetails() {
	const {data,status} = useSession();
	if(status==="unauthenticated"){
		return null;
	}
	return (
		<div>
			<DropDownUser
				email={data?.user?.email as string}
				name={data?.user?.name as string}
			/>
		</div>
	);
}
