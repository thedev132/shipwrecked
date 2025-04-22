import { FormSave } from "@/app/bay/submit/actions";
import { ReactNode, ChangeEvent } from "react";

export default function FormInput({
  fieldName,
  type,
  placeholder,
  required,
  state,
  disabled,
  children,
  value,
  onChange,
}: {
  fieldName: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  state: FormSave;
  disabled?: boolean;
  children: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="my-5 mx-6">
        <label className="text-lg font-semibold text-left">
          {children}
          {required && <p className="text-red-500 inline">*</p>}
        </label>

        {/* Error Tooltip */}
        {state.errors && state.errors[fieldName] && (
          <div className="has-tooltip inline">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500/80 -mt-8 px-2 py-1">
              {state.errors[fieldName][0]}
            </span>
            <img
              src="/icon-error.svg"
              className="w-6 align-top inline ml-0.5"
            ></img>
          </div>
        )}

        <br />

        <input
          className="w-82 px-4 py-2 bg-gray-100 disabled:bg-gray-200 rounded outline-1 outline-gray-200"
          placeholder={placeholder}
          type={type ?? "text"}
          name={fieldName}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </>
  );
}
