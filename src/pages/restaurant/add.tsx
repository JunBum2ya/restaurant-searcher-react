import KakaoMap from "@/component/KakaoMap";
import { Location } from "@/format/Location";
import { createRef, useEffect, useRef, useState } from "react";

const RestaurantAddPage = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 126.97722,
    longitude: 37.57861,
  });
  const [error, setError] = useState<string>("");

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

  return (
    <div>
      <div className="kakao-map-container">
        <KakaoMap
          latitude={location.latitude}
          longitude={location.longitude}
          size={{ width: "600px", hegiht: "600px" }}
          currentLocation
        />
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default RestaurantAddPage;
