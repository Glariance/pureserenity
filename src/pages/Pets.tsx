import { useState, useCallback, useEffect, useMemo } from 'react';
import { PawPrint, Moon, Heart, ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import showToast from '../lib/toast';

export default function Pets() {
  const [heroLabel, setHeroLabel] = useState('Pure Serenity Pet Essentials');
  const [heroTitle, setHeroTitle] = useState('Happy Pets, Calmer Homes');
  const [heroSubtitle, setHeroSubtitle] = useState(
    'Shop trusted essentials for your furry family grooming, calming, toys, and cleaning products.',
  );
  const [heroImage, setHeroImage] = useState('assets/images/pets-hero-banner.jpg');

  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const handleScrollToCollections = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const target = document.getElementById('pet-featured-collections');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const [categories, setCategories] = useState<Array<{ id: number; name: string; parent_id?: number | null; slug?: string }>>([]);
  const [products, setProducts] = useState<
    Array<{
      id: number;
      category_id: number;
      name: string;
      description: string | null;
      image_url: string | null;
      affiliate_link?: string | null;
      amazon_link?: string | null;
      created_at?: string | null;
      featured?: boolean;
    }>
  >([]);
  const [featuredHeading, setFeaturedHeading] = useState('Featured Pet Collections');
  const [featuredDescription, setFeaturedDescription] = useState(
    'Intentional grooming, calming, and play essentials selected to nurture serene routines.',
  );
  const [spotlightTitle, setSpotlightTitle] = useState('Pet Ritual Guides');
  const [spotlightHeading, setSpotlightHeading] = useState('Stylists-curated pet edits');
  const [spotlightDescription, setSpotlightDescription] = useState(
    'Build a soothing pet routine with curated bundles tested in our calm climate studio.',
  );
  const [perksTitle, setPerksTitle] = useState('Serenity Perks');
  const [perksHeading, setPerksHeading] = useState('Care with confidence');
  const [perksDescription, setPerksDescription] = useState(
    'From daily brushes to enrichment toys, each recommendation is evaluated for long-term wellbeing.',
  );
  const [perks, setPerks] = useState<
    Array<{
      title: string;
      detail: string;
    }>
  >([
    { title: 'Pet-Tested Picks', detail: 'All items are reviewed with trainers and groomers for comfort and long-term safety.' },
    { title: 'Calm-First Philosophy', detail: 'Products are selected to soften stressful transitions, from grooming sessions to travel days.' },
    { title: 'Holistic Wellness', detail: 'We pair supplements with routines and accessories that support mind-body balance.' },
    { title: 'Ethical Partners', detail: 'Brands align with cruelty-free standards and transparent ingredient lists.' },
  ]);

  const perkIcons = [PawPrint, Moon, Heart, ShieldCheck];
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'all'
        ? products
        : products.filter((product) => product.category_id === selectedCategory),
    [products, selectedCategory],
  );

  const editorPicks = useMemo(() => {
    if (!products.length) return [];
    const sorted = [...products].sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bDate - aDate;
    });
    return sorted.slice(0, 3);
  }, [products]);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const { data } = await apiClient.get('/pets/page');

        if (data?.page?.sections) {
          const bannerSection = data.page.sections.find((s: any) => {
            const name = (s.name ?? '').toLowerCase();
            return name === 'pets banner' || name === 'pet banner' || name === 'shop banner';
          });
          const featuredSection = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'featured collections section');
          const spotlightSection = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'ritual guides');
          const perksSection = data.page.sections.find((s: any) => s.name?.toLowerCase() === 'perks section');

          if (bannerSection?.fields) {
            const label = bannerSection.fields['Title']?.value;
            const title = bannerSection.fields['Heading']?.value || bannerSection.fields['Title']?.value;
            const subtitle = bannerSection.fields['Description']?.value;
            const bannerImg =
              bannerSection.fields['Banner Image']?.url ||
              bannerSection.fields['Shop Banner']?.url ||
              bannerSection.fields['Pet Banner']?.url;
            if (label) setHeroLabel(label);
            if (title) setHeroTitle(title);
            if (subtitle) setHeroSubtitle(subtitle.replace(/<[^>]+>/g, ''));
            if (bannerImg) setHeroImage(bannerImg);
          }

          if (featuredSection?.fields) {
            const fHeading = featuredSection.fields['Heading']?.value;
            const fDesc = featuredSection.fields['Description']?.value;
            if (fHeading) setFeaturedHeading(fHeading);
            if (fDesc) setFeaturedDescription(fDesc.replace(/<[^>]+>/g, ''));
          }

          if (spotlightSection?.fields) {
            const sTitle = spotlightSection.fields['Title']?.value;
            const sHeading = spotlightSection.fields['Heading']?.value;
            const sDesc = spotlightSection.fields['Description']?.value;
            if (sTitle) setSpotlightTitle(sTitle);
            if (sHeading) setSpotlightHeading(sHeading);
            if (sDesc) setSpotlightDescription(sDesc.replace(/<[^>]+>/g, ''));
          }

          if (perksSection?.fields) {
            const pTitle = perksSection.fields['Title']?.value;
            const pHeading = perksSection.fields['Heading']?.value;
            const pDesc = perksSection.fields['Description']?.value;
            if (pTitle) setPerksTitle(pTitle);
            if (pHeading) setPerksHeading(pHeading);
            if (pDesc) setPerksDescription(pDesc.replace(/<[^>]+>/g, ''));

            const foundPerks: Array<{ title: string; detail: string }> = [];
            for (let i = 1; i <= 4; i += 1) {
              const headingKey = `Card ${i} heading`;
              const descKey = `Card ${i} Description`;
              const titleVal = perksSection.fields[headingKey]?.value;
              const descVal = perksSection.fields[descKey]?.value;
              if (titleVal || descVal) {
                foundPerks.push({
                  title: titleVal || '',
                  detail: descVal ? descVal.replace(/<[^>]+>/g, '') : '',
                });
              }
            }
            if (foundPerks.length) setPerks(foundPerks);
          }
        }

        let allowedCategoryIds: number[] = [];
        if (Array.isArray(data?.categories)) {
          const mappedCats = data.categories.map((c: any) => ({
            id: Number(c.id),
            name: c.name,
            parent_id: c.parent_id ?? null,
            slug: c.slug ?? '',
          }));
          const petsParent = mappedCats.find(
            (c) => (c.slug ?? '').toLowerCase() === 'pets' || c.name.toLowerCase() === 'pets',
          );
          const petChildrenByParent = petsParent
            ? mappedCats.filter((c) => c.parent_id === petsParent.id)
            : [];
          const petChildrenByName = mappedCats.filter((c) => {
            const slug = (c.slug ?? '').toLowerCase();
            const name = c.name.toLowerCase();
            return slug.includes('pet') || name.includes('pet');
          });
          const petChildren = [...petChildrenByParent, ...petChildrenByName].reduce((acc: any[], cat) => {
            if (!acc.find((c) => c.id === cat.id)) {
              acc.push(cat);
            }
            return acc;
          }, []);

          allowedCategoryIds = petChildren.length ? petChildren.map((c) => c.id) : [];
          setCategories(petChildren.length ? petChildren : mappedCats);
        }

        if (Array.isArray(data?.products?.data ?? data?.products)) {
          const list = data.products.data ?? data.products;
          const mappedProducts = list.map((p: any) => ({
            id: p.id,
            category_id: Number(p.category_id),
            name: p.name,
            description: p.description,
            image_url: p.image_url,
            affiliate_link: p.affiliate_link,
            amazon_link: p.amazon_link,
            created_at: p.created_at ?? null,
            featured: !!p.featured,
          }));
          const filtered =
            allowedCategoryIds.length > 0
              ? mappedProducts.filter((p) => allowedCategoryIds.includes(p.category_id))
              : mappedProducts;
          setProducts(filtered);
        }
      } catch (err: any) {
        showToast('error', err?.message || 'Failed to load pet data.');
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  // const lookbook = [
  //   {
  //     title: 'Rainy Day Reset',
  //     description: 'Set out a snuffle mat near a diffuser to channel energy on stormy afternoons.',
  //     image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
  //   },
  //   {
  //     title: 'Sun-Dappled Nap Spot',
  //     description: 'Layer a memory foam bed with a weighted wrap for grounded, daytime snoozes.',
  //     image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=900&q=80',
  //   },
  //   {
  //     title: 'Travel-Ready Corner',
  //     description: 'Keep carriers, harnesses, and calming sprays ready to grab-and-go near the door.',
  //     image: 'assets/images/pets-travel-ready-corner.jpg',
  //   },
  //   {
  //     title: 'Playful Evening Ritual',
  //     description: 'Wrap fetch sessions with a calming chew and gentle brushing for bonding time.',
  //     image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=80',
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#d5c0fa]">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt={heroTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/80 to-[#d5c0fa]/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">{heroLabel}</p>
          <h1 className="text-4xl font-bold text-gray-900">{heroTitle}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{heroSubtitle}</p>
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
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{featuredHeading}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {featuredDescription}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg col-span-full">
              <div className="animate-spin mx-auto mb-4 rounded-full h-10 w-10 border-2 border-purple-400 border-t-transparent"></div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Loading products...
              </h3>
              <p className="text-gray-600">
                Fetching the latest pet picks for you.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg col-span-full">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600">
                We are adding pet products here soon.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image_url || 'assets/images/placeholder.jpg'}
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
                    {categories.find((category) => category.id === product.category_id)?.name}
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {product.description ? product.description.replace(/<[^>]+>/g, '') : ''}
                </p>
                <div className="flex justify-center">
                  <a
                    href={product.affiliate_link || product.amazon_link || '#'}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300"
                  >
                    Shop Now
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))
          )}
        </div>

        <section className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">{spotlightTitle}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{spotlightHeading}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {spotlightDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorPicks.map((pick, index) => (
              <article
                key={pick.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={pick.image_url || 'assets/images/placeholder.jpg'}
                    alt={pick.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{pick.name}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {pick.description ? pick.description.replace(/<[^>]+>/g, '') : ''}
                  </p>
                  <a
                    href={pick.affiliate_link || pick.amazon_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
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
                <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">{perksTitle}</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{perksHeading}</h2>
                <p className="text-lg text-gray-600">
                  {perksDescription}
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
              {perks.map((perk, idx) => {
                const Icon = perkIcons[idx % perkIcons.length];
                return (
                  <div key={perk.title} className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#DC2E7C] flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{perk.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{perk.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* <section className="mt-20">
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
        </div> */}
      </section>
    </div>
  );
}
