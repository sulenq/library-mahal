import { getCookie } from "typescript-cookie";

export default function getUserDataCookie() {
  return JSON.parse(getCookie("userData") as string);
}
