import type { Metadata } from "next"
import { QuranReader } from "@/components/quran-reader"
import { LANGUAGE_MAP } from "@/lib/quran-utils"

const BASE_URL = "https://alquran-api.pages.dev"

export const metadata: Metadata = {
  title: "Demo App - Al-Quran API",
  description: "Interactive demo application showcasing the Al-Quran API capabilities",
}

async function getInitialData() {
  try {
    const [langRes, surahRes] = await Promise.all([
      fetch(`${BASE_URL}/api/quran/languages`),
      fetch(`${BASE_URL}/api/quran?lang=en`),
    ])

    const [langData, surahData]: [any, any] = await Promise.all([
      langRes.ok ? langRes.json() : null,
      surahRes.ok ? surahRes.json() : null,
    ])

    return {
      languages: langData?.languages || Object.values(LANGUAGE_MAP),
      surahs: surahData?.surahs || [],
    }
  } catch {
    return {
      languages: Object.values(LANGUAGE_MAP),
      surahs: [],
    }
  }
}

export default async function DemoPage() {
  const { languages, surahs } = await getInitialData()

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Quran Reader Demo</h1>
          <p className="text-muted-foreground">An interactive demo application powered by the Al-Quran API</p>
        </div>

        <QuranReader
          baseUrl={BASE_URL}
          initialLanguages={languages}
          initialSurahs={surahs}
        />
      </div>
    </div>
  )
}

