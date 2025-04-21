"use server"

export async function revalidate(prev: boolean, slackId: string): Promise<boolean> {
    console.log(slackId)
    return true;
}