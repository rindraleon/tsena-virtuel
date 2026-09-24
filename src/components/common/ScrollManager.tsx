import { useScrollToTop } from '../../hooks';
import BackToTop from './BackToTop';

/**
 * Composant global qui gère le scroll et le bouton retour en haut.
 * À placer une seule fois dans l'application, à l'intérieur du Router.
 */
export default function ScrollManager() {
  useScrollToTop();
  return <BackToTop />;
}
