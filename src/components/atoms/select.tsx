"use client";
import React, { LegacyRef, ReactElement } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  options: {
    value: string;
    label: string;
  }[];
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  register?: UseFormRegister<any>;
  className?: string;
  label?: string;
}

const Select = ({
  id,
  name,
  error = false,
  helperText,
  options,
  rules,
  register,
  className,
  label,
  ...rest
}: SelectProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        {...(register && name && register(name, rules))}
        className={clsx(
          "w-full p-2 mt-1 border rounded-md",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <span className="text-sm text-red-500">{helperText}</span>}
    </div>
  );
};

export default Select;
