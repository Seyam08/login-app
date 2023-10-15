import { signal } from "@preact/signals-react";

export function setUsername(username) {
  const setUsername = signal(username);
  return setUsername;
}
