import { InMemoryCache, makeVar } from "@apollo/client"
import { Filter } from '../models/filter'

// Create the initial value
const filterInitialValue: Filter = {
  cities: [],
  categories: [],
  search: '',
}

// Create the filter var and initialize it with the initial value
export const filterVar = makeVar<Filter>(
  filterInitialValue
)

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        filter: {
          read () {
            return filterVar()
          }
        }
      }
    }
  }
})
