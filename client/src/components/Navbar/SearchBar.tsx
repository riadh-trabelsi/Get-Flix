import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

interface SearchBarProps {
  onSearchResults: (results: any[]) => void
  currentPage: string
  apiBaseUrl: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchResults,
  currentPage,
  apiBaseUrl,
}) => {
  const [query, setQuery] = useState<string>('')

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const apiEndpoint = `${apiBaseUrl}/${currentPage}/search/${query}`

    if (!apiEndpoint) {
      console.error('Invalid current page')
      return
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()

        if (typeof onSearchResults === 'function') {
          onSearchResults(data)
        } else {
          console.error('onSearchResults is not a function')
        }
      } else {
        console.error('Error fetching data')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="custom-form search-form flex-fill me-3"
      role="search"
      id="search_form"
    >
      <div className="input-group input-group-lg">
        <input
          name="search"
          type="search"
          className="form-control searchInput"
          id="search"
          placeholder={`Search ${
            currentPage === 'homepage' ? 'films, series' : currentPage
          }`}
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="form-control searchButton" id="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  )
}

export default SearchBar
