## Available Scripts

In the project directory, you can run:

### `npm start`
Launches frontend (http://localhost:3000) and backend (http://localhost:3001) parts.\

### `npm test`
Launches the test runner in the interactive watch mode.\

### `npm run build`
Builds the app for production to the `build` folder.\


## RELEASE NOTES

### Further / Skipped steps (due to the lack of time and nature of this project)
- [ ] Increase test coverage
- [ ] Handle pagination
- [ ] Add a "scrollTo" behavior on the `/browser` page. When the user opens a repository details
  the window should scroll so that the upper bound of the opened repository is on top
- [ ] Enhance a11y
- [ ] Obtain new token if this invalidates
- [ ] Add a proper API error handling instead of `console.error()`
- [ ] Setup proper linting
    - [ ] Customize linting rules. I would prefer airbnb as base rules.
    - [ ] Add prettier
- [ ] Optimize folder structure (see comments below)

### Server part
Seems like it's not possible to accomplish GitHub authentication web flow only with browser-side code,
so a small server was needed. Check [this](https://github.com/isaacs/github/issues/330) for further details.

### Folder structure
There should actually be a monorepo or two separate repos with client and server side,
but due to the nature of the project I've decided just to add one single server file to the
frontend part. I know it's pretty ugly but what you can do with the lack of time...

### Environment variables and security
Of course in a real life project I would never push sensitive variables and client secrets to the repo,
But to simplify launching and testing the client secret is just hard coded on the server part :)
