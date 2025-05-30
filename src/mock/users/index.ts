
import { MockUserProfile } from "../users/types";
import { regularUsers } from "./regularUsers";
import { celebrityUsers } from "./celebrityUsers";

export const mockUsers: MockUserProfile[] = [
  ...regularUsers,
  ...celebrityUsers
];

export * from "./types";
