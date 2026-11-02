const isPrimitive = (value: unknown) => value === null || typeof value !== "object";

/**
 * Igual que JSON.stringify(value, null, 2) pero deja en una sola línea los objetos
 * que solo tienen valores simples (partidos, jugadores), como los JSON escritos a mano.
 */
export function formatJson(value: unknown): string {
  return format(value, 0) + "\n";
}

function format(value: unknown, indent: number): string {
  if (isPrimitive(value)) return JSON.stringify(value);

  const pad = "  ".repeat(indent + 1);
  const end = "  ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((v) => pad + format(v, indent + 1)).join(",\n")}\n${end}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) return "{}";
  if (entries.every(([, v]) => isPrimitive(v))) {
    return `{ ${entries.map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(", ")} }`;
  }
  return `{\n${entries
    .map(([k, v]) => `${pad}${JSON.stringify(k)}: ${format(v, indent + 1)}`)
    .join(",\n")}\n${end}}`;
}
