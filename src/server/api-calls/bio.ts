export async function getBio() {
  const res = await fetch("http://localhost:3000/api/bio")
  const data = await res.json()
  return data
}

export async function updateBio(id, updateData) {
  const res = await fetch("http://localhost:3000/api/bio", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
  const data = await res.json()
  return data
}
