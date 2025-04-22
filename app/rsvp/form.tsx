"use client";

import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import countries from "@/types/countries";
import { save } from "./actions";
import { useActionState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

// Client Side Registration Form
//
// If hasSession is true, hide the email/log in with slack option
export default function Form({ hasSession }: { hasSession?: boolean }) {
  const [state, formAction, pending] = useActionState(save, {
    errors: undefined,
    data: undefined,
    valid: false,
  });

  // If the state changes and the data is valid, redirect to the form completion page
  useEffect(() => {
    if (state.valid) redirect("/rsvp/complete");
  }, [state]);

  return (
    <>
      <div className="text-dark-brown bg-sand/60 border border-sand p-6 rounded-md w-full max-w-4xl backdrop-blur-md mb-2">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          RSVP for Shipwrecked!
        </h1>

        <form className="flex flex-col justify-center" action={formAction}>
          <div className="lg:flex justify-center">
            <FormInput
              fieldName="First Name"
              state={state}
              placeholder="Prophet"
              required
            >
              First Name
            </FormInput>
            <FormInput
              fieldName="Last Name"
              state={state}
              placeholder="Orpheus"
              required
            >
              Last Name
            </FormInput>
          </div>

          <div className="lg:flex justify-center">
            <FormInput
              fieldName="Email"
              state={state}
              placeholder="orpheus@hackclub.com"
              required
            >
              Email
            </FormInput>
            <FormInput
              fieldName="Birthday"
              type="date"
              state={state}
              placeholder=""
              required
            >
              Birthday
            </FormInput>
          </div>

          <div className="flex justify-end mt-2">
            <button
              className="py-2 md:px-4 px-2 uppercase disabled:bg-dark-blue/20 bg-dark-blue/60 text-sand border border-sand whitespace-nowrap text-xs md:text-base transition hover:not-disabled:border-yellow backdrop-blur-sm rounded-full cursor-pointer"
              disabled={pending}
            >
              <span className="flex items-center gap-1 flex-nowrap">
                Submit
                <Image
                  src="/mark-check.svg"
                  width={12}
                  height={12}
                  alt="next"
                  className="w-8 h-8"
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
