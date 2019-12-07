# udemy_GraphQForBeginnersWithJavascript

## Resources

- Course: [udemy](https://www.udemy.com/course/graphql-for-beginners-with-javascript/)
- Source Code: [github](https://github.com/knowthen/graphql)
- Graphiql: [site](https://gql.trythen.com/graphiql)
  - cntl-space: shows list of fields
- Apollo GraphQL: [site](https://www.apollographql.com/) | [client](https://www.apollographql.com/client/)

## Commands

### Curl

```cmd
$ curl -G 'https://gql.trythen.com/graphql' --data-urlencode 'query={book(id:"1"){title}}'
$ curl -X POST -H "Content-type: application/json" -d '{"query}:"{book(id: \"1\"){title}}"}' https://gql.trythen.com/qraphql
```