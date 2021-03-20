/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("installation_repositories.added", async (context) =>{
    let labelNames = ["documentation","enhancement","question","low-priority","medium-priority","high-priority","story","epic","task", "bug"];
    let labelColors = ["#0075ca","#a2eeef","#d876e3","#2dc937","#e7b416","#ff6600","#355c7d","#1143a9","#a1e9ea","#d73a4a"];
    const repos = context.payload.repositories_added;
    const repoOwner =  context.payload.sender.login;

    for (const repo of repos) {
      //Get all labels for the repository
      let {data: labels} = await context.octokit.issues.listLabelsForRepo ({
        owner: repoOwner,
        repo:repo.name
      })
      //The current repos list of labels
      const repoLabels = new Set();
      labels.forEach(function(label){
        repoLabels.add(label.name);
      })


    }

  });

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
