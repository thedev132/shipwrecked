"use client";

import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import { save } from "./actions";
import FormSelect from "@/components/form/FormSelect";
import { HackatimeProject } from "@/types/hackatime";
import { useActionState } from "react";
import countries from "@/types/countries";

export default function SubmissionForm({
  email,
  slackId,
  projects,
}: {
  email: string;
  slackId: string;
  projects: Array<HackatimeProject>;
}) {
  const [state, formAction, pending] = useActionState(save, {
    errors: undefined,
    data: {
      "Slack Id": slackId,
      Email: email,
    },
  });

  const formattedProjects: Record<string, string> = {};
  projects.forEach(
    (project) =>
      (formattedProjects[`${project.name} (${project.text})`] = project.name)
  );

  return (
    <form
      action={formAction}
      className="flex justify-center flex-col items-middle flex-wrap"
    >
      <FormGroup name="Project Details">
        <FormInput
          fieldName="Project Name"
          placeholder="What is the name of your project?"
          required
          state={state}
        >
          Project Name
        </FormInput>

        <FormInput
          fieldName="Code URL"
          placeholder="Where can we find your code?"
          type="url"
          required
          state={state}
        >
          Source Code URL
        </FormInput>

        <FormInput
          fieldName="Playable URL"
          placeholder="Where can we try your project?"
          type="url"
          required
          state={state}
        >
          Demo URL
        </FormInput>

        <FormTextarea
          fieldName="Description"
          placeholder="How would you describe your project?"
        >
          Project Description
        </FormTextarea>

        <FormSelect
          fieldName="Hackatime Projects"
          values={formattedProjects}
          multiple
        >
          Hackatime Projects
        </FormSelect>
      </FormGroup>

      <FormGroup name="Personal Details">
        <FormInput fieldName="Slack Id" placeholder="" state={state} disabled>
          Slack User Id
        </FormInput>

        <FormInput
          fieldName="First Name"
          placeholder="What is your first name?"
          required
          state={state}
        >
          First Name
        </FormInput>

        <FormInput
          fieldName="Last Name"
          placeholder="What is your last name?"
          required
          state={state}
        >
          Last Name
        </FormInput>

        <FormInput
          fieldName="Email"
          placeholder="What is your email?"
          type="email"
          required
          state={state}
        >
          Email
        </FormInput>

        <FormInput
          fieldName="Github Username"
          placeholder="What is your github username?"
          required
          state={state}
        >
          Github Username
        </FormInput>

        <FormInput
          fieldName="Birthday"
          placeholder=""
          type="date"
          required
          state={state}
        >
          Birthday
        </FormInput>
      </FormGroup>

      <FormGroup name="Address">
        <FormInput
          fieldName="Address (Line 1)"
          placeholder="Address (Line 1)"
          required
          state={state}
        >
          Address (Line 1)
        </FormInput>

        <FormInput
          fieldName="Address (Line 2)"
          placeholder="Address (Line 2)"
          state={state}
        >
          Address (Line 2)
        </FormInput>

        <FormInput fieldName="City" placeholder="City" required state={state}>
          City
        </FormInput>

        <FormInput
          fieldName="State / Province"
          placeholder="State / Province"
          state={state}
        >
          State / Province
        </FormInput>

        <FormInput
          fieldName="ZIP / Postal Code"
          placeholder="ZIP / Postal Code"
          required
          state={state}
        >
          ZIP / Postal Code
        </FormInput>

        <FormSelect fieldName="Country" required values={countries}>
          Country
        </FormSelect>
      </FormGroup>

      <FormGroup name="Feedback">
        <FormTextarea fieldName="feedbackFrom" placeholder="">
          How did you hear about this?
        </FormTextarea>

        <FormTextarea fieldName="feedbackDoingWell" placeholder="">
          What are we doing well?
        </FormTextarea>

        <FormTextarea fieldName="feedbackImprove" placeholder="">
          How can we improve?
        </FormTextarea>
      </FormGroup>

      <button
        type="submit"
        className="mt-4 focus:outline-2 px-4 w-24 py-2 bg-indigo-500 hover:bg-indigo-700 hover:underline hover:font-bold rounded text-white self-center"
        disabled={pending}
      >
        Ship!
      </button>
    </form>
  );
}
