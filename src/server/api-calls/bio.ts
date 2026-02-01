export async function getBio() {
  const res = await fetch("http://localhost:3000/api/bio"); // Use full URL in a server component for internal API calls
  const data = await res.json();
  return data;
}
