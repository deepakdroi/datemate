"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeSlashFilledIcon } from "@/components/passwordVisibilityIcon/EyeSlashedFilledIcon";
import { EyeFilledIcon } from "@/components/passwordVisibilityIcon/EyeFilledIcon";
import Link from "next/link";
import { registerUser } from "@/app/actions/authActions";
import { handleFormServerErrors } from "@/lib/util";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    console.log(result);
    if (result.status === "success") {
      console.log("user created successfully.");
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-slate-500">
          <div className="flex flex-row gap-3 items-center">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome back to DateMate!</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Name"
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              defaultValue=""
              label="Age"
              variant="bordered"
              {...register("age", { valueAsNumber: true })}
              isInvalid={!!errors.age}
              errorMessage={errors.age?.message}
              type="number"
            />
            <Input
              defaultValue=""
              label="Gender"
              variant="bordered"
              {...register("gender")}
              isInvalid={!!errors.gender}
              errorMessage={errors.gender?.message}
            />
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
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
              errorMessage={errors.password?.message}
            />
            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <div className="flex flex-row gap-3">
              <Button
                isDisabled={!isValid}
                isLoading={isSubmitting}
                className="w-1/2 justify-center bg-slate-500 text-slate-50"
                type="submit"
              >
                Register
              </Button>
              <Button
                as={Link}
                href="/login"
                className="w-1/2 justify-center  bg-slate-50 text-slate-500"
                variant="bordered"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
