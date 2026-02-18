export async function getBio() {
  const res = await fetch("http://localhost:3000/api/bio")
  const data = await res.json()
  return data
}
