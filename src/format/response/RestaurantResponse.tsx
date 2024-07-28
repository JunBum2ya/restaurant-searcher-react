export interface RestaurantResponse {
  id: number;
  name: string;
  address: string;
  roadAddressName: string;
  majorCategory?: string;
  minorCategory?: string;
  phoneNumber: String;
  websiteUrl: String;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}
