/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("project.created", async (context) =>{
    let projId = context.payload.project.id;
    const colNames = ["New Issues", "Product Backlog (Stories)", "Sprint 0 Backlog (Stories)", "Sprint 0 Backlog (Tasks)", "In Progress", "Review/QA", "Closed"];
    //Add column for each name when project is created
    for (const name of colNames) {
      context.octokit.projects.createColumn({
        project_id: projId,
        name: name
      });
    }

    const repo = context.payload.repository.name;
    const repoOwner =  context.payload.repository.owner.login;
    const labels = context.octokit.issues.listLabelsForRepo({
      owner: repoOwner,
      repo: repo
    })

  });

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
