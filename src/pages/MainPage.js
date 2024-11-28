import styled from "styled-components";
import Restaurants from "../components/Restaurants";

function MainPage () {
    return (
        <MainWrapper>
            <Restaurants />
        </MainWrapper>
    );
}

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.5rem;
`;
