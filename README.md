This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Crime Crunch

Hosted on [https://crime-crunch.onrender.com/](https://crime-crunch.onrender.com/). 

Made by: Ash Duy, Jaryd Meek, Noah Nguyen

## About Crime Crunch
Crime Crunch is a group project created for CU's ATLS 4214 - Big Data Architecture course. It is is an app designed to help Coloradans learn more about the different kinds of crimes occurring across the state. Utilizing data from the [FBI Crime Data Explorer](https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/home), users can view crime statistics from the various counties in Colorado and compare how types of crime compare or how they number reported has changed over time.

Data is collected from the FBI Crime Data Explorer, which hosts data from the [Natiognal Incident-Based Reporting System (NIBRS)](https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/ucr/nibrs). The data used spans the years 2016-2021 as data stored in years prior to 2016 were stored with a different database schema. The data was transformed into a standardized format and uploaded via curl to AWS OpenSearch. At time of writing, this consists of 2.55 million records and is viewable on the RAW DATA page. OpenSearch can then be queried with SQL.

For the project, it was deployed using [Render](https://render.com), a web service host that offered a free tier that was sufficient to build and deploy this project. 

## Additional Resources
[Link to data prparation methodology](https://github.com/BigData712/crime-data)

[Link to OpenSearch Query code](https://github.com/BigData712/cc-api)

# Running the Project Yourself

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
