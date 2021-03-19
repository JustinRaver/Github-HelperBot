# proj-Helper

> A GitHub App built with [Probot](https://github.com/probot/probot) that This application will be used to add an agile workflow to future repositories. Including: project boards, issue labels, branch protections, and branch creation for issues

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t proj-Helper .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> proj-Helper
```

## Contributing

If you have suggestions for how proj-Helper could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Justin Raver <justinraver113@gmail.com>
