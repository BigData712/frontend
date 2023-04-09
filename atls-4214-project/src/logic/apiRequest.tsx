import { Status } from "./types";

export async function retrieveDataDSL(county:String, query: String, url = "https://cc-api-wav6.onrender.com/") {
  let fixedURL;
  if (query.length > 0) {
      fixedURL = url + county + "_search?source_content_type=application/json&source=" + query;
  } else {
      fixedURL = url + county;
  }
  const response = await fetch(fixedURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function retrieveDataSQL(query: String, url = "https://cc-api-wav6.onrender.com/") {
  const response = await fetch("https://cc-api-wav6.onrender.com/sql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{"query": "${query}"}` as any,
  });
  return response.json();
}



  export async function retrieveCountyList(setCounties: Function, setStatus: Function) {
    setStatus(Status.Loading);
    retrieveDataSQL("SHOW tables LIKE %")
      .then(((returned) => {
        setCounties(
            Object.keys(returned).
            filter((curr) => (curr[0] !== '.')) // Remove opensearch options
            .map((curr) => (
                curr.replaceAll('_', ' ') // Replace underscores with spaces
                .split(' ') //split on spaces
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //capitalize first letter
                .join(' ') //combine strings
            ))
            .sort() //alphabetize
        );
        setStatus(Status.Succeeded);
      })
    ).catch(() => {
      setStatus(Status.Failed);
    })
  }