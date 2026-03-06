"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useLanguages } from "@/hooks/use-languages"

export function LanguageShowcase() {
  const { languages, isLoading } = useLanguages("https://alquran-api.pages.dev")

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {languages.map((language, index) => (
        <motion.div
          key={language.code}
          className="flex flex-col items-center justify-center p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-lg font-medium mb-1">{language.name}</h3>
          <p className={`text-xl mb-2 ${language.direction === "rtl" ? "font-arabic" : ""}`}>{language.nativeName}</p>
          <Badge variant={language.direction === "rtl" ? "secondary" : "outline"}>
            {language.direction === "rtl" ? "RTL" : "LTR"}
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}

