# udemy_GraphQForBeginnersWithJavascript

## Resources

- Course: [udemy](https://www.udemy.com/course/graphql-for-beginners-with-javascript/)
- Source Code: [github](https://github.com/knowthen/graphql)
- Graphiql: [site](https://gql.trythen.com/graphiql)
  - cntl-space: shows list of fields
- Apollo GraphQL: [site](https://www.apollographql.com/) | [client](https://www.apollographql.com/client/) | [conver to 2.0](https://www.apollographql.com/docs/apollo-server/migration-two-dot/)
- Docker: [compose](https://docs.docker.com/compose/compose-file/)
    - postgres: [compose example](https://stackoverflow.com/questions/53266285/connecting-pgadmin-to-postgres-in-docker) | [dockerhub](https://hub.docker.com/_/postgres)
    - pgAdmin: [connect](https://stackoverflow.com/questions/25540711/docker-postgres-pgadmin-local-connection) | [volume](https://stackoverflow.com/questions/57174830/pgadmin-creates-new-random-volume-with-each-docker-compose-up)
- Postgres: [project setup](https://gist.github.com/knowthen/21a5959d6b99e04d73c8b2416e405bb0)
- Google book api: [example](https://www.googleapis.com/books/v1/volumes?q=zero+to+one)
- Blogs:
    - Christoffer Noring: 
        - [Building a GraphQL Server with Node.js and Express](https://softchris.github.io/pages/graphql-express.html#why-graphql)
        - [Creating a GraphQL Server with Apollo](https://dev.to/azure/creating-a-graphql-server-withapollo-jjj)

## Commands

### Misc - Bash
```cmd
# remove all node_module directories
$ find . -type d -name "node_modules"
$ find . -type d -name "node_modules" -exec rm -rf "{}" \;

# switch user
$ whoami
$ su - postgres
```

### Curl

```cmd
$ curl -G 'https://gql.trythen.com/graphql' --data-urlencode 'query={book(id:"1"){title}}'
$ curl -X POST -H "Content-type: application/json" -d '{"query}:"{book(id: \"1\"){title}}"}' https://gql.trythen.com/qraphql
```

### psql
```cmd
$ su - postgress
$ psql
postgres=# create database junk;
postgres=# \c junk;

junk=# create table book( <enter>
junk(# id serial primary key, <enter>
junk(# title text); <enter>

junk=# select id, title from book;

junk=# insert into book(title) values ('zero to one');
junk=#  insert into book(title) values ('Design for Hackers');
junk=# update book set title = 'Zero to One' where id = 1;
junk=# delete from book where id = 1;

junk=# create table author( <enter>
junk(# id serial primary key, <enter>
junk(# name text); <enter>
junk=# insert into author (name) values ('Peter Theil'), ('Blake Masters');

junk=# create table book_author(
junk(# id serial primary key,
junk(# book_id integer references book(id),
junk(# author_id integer references author(id));

junk=# insert into book_author (book_id, author_id) values (2, 1), (2, 2);

junk=# select book.title, author.name
junk-# from book
junk-# inner join book_author on book.id = book_author.book_id
junk-# inner join author on author.id = book_author.author_id;

junk=# \c postgres
junk=# drop database junk;

```

### Course Code

#### Section 3 - First GraphQL Server
```cmd
$ docker-compose up --build
# in new shell window:
$ docker exec -it <container id> sh
/app # node index.js "query { hello }"
/app # exit
```

#### hackerbookreview_starter
```cmd
$ npx babel-node ./src/server.js "{ hello }"
```
#### Section 7
```cmd
$ npm install --save-dev nodemon
$ npm install --save-dev @babel/core @babel/node
```
