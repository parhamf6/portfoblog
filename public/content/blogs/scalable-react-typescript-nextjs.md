

## Why scalable architecture matters

When apps grow, untyped code and mixed responsibilities create friction...

## Example: typed service layer

```ts
// services/userService.ts
export type User = { id: string; name: string };

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/user/${id}`);
  return res.json();
}
