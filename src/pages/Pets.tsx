import { useState, useCallback } from 'react';
import { PawPrint, Moon, Heart, ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { petCategories, petProducts } from '../data/petProducts';

export default function Pets() {
  const heroBanner = {
    title: 'Happy Pets, Calmer Homes',
    subtitle: 'Shop trusted essentials for your furry family grooming, calming, toys, and cleaning products.',
    image: 'assets/images/pets-hero-banner.jpg',
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const handleScrollToCollections = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const target = document.getElementById('pet-featured-collections');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? petProducts
      : petProducts.filter((product) => product.category_id === selectedCategory);

  const editorPicks = [
    {
      title: 'Spa Day Grooming Cart',
      description: 'Pair gentle cleansers with bamboo brushes and paw balms for a shiny, relaxed coat.',
      image: 'assets/images/pets-grooming-cart.jpg',
      link: '#',
    },
    {
      title: 'Travel Calm Kit',
      description: 'Prep for road trips with calming wraps, scent sprays, and a collapsible travel bowl.',
      image: 'assets/images/kitty.jpg',
      link: '#',
    },
    {
      title: 'Mindful Play Nook',
      description: 'Designate a play space with enrichment mats, soft chews, and low-sensory lighting.',
      image: 'assets/images/pets-memory-foam-bed.jpg',
      link: '#',
    },
  ];

  const perks = [
    {
      icon: PawPrint,
      title: 'Pet-Tested Picks',
      detail: 'All items are reviewed with trainers and groomers for comfort and long-term safety.',
    },
    {
      icon: Moon,
      title: 'Calm-First Philosophy',
      detail: 'Products are selected to soften stressful transitions, from grooming sessions to travel days.',
    },
    {
      icon: Heart,
      title: 'Holistic Wellness',
      detail: 'We pair supplements with routines and accessories that support mind-body balance.',
    },
    {
      icon: ShieldCheck,
      title: 'Ethical Partners',
      detail: 'Brands align with cruelty-free standards and transparent ingredient lists.',
    },
  ];

  const lookbook = [
    {
      title: 'Rainy Day Reset',
      description: 'Set out a snuffle mat near a diffuser to channel energy on stormy afternoons.',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Sun-Dappled Nap Spot',
      description: 'Layer a memory foam bed with a weighted wrap for grounded, daytime snoozes.',
      image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Travel-Ready Corner',
      description: 'Keep carriers, harnesses, and calming sprays ready to grab-and-go near the door.',
      image: 'assets/images/pets-travel-ready-corner.jpg',
    },
    {
      title: 'Playful Evening Ritual',
      description: 'Wrap fetch sessions with a calming chew and gentle brushing for bonding time.',
      image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#d5c0fa]">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBanner.image}
          alt={heroBanner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/80 to-[#d5c0fa]/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">Pure Serenity Pet Essentials</p>
          <h1 className="text-4xl font-bold text-gray-900">{heroBanner.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{heroBanner.subtitle}</p>
          <div className="pt-2">
            <button
              onClick={handleScrollToCollections}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg"
            >
              Shop Now
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section
        id="pet-featured-collections"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20"
      >
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Featured Pet Collections</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intentional grooming, calming, and play essentials selected to nurture serene routines.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-50 shadow-sm'
            }`}
          >
            All categories
          </button>
          {petCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-purple-50 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.featured && (
                  <span className="absolute top-4 left-4 px-4 py-1 bg-purple-600 text-white text-xs uppercase tracking-[0.3em] rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-500 mb-2">
                    {petCategories.find((category) => category.id === product.category_id)?.name}
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{product.description}</p>
                <div className="flex justify-center">
                  <a
                    href={product.affiliate_link}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300"
                  >
                    Shop Now
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Pet Ritual Guides</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stylists-curated pet edits</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build a soothing pet routine with curated bundles tested in our calm climate studio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorPicks.map((pick, index) => (
              <article
                key={pick.title}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{pick.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{pick.description}</p>
                  <a
                    href={pick.link}
                    className="inline-flex items-center gap-2 text-[#DC2E7C] font-semibold hover:text-[#b82066] transition-colors"
                  >
                    Shop the edit
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl shadow-2xl px-8 py-12 relative overflow-hidden bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#e4c6f8]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
              <div className="max-w-2xl">
                <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Serenity Perks</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Care with confidence</h2>
                <p className="text-lg text-gray-600">
                  From daily brushes to enrichment toys, each recommendation is evaluated for long-term wellbeing.
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300"
                >
                  See all pet finds
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {perks.map((perk) => (
                <div key={perk.title} className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#DC2E7C] flex items-center justify-center shrink-0">
                    <perk.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{perk.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{perk.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Lookbook</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Design a serene pet sanctuary</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore layered textures, calming lighting, and playful accents to anchor daily routines.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lookbook.map((scene) => (
              <div key={scene.title} className="group relative overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold">{scene.title}</h3>
                  <p className="text-sm text-purple-100 mt-2 leading-relaxed">{scene.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600">As an Amazon Associate, we earn from qualifying purchases.</p>
        </div>
      </section>
    </div>
  );
}
