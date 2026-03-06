import type { Metadata } from "next"
import dynamic from "next/dynamic"

const QuranReader = dynamic(() => import("@/components/quran-reader").then(mod => ({ default: mod.QuranReader })), {
  loading: () => <div className="h-[800px] w-full animate-pulse bg-muted rounded-lg" />,
})

export const metadata: Metadata = {
  title: "Demo App - Al-Quran API",
  description: "Interactive demo application showcasing the Al-Quran API capabilities",
}

export default function DemoPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Quran Reader Demo</h1>
          <p className="text-muted-foreground">An interactive demo application powered by the Al-Quran API</p>
        </div>

        <QuranReader baseUrl="https://alquran-api.pages.dev" />
      </div>
    </div>
  )
}

