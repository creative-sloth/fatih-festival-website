// WhatsApp click-to-chat links. Accepts numbers as the committee writes them (0812-…, +62 812 …, 62812…).
export function waNumber(raw: string) {
  const digits = raw.replace(/\D/g, '');
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
}

export function waLink(raw: string, message?: string) {
  const base = `https://wa.me/${waNumber(raw)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
