import { Profile } from "./fitness/profile";

export type LoginResponse = {
  token: string|null;
  refresh_token: string|null;
  profile: Profile;
}