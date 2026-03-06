import useSWR from "swr"
import type { Language } from "@/lib/quran-utils"

const FALLBACK_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
]

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
      return res.json()
    })
    .then((data: any) => data.languages as Language[])

export function useLanguages(baseUrl?: string) {
  const url = baseUrl
    ? `${baseUrl}/api/quran/languages`
    : "/api/quran/languages"

  const { data, error, isLoading } = useSWR(url, fetcher, {
    fallbackData: undefined,
    revalidateOnFocus: false,
  })

  return {
    languages: data || FALLBACK_LANGUAGES,
    isLoading,
    error,
  }
}
