### Server part
Seems like it's not possible to accomplish GitHub authentication web flow only with browser-side code,
so a small server was needed. Check [this](https://github.com/isaacs/github/issues/330) for further details.

### Folder structure
There should actually be a monorepo or two separate repos with client and server side,
but due to the nature of the project I've decided just to add one single server file to the 
frontend part. 

### Environment variables and security
Of course in a real life project I would never push sensitive variables and client secrets to the repo,
But to simplify launching and testing the client secret is just hard coded on the server part :)
