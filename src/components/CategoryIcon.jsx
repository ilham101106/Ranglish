import React from "react";
import { BookOpen, MessageSquare, Film, Music, Sparkles } from "lucide-react";

/**
 * Clean, consistent Lucide line icons for vocabulary category classifications
 * Replaces old raw string emojis with crisp SVG vector icons.
 */
export default function CategoryIcon({ type, className = "w-3.5 h-3.5 shrink-0" }) {
  switch (type) {
    case "word":
      return <BookOpen className={className} />;
    case "phrase":
      return <MessageSquare className={className} />;
    case "movie":
      return <Film className={className} />;
    case "song":
      return <Music className={className} />;
    case "sentence":
    default:
      return <Sparkles className={className} />;
  }
}
