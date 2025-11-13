import { useEffect, useState } from 'react';
import { products } from '../data/products';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Leaf,
  Star,
  Quote,
  Sun,
  Moon,
  Flower2,
  ShoppingBag,
} from 'lucide-react';
// fetchHomePage and CmsFieldValue are provided by ../lib/storefront when connected to the CMS/API.
import { fetchHomePage, CmsFieldValue } from '../lib/storefront';
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);


type HeroSlideAction = { label: string; page?: string; href?: string };

interface HeroSlide {
  id: string;
  eyeline: string;
  title: string;
  description: string;
  image: string;
  overlay: string;
  primary?: HeroSlideAction;
  secondary?: HeroSlideAction;
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'sunrise',
    eyeline: 'Morning Rituals',
    title: 'Ease into the day with mindful energy',
    description:
      'Layer aromatherapy, sunrise lamps, and guided journaling to greet each morning feeling grounded and bright.',
    image: '/assets/images/banner1.jpg',
    overlay: 'from-[#110a1f]/80 via-[#2f1d4a]/70 to-[#dc2e7c]/65',
    primary: { label: 'Shop Now', page: 'shop' },
    secondary: { label: 'Our Ritual Philosophy', page: 'about' }
  },
  {
    id: 'evening',
    eyeline: 'Twilight Retreat',
    title: 'Wind down with calming essentials',
    description:
      'Create a sanctuary after sunset with plush textures, herbal teas, and soft light curated for deep relaxation.',
    image: '/assets/images/banner2.jpg',
    overlay: 'from-[#140c27]/80 via-[#35224c]/70 to-[#f2a1c2]/60',
    primary: { label: 'Explore Evening Picks', page: 'shop' },
    secondary: { label: 'Meet the Collective', page: 'about' }
  },
  {
    id: 'gifting',
    eyeline: 'Gifted Serenity',
    title: 'Share curated calm with someone special',
    description:
      'From small gestures to statement bundles, discover gifts that help your favorite people breathe a little easier.',
    image: '/assets/images/banner3.jpg',
    overlay: 'from-[#130d25]/80 via-[#2f1d4a]/70 to-[#f7c5d8]/60',
    primary: { label: 'Browse Gift Guides', page: 'shop' },
    secondary: { label: 'Connect With Us', page: 'contact' }
  }
];

const HERO_OVERLAY_PRESETS = DEFAULT_HERO_SLIDES.map((slide) => slide.overlay);
const HERO_PRIMARY_ACTIONS = DEFAULT_HERO_SLIDES.map((slide) => slide.primary);
const HERO_SECONDARY_ACTIONS = DEFAULT_HERO_SLIDES.map((slide) => slide.secondary);
const DISCOVER_ICON_COMPONENTS = [Sun, Moon, Flower2];

const DEFAULT_ABOUT_SECTION = {
  title: 'About Pure Serenity',
  heading: 'At Pure Serenity, we believe every woman deserves to feel beautiful and confident at any age.',
  description:
    'Our products blend natural ingredients with proven science to help reduce wrinkles, firm skin, and bring back your radiant glow.',
  image: '/assets/images/about-us1.jpg'
};

const DEFAULT_WHY_CHOOSE = {
  heading: 'Why Choose Pure Serenity',
  description: 'We help you find peace and balance with carefully selected wellness products',
  features: [
    {
      title: 'Curated Selection',
      description: 'Handpicked products for your wellness journey'
    },
    {
      title: 'Peaceful Living',
      description: 'Create balance and harmony in daily life'
    },
    {
      title: 'Natural Wellness',
      description: 'Products that nurture mind, body, and spirit'
    }
  ],
  image1: {
    src: 'assets/images/why-choose1.jpg',
    heading: 'Find Your Peace',
    description: 'Discover mindfulness essentials'
  },
  image2: {
    src: 'assets/images/why-choose2.jpg',
    heading: 'Daily Wellness',
    description: 'Nurture your mind and body'
  }
};

const DEFAULT_SIGNATURE_COLLECTIONS = {
  title: 'Signature Collections',
  heading: 'Shop by the mood you want to create',
  description: 'Browse bundles curated for every moment of your day, from sunrise energizers to twilight rituals.',
  items: [
    {
      title: 'Morning Rituals',
      description: 'Energizing aromatherapy blends, sunrise lamps, and mindful journals to start strong.',
      image: 'assets/images/creams1.jpg',
      accent: 'from-orange-200/60 to-pink-200/60'
    },
    {
      title: 'Evening Unwind',
      description: 'Weighted blankets, herbal teas, and ambient lighting for the coziest nights in.',
      image: 'assets/images/creams2.jpg',
      accent: 'from-purple-200/60 to-blue-200/60'
    },
    {
      title: 'Spa Day at Home',
      description: 'Luxurious skin care, bath rituals, and spa tools to reset your week in style.',
      image: 'assets/images/creams3.jpg',
      accent: 'from-teal-200/60 to-emerald-200/60'
    }
  ]
};

const DEFAULT_DISCOVER_SECTION = {
  title: 'Just For You',
  heading: 'Discover the ritual that fits your flow',
  description:
    'Our mood matcher highlights products that support what you need most today—focus, restoration, or cozy comfort.',
  cards: [
    {
      title: 'Elevate Energy',
      items: ['Citrus mists', 'Motivational journals', 'Bright light therapy'],
      palette: 'from-amber-200/70 to-rose-200/70',
    },
    {
      title: 'Nightly Wind Down',
      items: ['Silk sleep masks', 'Chamomile infusions', 'Weighted blankets'],
      palette: 'from-indigo-200/70 to-purple-200/70',
    },
    {
      title: 'Self-Care Sunday',
      items: ['Bath soaks', 'Facial rollers', 'Restorative playlists'],
      palette: 'from-teal-200/70 to-emerald-200/70',
    },
  ],
};

const DEFAULT_JOURNEY_SECTION = {
  heading: 'Start Your Wellness Journey Today',
  description: 'Discover products that bring calm and positivity into your everyday life'
};

const DEFAULT_PEOPLE_SAYING_SECTION = {
  title: 'What People Are Saying',
  heading: 'Loved by our wellness community',
  description:
    'We listen closely to the Pure Serenity community to keep refining every box, recommendation, and ritual guide we share.',
  images: [
    {
      src: 'assets/images/serim1.jpg',
      alt: 'Relaxing home spa setup',
    },
    {
      src: 'assets/images/serim2.jpg',
      alt: 'Calming tea ritual',
    },
    {
      src: 'assets/images/serim3.jpg',
      alt: 'Meditation essentials',
    },
  ],
};

const DEFAULT_FEATURED_SECTION = {
  title: 'Featured Products',
  heading: 'Fresh ideas to inspire your rituals',
  description: 'Explore a trio of customer-favorite essentials ready to elevate your daily calm.',
};

const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL?.trim();
const BROWSER_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
const CMS_API_ORIGIN = (() => {
  if (RAW_API_BASE && RAW_API_BASE !== '') {
    try {
      return new URL(RAW_API_BASE, BROWSER_ORIGIN).origin;
    } catch {
      // ignore parsing issues and fall back
    }
  }

  return BROWSER_ORIGIN;
})();

const stripHtmlTags = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }

  const entityReplacements: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&mdash;': '-',
    '&ndash;': '-',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
  };

  let sanitized = value.replace(/<[^>]*>/g, ' ');

  for (const [entity, replacement] of Object.entries(entityReplacements)) {
    sanitized = sanitized.replace(new RegExp(entity, 'gi'), replacement);
  }

  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  return sanitized === '' ? null : sanitized;
};

const resolveCmsMediaUrl = (field: CmsFieldValue | undefined): string | null => {
  if (!field) {
    return null;
  }

  const raw = field.url ?? field.value;

  if (!raw) {
    return null;
  }

  const trimmed = raw.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed, CMS_API_ORIGIN || undefined);

      if (parsed.hostname === 'localhost' && !parsed.port && CMS_API_ORIGIN) {
        const originUrl = new URL(CMS_API_ORIGIN);

        if (originUrl.port) {
          parsed.port = originUrl.port;
        }
      }

      return parsed.toString();
    } catch {
      // fall through to relative handling
    }
  }

  if (!CMS_API_ORIGIN) {
    return trimmed;
  }

  const base = CMS_API_ORIGIN.replace(/\/$/, '');
  const path = trimmed.replace(/^\//, '');

  return `${base}/${path}`;
};

const getCmsTextValue = (fields: Record<string, CmsFieldValue> | undefined, key: string): string | null =>
  stripHtmlTags(fields?.[key]?.value);

const getCmsMediaUrl = (fields: Record<string, CmsFieldValue> | undefined, key: string): string | null =>
  resolveCmsMediaUrl(fields?.[key]);

const parseCmsList = (value?: string | null): string[] | null => {
  if (!value) {
    return null;
  }

  const matches = [...value.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];

  if (matches.length > 0) {
    const items = matches
      .map((match) => stripHtmlTags(match[1]) ?? '')
      .map((text) => text?.trim())
      .filter((text): text is string => Boolean(text && text.length > 0));

    if (items.length > 0) {
      return items;
    }
  }

  const fallback = stripHtmlTags(value);
  return fallback ? [fallback] : null;
};

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = heroSlides.length;
  const safeSlideCount = Math.max(slideCount, 1);
  const activeSlide = heroSlides[currentSlide % safeSlideCount] ?? DEFAULT_HERO_SLIDES[0];
  const [aboutSection, setAboutSection] = useState(DEFAULT_ABOUT_SECTION);
  const [whyChooseSection, setWhyChooseSection] = useState(DEFAULT_WHY_CHOOSE);
  const [signatureCollections, setSignatureCollections] = useState(DEFAULT_SIGNATURE_COLLECTIONS);
  const [journeySection, setJourneySection] = useState(DEFAULT_JOURNEY_SECTION);
  const [discoverSection, setDiscoverSection] = useState(DEFAULT_DISCOVER_SECTION);
  const [peopleSayingSection, setPeopleSayingSection] = useState(DEFAULT_PEOPLE_SAYING_SECTION);
  const [, setFeaturedSection] = useState(DEFAULT_FEATURED_SECTION);

  useEffect(() => {
    if (slideCount === 0) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);

    return () => clearInterval(timer);
  }, [slideCount]);

  const handleSlideAction = (action?: { label: string; page?: string; href?: string }) => {
    if (!action) return;
    if (action.page) {
      onNavigate(action.page);
      return;
    }
    if (action.href && typeof window !== 'undefined') {
      window.location.href = action.href;
    }
  };

  const goToSlide = (index: number) => {
    if (slideCount === 0) {
      return;
    }
    setCurrentSlide(index);
  };

  const handlePrev = () => {
    if (slideCount === 0) {
      return;
    }
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    if (slideCount === 0) {
      return;
    }
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  // const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  // const [featuredLoading, setFeaturedLoading] = useState(true);
  // const [featuredError, setFeaturedError] = useState<string | null>(null);

  // useEffect(() => {
  //   let isMounted = true;

  //   const loadFeatured = async () => {
  //     try {
  //       setFeaturedLoading(true);
  //       const response = await fetchFeaturedProducts();

  //       if (!isMounted) {
  //         return;
  //       }

  //       setFeaturedProducts(response.slice(0, 3));
  //       setFeaturedError(null);
  //     } catch (err) {
  //       if (!isMounted) {
  //         return;
  //       }

  //       const message =
  //         err instanceof Error ? err.message : 'Unable to load featured products.';
  //       setFeaturedError(message);
  //     } finally {
  //       if (isMounted) {
  //         setFeaturedLoading(false);
  //       }
  //     }
  //   };

  //   loadFeatured();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    let isMounted = true;

    const loadHomeContent = async () => {
      try {
        const response = await fetchHomePage();

        if (!isMounted) {
          return;
        }

        const heroSection = response.page.sections.find(
          (section) => section.name === 'Hero Slider' && section.type === 'repeater'
        );

        if (heroSection?.items?.length) {
          const slides = heroSection.items.map((item, index) => {
            const fallback = DEFAULT_HERO_SLIDES[index % DEFAULT_HERO_SLIDES.length];

            return {
              id: `cms-hero-${index}`,
              eyeline: getCmsTextValue(item, 'Title') ?? fallback.eyeline,
              title: getCmsTextValue(item, 'Heading') ?? fallback.title,
              description: getCmsTextValue(item, 'Description') ?? fallback.description,
              image: getCmsMediaUrl(item, 'Banner') ?? fallback.image,
              overlay: HERO_OVERLAY_PRESETS[index % HERO_OVERLAY_PRESETS.length] ?? fallback.overlay,
              primary: HERO_PRIMARY_ACTIONS[index % HERO_PRIMARY_ACTIONS.length] ?? fallback.primary,
              secondary:
                HERO_SECONDARY_ACTIONS[index % HERO_SECONDARY_ACTIONS.length] ?? fallback.secondary
            };
          });

          if (!isMounted) {
            return;
          }

          setHeroSlides(slides);
          setCurrentSlide(0);
        }

        const aboutSectionData = response.page.sections.find(
          (section) => section.name === 'Home About' && section.type === 'single'
        );

        if (aboutSectionData?.fields) {
          setAboutSection({
            title: getCmsTextValue(aboutSectionData.fields, 'Title') ?? DEFAULT_ABOUT_SECTION.title,
            heading: getCmsTextValue(aboutSectionData.fields, 'Heading') ?? DEFAULT_ABOUT_SECTION.heading,
            description:
              getCmsTextValue(aboutSectionData.fields, 'Description') ?? DEFAULT_ABOUT_SECTION.description,
            image: getCmsMediaUrl(aboutSectionData.fields, 'Image') ?? DEFAULT_ABOUT_SECTION.image
          });
        }

        const whyChooseData = response.page.sections.find(
          (section) => section.name === 'Home Why Chose Us' && section.type === 'single'
        );

        if (whyChooseData?.fields) {
          setWhyChooseSection({
            heading: getCmsTextValue(whyChooseData.fields, 'Heading') ?? DEFAULT_WHY_CHOOSE.heading,
            description:
              getCmsTextValue(whyChooseData.fields, 'Description') ?? DEFAULT_WHY_CHOOSE.description,
            features: [
              {
                title:
                  getCmsTextValue(whyChooseData.fields, 'Box 1 - Heading') ??
                  DEFAULT_WHY_CHOOSE.features[0].title,
                description:
                  getCmsTextValue(whyChooseData.fields, 'Box 1 - Description') ??
                  DEFAULT_WHY_CHOOSE.features[0].description
              },
              {
                title:
                  getCmsTextValue(whyChooseData.fields, 'Box 2 - Heading') ??
                  DEFAULT_WHY_CHOOSE.features[1].title,
                description:
                  getCmsTextValue(whyChooseData.fields, 'Box 2 - Description') ??
                  DEFAULT_WHY_CHOOSE.features[1].description
              },
              {
                title:
                  getCmsTextValue(whyChooseData.fields, 'Box 3 - Heading') ??
                  DEFAULT_WHY_CHOOSE.features[2].title,
                description:
                  getCmsTextValue(whyChooseData.fields, 'Box 3 - Description') ??
                  DEFAULT_WHY_CHOOSE.features[2].description
              }
            ],
            image1: {
              src: getCmsMediaUrl(whyChooseData.fields, 'Image 1') ?? DEFAULT_WHY_CHOOSE.image1.src,
              heading:
                getCmsTextValue(whyChooseData.fields, 'Image 1 - Heading') ??
                DEFAULT_WHY_CHOOSE.image1.heading,
              description:
                getCmsTextValue(whyChooseData.fields, 'Image 1 - Description') ??
                DEFAULT_WHY_CHOOSE.image1.description
            },
            image2: {
              src: getCmsMediaUrl(whyChooseData.fields, 'Image 2') ?? DEFAULT_WHY_CHOOSE.image2.src,
              heading:
                getCmsTextValue(whyChooseData.fields, 'Image 2 - Heading') ??
                DEFAULT_WHY_CHOOSE.image2.heading,
              description:
                getCmsTextValue(whyChooseData.fields, 'Image 2 - Description') ??
                DEFAULT_WHY_CHOOSE.image2.description
            }
          });
        }

        const signatureData = response.page.sections.find(
          (section) => section.name === 'Home Signature Collections' && section.type === 'single'
        );

        if (signatureData?.fields) {
          setSignatureCollections((prev) => ({
            title: getCmsTextValue(signatureData.fields, 'Title') ?? DEFAULT_SIGNATURE_COLLECTIONS.title,
            heading:
              getCmsTextValue(signatureData.fields, 'Heading') ?? DEFAULT_SIGNATURE_COLLECTIONS.heading,
            description:
              getCmsTextValue(signatureData.fields, 'Description') ?? DEFAULT_SIGNATURE_COLLECTIONS.description,
            items: prev.items
          }));
        }

        const journeyData = response.page.sections.find(
          (section) => section.name === 'Home Journey Today' && section.type === 'single'
        );

        if (journeyData?.fields) {
          setJourneySection({
            heading: getCmsTextValue(journeyData.fields, 'Heading') ?? DEFAULT_JOURNEY_SECTION.heading,
            description:
              getCmsTextValue(journeyData.fields, 'Description') ?? DEFAULT_JOURNEY_SECTION.description
          });
        }

        const discoverData = response.page.sections.find(
          (section) => section.name === 'Home Discover Ritual' && section.type === 'single'
        );

        if (discoverData?.fields) {
          const discoverFields = discoverData.fields;

          setDiscoverSection({
            title: getCmsTextValue(discoverFields, 'Title') ?? DEFAULT_DISCOVER_SECTION.title,
            heading: getCmsTextValue(discoverFields, 'Heading') ?? DEFAULT_DISCOVER_SECTION.heading,
            description:
              getCmsTextValue(discoverFields, 'Description') ?? DEFAULT_DISCOVER_SECTION.description,
            cards: DEFAULT_DISCOVER_SECTION.cards.map((card, index) => {
              const cardNumber = index + 1;
              const headingKey = `Box ${cardNumber} - Heading`;
              const descriptionKey = `Box ${cardNumber} - Description`;

              return {
                title: getCmsTextValue(discoverFields, headingKey) ?? card.title,
                items:
                  parseCmsList(discoverFields[descriptionKey]?.value) ??
                  card.items,
                palette: card.palette,
              };
            }),
          });
        }

        const peopleSayingData = response.page.sections.find(
          (section) => section.name === 'Home People Saying' && section.type === 'single'
        );

        if (peopleSayingData?.fields) {
          const peopleFields = peopleSayingData.fields;
          setPeopleSayingSection({
            title: getCmsTextValue(peopleFields, 'Title') ?? DEFAULT_PEOPLE_SAYING_SECTION.title,
            heading: getCmsTextValue(peopleFields, 'Heading') ?? DEFAULT_PEOPLE_SAYING_SECTION.heading,
            description:
              getCmsTextValue(peopleFields, 'Description') ?? DEFAULT_PEOPLE_SAYING_SECTION.description,
            images: DEFAULT_PEOPLE_SAYING_SECTION.images.map((image, index) => {
              const key = `Image ${index + 1}`;
              return {
                src: getCmsMediaUrl(peopleFields, key) ?? image.src,
                alt: image.alt,
              };
            }),
          });
        }

        const featuredData = response.page.sections.find(
          (section) => section.name === 'Home Featured Products' && section.type === 'single'
        );

        if (featuredData?.fields) {
          const featuredFields = featuredData.fields;
          setFeaturedSection({
            title: getCmsTextValue(featuredFields, 'Title') ?? DEFAULT_FEATURED_SECTION.title,
            heading: getCmsTextValue(featuredFields, 'Heading') ?? DEFAULT_FEATURED_SECTION.heading,
            description:
              getCmsTextValue(featuredFields, 'Description') ?? DEFAULT_FEATURED_SECTION.description,
          });
        }
      } catch (error) {
        console.error('Failed to load home page content', error);
      }
    };

    loadHomeContent();

    return () => {
      isMounted = false;
    };
  }, []);
  const testimonials = [
    {
      quote: 'Every package feels like a personal wellness retreat. The curated sets are thoughtful and beautiful.',
      name: 'Alicia M.',
      role: 'Yoga Instructor'
    },
    {
      quote: 'Pure Serenity made it effortless to find calming gifts for my entire team. Stunning presentation.',
      name: 'Daniel R.',
      role: 'Creative Director'
    },
    {
      quote: 'The mood-based collections help me shop with intention. My nightly routines have transformed.',
      name: 'Priya S.',
      role: 'Wellness Blogger'
    }
  ];

  const discoverCards = discoverSection.cards.map((card, index) => ({
    ...card,
    icon: DISCOVER_ICON_COMPONENTS[index % DISCOVER_ICON_COMPONENTS.length],
  }));

  const featureIcons = [Sparkles, Heart, Leaf];
  const featureCards = whyChooseSection.features.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index % featureIcons.length]
  }));

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.overlay}`} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up space-y-6" aria-live="polite">
            <p className="text-sm tracking-[0.4em] uppercase text-[#DC2E7C]">
              {activeSlide.eyeline}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {activeSlide.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
              {activeSlide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {activeSlide.primary && (
                <a
                  href={activeSlide.primary.page ? `/${activeSlide.primary.page}` : activeSlide.primary.href ?? '#'}
                  onClick={(e) => {
                    if (activeSlide.primary?.page) {
                      e.preventDefault();
                      handleSlideAction(activeSlide.primary);
                    }
                  }}
                  className="group px-8 py-4 bg-[#DC2E7C] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-[#c0246c] transition-all duration-300 flex items-center gap-2"
                >
                  {activeSlide.primary.label}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              {activeSlide.secondary && (
                <a
                  href={activeSlide.secondary.page ? `/${activeSlide.secondary.page}` : activeSlide.secondary.href ?? '#'}
                  onClick={(e) => {
                    if (activeSlide.secondary?.page) {
                      e.preventDefault();
                      handleSlideAction(activeSlide.secondary);
                    }
                  }}
                  className="px-8 py-4 border-2 border-[#DC2E7C] bg-white/80 text-[#DC2E7C] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
                >
                  {activeSlide.secondary.label}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, index) => (
            <button
                key={`${slide.id}-dot`}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-10 bg-[#DC2E7C]' : 'w-5 bg-white/50 hover:bg-[#DC2E7C]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === currentSlide}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-white/80 text-[#DC2E7C] shadow-md backdrop-blur hover:bg-white transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 mx-auto" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-white/80 text-[#DC2E7C] shadow-md backdrop-blur hover:bg-white transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 mx-auto" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left animate-fade-in-up">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500">
                {aboutSection.title}
              </p>
              <h2 className="text-4xl font-bold text-[#DC2E7C]">
                {aboutSection.heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutSection.description}
              </p>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl animate-fade-in-up">
              <img
                src={aboutSection.image}
                alt={aboutSection.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-transparent to-purple-200/20" />
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-[#DC2E7C] mb-4">
              {whyChooseSection.heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {whyChooseSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featureCards.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-[#DC2E7C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#DC2E7C] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={whyChooseSection.image1.src}
                alt={whyChooseSection.image1.heading}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{whyChooseSection.image1.heading}</h3>
                  <p className="text-purple-100">{whyChooseSection.image1.description}</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={whyChooseSection.image2.src}
                alt={whyChooseSection.image2.heading}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{whyChooseSection.image2.heading}</h3>
                  <p className="text-pink-100">{whyChooseSection.image2.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#f8daed] to-[#e4c6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">
                {signatureCollections.title}
              </p>
              <h2 className="text-4xl font-bold text-[#DC2E7C] mb-4">
                {signatureCollections.heading}
              </h2>
              <p className="text-lg text-gray-600">
                {signatureCollections.description}
              </p>
            </div>
            <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('shop');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300"
              >
              Explore the Shop
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureCollections.items.map((collection, index) => (
              <div
                key={collection.title}
                className="relative overflow-hidden rounded-3xl shadow-xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-80 mix-blend-multiply pointer-events-none" />
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <div
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-widest rounded-full bg-gradient-to-r ${collection.accent} backdrop-blur`}
                  >
                    Curated Edit
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{collection.title}</h3>
                  <p className="text-sm text-purple-100 leading-relaxed mt-2">
                    {collection.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="h-12 w-12 text-[#DC2E7C] mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {journeySection.heading}
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            {journeySection.description}
          </p>
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('shop');
            }}
            className="px-8 py-4 bg-white text-[#DC2E7C] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
          >
            Explore Our Shop
          </a>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">
              {discoverSection.title}
            </p>
            <h2 className="text-4xl font-bold text-[#DC2E7C] mb-4">
              {discoverSection.heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {discoverSection.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {discoverCards.map((card, index) => (
              <div
                key={card.title}
                className="relative p-8 rounded-3xl bg-white shadow-xl ring-1 ring-purple-100 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.palette} opacity-60 blur-[120px] -z-10`} />
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#DC2E7C] flex items-center justify-center mb-6">
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold text-[#DC2E7C] mb-4">
                  {card.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#f8daed] via-[#e7d4f9] to-[#d5c0fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500">
                {peopleSayingSection.title}
              </p>
              <h2 className="text-4xl font-bold text-[#DC2E7C]">
                {peopleSayingSection.heading}
              </h2>
              <p className="text-lg text-gray-600">
                {peopleSayingSection.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-purple-200" />
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="text-sm">
                      <p className="font-semibold text-[#DC2E7C]">{testimonial.name}</p>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="row-span-2 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={peopleSayingSection.images[0]?.src}
                  alt={peopleSayingSection.images[0]?.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              {peopleSayingSection.images.slice(1).map((image, index) => (
                <div key={`people-image-${index + 2}`} className="rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

           <section className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Featured Products</p>
            <h2 className="text-4xl font-bold text-[#DC2E7C] mb-4">
              Fresh ideas to inspire your rituals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore a trio of customer-favorite essentials ready to elevate your daily calm.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="relative h-60 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center space-y-4">
                  <h3 className="text-2xl font-semibold text-[#DC2E7C]">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-[#5F4D8B]">
                    ${product.price.toFixed(2)}
                  </p>
                  <a
                    href={product.affiliate_link}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5F4D8B] text-white rounded-full font-semibold hover:bg-[#4b3c6c] transition-all duration-300 group-hover:shadow-lg"
                  >
                    Shop Now
                    <ShoppingBag className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
