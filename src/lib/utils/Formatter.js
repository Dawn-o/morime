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

export function formatEstablished(established) {
  if (!established) return null;

  const date = new Date(established);
  const currentYear = new Date().getFullYear();

  if (isNaN(date.getTime())) {
    if (/^\d{4}$/.test(established)) {
      return `Est. ${established}`;
    }
    return `Est. ${established}`;
  }

  const establishedYear = date.getFullYear();
  const yearsDiff = currentYear - establishedYear;

  if (yearsDiff === 0) {
    return `Est. this year`;
  }

  if (yearsDiff === 1) {
    return `Est. last year`;
  } else if (yearsDiff > 1) {
    return `Est. ${yearsDiff} years ago (${establishedYear})`;
  }

  return `Est. ${establishedYear}`;
}

export function formatEstablishedDate(established) {
  if (!established) return null;

  const date = new Date(established);

  if (isNaN(date.getTime())) {
    if (/^\d{4}$/.test(established)) {
      return `Est. ${established}`;
    }
    return `Est. ${established}`;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}