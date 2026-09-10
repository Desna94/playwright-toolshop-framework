export interface UserAddress {
  street: string;
  house_number: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface RegisterUserRequest {
  first_name: string;
  last_name: string;
  address: UserAddress;
  phone: string;
  dob: string;
  password: string;
  email: string;
}

export interface RegisteredUserResponse {
  first_name: string;
  last_name: string;
  phone: string;
  dob: string;
  email: string;
  id: string;
  created_at: string;
  address: UserAddress;
}
