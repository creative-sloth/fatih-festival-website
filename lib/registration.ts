import { useEffect, useState } from 'react';
import { festival } from '@/content/festival';

/** True once the shared registration deadline has passed (checked in the visitor's browser, so a static
 *  build never shows a stale "open" state). Starts false so the exported HTML always has the buttons. */
export function useRegistrationClosed(): boolean {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    if (!festival.registrationCloses) return;
    const end = new Date(festival.registrationCloses).getTime();
    const check = () => setClosed(Date.now() > end);
    check();
    const id = window.setInterval(check, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return closed;
}
