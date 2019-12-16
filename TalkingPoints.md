# GraphQL

## Intereting Qualities of GraphQL

1. Built in tool to explore endpoint - Graphiql
    1. Schema
    1. Docs
    1. Shift-tab intellisense
1. Strongly typed contract between client and server
    1. Uses a explicit Schema - must opt-in for all data
    1. Allows for "self-documenting" and discoverability
1. Extensible - can generate new "types"
1. Can avoid over-fetching
1. Can avoid under-fetching
1. Can return multiple results in one query - so can get all data for a client page is one web request

## Features of GraphQL

1. Schema
1. Fragments
1. Parameterized query/mutations
1. Can avoid the N + 1 problem (using DataLoader)

## Demo Queries/Mutation

### 01 BooksAll

```graphql
query BooksAll {
  books {
    id
    title
    subtitle
    description
    imageUrl
    rating
    ratingCount
  }
}
```

### 02 Books

```graphql
query {
  hello
}
```

### 03 BooksWithRelated

```graphql
query BooksWithRelated {
  books {
    id
    title
    reviews {
      id
      title
      rating
      comment
      user {
        id
        name
      }
    }
  }
}
```

### 04 Book

```graphql
query Book {
  book(id: 1) {
    title
    subtitle
    description
    authors {
      id
      name
    }
    reviews {
      id
      title
      rating
      user {
        name
      }
    }
  }
}
```

### 05 BookWParam

```graphql
query BookWParam($id: ID!) {
  book(id: $id) {
    title
    subtitle
  }
}

query BooksWParams($orderBy: BooksOrderBy, $limit: Int) {
  books(orderBy: $orderBy, count: $limit) {
    id
    title
    imageUrl
    rating
    reviews {
      comment
    }
  }
}

# variables
{
  "id": 1,
  "orderBy": "RATING_DESC",
  "limit": 3
}
```

### 06 HomePage

```graphql
query HomePage($orderBy: BooksOrderBy) {
  books(orderBy: $orderBy) {
    ...Book
    imageUrl
    authors {
      name
    }
  }
  reviews {
    ...Review
    book {
      ...Book
      imageUrl(size: SMALL)
    }
  }
}

fragment Book on Book {
  id
  title
  description
  rating
}

fragment Review on Review {
  id
  title
  rating
  comment
  user {
    name
  }
}  
```

### 07 Subscription
```graphql
subscription NewBook {
  bookAdded {
    id
    title
    description
  }
}
```