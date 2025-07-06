# Adding Comments to InFocus

## Intro & Frontend Functionality
InFocus now supports comments! You can comment on projects and write-ups, and you can reply to others' comments. In this paper, I'll describe how I implemented comments. I could have stored comments on GitHub, but this would inevitably lead to comments getting disorganized and cluttered. I've been getting some exposure to AWS in my internship- specifically the AWS API Gateway/ Lambda/ DynamoDB pipeline. So, I've decided to store all of the page's comments in the cloud!

I'm only going to create API methods for POST and GET; comments are not linked to profiles, so you can't edit comments once you've posted them, and I obviously don't want users to be able to delete comments. The partition key for my database is going to be the postID. The sort key is the comment ID, although I don't anticipate needing to use the sort key.

When you write and post a comment, the body of the POST request is formatted as follows (I refer to this throughout this writup as a "comment object"):
```json
{
    "name": "Will",
    "date": "YYYY-MM-DD HH:MM",
    "comment": "InFocus' First Comment",

    "postID": "InFocusComments",
    "parentID": null,
    "ID": "commentID",

    "depth": 0,
    "isAdmin": true
}
```
Many of these fields are unused for the time being, but I'm planning on adding new features to comments in the future. Currently I'm using name, date, comment, postID, and ID. Soon, I'll add nested comments. The postID is just the name of the corresponding markdown file (without the .md). I use the UUIDv4 function to generate IDs. UUIDv4 generates a random 122-bit number, so i'm not too worried about collisions. I would need to generate 1 billion UUIDs per second for 86 years to reach a 50% collision probability (thanks google). I don't anticipate my humble website getting that sort of traffic.

There are 3 components used to generate comments: CommentSection (the entry point), AddComment, and Comment. AddComment is generated at the top of the comment section, and it provides a place for the user to enter comments. Comments are generated beneath AddComment. When the page is rendered, CommentSection initiates a fetch request using the postID, and waits for the request to be fulfilled in the background. Once fetched, the comments are sorted by date and stored in the component's comments state. When a user enters a new comment, the new comment is packaged into a comment object and prepared for render. A function, onCommentSubmit, is passed as a prop from CommentSection to AddComment so that AddComment can update the comment list efficiently, without needing to refetch all comments. After this re-render is triggered, the new comment is sent via a POST request to the API gateway. Doing it this way makes for a cleaner user experience, as we don't have to call GET again. The Comment function takes a comment object as input, converts the date to a nice format, and renders.

## Backend Functionality
I made sure to package all of my requests using Lambda Proxy Integration so that requests had a consistent format, with data in the body. The backend wasn't too complicated to implement once I got the hang of AWS permissions and Lambda functions. Lambda functions are very easy to write when you use Postman and Cloudwatch. I wrote my Lambda functions using python, and was able to write comments to memory like so:
```py
table = boto3.resource('dynamodb').Table('Comments')
table.put_item( Item=
{
    'name': body["name"],
    'date': body["date"],
    'comment': body["comment"],

    'postID': body["postID"],
    'parentID': body["parentID"],
    'ID': body["ID"],

    'depth': body["depth"],
    'isAdmin': body["isAdmin"]
} )
```
To retrieve all of the comments for a given page, I did a table query, and I made sure to always return a list so that my frontend components wouldn't have to handle multiple value types:
```py
params = event.get('queryStringParameters') or {}
post_id = params.get('postID')

table = boto3.resource('dynamodb').Table('Comments')
result = table.query(
    KeyConditionExpression=boto3.dynamodb.conditions.Key('postID').eq(post_id)
)
comments = result.get('Items', [])
```

## Future Expansions
I learned a lot during this project, and I'm excited to do more work with APIs in the future. That said, I'm not planning on expanding the backend much for this particular project, but there is some functionality that I could add on the frontend. I plan to add nested comments and the ability to reply, as well as an admin mode where I can comment on my own posts using admin authentication.

*Thanks for reading. If you're interested, the full repo for this project is on my GitHub, which is linked in the About section of this website*