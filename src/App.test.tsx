import { screen } from "@testing-library/react"
import App from "./App"
import { renderWithProviders } from "./utils/test-utils"

test("App should render anime search interface", () => {
  renderWithProviders(<App />)

  // The app should render the anime search interface
  expect(screen.getByText(/Anime Search/i)).toBeInTheDocument()
})

test("App should have search functionality", () => {
  renderWithProviders(<App />)

  // Should have search input
  const searchInput = screen.getByPlaceholderText(/Search for anime/i)
  expect(searchInput).toBeInTheDocument()
})
