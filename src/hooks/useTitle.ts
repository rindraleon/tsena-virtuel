import { useEffect } from 'react';

export const APP_NAME = 'Tsena';

/**
 * Hook qui définit le titre de la page dans l'onglet du navigateur.
 * Format : "[titre] | Tsena"
 * 
 * @param title - Le titre spécifique de la page (en français)
 */
export default function useTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
