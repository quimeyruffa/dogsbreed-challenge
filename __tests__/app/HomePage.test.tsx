import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getBreeds, getDogsBreed } from '@/api'
import App from '@/pages/App'

jest.mock('@/api', () => ({
  getBreeds: jest.fn(),
  getDogsBreed: jest.fn()
}))
const mockedGetBreeds = getBreeds as jest.MockedFunction<typeof getBreeds>
const mockedGetDogsBreed = getDogsBreed as jest.MockedFunction<
  typeof getDogsBreed
>

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the loading spinner initially', async () => {
    const breedsData = { husky: [], labrador: [] }
    mockedGetBreeds.mockResolvedValueOnce(breedsData)
    render(<App />)
    await waitFor(() => expect(mockedGetBreeds).toHaveBeenCalledTimes(1))
    expect(screen.getByAltText('husky-loader')).toBeInTheDocument()
  })

  test('handles errors when loading breeds', async () => {
    mockedGetBreeds.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<App />)

    await waitFor(() => expect(mockedGetBreeds).toHaveBeenCalledTimes(1))
    expect(screen.getByText('Loading dog breeds')).toBeInTheDocument()
  })

  test('loads breed options when a select is open', async () => {
    const breedsData = { terrier: [], labrador: [] }
    const breedDetailsData = ['terrier']
    mockedGetBreeds.mockResolvedValueOnce(breedsData)
    mockedGetDogsBreed.mockResolvedValueOnce(breedDetailsData)

    render(<App />)

    await waitFor(() => expect(mockedGetBreeds).toHaveBeenCalledTimes(1))

    const checkPicker = screen.getByText("Search Dog's by breed")
    fireEvent.click(checkPicker)

    const option = screen.getByText('terrier')
    expect(option).toBeInTheDocument()

    fireEvent.click(option)

    const selectButton = screen.getByRole('button', { name: /Search/i })
    fireEvent.click(selectButton)

    await waitFor(() => expect(mockedGetDogsBreed).toHaveBeenCalledTimes(1))
  })
})
