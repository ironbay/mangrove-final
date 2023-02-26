import { Octokit } from "octokit"

export interface Credentials {
  accessToken: string
}

export async function profileFromToken(token: string) {
  const octokit = new Octokit({ auth: token })
  const resp = await octokit.rest.users.getAuthenticated()
  return resp
}

export async function emailFromToken(token: string) {
  const octokit = new Octokit({ auth: token })
  const resp = await octokit.request("GET /user/emails", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  const primaryEmail = resp.data
    .filter((emailInfo) => emailInfo.primary)
    .at(0)?.email

  return primaryEmail
}
