import Script from "next/script";
import { createRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = (props: KakaoMapProps) => {
  const { latitude, longitude, size, currentLocation, onClick } = props;
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_API_KEY}&autoload=false`;

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{
          lat: props.latitude,
          lng: props.longitude,
        }}
        style={{
          width: props.size?.width ?? "100%",
          height: props.size?.hegiht ?? "100%",
        }}
        onClick={(_, e: kakao.maps.event.MouseEvent) => {
          if (onClick) {
            onClick({
              latitude: e.latLng.getLat(),
              longitude: e.latLng.getLng(),
            });
          }
        }}
      >
        {props.currentLocation && (
          <MapMarker
            position={{ lat: props.latitude, lng: props.longitude }}
          ></MapMarker>
        )}
      </Map>
    </>
  );
};

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  size?: {
    width?: string;
    hegiht?: string;
  };
  currentLocation?: boolean;
  onClick?: (e: MapClickEvent) => void;
}

export interface MapClickEvent {
  latitude: number;
  longitude: number;
}

export default KakaoMap;
