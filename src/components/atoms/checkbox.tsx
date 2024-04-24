"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label: string;
  labelClassName?: string;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  register?: UseFormRegister<any>;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  checked,
  label,
  labelClassName,
  error = false,
  helperText,
  rules,
  register,
  className,
  onChange,
  name,
  ...rest
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={clsx(
          "text-blue-600 h-4 w-4 border-gray-300 rounded",
          className
        )}
        {...(register && name && register(name, rules))}
        checked={checked}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        {...rest}
      />
      <label
        htmlFor={name}
        className={clsx("ml-3 block text-sm", labelClassName)}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
