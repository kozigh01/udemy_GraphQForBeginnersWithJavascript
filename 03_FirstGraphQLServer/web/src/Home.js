import React, { Component } from 'react';
import * as R from 'ramda';
import { BookListSection, SORT_BY } from './components/Book';
import Error from './components/Error';
import { RecentReviewSection } from './components/Review';
import data from './data/';

const query = `
query HomePage($bookOrder: BooksOrderBy) {
  books(orderBy: $bookOrder) {
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
`;

class Home extends Component {
  state = {
    books: [],
    reviews: [],
    orderBy: R.pipe(
      R.keys,
      R.head,
    )(SORT_BY),
    errors: [],
  };
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    try {
      // TODO: query actual books and reviews from graphql
      const books = data.books;
      const reviews = data.reviews;
      const errors = [];
      // eslint-disable-next-line
      const { orderBy } = this.state;
      const variables = { orderBy };
      this.setState({
        books,
        reviews,
        errors,
      });
    } catch (err) {
      this.setState({ errors: [err.message] });
    }
  }
  handleOrderBy = async orderBy => {
    this.setState({ orderBy }, () => {
      this.loadData();
    });
  };
  render() {
    return (
      <div className="cf black-80 mv2">
        <Error errors={this.state.errors} />
        <BookListSection {...this.state} handleOrderBy={this.handleOrderBy} />
        <RecentReviewSection {...this.state} />
      </div>
    );
  }
}

export default Home;
