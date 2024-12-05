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
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInForm() {
	const SigninSchema = yup.object().shape({
		email: yup
			.string()
			.email("please enter valid email")
			.required("email is required field"),
		password: yup.string().min(8, "the min number of characters is 8"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			const res = await signIn("credentials", {
				email: values.email,
				password: values.password,
			});
			console.log(res);
		},
		validationSchema: SigninSchema,
	});

	const handleGoogleSignIn = async () => {
		const res = await signIn("google", { callbackUrl: "/" });
		console.log(res);
	};
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Sign in</CardTitle>
					<CardDescription>Sign in your account boss</CardDescription>
				</CardHeader>
				<form onSubmit={formik.handleSubmit} className="space-y-2">
					<CardContent>
						<div className="space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								name="email"
								id="email"
								type="email"
							/>
							{formik.touched.email && formik.errors.email && (
								<span className="text-red-500">{formik.errors.email}</span>
							)}
						</div>
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								name="password"
								id="password"
								type="password"
							/>
							{formik.touched.password && formik.errors.password && (
								<span className="text-red-500">{formik.errors.password}</span>
							)}
						</div>
						<div className={"grid grid-cols-2 gap-3 py-4"}>
							<Button type="submit">Login to your account</Button>
							<Button type="button" onClick={handleGoogleSignIn}>
								Sign in with Google
							</Button>
						</div>
					</CardContent>
				</form>
				<CardFooter>
					<Link href={"/auth/signup"}>you don't have account yet</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
