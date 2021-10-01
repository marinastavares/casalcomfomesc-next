import { gql } from '@apollo/client'

export const GET_ALL_FILTERS_OPTIONS = gql`
  query getGeneralInfo {
    categories {
      name
      slug
    }
    cities {
      name
      slug
    }
    filter @client {
      cities
      categories
      search
    }
    posts {
      data
      url
      thumbnail {
        url
      }
      restaurant {
        name
        category {
          name
        }
        city {
          name
        }
      }
      notaMarina
      notaVinicius
      tags
    }
  }
`

export const GET_LOCAL_FILTER = gql`
  query getClientFilter {
    filter @client {
      cities
      categories
      search
    }
  }
`

export const handleFilterHeader = (filter) => {
  const header = {query: '', where: ''}

  if (filter?.search) {
    header.query = `$search: String`
    header.where = `name_contains: $search`
  }
  if (filter?.categories) {
    header.query = `${header.query.length ? ',' : ''} $categories: [String!]`
    header.where = `${header.where.length ? ',' : ''} { category: { slug_in: $categories } }`
  }
  if (filter?.cities) {
    header.query = `${header.query.length ? ',' : ''} $cities: [String!]`
    header.where = `${header.where.length ? ',' : ''} { city: { slug_in: $cities } }`
  }
  return header
}

export const handleQuery = filter => {
  const header = handleFilterHeader(filter)

  const query = header.query.length ? `getFilterPosts(${header.query})` : 'getFilterPosts'
  const where = header.query.length ? `(where: {restaurant: ${header.where} })` : ''

  return  `
  query ${query} {
    posts${where}  {
      data
      url
      thumbnail {
        url
      }
      restaurant {
        name
        category {
          name
        }
        city {
          name
        }
      }
      notaMarina
      notaVinicius
      tags
    }
  }
`
}

export const getFilterPost = filter =>   {
  const query = handleQuery(filter)
  return gql`${query}`
}
