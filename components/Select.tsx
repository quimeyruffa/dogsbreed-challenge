import { ISelect } from '@/interfaces'
import { useEffect, useMemo, useState } from 'react'
import { CheckPicker } from 'rsuite'

const Select: React.FC<ISelect> = ({ breeds, setBreed }) => {
  const [valueSearch, setValueSearch] = useState<any>('')
  const [arrayBreeds, setArrayBreeds] = useState<
    { breed: string; name: string }[]
  >([])

  const data = useMemo(
    () =>
      arrayBreeds?.map((breed) => {
        const breeds = breed.breed.toUpperCase()
        return { breeds, ...breed }
      }),
    [arrayBreeds]
  )

  useEffect(() => {
    const newArrayBreeds: { breed: string; name: string; id: string }[] = []
    for (const breed in breeds) {
      newArrayBreeds.push({ breed, name: breed, id: breed})
      breeds[breed].forEach((name) => {
        newArrayBreeds.push({ breed, name, id: breed + '+' + name })
      })
    }
    setArrayBreeds(newArrayBreeds)
    return () => {
      setValueSearch('')
      setArrayBreeds([])
    }
  }, [breeds])

  return (
    <div className="mt-4">
      <CheckPicker
        onChange={(e) => setValueSearch(e)}
        placeholder="Search Dog's by breed"
        data={data}
        groupBy="breeds"
        labelKey="name"
        valueKey="id"
        style={{ width: '80%' }}
      />
      <button
        className="bg-[#F9A418] text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => setBreed(valueSearch)}
      >
        Search
      </button>
    </div>
  )
}

export default Select
