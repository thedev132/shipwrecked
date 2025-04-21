import { HacaktimeMostRecentHeartbeat, HackatimeProject, HackatimeStatsProject } from "@/types/hackatime";

export async function fetchHackatimeProjects(
  slackId: string,
): Promise<Array<HackatimeProject>> {
  const uri = `https://hackatime.hackclub.com/api/v1/users/${slackId}/stats?features=projects`;
  const data: HackatimeStatsProject = await fetch(uri).then((d) => d.json());

  return data.data.projects;
}

export async function checkHackatimeUserExists(
  id: string
): Promise<boolean> {
  const uri = `https://hackatime.hackclub.com/api/v1/users/${id}/stats`
  const req = await fetch(uri)

  if (req.status == 404) return false;
  return true;
}

export async function fetchRecentHeartbeat(id: string): Promise<HacaktimeMostRecentHeartbeat> {
  const uri = `https://hackatime.hackclub.com/api/v1/${id}/heartbeats/most_recent`
  const data = await fetch(uri).then(d => d.json())

  return data
}