# backdrop-test
url shortener

### Question


You're going to create a GraphQL API with one query. The query `shortenURL` will accept one required argument:

`url` - this should be a valid URL. 

The API should respond with a shorter URL string consisting of:

- Your host
- A string path of length 6 characters

Example: `https://example.com/asdfgh`


### Usage: 
Copy and Paste this url to your brower `https://backdrop-challenge1.herokuapp.com/graphql`

The graphql interface will pop up.

Then copy and paste this: 
```
{
  shortenUrl(url: "https://thebulb.africa"){
    url
  }
}


```
