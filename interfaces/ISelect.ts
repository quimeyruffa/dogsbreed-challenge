import IBreeds from "./IBreeds";

interface ISelect{
    breeds: IBreeds;
    setBreed:(value:string[]) => void;
}

export default ISelect;