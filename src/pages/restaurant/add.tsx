import KakaoMap, { MapClickEvent } from "@/component/KakaoMap";
import { Location } from "@/format/Location";
import CommonResponse from "@/format/response/CommonResponse";
import { RestaurantResponse } from "@/format/response/RestaurantResponse";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const RestaurantAddPage = () => {
  const router = useRouter();

  const [latitude, setLatitude] = useState<number | null>();
  const [longitude, setLongitude] = useState<number | null>();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [roadAddressName, setRoadAddressName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [location, setLocation] = useState<Location>({
    latitude: 126.97722,
    longitude: 37.57861,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => setError("위치정보를 불러오는 데 실패하였습니다.")
      );
    } else {
      setError("위치 정보가 지원되지 않는 브라우저입니다.");
    }
  }, [location]);

  const handleClickEvent = (e: MapClickEvent) => {
    setLatitude(e.latitude);
    setLongitude(e.longitude);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post<CommonResponse<RestaurantResponse>>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/restaurant`,
        {
          name: name,
          address: address,
          roadAddressName: roadAddressName,
          majorCategory: null,
          minorCategory: null,
          phoneNumber: phoneNumber,
          websiteUrl: websiteUrl,
          latitude: latitude,
          longitude: longitude,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.code === "200") {
          router.push("/restaurant");
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        }
      });
  };

  return (
    <div>
      <div className="kakao-map-container">
        <KakaoMap
          latitude={location.latitude}
          longitude={location.longitude}
          size={{ width: "600px", hegiht: "600px" }}
          currentLocation
          onClick={handleClickEvent}
        />
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>위도</label>
            <input
              type="number"
              value={longitude ?? 0}
              onChange={(e) => setLongitude(Number(e.target.value))}
            />
          </div>
          <div>
            <label>경도</label>
            <input
              type="number"
              value={latitude ?? 0}
              onChange={(e) => setLatitude(Number(e.target.value))}
            />
          </div>
          <div>
            <label>이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <DaumPostcodeEmbed
              onComplete={(e) => {
                setAddress(e.address);
                setRoadAddressName(e.roadAddress);
              }}
            />
          </div>
          <div>
            <label>주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>도로명 주소</label>
            <input
              type="text"
              value={roadAddressName}
              onChange={(e) => setRoadAddressName(e.target.value)}
            />
          </div>
          <div>
            <label>연락처</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label>사이트 주소</label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantAddPage;
