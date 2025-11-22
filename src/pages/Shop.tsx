import { useEffect, useMemo, useState } from 'react';
import {
  Package,
  Sparkles,
  Gift,
  Truck,
  ShieldCheck,
  ArrowRight,
  ShoppingBagIcon,
} from 'lucide-react';
import { apiClient } from '../lib/apiClient';
import showToast from '../lib/toast';

export default function Shop() {
  const [heroLabel, setHeroLabel] = useState('Curated Marketplace');
  const [heroTitle, setHeroTitle] = useState('Shop Pure Serenity');
  const [heroSubtitle, setHeroSubtitle] = useState(
    'Discover curated rituals, calming essentials, and mindful luxuries selected to elevate your everyday.',
  );
  const [heroImage, setHeroImage] = useState('assets/images/banner2.jpg');

  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
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
    }>
  >([]);
  const [featuredHeading, setFeaturedHeading] = useState('Our Featured Collections');
  const [featuredDescription, setFeaturedDescription] = useState(
    'Explore our carefully curated selection of wellness products',
  );
  const [spotlightTitle, setSpotlightTitle] = useState('Editor Spotlights');
  const [spotlightHeading, setSpotlightHeading] = useState('Ritual edits to guide your cart');
  const [spotlightDescription, setSpotlightDescription] = useState(
    'Lean on our stylists for a polished selection. Each edit features well-loved products paired with new discoveries.',
  );
  const [perksTitle, setPerksTitle] = useState('Pure Serenity Perks');
  const [perksHeading, setPerksHeading] = useState('Shop confidently with rituals that last');
  const [perksDescription, setPerksDescription] = useState(
    'We remove the guesswork so your wellness investments genuinely support a calmer life.',
  );
  const [perks, setPerks] = useState<
    Array<{
      title: string;
      detail: string;
    }>
  >([
    {
      title: 'Curated Quality',
      detail: 'Every product is hand-tested by our ritual lab before it reaches the shop.',
    },
    {
      title: 'Bundle & Save',
      detail: 'Look for collection badges to unlock exclusive affiliate bundle pricing.',
    },
    {
      title: 'Fast Shipping',
      detail: 'Prime-eligible picks get to your door in as few as two days.',
    },
    {
      title: 'Trusted Partners',
      detail: 'We only partner with brands committed to ethical and sustainable practices.',
    },
  ]);
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category_id === selectedCategory),
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
    const loadShop = async () => {
      try {
        const { data } = await apiClient.get('/products/page');

        if (data?.page?.sections) {
          const bannerSection = data.page.sections.find(
            (s: any) => s.name?.toLowerCase() === 'shop banner',
          );
          const featuredSection = data.page.sections.find(
            (s: any) => s.name?.toLowerCase() === 'featured collection section',
          );
          const spotlightSection = data.page.sections.find(
            (s: any) => s.name?.toLowerCase() === 'spotlight section',
          );
          const perksSection = data.page.sections.find(
            (s: any) => s.name?.toLowerCase() === 'perks section',
          );
          if (bannerSection?.fields) {
            const label = bannerSection.fields['Title']?.value;
            const title = bannerSection.fields['Heading']?.value || bannerSection.fields['Title']?.value;
            const subtitle = bannerSection.fields['Description']?.value;
            const bannerImg = bannerSection.fields['Shop Banner']?.url;
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
            if (foundPerks.length) {
              setPerks(foundPerks);
            }
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

          const beautyParent = mappedCats.find(
            (c) => (c.slug ?? '').toLowerCase() === 'beauty' || c.name.toLowerCase() === 'beauty',
          );
          const beautyChildren = beautyParent
            ? mappedCats.filter((c) => c.parent_id === beautyParent.id)
            : mappedCats;

          allowedCategoryIds = beautyChildren.map((c) => c.id);
          setCategories(beautyChildren);
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
          }));

          const filteredByBeauty =
            allowedCategoryIds.length > 0
              ? mappedProducts.filter((p) => allowedCategoryIds.includes(p.category_id))
              : mappedProducts;

          setProducts(filteredByBeauty);
        }
      } catch (err: any) {
        showToast('error', err?.message || 'Failed to load shop data.');
      } finally {
        setLoading(false);
      }
    };

    loadShop();
  }, []);

  const perkIcons = [Sparkles, Gift, Truck, ShieldCheck];

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
          <p className="text-lg text-gray-700 leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {featuredHeading}
          </h2>
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

        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="animate-spin mx-auto mb-4 rounded-full h-10 w-10 border-2 border-purple-400 border-t-transparent"></div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Loading products...
            </h3>
            <p className="text-gray-600">
              Fetching the latest picks for you.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
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
                    {product.description ? product.description.replace(/<[^>]+>/g, '') : ''}
                  </p>
                  <a
                    href={product.affiliate_link || product.amazon_link || '#'}
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
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">{spotlightTitle}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {spotlightHeading}
            </h2>
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
                <div className="h-64 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
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
            <div className="flex flex-col items-center text-center gap-10 mb-12">
              <div className="max-w-2xl mx-auto">
                <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">{perksTitle}</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {perksHeading}
                </h2>
                <p className="text-lg text-gray-600">
                  {perksDescription}
                </p>
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

      </div>
    </div>
  );
}
