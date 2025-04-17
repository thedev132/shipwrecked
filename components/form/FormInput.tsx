import { FormSave } from "@/app/bay/submit/actions";
import { ReactNode } from "react";

export default function FormInput({
  fieldName,
  type,
  placeholder,
  required,
  state,
  disabled,
  children,
}: {
  fieldName: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  state: FormSave;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <div className="my-5 mx-6">
        <label className="text-lg font-semibold text-left">
          {children}
          {required && <p className="text-red-500 inline">*</p>}
        </label>{" "}
        <br />
        {state.errors && state.errors[fieldName] && (
          <p className="text-red-500">&gt; {state.errors[fieldName][0]}</p>
        )}
        <input
          className="w-96 px-4 py-2 bg-gray-100 disabled:bg-gray-200 rounded outline-1 outline-gray-200"
          placeholder={placeholder}
          type={type ?? "text"}
          name={fieldName}
          required={required}
          defaultValue={state.data && state.data[fieldName].toString()}
          disabled={disabled}
        />
      </div>
    </>
  );
}
