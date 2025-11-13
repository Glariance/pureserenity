import { useState } from 'react';
import {
  Package,
  Sparkles,
  Gift,
  Truck,
  ShieldCheck,
  ArrowRight,
  ShoppingBagIcon,
} from 'lucide-react';
import { categories, products } from '../data/products';

export default function Shop() {
  const heroBanner = {
    title: 'Shop Pure Serenity',
    subtitle: 'Discover curated rituals, calming essentials, and mindful luxuries selected to elevate your everyday.',
    image: 'assets/images/banner2.jpg'
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category_id === selectedCategory);

  const editorPicks = [
    {
      title: 'Gentle Mornings',
      description: 'Matcha starter kits, sunrise lamps, and guided journals to greet the day with clarity.',
      image: 'assets/images/ritual1.jpg',
      link: '#'
    },
    {
      title: 'Rest Rituals',
      description: 'Lavender pillow sprays, sound bath playlists, and plush throws for instant calm.',
      image: 'assets/images/ritual2.jpg',
      link: '#'
    },
    {
      title: 'Mindful Movement',
      description: 'Yoga props, recovery balms, and hydration essentials for nourishing workouts.',
      image: 'assets/images/ritual3.jpg',
      link: '#'
    }
  ];

  const perks = [
    {
      icon: Sparkles,
      title: 'Curated Quality',
      detail: 'Every product is hand-tested by our ritual lab before it reaches the shop.'
    },
    {
      icon: Gift,
      title: 'Bundle & Save',
      detail: 'Look for collection badges to unlock exclusive affiliate bundle pricing.'
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      detail: 'Prime-eligible picks get to your door in as few as two days.'
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Partners',
      detail: 'We only partner with brands committed to ethical and sustainable practices.'
    }
  ];

  const lookbook = [
    {
      title: 'Desk Reset',
      description: 'Diffusers, soft lighting, and posture-friendly seating for mindful workdays.',
      image: 'assets/images/lookbook1.jpg'
    },
    {
      title: 'Soothing Glow',
      description: 'Himalayan salt lamps and candle warmers for gentle, cozy ambiance.',
      image: 'assets/images/lookbook2.jpg'
    },
    {
      title: 'Weekend Retreat',
      description: 'Packable yoga mats, travel teas, and journals for unplugged getaways.',
      image: 'assets/images/lookbook3.jpg'
    },
    {
      title: 'Bath Sanctuary',
      description: 'Mineral soaks, bath caddies, and waterproof speakers for elevated self-care.',
      image: 'assets/images/lookbook4.jpg'
    }
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
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">Curated Marketplace</p>
          <h1 className="text-4xl font-bold text-gray-900">{heroBanner.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {heroBanner.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Featured Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of wellness products
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
            All Products
          </button>
          {categories.map((category) => (
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

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600">
              We're adding amazing products to this category. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-[#DC2E7C] mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <a
                    href={product.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 group-hover:shadow-lg"
                  >
                    Shop Now
                    <ShoppingBagIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="mt-16">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Editor Spotlights</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ritual edits to guide your cart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lean on our stylists for a polished selection. Each edit features well-loved products paired with new discoveries.
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
            <div className="flex flex-col items-center text-center gap-10 mb-12">
              <div className="max-w-2xl mx-auto">
                <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Pure Serenity Perks</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Shop confidently with rituals that last
                </h2>
                <p className="text-lg text-gray-600">
                  We remove the guesswork so your wellness investments genuinely support a calmer life.
                </p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Style your space with sensory cues
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Borrow ideas from our community studio to layer textures, lighting, and gentle sound into your sanctuary.
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
          <p className="text-sm text-gray-600">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </div>
  );
}

