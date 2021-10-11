import { gql } from '@apollo/client'

import {FilterProps} from '../../models/filter'

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
    posts (orderBy: data_DESC) {
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

export const handleFilterHeader = (filter: FilterProps) => {
  const header = {query: '', where: ''}

  if (filter?.search) {
    header.query = `$search: String`
    header.where = `name_contains: $search`
  }
  if (filter?.categories?.length) {
    header.query = `${header.query.length ? `${header.query},` : ''} $categories: [String!]`
    header.where = `${header.where.length ? `${header.where},` : ''} category: { slug_in: $categories }`
  }
  if (filter?.cities?.length) {
    header.query = `${header.query.length ? `${header.query},`  : ''} $cities: [String!]`
    header.where = `${header.where.length ? `${header.where},`  : ''} city: { slug_in: $cities }`
  }
  return header
}

export const handleQuery = ( filter: FilterProps) => {
  const header = handleFilterHeader(filter)

  const query = header.query.length ? `getFilterPosts(${header.query})` : 'getFilterPosts'
  const where = header.query.length ? `(where: {restaurant: {${header.where} }}, orderBy: data_DESC)` : '(orderBy: data_ASC)'

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

export const getFilterPost = (filter: FilterProps) =>   {
  const query = handleQuery(filter)
  return gql`${query}`
}
