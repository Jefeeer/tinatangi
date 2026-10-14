/** Keep "7 AM" and "12:00 MN" on one line: a non-breaking space between a time and its marker. */
export function nb(text: string): string {
  return text.replace(/(\d) (AM|PM|MN)\b/g, "$1 $2");
}
