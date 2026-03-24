import { useState, useEffect } from "react"
import { Button } from "./shadcn/button"
import { Card, CardContent } from "./shadcn/card"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

const CloudinaryPDFPreview = ({ cloudinary_id }: { cloudinary_id: string }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  const pdfUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${cloudinary_id}.pdf`

  const getPageUrl = (page: number) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/pg_${page}/${cloudinary_id}.jpg`

  // Whenever currentPage changes, probe whether the next page exists
  useEffect(() => {
    setTotalPages(null) // unknown until probe completes

    const probe = new Image()
    probe.src = getPageUrl(currentPage + 1)

    probe.onload = () => {
      // Next page exists — we don't yet know the true max, just unblock Next
      setTotalPages((prev) =>
        prev === null ? currentPage + 1 : Math.max(prev, currentPage + 1)
      )
    }
    probe.onerror = () => {
      // Next page doesn't exist — current page is the last one
      setTotalPages(currentPage)
    }

    return () => {
      probe.onload = null
      probe.onerror = null
    }
  }, [currentPage, cloudinary_id])

  const isNextDisabled = totalPages !== null && currentPage >= totalPages

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardContent className="p-2">
          <img
            key={currentPage}
            src={getPageUrl(currentPage)}
            alt={`Page ${currentPage}`}
            className="w-full"
          />
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage}
          {totalPages !== null ? ` of ${totalPages}` : ""}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={isNextDisabled}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="link" size="sm" className="self-end" asChild>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          Open in new tab
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </Button>
    </div>
  )
}

export default CloudinaryPDFPreview
