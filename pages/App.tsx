'use client'


import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import husky from '../img/husky.png'
import petLogo from '../img/petLogo.png'
import { IBreeds, IErrorState } from '@/interfaces'
import { getBreeds, getDogsBreed } from '@/api'
import { Error, List, Select } from '@/components'

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
  const [breeds, setBreeds] = useState<IBreeds>({})
  const [breed, setBreed] = useState<string[]>()
  const [breedDetails, setBreedDetails] = useState<any>()
  const [error, setError] = useState<IErrorState['error']>(null)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (breed && breed?.length > 0) {
          setIsLoadingData(true)

          const breedsData = await getDogsBreed(breed)
          setBreedDetails(breedsData)
          setIsLoadingData(false)
        }
      } catch (error) {
        setIsLoadingData(false)

        setError('Loading dog breeds')
      }
    }

    fetchData()

    return () => {
      setBreedDetails(null)
      setError(null)
      setIsLoadingData(false)
    }
  }, [breed])

  useEffect(() => {
    getBreeds()
      .then((breedsData) => {
        setBreeds(breedsData)
      })
      .catch(() => {
        setError('Loading dog breeds')
      })

    return () => {
      setBreeds({})
      setError(null)
    }
  }, [])

  return (

    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-hidden absolute flex justify-center items-center w-full h-full"
        >
          <Image src={petLogo} alt="husky-loader" className="m-5 animate-spin-slow" />
        </motion.div>
      )}

      <motion.section
        transition={{ duration: 1.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ display: isLoaded ? '' : 'hidden' }}
        className="grid grid-cols-12 relative h-screen bg-custom-gradient lg:overflow-hidden sm:overflow-scroll"
      >
        {/* Logo Column */}
        <div className="col-span-12 sm:col-span-2 lg:col-span-1 flex justify-center items-start">
          <Image src={petLogo} alt="husky" className="m-5" />
        </div>

        {/* Main Content Column */}
        <div className="col-span-12 sm:col-span-10 lg:col-span-6 mt-24 items-start m-4 flex-col overflow-y-auto scrollbar-custom">
          <p className="text-white text-5xl font-limelight mb-4">
            Where Bonds Find Home.
          </p>
          <p className="text-white text-2xl font-limelight mb-4">
            Embrace unconditional love, where bonds blossom and hearts connect.
          </p>
          <Select breeds={breeds} setBreed={setBreed} />
          {error && <Error error={error} />}
          {isLoadingData ? (
            <Image
              src={petLogo}
              alt="husky"
              className="m-3 animate-spin-slow"
            />
          ) : (
            <List breedDetails={breedDetails} />
          )}
        </div>

        {/* Image Column */}
        <div className="col-span-12 lg:col-span-5 relative ">
          <Image
            src={husky}
            alt="husky"
            onLoad={handleImageLoad}
            className="absolute bottom-0 right-0 h-full object-contain"
          />
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default App
