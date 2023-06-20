import { useEffect, useState } from 'react'

function useDebouncedValue(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if (!value) {
      setDebouncedValue('')
      return
    }
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, 700)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  return debouncedValue
}

export default useDebouncedValue
