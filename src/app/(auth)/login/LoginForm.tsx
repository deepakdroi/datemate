"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { LoginSchema, loginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeSlashFilledIcon } from "@/components/passwordVisibilityIcon/EyeSlashedFilledIcon";
import { EyeFilledIcon } from "@/components/passwordVisibilityIcon/EyeFilledIcon";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onTouched",
	});

	const onSubmit = (data: LoginSchema) => {
		console.log(data);
	};

	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Card className="w-2/5 mx-auto">
			<CardHeader className="flex flex-col items-center justify-center">
				<div className="flex flex-col gap-2 items-center text-slate-500">
					<div className="flex flex-row gap-3 items-center">
						<GiPadlock size={30} />
						<h1 className="text-3xl font-semibold">Login</h1>
					</div>
					<p className="text-neutral-500">Welcome back to DateMate!</p>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<Input
							defaultValue=""
							label="Email"
							variant="bordered"
							{...register("email")}
							isInvalid={!!errors.email}
							errorMessage={errors.email?.message as string}
						/>
						<Input
							defaultValue=""
							label="Password"
							variant="bordered"
							type={isVisible ? "text" : "password"}
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={toggleVisibility}
									aria-label="toggle password visibility"
								>
									{isVisible ? (
										<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
									) : (
										<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
									)}
								</button>
							}
							{...register("password")}
							isInvalid={!!errors.password}
							errorMessage={errors.password?.message as string}
						/>
						<div className="flex flex-row gap-3">
							<Button
								isDisabled={!isValid}
								className="w-1/2 justify-center bg-slate-500 text-slate-50"
								type="submit"
							>
								Login
							</Button>
							<Button
								className="w-1/2 justify-center  bg-slate-50 text-slate-500"
								variant="bordered"
								type="submit"
							>
								Forgot Password
							</Button>
						</div>
					</div>
				</form>
			</CardBody>
		</Card>
	);
}
