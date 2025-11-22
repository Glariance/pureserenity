import { useEffect, useState } from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import showToast from '../lib/toast';
import { apiClient } from '../lib/apiClient';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [footerDescription, setFooterDescription] = useState(
    'Curated rituals for your modern sanctuary. Our team tests every recommendation so you can invest in wellness pieces with confidence.',
  );
  const [contactEmail, setContactEmail] = useState('hello@pureserenityshop.com');
  const [socialLinks, setSocialLinks] = useState<{ facebook?: string; instagram?: string; twitter?: string; linkedin?: string; youtube?: string }>({});

  const apiEnv = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://admin.pureserenityshop.com').replace(/\/+$/, '');
  const newsletterEndpoint = apiEnv.match(/\/api$/) ? `${apiEnv}/newsletter` : `${apiEnv}/api/newsletter`;

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const { data } = await apiClient.get('/contact/page');
        const settings = data?.settings || {};

        const normalizeKey = (key: string) => {
          const found = Object.keys(settings).find((k) => k.toLowerCase() === key.toLowerCase());
          return found ? settings[found] : undefined;
        };

        const description = normalizeKey('footer_description') || normalizeKey('footer_text') || normalizeKey('about_footer');
        if (description) {
          setFooterDescription(String(description));
        }
        const email =
          normalizeKey('contact_email') ||
          normalizeKey('email') ||
          normalizeKey('support_email') ||
          normalizeKey('contact-email') ||
          normalizeKey('support-email');
        if (email) {
          setContactEmail(String(email));
        }

        const tryParseJson = (val: any) => {
          if (!val || typeof val !== 'string') return null;
          try {
            return JSON.parse(val);
          } catch {
            return null;
          }
        };

        const socialsObj =
          tryParseJson(normalizeKey('social_links')) ||
          tryParseJson(normalizeKey('socials')) ||
          tryParseJson(normalizeKey('social')) ||
          null;

        const mergedSocials = {
          facebook: normalizeKey('facebook') || normalizeKey('facebook_link') || socialsObj?.facebook || socialsObj?.fb,
          instagram: normalizeKey('instagram') || normalizeKey('instagram_link') || socialsObj?.instagram || socialsObj?.ig,
          twitter: normalizeKey('twitter') || normalizeKey('twitter_link') || socialsObj?.twitter || socialsObj?.x,
          linkedin: normalizeKey('linkedin') || normalizeKey('linkedin_link') || socialsObj?.linkedin,
          youtube: normalizeKey('youtube') || normalizeKey('youtube_link') || socialsObj?.youtube,
        };

        setSocialLinks(mergedSocials);
      } catch (err: any) {
        // non-fatal; keep defaults
        if (err?.message) {
          showToast('error', err.message);
        }
      }
    };

    loadFooterData();
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      const msg = 'Please enter an email address.';
      setStatus({ type: 'error', message: msg });
      showToast('error', msg);
      return;
    }
    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await fetch(newsletterEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data.errors) {
        const validationMessages = data?.errors
          ? Object.values<string[]>(data.errors).flat().join(' ')
          : '';
        const message = validationMessages || data?.message || 'Subscription failed.';
        throw new Error(message);
      }
      const successMsg = data.success || 'Subscribed successfully!';
      setStatus({ type: 'success', message: successMsg });
      setEmail('');
      showToast('success', successMsg);
    } catch (err: any) {
      const msg = err?.message || 'Subscription failed.';
      setStatus({ type: 'error', message: msg });
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Pets', page: 'pets' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  const resources = [
    { label: 'Affiliate Disclosure', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Shipping & Returns', href: '#' }
  ];

  return (
    <footer className="relative bg-[#F8DAED] border-t border-pink-200/60 overflow-hidden">
      <img
        src="assets/images/footer-image.jpg"
        alt="Pets relaxing in a serene space"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#F8DAED]/80 pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div>
            <img
              src="assets/images/pureSerenity.png"
              alt="Pure Serenity Shop"
              className="h-24 w-auto mb-6 mx-auto lg:mx-0 lg:ml-6"
            />
            <p className="text-sm text-[#DC2E7C]/80 leading-relaxed">
              {footerDescription}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#DC2E7C]/70">
              <Heart className="h-4 w-4 text-pink-500" />
              Thoughtfully curated since 2019
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#DC2E7C] mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-[#DC2E7C]/80">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {onNavigate ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(link.page)}
                      className="hover:text-[#DC2E7C] transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={`#${link.page}`}
                      className="hover:text-[#DC2E7C] transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#DC2E7C] mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-[#DC2E7C]/80">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    className="hover:text-[#DC2E7C] transition-colors"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#DC2E7C] mb-4">Subscribe</h3>
            <p className="text-sm text-[#DC2E7C]/80 leading-relaxed mb-4">
              Join the Pure Notes newsletter for weekly rituals, playlists, and early access to exclusive edits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white/70 text-sm text-[#DC2E7C] placeholder:text-pink-400 border border-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading || !email.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-purple-600 text-white text-sm font-semibold shadow-md hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Join'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {status.type && (
              <div className="mt-3 inline-flex items-center gap-2 text-sm">
                {status.type === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={status.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                  {status.message}
                </span>
              </div>
            )}
            <p className="text-xs text-[#DC2E7C]/60 mt-3">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-pink-200/60 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-[#DC2E7C]/70">
            <span>Pure Serenity © {new Date().getFullYear()}</span>
            <span className="hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onNavigate?.('contact')}
              className="hover:text-[#DC2E7C] transition-colors"
            >
              Contact Us
            </button>
            <span className="hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onNavigate?.('privacy')}
              className="hover:text-[#DC2E7C] transition-colors"
            >
              Privacy Policy
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.facebook || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#DC2E7C]/80 hover:text-[#DC2E7C] hover:shadow-md transition-all duration-300"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.instagram || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#DC2E7C]/80 hover:text-[#DC2E7C] hover:shadow-md transition-all duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={socialLinks.twitter || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#DC2E7C]/80 hover:text-[#DC2E7C] hover:shadow-md transition-all duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#DC2E7C]/80 hover:text-[#DC2E7C] hover:shadow-md transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
