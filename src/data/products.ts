// Les produits de la vente flash sont maintenant filtrés depuis mockProducts
// pour garantir que les IDs correspondent aux pages de détail
import { mockProducts } from '../shared/data/mockData';

export const flashSaleProducts = mockProducts
  .filter((p) => p.discount && p.discount > 0 && p.status === 'active')
  .slice(0, 6)
  .map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    price: p.price,
    oldPrice: p.oldPrice,
    discount: p.discount,
    rating: p.rating,
    reviews: p.reviews,
    variant: p.variant,
  }));
