'use client';

import type { ReactNode } from 'react';
import { festival } from '@/content/festival';
import { useRegistrationClosed } from '@/lib/registration';

/** Link to the general registration form. Disappears after the deadline (HANDOFF section 7). */
export default function RegisterLink({ className, children }: { className?: string; children: ReactNode }) {
  const closed = useRegistrationClosed();
  if (!festival.formUrl || closed) return null;
  return (
    <a className={className} href={festival.formUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
