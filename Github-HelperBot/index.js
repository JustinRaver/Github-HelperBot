/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
    app.log.info("Yay, the app was loaded!");

    app.on("installation_repositories.added", async (context) => {
        const repos = context.payload.repositories_added;
        const repoOwner = context.payload.sender.login;

        for (const repo of repos) {
            // Get all labels for the repository
            let {data: labels} = await context.octokit.issues.listLabelsForRepo({
                owner: repoOwner,
                repo: repo.name
            })

            //The current repos list of labels
            const repoLabels = new Set();
            labels.forEach(function (label) {
                repoLabels.add(label.name);
                app.log.info(label.name);
            })

            //label names and colors *** both arrays depend are order dependent ***
            const labelNames = ["documentation :page_facing_up:", "enhancement", "question :question:", "low-priority", "medium-priority", "high-priority :exclamation::exclamation:", "story :book:", "epic", "task", "bug :bug:"];
            const labelColors = ["0075ca", "a2eeef", "d876e3", "2dc937", "e7b416", "ff6600", "355c7d", "1143a9", "a1e9ea", "d73a4a"];
            //Make all the specified labels
            for (let i = 0; i < labelColors.length; i++) {
                if (!repoLabels.has(labelNames[i])) {
                    context.octokit.issues.createLabel({
                        owner: repoOwner,
                        repo: repo.name,
                        name: labelNames[i],
                        color: labelColors[i]
                    });
                }
            }
        }
    });


    app.on("project.created", async (context) => {
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
