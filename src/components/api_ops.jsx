// function inputs:
// - postID (string)
// - ID (string)
//
// function output:
// - fetched comments, returned as a list of objects
export async function API_GET( postID, ID ) {
  const API_BASE_URL = "https://r6ntc3kpv0.execute-api.us-east-2.amazonaws.com/Main";
  let data;

  try{
    const response = await fetch( `${API_BASE_URL}?postID=${postID}&ID=${ID}` )
    data = await response.json()
    console.log("API GET Successful. Data: ", data);
  } catch(err) {
    console.error("API GET Failed. Error Code: ", err);
  }

  return data;
}



// function input:
// - single object of the form:
// {
//     "name": "Will",
//     "date": "2025-06-25",
//     "comment": "InFocus' First Comment",

//     "postID": "InFocusComments",
//     "parentID": null,
//     "ID": "commentID",

//     "depth": 0,
//     "isAdmin": true
// }
//
// function output:
// - response status (success = 200)
export async function API_POST( comment ) {
    const API_BASE_URL = "https://r6ntc3kpv0.execute-api.us-east-2.amazonaws.com/Main";
    let response;

    try{
    response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });
    console.log("API POST status: ", response.status);
    } catch(err) {
        console.error("API POST Failed. Error Code: ", err);
    }
    return response.status;
}