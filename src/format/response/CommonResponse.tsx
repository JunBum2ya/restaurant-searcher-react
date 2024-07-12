interface CommonResponse<T> {
  code: string;
  message: string;
  data?: T;
}

export default CommonResponse;
