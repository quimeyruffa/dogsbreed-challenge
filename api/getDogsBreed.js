import { fetchWithConcurrency } from '@/utils'

const getDogsBreed = async (breeds) => {

  const endpoints = breeds.map((breed) => {
    if (breed.includes('+')) {
      return `https://dog.ceo/api/breed/${breed.split('+')[0]}/${
        breed.split('+')[1]
      }/images`
    }
    return `https://dog.ceo/api/breed/${breed}/images`
  })

  const res = fetchWithConcurrency(endpoints)
    .then((results) => {
      const errors = results?.every((item) => item['status'] === 'error')
      if (errors) {
        throw new Error('Error')
      }
      return results
    })
    .catch((error) => {
      throw new Error('Error: ', error)
    })

  return res
}

export default getDogsBreed
