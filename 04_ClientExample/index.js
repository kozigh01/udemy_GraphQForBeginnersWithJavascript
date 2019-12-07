// @ts-check

const url = 'https://gql.trythen.com/graphql';
const query = `
query BookById($id: ID!) {
    book(id: $id) {
        title
    }
}`;

const variables = { id: "1" };

const client = graphQLFetch()