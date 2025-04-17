import { HackatimeProject, HackatimeStatsProject } from "@/types/hackatime";

export async function fetchHackatimeProjects(
  slackId: string,
): Promise<Array<HackatimeProject>> {
  const uri = `https://hackatime.hackclub.com/api/v1/users/${slackId}/stats?features=projects`;
  const data: HackatimeStatsProject = await fetch(uri).then((d) => d.json());

  return data.data.projects;
}
