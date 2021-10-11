import { gql } from '@apollo/client'

export const CREATE_RECOMMENDATION = gql`
mutation CreateRecommendation($name: String!, $category: String, $city: String, $instagram: String, $recommendedBy: String) {
  createRecommendation(
    data: {name: $name, category: {connect: {slug: $category}}, city: {connect: {slug: $city}}, instagram: $instagram, recommendedBy: $recommendedBy}
  ) {
    category {
      name
    }
    city {
      name
    }
    instagram
    name
  }
}`

export const GET_RECOMMENDATION = gql`
query GetRecommendations {
  recommendations (where: {visible: true}) {
    category {
      name
    }
    city {
      name
    }
    instagram
    name
    recommendedBy
  }
}`
