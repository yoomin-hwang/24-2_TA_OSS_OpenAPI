import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRestaurantsAPI, getRestaurantImgAPI } from "../apis/API";

function Restaurants () {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // 업종 필터 상태

    const categories = ["한식", "중국식", "일식", "경양식", "식육(숯불구이)", "냉면집", "회집", "복어취급", "호프/통닭", "패스트푸드", "제과점영업", "커피숍", "김밥(도시락)", "기타"];

    const getRestaurants = async () => {
        try {
            const res = await getRestaurantsAPI();
            // console.log(res);
            setRestaurants(res);
        } catch (err) {
            console.error(err);
        }
    };

    const getRestaurantImg = async () => {
        try {
            const res = await getRestaurantImgAPI();
            setRestaurantImages(res);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredRestaurants = selectedCategory
        ? restaurants.filter((restaurant) => restaurant.BSNS_STATM_BZCND_NM === selectedCategory)
        : restaurants;

    useEffect(() => {
        getRestaurants();
        getRestaurantImg();
    }, []);

    const getImagesForRestaurant = (id) => {
        // 해당 식당의 첫 번째 이미지를 반환
        const images = restaurantImages.filter((img) => img.RSTR_ID === id);
        return images.length > 0 ? images[0].RSTR_IMG_URL : null; // 첫 번째 이미지 URL 또는 null 반환
    };

    const handleCardClick = (id) => {
        navigate(`/detail/${id}`);
    }

    return (
        <Div>
            <FilterWrapper>
                <label>업종 선택:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">모두 보기</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </FilterWrapper>
        
            <RestWrapper>
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.RSTR_ID} onClick={() => handleCardClick(restaurant.RSTR_ID)}>
                        <ImageContainer>
                            {getImagesForRestaurant(restaurant.RSTR_ID) ? (
                                <img
                                    src={getImagesForRestaurant(restaurant.RSTR_ID)}
                                    alt={`${restaurant.RSTR_NM} 이미지`}
                                />
                            ) : (
                                <p>이미지가 없습니다.</p>
                            )}
                        </ImageContainer>
                        <br></br>
                        <h2>{restaurant.RSTR_NM}</h2>
                        <p><strong>식당 ID:</strong> {restaurant.RSTR_ID}</p>
                        <p><strong>주소:</strong> {restaurant.RSTR_RDNMADR}</p>
                        <p><strong>전화번호:</strong> {restaurant.RSTR_TELNO}</p>
                        <p><strong>업종:</strong> {restaurant.BSNS_STATM_BZCND_NM}</p>
                        <p>{restaurant.RSTR_INTRCN_CONT}</p>
                    </RestaurantCard>
                ))}
            </RestWrapper>
        </Div>
    );
}

export default Restaurants;

const Div = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
`

const RestWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.5rem;
`;

const RestaurantCard = styled.div`
width: 18rem;
border: 1px solid #ccc;
border-radius: 8px;
background-color: #fff;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
margin: 0.5rem;
padding: 1rem;

h2 {
    margin-top: 0;
    font-size: 20px;
}

p {
    margin: 5px 0;
    color: #555;
}
`;

const ImageContainer = styled.div`
img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

p {
    text-align: center;
    color: #696969;
    height: 11rem;
}
`;

const FilterWrapper = styled.div`
    margin: 1rem;
    display: flex;
    gap: 10px;
    align-items: center;

    label {
        font-size: 16px;
        font-weight: bold;
    }

    select {
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
`;