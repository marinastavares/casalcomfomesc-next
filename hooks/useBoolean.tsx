import { useState, useCallback } from 'react'

const useBoolean = (initialState: boolean) => {
  const [boolean, setBoolean] = useState(initialState || false)

  const handleBoolean = useCallback(() => {
    setBoolean((prevState) => !prevState)
  }, [])

  return [boolean, handleBoolean, setBoolean]
}

export default useBoolean
