"use server"

export async function revalidate(prev: boolean, email: string): Promise<boolean> {
    console.log(email)
    return true;
}