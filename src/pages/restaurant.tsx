import CommonResponse from "@/format/response/CommonResponse";
import PageResponse from "@/format/response/PageResponse";
import { RestaurantResponse } from "@/format/response/RestaurantResponse";
import axios from "axios";
import { error } from "console";
import { useState } from "react";

const RestaurantList = () => {
  const [error, setError] = useState("");
  const [page, setPage] = useState<PageResponse<RestaurantResponse>>();

  const fetchRestaurantList = () => {
    const token = localStorage.getItem("token");
    axios
      .get<CommonResponse<PageResponse<RestaurantResponse>>>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/restaurant`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.code === "200") {
          setPage(response.data.data);
        } else {
          throw Error(response.data.message);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError(error);
        }
      });
  };

  return (
    <div>
      <div>음식점 조회페이지</div>
      <div>
        <table></table>
      </div>
    </div>
  );
};

export default RestaurantList;
