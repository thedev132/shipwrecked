"use server";

import { opts } from "@/app/api/auth/[...nextauth]/route";
import { createRecord } from "@/lib/airtable";
import { getServerSession } from "next-auth";
import { z } from "zod";

const schema = z.object({
    // Personal Details
    "First Name": z.string().nonempty({
        message: "First Name cannot be empty",
    }),
    "Last Name": z.string().nonempty({
        message: "Last Name cannot be empty",
    }),

    "Github Username": z.string().nonempty({
        message: "Github Username cannot be empty",
    }),

    Birthday: z.string().date("Birthday must be a valid date"),

    // Address Details
    "Address (Line 1)": z.string().nonempty({
        message: "Address cannot be empty",
    }),

    "Address (Line 2)": z.string().optional(),

    City: z.string().nonempty({
        message: "City cannot be empty",
    }),

    "State / Province": z.string().optional(),

    "ZIP / Postal Code": z.string().nonempty({
        message: "Field cannot be empty",
    }),

    Country: z.string().nonempty({
        message: "Country cannot be empty",
    }),
});

type Data = Record<string, FormDataEntryValue | FormDataEntryValue[]>;

export type EntryData = Record<string, string | number | string[]>;

export type FormSave = {
    errors: Record<string, Array<string>> | undefined,
    data: EntryData | undefined,
    valid: boolean
};

export async function save(state: FormSave, payload: FormData): Promise<FormSave> {
    const session = await getServerSession(opts);

    const keys = Object.keys(schema.shape);

    const data: Data = {};
    keys.forEach((k: string) => (data[k] = payload.get(k) as string));

    const validated = await schema.safeParseAsync(data);

    if (!validated.success) {
        const errors = validated.error.flatten().fieldErrors;

        return {
            errors: errors,
            data: undefined,
            valid: false
        };
    }

    if (payload.get("Email")) {
        const email = await z.string().email().safeParseAsync(payload.get("Email"))

        if (!email.success) {
            return {
                errors: { Email: ["Failure to parse email!"] },
                data: undefined,
                valid: false
            }
        }

        (validated.data as Record<string, string>)["Email"] = email.data
    }

    const newEntry: EntryData = { ...validated.data };
    if (session && session!.user && session!.user!.email)
        newEntry["Email"] = session!.user!.email!

    if (!newEntry["Email"])
        return { errors: { Email: ["An email is required!"] }, data: undefined, valid: false }

    await createRecord("Users", newEntry)

    return {
        errors: undefined,
        data: newEntry,
        valid: true
    };
}
