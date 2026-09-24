import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook qui remet le scroll en haut à chaque changement de route.
 * À utiliser une seule fois au niveau global (App ou layout racine).
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}
