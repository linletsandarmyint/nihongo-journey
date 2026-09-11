import { useProfile } from "./useProfile";
import { translations, type Language } from "../../data/translations";

export function useTranslation() {
  const { profile } = useProfile();

  const language: Language =
    profile?.language === "Myanmar" ? "Myanmar" : "English";

  return {
    language,
    t: translations[language],
  };
}
