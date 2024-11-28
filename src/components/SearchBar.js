import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SearchBar({ onSearch }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
          navigate(`/detail/${query}`);
        }
      };
    
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };

    return (
        <SearchBarContainer onSubmit={handleSearch}>
            <SearchInput
                type="text"
                placeholder="식당 ID를 입력하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <SearchButton type="submit">검색</SearchButton>
        </SearchBarContainer>
    );
}

export default SearchBar;

const SearchBarContainer = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 4px;

    &:hover {
        background-color: #555;
    }
`;
