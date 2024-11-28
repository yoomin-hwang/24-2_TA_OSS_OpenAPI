import { Link, Outlet } from "react-router-dom";
import SearchBar from './SearchBar';
import styled from "styled-components";

export const Header = () => {
    return (
        <div>
            <HeaderWrapper>
                <StyledLink to="/">
                    <Logo>먹자 여행 ~.~</Logo>
                </StyledLink>
                <SearchBar />
            </HeaderWrapper>
            <Outlet />
        </div>
    );
};

const HeaderWrapper = styled.div`
width: 100vw;
height: 5rem;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
background-color: #F8DD68;
`

const Logo = styled.div`
font-size: 2rem;

`

const StyledLink = styled(Link)`
    text-decoration: none;  // 밑줄 제거
    color: inherit;         // 링크 색상 제거 (부모 컴포넌트의 색상을 상속)
`;