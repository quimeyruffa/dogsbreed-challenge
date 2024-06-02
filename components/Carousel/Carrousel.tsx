import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import './css/embla.css'
import { ICarrousel } from '@/interfaces'

const OPTIONS: EmblaOptionsType = { loop: true }

const Carrousel: React.FC<ICarrousel> = ({slides}) => (
  <>
    <EmblaCarousel slides={slides} options={OPTIONS} />
  </>
)

export default Carrousel;