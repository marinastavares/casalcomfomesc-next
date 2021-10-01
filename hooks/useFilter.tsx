import { useQuery } from '@apollo/client'

import { filterVar } from '../lib/cache'
import { optionsProps } from '../models/options'
import { GET_LOCAL_FILTER } from '../lib/queries/filter'

const useFilter = (name: string, getNewPosts: any) => {
  const { data } = useQuery(GET_LOCAL_FILTER)
  const filter = filterVar()
  const selected = filter[name]

  const handleChange = (value: string) => {
    if (!selected.includes(value)) {
      const newSelected = selected.length ? [...selected, value] : [value]
      filterVar({ ...filter, [name]: newSelected })
      getNewPosts()
      return
    }
    const newSelected = selected.filter((option: string) => option !== value)
    filterVar({ ...filter, [name]: newSelected })
    getNewPosts()
  }

  const handleSelectAll = (options: optionsProps[]) => {
    if (selected.length === options.length) {
      filterVar({ ...filter, [name]: [] })
      getNewPosts()
      return
    }
    filterVar({ ...filter, [name]: options.map((option) => option.slug) })
    getNewPosts()
  }

  return {
    filter: data.filter[name],
    handleChange,
    handleSelectAll,
  }
}

export default useFilter
