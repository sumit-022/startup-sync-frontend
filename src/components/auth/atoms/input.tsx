"use client";
import React, { LegacyRef, ReactElement } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

type NewType = LegacyRef<HTMLInputElement>;
interface AdornmentProps {
  icon: React.ReactNode | null | ReactElement;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  adornment?: {
    start?: AdornmentProps;
    end?: AdornmentProps;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  register?: UseFormRegister<any>;
  className?: string;
  ref?: NewType | undefined;
}

const Input = ({
  placeholder,
  type,
  error = false,
  helperText,
  adornment,
  onChange,
  name,
  value,
  rules,
  register,
  className,
  ref,
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {adornment && adornment.start && adornment.start.icon && (
          <div
            className={clsx(
              "absolute inset-y-0 flex items-center pl-3 pointer-events-none z-10",
              {
                "text-gray-500": !error,
                "text-red-500": error,
              }
            )}
          ></div>
        )}
        <input
          name={name}
          value={value}
          ref={ref}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "w-full p-2 transition-all duration-100 placeholder:font-normal rounded-md focus:outline-none min-w-[200px]",
            className,
            {
              "border-red-500 focus:border-red-500": error,
              "pl-10": adornment && adornment.start,
              "pr-10": adornment && adornment.end,
            }
          )}
          {...(register && name && register(name, rules))}
          {...rest}
        />
        {adornment && adornment.end && (
          <div
            className={clsx("absolute inset-y-0 flex items-center right-3", {
              "text-gray-500": !error,
              "text-red-500 hover:text-red-500": error,
            })}
          >
            {adornment.end.icon}
          </div>
        )}
      </div>
      <small
        className={clsx({
          "text-red-500": error,
          "text-gray-500": !error,
          "text-sm": true,
        })}
      >
        {helperText}
      </small>
    </div>
  );
};

export default Input;
