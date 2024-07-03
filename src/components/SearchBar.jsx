import React, { useState } from "react";
import "./SearchBar.css";
import { Stack , Box, TextField} from "@mui/material";

const SearchBar = ({ searchCity }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    searchCity(search);
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=5738b405e0fe41ef971200146240107&q=${value}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() !== "") {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name); // Assuming suggestion has a 'name' property
    setSuggestions([]);
    searchCity(suggestion.name);
  };

  return (
    <div className="search-container">
      <Stack>
        <Stack direction='row'>
      <TextField
        sx={{
          width : {xs : '300px', xl : '800px'}
        }}
        className="input-search"
        placeholder="Search for city"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="s-btn" onClick={handleSearch}>
        Search
      </button>
      </Stack>
      {suggestions.length > 0 && (
        <Stack>
          {suggestions.map((suggestion, index) => (
            <li key={index} style={{
              listStyleType : 'none'
            }}>
              <Box 

                onClick={() => handleSuggestionClick(suggestion)} 
                height='55px'
                border='1px solid'
                borderTop='0px'
                sx={{
                  fontSize : '24px',
                  backgroundColor : '#ff45',
                  borderRadius : '1px',
                  cursor : 'pointer'
                }}
              >  {suggestion.name}</Box>
            
            </li>
          ))}
        </Stack>
      )}
      </Stack>
    </div>
  );
};

export default SearchBar;
