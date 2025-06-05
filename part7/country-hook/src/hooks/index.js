import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (name) {
      axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`).then(res => {
        setCountry({found: true, data: res.data[0]})
      })
      .catch(err => {
        setCountry({found: false})
      })
    }
  }, [name])
  return country
}