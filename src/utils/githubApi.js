// src/utils/githubApi.js

export const fetchLastCommitDate = async (username, repo) => {
  const url = `https://api.github.com/repos/${username}/${repo}/commits`;
  const response = await fetch(url);
  const commits = await response.json();
  if (commits.length > 0) {
    return commits[0].commit.committer.date;
  }
  return null;
};
