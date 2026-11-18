export function formatPublicationDate(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Saigon",
  }).format(new Date(`${value}T00:00:00+07:00`));
}
