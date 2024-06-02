interface IBreed {
    message: string[]
    status: 'success' | 'error'
  }
  
  interface IList {
    breedDetails: IBreed[]
  }

  export default IList;