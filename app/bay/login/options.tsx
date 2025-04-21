"use client";

import { signIn } from "next-auth/react";

export default function LoginOptions() {
  const callback = "/bay/login/success";

  function loginWithSlack() {
    signIn("slack", { callbackUrl: callback });
  }

  function loginWithEmail(form: FormData) {
    const email = form.get("email");

    if (!email) return;

    signIn("email", { email, callbackUrl: callback });
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center my-4 rounded-lg bg-gray-100/60 p-2">
        <button className="my-2" onClick={loginWithSlack}>
          <img
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </button>

        <p className="mb-.5 mt-2 text-lg"> or </p>

        <form action={loginWithEmail}>
          <div className="my-2 mx-6">
            <input
              className="mr-2 w-72 my-2 px-4 py-2 bg-gray-100 disabled:bg-gray-200 rounded outline-1 outline-gray-200"
              name="email"
              placeholder="Email"
              type="email"
            />

            <button className="ml-2 mt-1 mb-2 py-2 px-4 bg-white border border-[#C8CACD] hover:bg-gray-200 rounded-lg">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
