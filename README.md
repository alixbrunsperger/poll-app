# poll-app

This is a personal project, created for training (and having fun) purposes.
The goal is to create a web application that has two main use cases :
- poll creation, and poll answers visualisation (admin use case)
- poll answering (public use case)


# Tools

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`].
On top of that, this project uses :
- react-hook-form + Zod for handling forms and validation
- React-query for handling fetched data
- UUID, TypeScript and Lodash as general tools
- Material UI for layout elements

I also used Hygraph as Graphql backend. This works with a auth token that needs to be passed in the header of the calls.
Fortunately, Nextjs allows to create API calls in the project, and those are executed on the server side, whic avoids the leak of the auth token. Every graphql call made on the frontend, is proxied to the Nextsjs API.

# Running this project
If you want to run this project locally, you will need to create a `.env.local` file at the root level and put two variables there :
`GRAPH_URL` => url of your graphql backend
`GRAPH_PERMANENTAUTH_TOKEN` => the auth token used in the headers

This file will not be commited in the project for security reasons.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
