export async function retrieveData(county:String, query: String, url = "https://cc-api-wav6.onrender.com/") {
    let fixedURL;
    if (query.length > 0) {
        fixedURL = url + county + "/_search?source_content_type=application/json&source=" + query;
    } else {
        fixedURL = url + county;
    }
    // Default options are marked with *
    const response = await fetch(fixedURL, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }