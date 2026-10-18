interface LocalizedAliasOptions {
  alias?: string;
}

/**
 * GROQ fragment: i18n v5 (`language`) with v4 (`_key`) fallback, then English.
 */
export function localized(
  field: string,
  { alias = field }: LocalizedAliasOptions = {},
) {
  return `"${alias}": coalesce(
    ${field}[language == $locale][0].value,
    ${field}[_key == $locale][0].value,
    ${field}[language == "en"][0].value,
    ${field}[_key == "en"][0].value
  )`;
}
