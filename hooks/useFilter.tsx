import { useReactiveVar } from '@apollo/client'

import { filterVar } from '../lib/cache'
import { optionsProps } from '../models/options'

const useFilter = (name: string) => {
  const data = useReactiveVar(filterVar)
  const filter = filterVar()
  const selected = data[name]

  const handleChange = (value: string) => {
    if (!selected?.includes(value)) {
      const newSelected = selected?.length ? [...selected, value] : [value]
      filterVar({ ...filter, [name]: newSelected })
      return
    }
    const newSelected = selected?.filter((option: string) => option !== value)
    filterVar({ ...filter, [name]: newSelected })
  }

  const handleSelectAll = (options: optionsProps[]) => {
    if (selected?.length === options.length) {
      filterVar({ ...filter, [name]: [] })
      return
    }
    filterVar({ ...filter, [name]: options.map((option) => option.slug) })
  }

  return {
    filter: data[name],
    handleChange,
    handleSelectAll,
  }
}

export default useFilter
