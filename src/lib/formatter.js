export function toSnakeCase(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_");
}

export function toCamelCase(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}