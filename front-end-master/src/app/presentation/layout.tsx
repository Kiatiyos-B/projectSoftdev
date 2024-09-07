'use client'

import { ReactNode } from 'react'
import { PresentationProvider } from './presentationContext'

export default function PresentationLayout({ children }: { children: ReactNode }) {
  return <PresentationProvider>{children}</PresentationProvider>
}
