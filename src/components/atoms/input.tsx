"use client";
import React, { LegacyRef, ReactElement } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

type NewType = LegacyRef<HTMLInputElement>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  required?: boolean;
  helperText?: string;
  adornment?: {
    start?: ReactElement | React.ReactNode | string;
    end?: ReactElement | React.ReactNode | string;
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
  label?: string;
}

const Input = ({
  id,
  placeholder,
  required,
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
  label,
  ...rest
}: InputProps) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        {adornment?.start && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            {adornment.start}
          </span>
        )}
        <input
          name={name}
          value={value}
          ref={ref}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "focus:ring-indigo-500 w-full flex-1 block rounded-none sm:text-sm border-gray-300",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          style={{
            borderRadius:
              !adornment?.start && !adornment?.end
                ? "0.375rem"
                : adornment?.start && adornment?.end
                ? "0"
                : adornment?.start
                ? "0 0.375rem 0.375rem 0"
                : "0.375rem 0 0 0.375rem",
          }}
          {...(register && name && register(name, rules))}
          {...rest}
        />
        {adornment?.end && (
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            {adornment.end}
          </span>
        )}
      </div>
      {helperText &&
        (error ? (
          <p className="mt-2 text-sm text-red-600">{helperText}</p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        ))}
    </div>
  );
};

export default Input;
