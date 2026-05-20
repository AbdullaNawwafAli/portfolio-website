export async function convertToBase64(file: File) {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject

    reader.readAsDataURL(file)
  })
  return base64
}
