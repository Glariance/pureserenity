import { useEffect, useState } from 'react';
import { apiClient } from '../lib/apiClient';
import showToast from '../lib/toast';

interface PolicyItem {
  title: string;
  body: string;
}

export default function Privacy() {
  const [bannerEyebrow, setBannerEyebrow] = useState('Privacy Policy');
  const [bannerTitle, setBannerTitle] = useState('Privacy & Data Care');
  const [bannerSubtitle, setBannerSubtitle] = useState(
    'We honor your privacy as carefully as we curate your wellness routine. Explore how we collect, safeguard, and use your information.',
  );
  const [bannerImage, setBannerImage] = useState('assets/images/banner3.jpg');
  const [policySections, setPolicySections] = useState<PolicyItem[]>([]);
  const [footerHeading, setFooterHeading] = useState('Need More Details?');
  const [footerDescription, setFooterDescription] = useState(
    'Email our privacy team at privacy@pureserenityshop.com and we will respond within two business days.',
  );
  const [footerEmail, setFooterEmail] = useState('privacy@pureserenityshop.com');

  useEffect(() => {
    const decode = (val: string) =>
      val.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

    const loadPrivacy = async () => {
      try {
        const { data } = await apiClient.get('/privacy');

        if (data?.page?.sections) {
          const banner = data.page.sections.find((s: any) => {
            const name = (s.name ?? '').toLowerCase();
            return name === 'privacy policy banner' || name.includes('banner');
          });

          if (banner?.fields) {
            const eyebrow = banner.fields['Title']?.value || banner.fields['Eyebrow']?.value;
            const title = banner.fields['Heading']?.value || banner.fields['Title']?.value;
            const subtitle = banner.fields['Description']?.value;
            const image = banner.fields['Banner image']?.url || banner.fields['Banner Image']?.url;
            if (eyebrow) setBannerEyebrow(eyebrow);
            if (title) setBannerTitle(title);
            if (subtitle) setBannerSubtitle(decode(subtitle.replace(/<[^>]+>/g, '')));
            if (image) setBannerImage(image);
          }

          const repeater =
            data.page.sections.find(
              (s: any) => (s.type ?? '').toLowerCase() === 'repeater' && (s.name ?? '').toLowerCase() === 'privacy policy',
            ) ||
            data.page.sections.find((s: any) => (s.type ?? '').toLowerCase() === 'repeater');
          const singles = data.page.sections.filter((s: any) => (s.type ?? '').toLowerCase() === 'single');

          const collected: PolicyItem[] = [];

          if (repeater?.items && Array.isArray(repeater.items)) {
            repeater.items.forEach((item: any) => {
              const title = item['Title']?.value || item['Heading']?.value || '';
              const body = item['Description']?.value || item['Body']?.value || '';
              if (title || body) {
                collected.push({
                  title: decode(title.replace(/<[^>]+>/g, '')),
                  body: decode(body.replace(/<[^>]+>/g, '')),
                });
              }
            });
          }

          if (!collected.length && singles?.length) {
            singles.forEach((section: any) => {
              if (section.fields) {
                const title = section.fields['Heading']?.value || section.fields['Title']?.value || '';
                const body = section.fields['Description']?.value || '';
                if (title || body) {
                  collected.push({
                    title: decode(title.replace(/<[^>]+>/g, '')),
                    body: decode(body.replace(/<[^>]+>/g, '')),
                  });
                }
              }
            });
          }

          if (collected.length) {
            setPolicySections(collected);
          }

          const details = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'details section');
          if (details?.fields) {
            const dh = details.fields['Heading']?.value;
            const dd = details.fields['Description']?.value;
            if (dh) setFooterHeading(dh);
            if (dd) setFooterDescription(decode(dd.replace(/<[^>]+>/g, '')));
          }
        }

        // Optionally pull privacy email from settings if present
        const settings = data?.settings || {};
        const email =
          settings.privacy_email ||
          settings.contact_email ||
          settings.email ||
          settings.Email ||
          settings.support_email ||
          settings['contact-email'] ||
          settings['support-email'];
        if (email) {
          setFooterEmail(String(email));
          if (footerDescription.includes('privacy@pureserenityshop.com')) {
            setFooterDescription((prev) => prev.replace(/privacy@pureserenityshop\.com/gi, String(email)));
          }
        }
      } catch (err: any) {
        showToast('error', err?.message || 'Failed to load privacy policy.');
      }
    };

    loadPrivacy();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#d5c0fa]">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src={bannerImage}
          alt={bannerTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/80 to-[#d5c0fa]/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">{bannerEyebrow}</p>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl leading-tight">
            {bannerTitle}
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed">
            {bannerSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16">
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl px-8 py-10 space-y-8">
          {(policySections.length ? policySections : [{
            title: 'Our Commitment to Your Privacy',
            body:
              'Pure Serenity collects only the information needed to fulfill your orders, personalize recommendations, and keep you informed about new rituals. We never sell or rent your personal data to third parties.'
          }]).map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="text-2xl font-semibold text-[#5F4D8B]">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
        </section>

        <footer className="text-center bg-white/80 backdrop-blur rounded-3xl shadow-lg px-6 py-8 space-y-4">
          <h3 className="text-xl font-semibold text-[#DC2E7C]">{footerHeading}</h3>
          <p className="text-gray-600">
            {footerDescription}
            {!footerDescription.toLowerCase().includes(footerEmail.toLowerCase()) && (
              <>
                {' '}
                <a
                  href={`mailto:${footerEmail}`}
                  className="text-[#5F4D8B] font-medium hover:text-[#DC2E7C] transition-colors"
                >
                  {footerEmail}
                </a>
              </>
            )}
          </p>
        </footer>
      </div>
    </div>
  );
}
