import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmblaCarousel from '@/components/Carousel/EmblaCarousel'


jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn(() => [jest.fn(), { on: jest.fn(), plugins: jest.fn() }])
}))

jest.mock('embla-carousel-auto-scroll', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    play: jest.fn(),
    stop: jest.fn(),
    isPlaying: jest.fn(() => false),
    options: { stopOnInteraction: false },
    reset: jest.fn()
  }))
}))

jest.mock('@/components/Carousel//EmblaCarouselArrowButtons', () => ({
  __esModule: true,
  NextButton: jest.fn((props) => <button {...props}>Next</button>),
  PrevButton: jest.fn((props) => <button {...props}>Prev</button>),
  usePrevNextButtons: jest.fn(() => ({
    prevBtnDisabled: false,
    nextBtnDisabled: false,
    onPrevButtonClick: jest.fn(),
    onNextButtonClick: jest.fn()
  }))
}))

describe('EmblaCarousel Component', () => {
  const slides = ['/img1.jpg', '/img2.jpg', '/img3.jpg']

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders carousel with slides', () => {
    render(<EmblaCarousel slides={slides} options={{ loop: true }} />)

    slides.forEach((slide, index) => {
      expect(screen.getByAltText(`${index}-breed`)).toBeInTheDocument()
    })
  })

})
