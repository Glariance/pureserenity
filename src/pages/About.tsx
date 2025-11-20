import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Target,
  Heart,
  Sparkles,
  Users,
  Leaf,
  Globe,
  HandHeart,
  Sun
} from 'lucide-react';
import { getCmsPage } from '../api/home';
import { CmsFieldValue } from '../lib/storefront';
import {
  PLACEHOLDER_HTML,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_TEXT_LONG,
  PLACEHOLDER_TEXT_SHORT,
  createPlaceholderList
} from '../lib/placeholders';

const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL?.trim();
const BROWSER_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';

const { CMS_REQUEST_ORIGIN, CMS_MEDIA_BASE_URL } = (() => {
  const fallback = new URL(BROWSER_ORIGIN);

  if (RAW_API_BASE && RAW_API_BASE !== '') {
    try {
      const parsed = new URL(RAW_API_BASE, BROWSER_ORIGIN);
      let cleanedPath = parsed.pathname.replace(/\/api\/?$/, '').replace(/\/$/, '');
      cleanedPath = cleanedPath.replace(/\/public$/i, '');
      const mediaBase =
        cleanedPath.length > 0 ? `${parsed.origin}${cleanedPath}` : parsed.origin;

      return {
        CMS_REQUEST_ORIGIN: parsed.origin,
        CMS_MEDIA_BASE_URL: mediaBase
      };
    } catch {
      // ignore and use fallback
    }
  }

  return {
    CMS_REQUEST_ORIGIN: fallback.origin,
    CMS_MEDIA_BASE_URL: fallback.origin
  };
})();

const buildMediaUrlFromPath = (rawPath: string): string => {
  const sanitized = rawPath
    .replace(/^\/*/, '')
    .replace(/^media\//i, '')
    .replace(/^storage\//i, 'storage/');
  const normalizedPath = sanitized.startsWith('storage/') ? sanitized : `storage/${sanitized}`;
  const base = CMS_MEDIA_BASE_URL?.replace(/\/$/, '') ?? '';

  if (!base) {
    return `/${normalizedPath}`;
  }

  return `${base}/${normalizedPath}`.replace(/([^:]\/)\/+/g, '$1');
};

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
    '&rsquo;': "'"
  };

  let sanitized = value.replace(/<[^>]*>/g, ' ');

  for (const [entity, replacement] of Object.entries(entityReplacements)) {
    sanitized = sanitized.replace(new RegExp(entity, 'gi'), replacement);
  }

  sanitized = sanitized.replace(/\s+/g, ' ').trim();

  return sanitized === '' ? null : sanitized;
};

const resolveCmsMediaValue = (field: CmsFieldValue | undefined): string | null => {
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
      const parsed = new URL(trimmed, CMS_REQUEST_ORIGIN || undefined);

      if (!parsed.port && CMS_REQUEST_ORIGIN) {
        const originUrl = new URL(CMS_REQUEST_ORIGIN);
        if (originUrl.port) {
          parsed.port = originUrl.port;
        }
      }

      const normalizedPath = parsed.pathname
        .replace(/\/media\//gi, '/storage/')
        .replace(/^\/media\//i, '/storage/');
      parsed.pathname = normalizedPath;

      return parsed.toString();
    } catch {
      // fall back to path-based handling below
    }
  }

  return buildMediaUrlFromPath(trimmed);
};

const getCmsTextValue = (fields: Record<string, CmsFieldValue> | undefined, key: string): string | null =>
  stripHtmlTags(fields?.[key]?.value);

const getCmsHtmlValue = (fields: Record<string, CmsFieldValue> | undefined, key: string): string | null => {
  const value = fields?.[key]?.value;
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }
  return value.trim();
};

const getCmsMediaUrl = (fields: Record<string, CmsFieldValue> | undefined, key: string): string | null =>
  resolveCmsMediaValue(fields?.[key]);

interface BannerContent {
  eyeline: string;
  title: string;
  subtitle: string;
  image: string;
}

interface MissionCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface MissionSectionContent {
  title: string;
  description: string;
  cards: MissionCard[];
}

interface CommunitySectionContent {
  title: string;
  heading: string;
  description: string;
  image: string;
  imageDescription: string;
  benefits: string[];
}

interface StorySectionContent {
  title: string;
  heading: string;
  description: string;
}

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  image: string;
}

interface CommitmentSectionContent {
  title: string;
  descriptionHtml: string;
}

interface CollectiveSectionContent {
  title: string;
  heading: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  image: string;
}

interface ImpactCard {
  icon: LucideIcon;
  title: string;
  description: string;
  descriptionHtml?: string | null;
}

interface ImpactSectionContent {
  title: string;
  heading: string;
  description: string;
  descriptionHtml?: string | null;
  cards: ImpactCard[];
}

interface LabImage {
  src: string;
  alt: string;
}

interface LabSectionContent {
  title: string;
  heading: string;
  description: string;
  descriptionHtml?: string | null;
  tagLine: string;
  tagLineHtml?: string | null;
  images: LabImage[];
}

const ABOUT_PAGE_SLUG =
  (typeof import.meta.env.VITE_ABOUT_PAGE_SLUG === 'string'
    ? import.meta.env.VITE_ABOUT_PAGE_SLUG.trim()
    : '') || 'about';

const DEFAULT_BANNER: BannerContent = {
  eyeline: 'Inside Pure Serenity',
  title: 'About Pure Serenity Shop',
  subtitle:
    'We curate thoughtful wellness rituals, meaningful partnerships, and cozy moments that bring calm into every day.',
  image: 'assets/images/banner1.jpg'
};

const MISSION_BOX_FIELD_KEYS = [
  { titleKey: '1st Box - Title', descriptionKey: '1st Box - Description' },
  { titleKey: '2nd Box - Title', descriptionKey: '2nd Box - Description' },
  { titleKey: '3rd Box - Title', descriptionKey: '3rd Box - Description' },
  { titleKey: '4th Box - Title', descriptionKey: '4th Box - Description' }
] as const;

const DEFAULT_MISSION_SECTION: MissionSectionContent = {
  title: 'Our Mission',
  description:
    "In a world that moves too fast, we're here to help you slow down. We curate products that encourage mindfulness, promote relaxation, and support your journey toward a more balanced life. Each item in our collection is chosen with intention and care.",
  cards: [
    {
      icon: Heart,
      title: 'Wellness First',
      description: 'We prioritize products that genuinely support your physical and mental wellbeing'
    },
    {
      icon: Sparkles,
      title: 'Quality Curation',
      description: 'Every item is carefully selected and tested to meet our high standards'
    },
    {
      icon: Target,
      title: 'Mindful Living',
      description: 'We believe in creating a balanced lifestyle through intentional choices'
    },
    {
      icon: Users,
      title: 'Community Care',
      description: 'Building a supportive community focused on collective wellness and growth'
    }
  ]
};

const COMMUNITY_BOX_FIELD_KEYS = ['1st Box', '2nd Box', '3rd Box'] as const;

const DEFAULT_COMMUNITY_SECTION: CommunitySectionContent = {
  title: 'Join Our Wellness Community',
  heading: 'Membership that keeps your rituals inspired',
  description:
    "Discover products that nurture your mind, body, and spirit. Whether you're beginning your wellness journey or deepening your practice, we're here to support you every step of the way.",
  image: 'assets/images/about-us1.jpg',
  imageDescription:
    '“Every Sunday we gather virtually to slow down, share wins, and explore the ritual of the week—led by our guest coaches and community guides.”',
  benefits: ['Weekly ritual circles', 'Live meditations & workshops', 'Curated playlists & guides']
};

const DEFAULT_STORY_SECTION: StorySectionContent = {
  title: 'Our Story',
  heading: 'Crafted from a love of nourished moments',
  description:
    'Pure Serenity is the culmination of years spent studying rituals from around the world, chatting with healers, and testing thousands of tactile products. Each milestone has been shaped by community feedback and a devotion to approachable, joy-filled wellness.'
};

const DEFAULT_TIMELINE: TimelineEntry[] = [
  {
    year: '2019',
    title: 'The spark',
    description: 'Pure Serenity began as a weekly newsletter sharing mindful rituals with friends and family.',
    image: 'assets/images/about-us2.jpg'
  },
  {
    year: '2021',
    title: 'Community grows',
    description: 'Our curated shop launched with 30 handpicked products crafted by independent makers.',
    image: 'assets/images/about-us3.jpg'
  },
  {
    year: '2024',
    title: 'Wellness collective',
    description: 'We partner with coaches, herbalists, and artists to co-create limited-edition ritual kits.',
    image: 'assets/images/about-us4.jpg'
  }
];

const DEFAULT_COMMITMENT_SECTION: CommitmentSectionContent = {
  title: 'Our Commitment to You',
  descriptionHtml: `<p>We understand that finding quality wellness products can be overwhelming. That's why we do the research for you, testing and vetting each item before adding it to our shop.</p>

<p>As an affiliate partner with trusted brands, we earn a small commission when you purchase through our links. This helps us continue curating the best products for you, at no extra cost.</p>

<p>Your trust means everything to us. We only recommend products we genuinely believe will enhance your wellness journey.</p>`
};

const DEFAULT_COLLECTIVE_SECTION: CollectiveSectionContent = {
  title: 'Meet the Collective',
  heading: 'The people guiding your wellness journey',
  description: 'We are storytellers, listeners, and curious explorers who believe that soft moments can change a day.'
};

const DEFAULT_TEAM: TeamMember[] = [
  {
    name: 'Serena Rivera',
    role: 'Founder & Curator',
    focus: 'Designs every collection with an eye for harmony and intention.',
    image: 'assets/images/about-people1.jpg'
  },
  {
    name: 'Jordan Lee',
    role: 'Community Guide',
    focus: 'Hosts live breathwork and guides our weekly ritual circles.',
    image: 'assets/images/about-people2.jpg'
  },
  {
    name: 'Maya Chen',
    role: 'Sustainability Lead',
    focus: 'Ensures every partner aligns with our eco-conscious standards.',
    image: 'assets/images/about-people3.jpg'
  }
];

const DEFAULT_IMPACT_SECTION: ImpactSectionContent = {
  title: 'Collective Impact',
  heading: 'Intentional shopping with ripple effects',
  description:
    'Every affiliate purchase supports mindful makers, reduces waste through small-batch production, and funds community care initiatives. Together we keep wellness accessible, transparent, and kind.',
  descriptionHtml: `<p>Every affiliate purchase supports mindful makers, reduces waste through small-batch production, and funds community care initiatives. Together we keep wellness accessible, transparent, and kind.</p>`,
  cards: [
    {
      icon: Leaf,
      title: 'Conscious Sourcing',
      description: 'Small-batch artisans and certified eco-friendly suppliers anchor our catalog.',
      descriptionHtml: '<p>Small-batch artisans and certified eco-friendly suppliers anchor our catalog.</p>'
    },
    {
      icon: Globe,
      title: 'Giving Circles',
      description: '1% of every affiliate order funds mental health nonprofits within our community.',
      descriptionHtml: '<p>1% of every affiliate order funds mental health nonprofits within our community.</p>'
    },
    {
      icon: HandHeart,
      title: 'Wellness Scholarships',
      description: 'Free access to restorative workshops for caregivers and teachers each season.',
      descriptionHtml: '<p>Free access to restorative workshops for caregivers and teachers each season.</p>'
    }
  ]
};

const DEFAULT_LAB_SECTION: LabSectionContent = {
  title: 'Inside the Ritual Lab',
  heading: 'Testing every product we recommend',
  description:
    'Our light-filled studio is where we brew tea samples, compare textures, and build routine playlists at sunrise. We only share the products that evoke a genuine wow. Your trust guides every pick.',
  descriptionHtml: `<p>Our light-filled studio is where we brew tea samples, compare textures, and build routine playlists at sunrise. We only share the products that evoke a genuine wow. Your trust guides every pick.</p>`,
  tagLine: 'Sunrise sessions | sound baths | sensory testing',
  tagLineHtml: '<p>Sunrise sessions | sound baths | sensory testing</p>',
  images: [
    {
      src: 'assets/images/serim2.jpg',
      alt: 'Tea tasting setup'
    },
    {
      src: 'assets/images/serim3.jpg',
      alt: 'Wellness product styling'
    },
    {
      src: 'assets/images/serim1.jpg',
      alt: 'Calming studio environment'
    }
  ]
};

const IMPACT_CARD_FIELDS = [
  { titleKey: 'Box 1 - title', descriptionKey: 'Box 1 - Description' },
  { titleKey: 'Box 2 - title', descriptionKey: 'Box 2 - Description' },
  { titleKey: 'Box 3 - title', descriptionKey: 'Box 3 - Description' }
] as const;

const LAB_IMAGE_FIELD_KEYS = ['Image 1', 'Image 2', 'Image 3'] as const;

const PLACEHOLDER_BANNER: BannerContent = {
  eyeline: PLACEHOLDER_TEXT_SHORT,
  title: PLACEHOLDER_TEXT_SHORT,
  subtitle: PLACEHOLDER_TEXT_LONG,
  image: PLACEHOLDER_IMAGE
};

const PLACEHOLDER_MISSION_SECTION: MissionSectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG,
  cards: [Heart, Sparkles, Target, Users].map((icon) => ({
    icon,
    title: PLACEHOLDER_TEXT_SHORT,
    description: PLACEHOLDER_TEXT_LONG
  }))
};

const PLACEHOLDER_COMMUNITY_SECTION: CommunitySectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  heading: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG,
  image: PLACEHOLDER_IMAGE,
  imageDescription: PLACEHOLDER_TEXT_LONG,
  benefits: createPlaceholderList(3)
};

const PLACEHOLDER_STORY_SECTION: StorySectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  heading: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG
};

const PLACEHOLDER_TIMELINE: TimelineEntry[] = Array.from({ length: DEFAULT_TIMELINE.length }, () => ({
  year: '----',
  title: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG,
  image: PLACEHOLDER_IMAGE
}));

const PLACEHOLDER_COMMITMENT_SECTION: CommitmentSectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  descriptionHtml: PLACEHOLDER_HTML
};

const PLACEHOLDER_COLLECTIVE_SECTION: CollectiveSectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  heading: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG
};

const PLACEHOLDER_TEAM: TeamMember[] = Array.from({ length: DEFAULT_TEAM.length }, () => ({
  name: PLACEHOLDER_TEXT_SHORT,
  role: PLACEHOLDER_TEXT_SHORT,
  focus: PLACEHOLDER_TEXT_LONG,
  image: PLACEHOLDER_IMAGE
}));

const PLACEHOLDER_IMPACT_SECTION: ImpactSectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  heading: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG,
  descriptionHtml: PLACEHOLDER_HTML,
  cards: DEFAULT_IMPACT_SECTION.cards.map((card) => ({
    icon: card.icon,
    title: PLACEHOLDER_TEXT_SHORT,
    description: PLACEHOLDER_TEXT_LONG,
    descriptionHtml: PLACEHOLDER_HTML
  }))
};

const PLACEHOLDER_LAB_SECTION: LabSectionContent = {
  title: PLACEHOLDER_TEXT_SHORT,
  heading: PLACEHOLDER_TEXT_SHORT,
  description: PLACEHOLDER_TEXT_LONG,
  descriptionHtml: PLACEHOLDER_HTML,
  tagLine: PLACEHOLDER_TEXT_SHORT,
  tagLineHtml: PLACEHOLDER_HTML,
  images: LAB_IMAGE_FIELD_KEYS.map(() => ({
    src: PLACEHOLDER_IMAGE,
    alt: 'Pure Serenity logo placeholder'
  }))
};

export default function About() {
  const [innerBanner, setInnerBanner] = useState<BannerContent>(DEFAULT_BANNER);
  const [missionSection, setMissionSection] =
    useState<MissionSectionContent>(DEFAULT_MISSION_SECTION);
  const [communitySection, setCommunitySection] = useState<CommunitySectionContent>(
    DEFAULT_COMMUNITY_SECTION
  );
  const [storySection, setStorySection] = useState<StorySectionContent>(DEFAULT_STORY_SECTION);
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>(DEFAULT_TIMELINE);
  const [commitmentSection, setCommitmentSection] =
    useState<CommitmentSectionContent>(DEFAULT_COMMITMENT_SECTION);
  const [collectiveSection, setCollectiveSection] = useState<CollectiveSectionContent>(
    DEFAULT_COLLECTIVE_SECTION
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [impactSection, setImpactSection] = useState<ImpactSectionContent>(DEFAULT_IMPACT_SECTION);
  const [labSection, setLabSection] = useState<LabSectionContent>(DEFAULT_LAB_SECTION);
  const [isAboutContentReady, setIsAboutContentReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAboutContent = async () => {
      try {
        const response = await getCmsPage(ABOUT_PAGE_SLUG);

        if (!isMounted) {
          return;
        }

          const bannerSection = response.page.sections.find(
            (section) => section.name === 'About Banner' && section.type === 'single'
          );

          if (bannerSection?.fields) {
            setInnerBanner({
              eyeline: getCmsTextValue(bannerSection.fields, 'Title') ?? DEFAULT_BANNER.eyeline,
              title: getCmsTextValue(bannerSection.fields, 'Heading') ?? DEFAULT_BANNER.title,
              subtitle:
                getCmsTextValue(bannerSection.fields, 'Description') ?? DEFAULT_BANNER.subtitle,
              image: getCmsMediaUrl(bannerSection.fields, 'Banner Image') ?? DEFAULT_BANNER.image
            });
          }

          const missionSectionData = response.page.sections.find(
            (section) => section.name === 'Our Mission' && section.type === 'single'
          );

          if (missionSectionData?.fields) {
          setMissionSection({
            title:
              getCmsTextValue(missionSectionData.fields, 'Our Mission - Title') ??
              DEFAULT_MISSION_SECTION.title,
            description:
              getCmsTextValue(missionSectionData.fields, 'Our Mission - Description') ??
              DEFAULT_MISSION_SECTION.description,
            cards: MISSION_BOX_FIELD_KEYS.map((keys, index) => {
              const fallback = DEFAULT_MISSION_SECTION.cards[index] ?? DEFAULT_MISSION_SECTION.cards[0];

              return {
                icon: fallback.icon,
                title:
                  getCmsTextValue(missionSectionData.fields, keys.titleKey) ?? fallback.title,
                description:
                  getCmsTextValue(missionSectionData.fields, keys.descriptionKey) ??
                  fallback.description
              };
            })
            });
          }

          const communitySectionData = response.page.sections.find(
            (section) => section.name === 'Community Section' && section.type === 'single'
          );

          if (communitySectionData?.fields) {
            setCommunitySection({
              title: getCmsTextValue(communitySectionData.fields, 'Title') ?? DEFAULT_COMMUNITY_SECTION.title,
              heading:
                getCmsTextValue(communitySectionData.fields, 'Heading') ??
                DEFAULT_COMMUNITY_SECTION.heading,
              description:
                getCmsTextValue(communitySectionData.fields, 'Description') ??
                DEFAULT_COMMUNITY_SECTION.description,
              image: getCmsMediaUrl(communitySectionData.fields, 'Image') ?? DEFAULT_COMMUNITY_SECTION.image,
              imageDescription:
                getCmsTextValue(communitySectionData.fields, 'Image - Description') ??
                DEFAULT_COMMUNITY_SECTION.imageDescription,
              benefits: COMMUNITY_BOX_FIELD_KEYS.map((key, index) => {
                const fallback = DEFAULT_COMMUNITY_SECTION.benefits[index] ?? DEFAULT_COMMUNITY_SECTION.benefits[0];
                return getCmsTextValue(communitySectionData.fields, key) ?? fallback;
              })
            });
          }

          const storySectionData = response.page.sections.find(
            (section) => section.name === 'Our Story - Content' && section.type === 'single'
          );

          if (storySectionData?.fields) {
            setStorySection({
              title: getCmsTextValue(storySectionData.fields, 'Title') ?? DEFAULT_STORY_SECTION.title,
              heading:
                getCmsTextValue(storySectionData.fields, 'Heading') ?? DEFAULT_STORY_SECTION.heading,
              description:
                getCmsTextValue(storySectionData.fields, 'Description') ??
                DEFAULT_STORY_SECTION.description
            });
          }

          const storyTimeline = response.page.sections.find(
            (section) => section.name === 'Our Story' && section.type === 'repeater'
          );

          if (storyTimeline?.items?.length) {
            const entries = storyTimeline.items.map((item, index) => {
              const fallback = DEFAULT_TIMELINE[index % DEFAULT_TIMELINE.length];
              return {
                year: getCmsTextValue(item, 'Year') ?? fallback.year,
                title: getCmsTextValue(item, 'Title') ?? fallback.title,
                description: getCmsTextValue(item, 'Description') ?? fallback.description,
                image: getCmsMediaUrl(item, 'Image') ?? fallback.image
              };
            });

            setTimelineEntries(entries);
          }

          const commitmentSectionData = response.page.sections.find(
            (section) => section.name === 'Commitment Section' && section.type === 'single'
          );

          if (commitmentSectionData?.fields) {
            setCommitmentSection({
              title:
                getCmsTextValue(commitmentSectionData.fields, 'Title') ??
                DEFAULT_COMMITMENT_SECTION.title,
              descriptionHtml:
                getCmsHtmlValue(commitmentSectionData.fields, 'Description') ??
                DEFAULT_COMMITMENT_SECTION.descriptionHtml
            });
          }

          const collectiveSectionData = response.page.sections.find(
            (section) => section.name === 'Collective - Section' && section.type === 'single'
          );

          if (collectiveSectionData?.fields) {
            setCollectiveSection({
              title: getCmsTextValue(collectiveSectionData.fields, 'Title') ?? DEFAULT_COLLECTIVE_SECTION.title,
              heading:
                getCmsTextValue(collectiveSectionData.fields, 'heading') ??
                DEFAULT_COLLECTIVE_SECTION.heading,
              description:
                getCmsTextValue(collectiveSectionData.fields, 'Description') ??
                DEFAULT_COLLECTIVE_SECTION.description
            });
          }

          const teamSectionData = response.page.sections.find(
            (section) => section.name === 'Team Section' && section.type === 'repeater'
          );

          if (teamSectionData?.items?.length) {
            const members = teamSectionData.items.map((item, index) => {
              const fallback = DEFAULT_TEAM[index % DEFAULT_TEAM.length];

              return {
                name: getCmsTextValue(item, 'Title') ?? fallback.name,
                role: getCmsTextValue(item, 'Heading') ?? fallback.role,
                focus: getCmsTextValue(item, 'Description') ?? fallback.focus,
                image: getCmsMediaUrl(item, 'Image') ?? fallback.image
              };
            });

            setTeamMembers(members);
          }

          const impactSectionData = response.page.sections.find(
            (section) => section.name === 'Collective Impact - Section' && section.type === 'single'
          );

          if (impactSectionData?.fields) {
            const descriptionHtml =
              getCmsHtmlValue(impactSectionData.fields, 'Description') ??
              DEFAULT_IMPACT_SECTION.descriptionHtml ??
              null;

            setImpactSection({
              title:
                getCmsTextValue(impactSectionData.fields, 'Title') ??
                getCmsTextValue(impactSectionData.fields, 'Titile') ??
                DEFAULT_IMPACT_SECTION.title,
              heading:
                getCmsTextValue(impactSectionData.fields, 'Heading') ?? DEFAULT_IMPACT_SECTION.heading,
              description:
                getCmsTextValue(impactSectionData.fields, 'Description') ??
                DEFAULT_IMPACT_SECTION.description,
              descriptionHtml,
              cards: IMPACT_CARD_FIELDS.map((keys, index) => {
                const fallback = DEFAULT_IMPACT_SECTION.cards[index] ?? DEFAULT_IMPACT_SECTION.cards[0];
                const cardDescriptionHtml =
                  getCmsHtmlValue(impactSectionData.fields, keys.descriptionKey) ??
                  fallback.descriptionHtml ??
                  null;

                return {
                  icon: fallback.icon,
                  title:
                    getCmsTextValue(impactSectionData.fields, keys.titleKey) ?? fallback.title,
                  description:
                    getCmsTextValue(impactSectionData.fields, keys.descriptionKey) ??
                    fallback.description,
                  descriptionHtml: cardDescriptionHtml
                };
              })
            });
          }

          const labSectionData = response.page.sections.find(
            (section) => section.name === 'Ritual Lab - Section' && section.type === 'single'
          );

          if (labSectionData?.fields) {
            const labDescriptionHtml =
              getCmsHtmlValue(labSectionData.fields, 'Description') ??
              DEFAULT_LAB_SECTION.descriptionHtml ??
              null;
            const labTagLineHtml =
              getCmsHtmlValue(labSectionData.fields, 'Tag Line') ??
              DEFAULT_LAB_SECTION.tagLineHtml ??
              null;

            setLabSection({
              title: getCmsTextValue(labSectionData.fields, 'Title') ?? DEFAULT_LAB_SECTION.title,
              heading:
                getCmsTextValue(labSectionData.fields, 'Heading') ?? DEFAULT_LAB_SECTION.heading,
              description:
                getCmsTextValue(labSectionData.fields, 'Description') ??
                DEFAULT_LAB_SECTION.description,
              descriptionHtml: labDescriptionHtml,
              tagLine:
                getCmsTextValue(labSectionData.fields, 'Tag Line') ?? DEFAULT_LAB_SECTION.tagLine,
              tagLineHtml: labTagLineHtml,
              images: LAB_IMAGE_FIELD_KEYS.map((fieldKey, index) => {
                const fallback =
                  DEFAULT_LAB_SECTION.images[index] ?? DEFAULT_LAB_SECTION.images[0];
                return {
                  src: getCmsMediaUrl(labSectionData.fields, fieldKey) ?? fallback.src,
                  alt: fallback.alt
                };
              })
            });
          }

          if (isMounted) {
            setIsAboutContentReady(true);
          }
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Failed to load About content', error);
          }
        }
    };

    loadAboutContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const bannerContent = isAboutContentReady ? innerBanner : PLACEHOLDER_BANNER;
  const missionContent = isAboutContentReady ? missionSection : PLACEHOLDER_MISSION_SECTION;
  const communityContent = isAboutContentReady ? communitySection : PLACEHOLDER_COMMUNITY_SECTION;
  const storyContent = isAboutContentReady ? storySection : PLACEHOLDER_STORY_SECTION;
  const timelineContent = isAboutContentReady ? timelineEntries : PLACEHOLDER_TIMELINE;
  const commitmentContent = isAboutContentReady ? commitmentSection : PLACEHOLDER_COMMITMENT_SECTION;
  const collectiveContent = isAboutContentReady ? collectiveSection : PLACEHOLDER_COLLECTIVE_SECTION;
  const teamContent = isAboutContentReady ? teamMembers : PLACEHOLDER_TEAM;
  const impactContent = isAboutContentReady ? impactSection : PLACEHOLDER_IMPACT_SECTION;
  const labContent = isAboutContentReady ? labSection : PLACEHOLDER_LAB_SECTION;

  return (
    
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={bannerContent.image}
          alt={bannerContent.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/85 to-[#d5c0fa]/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">
            {bannerContent.eyeline}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {bannerContent.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {bannerContent.subtitle}
          </p>
        </div>
      </section>

      <section id="mission" className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {missionContent.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {missionContent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {missionContent.cards.map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-[#DC2E7C]" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
                <p className="text-sm tracking-[0.3em] uppercase text-purple-200">
                  {communityContent.title}
                </p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                {communityContent.heading}
              </h2>
              <p className="text-lg text-purple-100 leading-relaxed">
                {communityContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/shop"
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof window !== 'undefined') {
                        const path = '/shop';
                        if (window.location.pathname !== path) {
                          window.history.pushState({}, '', path);
                        }
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    }}
                    className="px-8 py-4 bg-white text-[#DC2E7C] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 text-center"
                  >
                  Start Shopping
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== 'undefined') {
                      const path = '/contact';
                      if (window.location.pathname !== path) {
                        window.history.pushState({}, '', path);
                      }
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  className="px-8 py-4 bg-white/20 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-white/30 transition-all duration-300 text-center border border-white/40"
                >
                  Talk to Our Team
                </a>
              </div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-purple-100">
                  {communityContent.benefits.map((benefit) => (
                    <li key={benefit} className="bg-white/10 rounded-2xl p-4 border border-white/15">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative h-72 sm:h-80 lg:h-[420px] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
                  <img
                    src={communityContent.image}
                    alt={communityContent.heading}
                    className="w-full h-full object-cover"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/15 backdrop-blur-md rounded-2xl p-5 text-sm text-purple-50 border border-white/20">
                    {communityContent.imageDescription}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

        <section id="story" className="py-20 bg-gradient-to-b from-[#f8daed] to-[#e4c6f8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-4">
                  {storyContent.title}
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {storyContent.heading}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {storyContent.description}
                </p>
              </div>
            <div className="space-y-6">
                {timelineContent.map((entry, index) => (
                  <div
                    key={`${entry.year}-${entry.title}-${index}`}
                    className="flex flex-col sm:flex-row gap-6 bg-white rounded-3xl shadow-lg overflow-hidden"
                  >
                    <div className="sm:w-48 h-48 shrink-0">
                      <img
                        src={entry.image}
                        alt={entry.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <p className="text-sm font-semibold text-purple-500 uppercase tracking-[0.25em]">
                      {entry.year}
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-900 mt-2 mb-3">
                      {entry.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="commitment" className="py-20 bg-gradient-to-b from-[#f8daed] to-[#e4c6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {commitmentContent.title}
          </h2>
          <div
            className="prose prose-lg mx-auto text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: commitmentContent.descriptionHtml }}
          />
        </div>
      </section>

        <section id="team" className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">
                {collectiveContent.title}
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {collectiveContent.heading}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {collectiveContent.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamContent.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-500">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section id="impact" className="py-20 bg-gradient-to-b from-[#f8daed] to-[#e4c6f8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-4">
                  {impactContent.title}
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {impactContent.heading}
                </h2>
                {impactContent.descriptionHtml ? (
                  <div
                    className="text-lg text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: impactContent.descriptionHtml }}
                  />
                ) : (
                  <p className="text-lg text-gray-600 leading-relaxed">{impactContent.description}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {impactContent.cards.map((initiative, index) => (
                  <div
                    key={`${initiative.title}-${index}`}
                    className="bg-white rounded-3xl p-6 shadow-lg ring-1 ring-purple-100 flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                      <initiative.icon className="h-6 w-6 text-[#DC2E7C]" />
                    </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{initiative.title}</h3>
                    {initiative.descriptionHtml ? (
                      <div
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: initiative.descriptionHtml }}
                      />
                    ) : (
                      <p className="text-sm text-gray-600 leading-relaxed">{initiative.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lab" className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500">{labContent.title}</p>
              <h2 className="text-4xl font-bold text-gray-900">{labContent.heading}</h2>
              {labContent.descriptionHtml ? (
                <div
                  className="text-lg text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: labContent.descriptionHtml }}
                />
              ) : (
                <p className="text-lg text-gray-600 leading-relaxed">{labContent.description}</p>
              )}
              <div className="flex items-center gap-4">
                <Sun className="h-10 w-10 text-purple-500" />
                {labContent.tagLineHtml ? (
                  <div
                    className="text-sm uppercase tracking-[0.3em] text-gray-500"
                    dangerouslySetInnerHTML={{ __html: labContent.tagLineHtml }}
                  />
                ) : (
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-500">{labContent.tagLine}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {labContent.images.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className={`rounded-3xl overflow-hidden shadow-xl ${
                    index === labContent.images.length - 1 ? 'col-span-2' : ''
                  }`}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


