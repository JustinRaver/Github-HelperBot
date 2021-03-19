/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("project.created", async (context) =>{
    let projId = context.payload.project.id;
    const cols = ["New Issues", "Product Backlog (Stories)", "Sprint 0 Backlog (Stories)", "Sprint 0 Backlog (Tasks)", "In Progress", "Review/QA", "Closed"];

    for (const col of cols) {
      context.octokit.projects.createColumn({
        project_id: projId,
        name: col
      });
    }
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
