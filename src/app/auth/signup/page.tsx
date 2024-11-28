/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/common/components/atoms/card";
import { Input } from "@/common/components/atoms/input";
import { Label } from "@/common/components/atoms/label";
import { Button } from "@/common/components/atoms/button";
import { SignUpAction } from "@/actions/SignUpAction";
import Link from "next/link";
import toast from "react-hot-toast";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
	const router = useRouter();
	const [state, replacedAction] = useActionState(SignUpAction, {
		email: "",
		name: "",
		password: "",
	} as any);

	useEffect(() => {
		if (`${state?.status}`.startsWith("4")) {
			toast.error(state.message || "failed signUp");
		} else if (`${state?.status}`.startsWith("2")) {
			toast.success(state.message || "success signUp");
			router.push("/auth/signin");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>
						Make changes to your account here. Click save when you're done.
					</CardDescription>
				</CardHeader>
				<form action={replacedAction} className="space-y-2">
					<CardContent>
						<div className="space-y-1">
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" />
						</div>
					</CardContent>
					<CardFooter>
						{`${state?.status}`.startsWith("4") && <p>{state.message}</p>}
						<Button>Create New Account</Button>
					</CardFooter>
				</form>
				<Link href={"/auth/signin"}>you already have an account</Link>
			</Card>
		</div>
	);
}
