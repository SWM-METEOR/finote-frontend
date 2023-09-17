export default interface LoginType {
  email: string;
  password: string;
}

export default interface AdditionalInfoType {
  profileImageUrl: string;
  nickname: string;
  blogName: string;
}

export default interface SignUpType {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
