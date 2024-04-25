import React from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

interface AvatarInputProps {
  id: string;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  rules?: RegisterOptions<FieldValues>;
  register?: UseFormRegister<any>;
  className?: string;
  label?: string;
}

const AvatarInput: React.FC<AvatarInputProps> = ({
  id,
  required = false,
  error = false,
  helperText,
  onChange,
  name,
  rules,
  register,
  className,
  label,
}) => {
  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <label
        htmlFor={id}
        className="cursor-pointer flex items-center justify-center w-24 h-24 rounded-full bg-gray-200"
      >
        <HiOutlineOfficeBuilding className="w-12 h-12 text-gray-400" />
        <input
          type="file"
          id={id}
          value={undefined}
          required={required}
          onChange={onChange}
          name={name}
          {...(register && name && rules && register(name, rules))}
          className="hidden"
        />
      </label>
      {label && (
        <label htmlFor={id} className="mt-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {helperText && error && (
        <span className="mt-1 text-sm text-red-600">{helperText}</span>
      )}
    </div>
  );
};

export default AvatarInput;
