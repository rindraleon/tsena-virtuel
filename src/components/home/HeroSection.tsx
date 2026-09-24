import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Tag, Truck, ShieldCheck, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CategoryCard {
  image: string;
  label: string;
  href: string;
}

interface HeroSectionProps {
  readonly className?: string;
}

const categoryCards: CategoryCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=500&fit=crop',
    label: 'Épicerie',
    href: '/produits',
  },
  {
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop',
    label: 'Électronique',
    href: '/produits',
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop',
    label: 'Mode',
    href: '/produits',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop',
    label: 'Beauté & Soins',
    href: '/produits',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=500&fit=crop',
    label: 'Maison',
    href: '/produits',
  },
  {
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=500&fit=crop',
    label: 'Bébé & Enfant',
    href: '/produits',
  },
];

const benefits = [
  { icon: Truck, label: 'Livraison gratuite dès 2 000 PKR' },
  { icon: ShieldCheck, label: 'Paiement 100% sécurisé' },
  { icon: Star, label: 'Produits authentiques garantis' },
];

export default function HeroSection({ className }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header
      className={cn(
        'relative w-full overflow-hidden rounded-2xl',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #0d3b2e 0%, #1a5c47 40%, #2d8a6b 100%)',
        minHeight: '480px',
      }}
      aria-label="Section héro"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #f0c040 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #f0c040 0%, transparent 70%)',
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center max-w-3xl"
          style={{ gap: '24px' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full"
          >
            <Tag size={14} className="text-accent" />
            Jusqu'à -50% sur des milliers de produits
          </motion.div>

          {/* Title */}
          <h1
            className="text-white leading-tight"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 56px)',
              letterSpacing: '-0.02em',
            }}
          >
            Tout ce dont vous avez besoin,{' '}
            <span className="text-accent">livré chez vous</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/80 max-w-xl"
            style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              lineHeight: 1.6,
            }}
          >
            Épicerie, électronique, mode, beauté, maison — des milliers de produits
            de qualité aux meilleurs prix, livrés directement à votre porte.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <Link
              to="/produits"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-primary-dark font-semibold text-base transition-all hover:scale-105 hover:shadow-lg"
            >
              <ShoppingBag size={18} />
              Découvrir nos produits
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/promotions"
              className="px-8 py-3.5 rounded-full border border-white/30 text-white font-medium text-base transition-all hover:bg-white/10 hover:scale-105"
            >
              Voir les promotions
            </Link>
          </motion.div>

          {/* Benefits row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-2"
          >
            {benefits.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-2 text-white/70 text-xs md:text-sm">
                <benefit.icon size={16} className="text-accent shrink-0" />
                <span>{benefit.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-3 mt-2"
          >
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
              ].map((avatar, i) => (
                <img
                  key={`avatar-${i}-${avatar.slice(-8)}`}
                  src={avatar}
                  alt={`Client ${i + 1}`}
                  className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                  width={36}
                  height={36}
                />
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              Rejoignez +10 000 clients satisfaits
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Category Cards Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 w-full overflow-hidden"
        style={{ paddingBottom: '24px' }}
      >
        {/* Gradient Overlays */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '80px',
            background: 'linear-gradient(90deg, #2d8a6b 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '80px',
            background: 'linear-gradient(270deg, #2d8a6b 0%, transparent 100%)',
          }}
        />

        {/* Scrolling Container */}
        <motion.div
          className="flex items-center"
          animate={{ x: [0, -(categoryCards.length * 200)] }}
          transition={{
            x: { repeat: Infinity, repeatType: 'loop', duration: categoryCards.length * 4, ease: 'linear' },
          }}
          style={{ gap: '16px', paddingLeft: '16px' }}
        >
          {[...categoryCards, ...categoryCards].map((card, index) => (
            <motion.div
              key={`${card.label}-${index}`}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={card.href} className="block relative overflow-hidden shrink-0" style={{ width: '180px', height: '220px', borderRadius: '16px' }}>
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover"
                  width={180}
                  height={220}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-semibold text-sm">{card.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  );
}
