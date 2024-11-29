import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getRestaurantImgAPI, getRestaurantsAPI } from "../apis/API";

function DetailPage() {
    const { id } = useParams(); // URL에서 id 가져오기
    const [restaurant, setRestaurant] = useState();
    const [restImage, setRestImage] = useState([]);

    const fetchRestaurant = useCallback(async () => {
        try {
            // 식당 정보 가져오기
            const res = await getRestaurantsAPI();
            const restaurantDetail = res.find((r) => r.RSTR_ID.toString() === id);
            setRestaurant(restaurantDetail);
        } catch (err) {
            console.error(err);
        }
    }, [id]);

    const fetchImage = useCallback(async () => {
        const res = await getRestaurantImgAPI();
        if (res) { // ires가 undefined가 아닐 경우에만 filter 사용
            const images = res.filter((img) => img.RSTR_ID.toString() === id);
            // console.log(images);
            setRestImage(images);
        } else {
            console.error("Image data is undefined or empty.");
        }
    }, [id]);

    useEffect(() => {
        fetchRestaurant();
        fetchImage();
    }, [fetchRestaurant, fetchImage]); 

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <DetailWrapper>
            <Info>
                <h1>{restaurant.RSTR_NM}</h1>
                <p><strong>식당 ID:</strong> {restaurant.RSTR_ID}</p>
                <p>주소: {restaurant.RSTR_RDNMADR}</p>
                <p>전화번호: {restaurant.RSTR_TELNO}</p>
                <p>업종: {restaurant.BSNS_STATM_BZCND_NM}</p>
                <p>{restaurant.RSTR_INTRCN_CONT}</p>
            </Info>
            <ImgContainer>
                {restImage.map((i, index) => (
                    <Img key={index} src={i.RSTR_IMG_URL} alt={`${restaurant.RSTR_NM} 이미지`} />
                ))}
            </ImgContainer>
        </DetailWrapper>
    );
}

export default DetailPage;

const DetailWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-start;
min-height: 90vh;
height: 100%;
`;

const Info = styled.div`
background-color: #F1E1A9;
width: 30rem;
border-radius: 20px;
padding: 1rem;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
margin: 3rem;
`

const ImgContainer = styled.div`
display: flex;
flex-direction: column;

height: 100%;
margin: 3rem;
`

const Img = styled.img`
width: 30rem;
border-radius: 8px;
margin: 0.5rem;
`;