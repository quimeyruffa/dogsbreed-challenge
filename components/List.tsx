import { IList, IRow } from '@/interfaces'
import { Carrousel } from './Carousel'

const Row: React.FC<IRow> = ({ breeds }) => {
  return (
    <>
      <Carrousel slides={breeds} />
    </>
  )
}

const List: React.FC<IList> = ({ breedDetails }) => {
  const filteredBreeds = breedDetails?.filter(
    (breeds) => breeds?.status === 'success'
  )
  return (
    <>
      {filteredBreeds?.map((breeds, index) => (
        <Row breeds={breeds?.message} key={index + '-' + breeds} />
      ))}
    </>
  )
}
export default List
