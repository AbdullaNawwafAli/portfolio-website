"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getQueryClient } from "../utils/getQueryClient"

interface QueryProviderProps {
  children: React.ReactNode
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  //TODO: Remove react query dev tools
  const [queryClient] = useState(getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
