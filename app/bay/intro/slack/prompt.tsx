"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { revalidate } from "./actions";

export default function Prompt({ email }: { email: string }) {
  const [status, revalidateAction] = useActionState(revalidate, false);

  function recheck() {
    revalidateAction(email);
  }

  function next() {
    redirect("/bay/login/success");
  }

  return (
    <>
      <div className="text-dark-brown bg-sand/60 border border-sand p-6 rounded-md w-full max-w-4xl backdrop-blur-md mb-2">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Create a Slack Account
        </h1>
        The Hack Club Slack is an essential part of the Shipwrecked experience.
        It&apos;s the main space where you&apos;ll stay connected with
        everything happening during the event. From important announcements and
        updates to casual conversations. <br /> <br />
        If you ever need assistance or have questions, Slack is the fastest and
        easiest way to reach out. Whether you&apos;re looking for help from the
        organizers or want to discuss your projects with the other participants.{" "}
        <br /> <br />
        You&apos;ll soon receive an email invitation to join our Slack workspace
        to the email address you provided. Once you&apos;ve joined the
        workspace, return to this page. In most cases, your Slack account will
        be detected automatically. If your account doesn&apos;t show up right
        away, don&apos;t worry — simply click the check again button!
        <br /> <br />
        {/* Status Check */}
        <div className="flex justify-center">
          <h2 className="text-center font-semibold text-2xl mr-2">
            <img
              src={`/mark-${status ? "check" : "cross"}.svg`}
              className="w-10 inline"
            />{" "}
            {!status ? "No" : ""} Slack Account Found!
          </h2>
          <button
            className="ml-2 py-2 md:px-4 px-2 uppercase italic bg-dark-blue/60 text-sand border border-sand whitespace-nowrap text-xs md:text-base transition hover:border-yellow backdrop-blur-sm rounded-full cursor-pointer"
            onClick={recheck}
          >
            Check Again
          </button>
        </div>
        {/* Continue */}
        {status && (
          <div className="flex justify-end">
            <button
              className="py-2 md:px-4 px-2 uppercase italic bg-dark-blue/60 text-sand border border-sand whitespace-nowrap text-xs md:text-base transition hover:border-yellow backdrop-blur-sm rounded-full cursor-pointer"
              onClick={next}
            >
              <span className="flex items-center gap-3 flex-nowrap">
                Next!
                <Image
                  src="/back-arrow.png"
                  width={24}
                  height={24}
                  alt="next"
                  className="w-8 h-8 -scale-x-100"
                />
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
