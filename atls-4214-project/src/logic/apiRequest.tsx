import { Status } from "./types";

// This function retrieves data from the API with DSL query and returns the response in JSON format
export async function retrieveDataDSL(county:String, query: String, url = "https://cc-api-wav6.onrender.com/") {
  let fixedURL;
  // Check if query is provided
  if (query.length > 0) {
      // If query is provided, append county and query to the URL to get the data
      fixedURL = url + county + "_search?source_content_type=application/json&source=" + query;
  } else {
      // If query is not provided, only append county to the URL to get the data
      fixedURL = url + county;
  }
  // Make an HTTP GET request to fetch the data from the API
  const response = await fetch(fixedURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Return the response in JSON format
  return response.json();
}

// This function retrieves data from the API with SQL query and returns the response in JSON format
export async function retrieveDataSQL(query: String, url = "https://cc-api-wav6.onrender.com/") {
  // Make an HTTP POST request with the SQL query to fetch the data from the API
  const response = await fetch("https://cc-api-wav6.onrender.com/sql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{"query": "${query}"}` as any,
  });
  // Return the response in JSON format
  return response.json();
}

// This function retrieves the list of counties from the API and updates the status accordingly
  export async function retrieveCountyList(setCounties: Function, setStatus: Function) {
    // Update the status to Loading
    setStatus(Status.Loading);
    // Call retrieveDataSQL function with the query to get the list of counties
    retrieveDataSQL("SHOW tables LIKE %")
      .then(((returned) => {
        // Filter out options and format the county names
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
        setStatus(Status.Succeeded); // Update the status to Succeeded
      })
    ).catch(() => {
      setStatus(Status.Failed); // Update the status to Failed
    })
  }