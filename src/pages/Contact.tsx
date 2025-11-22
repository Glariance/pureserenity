import { useEffect, useState } from 'react';
import { Mail, MessageCircle, Send, PhoneCall, Clock, MapPin, Camera, ArrowRight } from 'lucide-react';
import { submitContact } from '../lib/storefront';
import showToast from '../lib/toast';
import { apiClient } from '../lib/apiClient';

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactField {
  name: keyof ContactSubmission;
  label: string;
  placeholder: string;
  type: 'text' | 'email';
  optional?: boolean;
}

const CONTACT_FIELDS: ContactField[] = [
  {
    name: 'name',
    label: 'Your Name',
    placeholder: 'John Doe',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'john@example.com',
    type: 'email'
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'How can we support you?',
    type: 'text',
    optional: true
  }
];

const createInitialFormState = (): ContactSubmission => ({
  name: '',
  email: '',
  subject: '',
  message: ''
});

export default function Contact() {
  const [formData, setFormData] = useState<ContactSubmission>(createInitialFormState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [getInTouchHeading, setGetInTouchHeading] = useState('Get in Touch');
  const [getInTouchDescription, setGetInTouchDescription] = useState(
    "We'd love to hear from you. Send us a message and we'll respond as soon as possible."
  );
  const [heroLabel, setHeroLabel] = useState('We’re here to help');
  const [heroTitle, setHeroTitle] = useState('Let’s talk about your wellness journey');
  const [heroSubtitle, setHeroSubtitle] = useState(
    'Reach out for personalized recommendations, partnership inquiries, or support with your order.'
  );
  const [heroImage, setHeroImage] = useState('assets/images/banner3.jpg');
  const [contactEmail, setContactEmail] = useState('hello@pureserenityshop.com');
  const [contactPhone, setContactPhone] = useState('(333) 555-0192');
  const [socials, setSocials] = useState<{ facebook?: string; instagram?: string; twitter?: string; linkedin?: string }>({});
  const [supportTitle, setSupportTitle] = useState('Need a faster reply?');
  const [supportHeading, setSupportHeading] = useState('Our support guides are ready to help');
  const [supportDescription, setSupportDescription] = useState(
    'Whether you are designing a wellness retreat, planning corporate gifting, or selecting your first ritual kit, the concierge team has hands-on experience with every product in the shop.'
  );
  const [supportHighlights, setSupportHighlights] = useState<
    Array<{ title: string; detail: string }>
  >([
    { title: 'Text Concierge', detail: 'Message us at (333) 555-0192 for quick wellness recommendations.' },
    { title: 'Support Hours', detail: 'Monday-Friday: 9am-6pm EST | Saturday: 10am-2pm EST' },
    { title: 'Ritual Studio', detail: 'Book a private shopping appointment at our Brooklyn loft.' },
  ]);
  const [supportImageTitle, setSupportImageTitle] = useState('Studio Hours');
  const [supportImageDescription, setSupportImageDescription] = useState(
    'Visit us by appointment for sensory testing sessions.'
  );
  const [supportImage, setSupportImage] = useState('assets/images/about-people1.jpg');
  const [supportCtaDescription, setSupportCtaDescription] = useState(
    "Whether you need product recommendations or have inquiries about our affiliate partnerships, we're here to help!"
  );

  const [faqTitle, setFaqTitle] = useState('FAQ');
  const [faqHeading, setFaqHeading] = useState('Questions we get from the Pure Serenity community');
  const [faqDescription, setFaqDescription] = useState(
    'Click below to see how we handle custom orders, collaborations, and support timelines.'
  );
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([
    {
      question: 'How soon will I hear back after submitting the form?',
      answer:
        'We respond within two business days. For urgent requests, text us using the concierge line and note your order number.',
    },
    {
      question: 'Do you offer custom curated boxes?',
      answer:
        'Yes! Share a few details about the recipient or occasion and our team will send 3 tailored bundles to choose from.',
    },
    {
      question: 'Can I pitch my wellness brand for collaboration?',
      answer:
        'Absolutely. Tell us about your product story and sustainability practices - our curation team reviews submissions weekly.',
    },
  ]);
  const [innerTitle, setInnerTitle] = useState('Inner Studio');
  const [innerHeading, setInnerHeading] = useState('Where every Pure Serenity recommendation comes to life');
  const [innerDescription, setInnerDescription] = useState(
    'Visit our Brooklyn ritual lab or schedule a virtual tour to see how we sample fragrances, test textures, and curate sensory playlists before sharing them with you.'
  );
  const [innerListHeading, setInnerListHeading] = useState("What you'll experience");
  const [innerList, setInnerList] = useState<string[]>([
    'Hands-on testing tables for textures, aromatherapy, and soundscapes.',
    'Weekly guest healers sharing live meditations and ritual demos.',
    'Playlist curation corner featuring analog mixers and vinyl for ambient layering.',
  ]);
  const [innerImage, setInnerImage] = useState('assets/images/about-people1.jpg');

  const isFormValid =
    formData.name.trim().length > 1 &&
    formData.email.trim().length > 3 &&
    formData.message.trim().length > 10;

  useEffect(() => {
    const loadContactPage = async () => {
      try {
        const { data } = await apiClient.get('/contact/page');

        const decodeHtml = (val: string) =>
          val.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

        if (data?.page?.sections) {
          const banner = data.page.sections.find((s: any) => {
            const name = (s.name ?? '').toLowerCase();
            return name === 'contact page banner' || name === 'contact banner' || name === 'contact hero';
          });
          const innerStudio = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'inner studio section');
          const getInTouch = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'get in touch');
          const supportGuide = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'support guide section');
          const faqContent = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'faq content');
          const faqRepeater = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'faq');
          const communitySection = data.page.sections.find((s: any) => (s.name ?? '').toLowerCase() === 'community section');
          if (banner?.fields) {
            const label = banner.fields['Title']?.value;
            const title = banner.fields['Heading']?.value || banner.fields['Title']?.value;
            const subtitle = banner.fields['Description']?.value;
            const image = banner.fields['Banner Image']?.url;
            if (label) setHeroLabel(label);
            if (title) setHeroTitle(title);
            if (subtitle) setHeroSubtitle(decodeHtml(subtitle.replace(/<[^>]+>/g, '')));
            if (image) setHeroImage(image);
          }
          if (innerStudio?.fields) {
            const t = innerStudio.fields['Title']?.value;
            const h = innerStudio.fields['Heading']?.value;
            const d = innerStudio.fields['Description']?.value;
            const d2 = innerStudio.fields['Description 2']?.value;
            const h2 = innerStudio.fields['Heading 2']?.value;
            const img = innerStudio.fields['Image']?.url;
            if (t) setInnerTitle(t);
            if (h) setInnerHeading(h);
            if (d) setInnerDescription(decodeHtml(d.replace(/<[^>]+>/g, '')));
            if (h2) setInnerListHeading(h2);
            if (img) setInnerImage(img);

            const listItems: string[] = [];
            if (d2) {
              const matches = Array.from(d2.matchAll(/<li[^>]*>(.*?)<\/li>/gi));
              if (matches.length) {
                matches.forEach((m) => listItems.push(m[1].replace(/<[^>]+>/g, '').trim()));
              }
            }
            if (h2 && !listItems.length) {
              listItems.push(h2);
            }
            if (!listItems.length && d2) {
              listItems.push(d2.replace(/<[^>]+>/g, '').trim());
            }
            if (listItems.length) setInnerList(listItems);
          }
          if (getInTouch?.fields) {
            const heading = getInTouch.fields['Heading']?.value;
            const desc = getInTouch.fields['Description']?.value;
            if (heading) setGetInTouchHeading(heading);
            if (desc) setGetInTouchDescription(decodeHtml(desc.replace(/<[^>]+>/g, '')));
          }
          if (supportGuide?.fields) {
            const sTitle = supportGuide.fields['Title']?.value;
            const sHeading = supportGuide.fields['Heading']?.value;
            const sDesc = supportGuide.fields['Description']?.value;
            if (sTitle) setSupportTitle(sTitle);
            if (sHeading) setSupportHeading(sHeading);
            if (sDesc) setSupportDescription(sDesc.replace(/<[^>]+>/g, ''));

            const highlights: Array<{ title: string; detail: string }> = [];
            const contactH = supportGuide.fields['Contact Heading']?.value;
            const contactD = supportGuide.fields['Contact Description']?.value;
            const timeH = supportGuide.fields['Time Heading']?.value;
            const timeD = supportGuide.fields['Time Description']?.value;
            const locH = supportGuide.fields['Location Heading']?.value;
            const locD = supportGuide.fields['Location Description']?.value;
            const responseTime = supportGuide.fields['Response Time']?.value;

            if (contactH || contactD) {
              highlights.push({
                title: contactH || 'Text Concierge',
                detail: (contactD || '').replace(/<[^>]+>/g, ''),
              });
            }
            if (timeH || timeD || responseTime) {
              highlights.push({
                title: timeH || 'Support Hours',
                detail: responseTime
                  ? responseTime.replace(/<[^>]+>/g, '')
                  : (timeD || '').replace(/<[^>]+>/g, ''),
              });
            }
            if (locH || locD) {
              highlights.push({
                title: locH || 'Ritual Studio',
                detail: (locD || '').replace(/<[^>]+>/g, ''),
              });
            }
            if (highlights.length) {
              setSupportHighlights(highlights);
            }

            const imgTitle = supportGuide.fields['Image Title']?.value;
            const imgDesc = supportGuide.fields['Image Description']?.value;
            const imgUrl = supportGuide.fields['Image']?.url;
            if (imgTitle) setSupportImageTitle(imgTitle);
            if (imgDesc) setSupportImageDescription(imgDesc.replace(/<[^>]+>/g, ''));
            if (imgUrl) setSupportImage(imgUrl);

            const ctaDesc = supportGuide.fields['Have Questions']?.value;
            if (ctaDesc) setSupportCtaDescription(ctaDesc.replace(/<[^>]+>/g, ''));
          }

          if (faqContent?.fields) {
            const fTitle = faqContent.fields['Title']?.value;
            const fHeading = faqContent.fields['Heading']?.value;
            const fDesc = faqContent.fields['Description']?.value;
            if (fTitle) setFaqTitle(fTitle);
            if (fHeading) setFaqHeading(fHeading);
            if (fDesc) setFaqDescription(fDesc.replace(/<[^>]+>/g, ''));
          }

          if (faqRepeater?.items && Array.isArray(faqRepeater.items)) {
            const parsedFaqs: Array<{ question: string; answer: string }> = faqRepeater.items.map((item: any) => ({
              question: item['Question']?.value ? item['Question'].value.replace(/<[^>]+>/g, '') : '',
              answer: item['Answer']?.value ? item['Answer'].value.replace(/<[^>]+>/g, '') : '',
            }));
            const filtered = parsedFaqs.filter((f) => f.question || f.answer);
            if (filtered.length) setFaqs(filtered);
          }

          if (communitySection?.fields) {
            const cTitle = communitySection.fields['Title']?.value;
            const cHeading = communitySection.fields['Heading']?.value;
            const cDesc = communitySection.fields['Description']?.value;
            if (cTitle) setCommunityTitle(cTitle);
            if (cHeading) setCommunityHeading(cHeading);
            if (cDesc) setCommunityDescription(cDesc.replace(/<[^>]+>/g, ''));

            const showcase: Array<{ image: string; caption: string }> = [];
            for (let i = 1; i <= 3; i += 1) {
              const img = communitySection.fields[`Image ${i}`]?.url;
              const caption = communitySection.fields[`Image Text ${i}`]?.value;
              if (img || caption) {
                showcase.push({
                  image: img || 'assets/images/placeholder.jpg',
                  caption: caption ? caption.replace(/<[^>]+>/g, '') : '',
                });
              }
            }
            if (showcase.length) setSocialShowcase(showcase);
          }
        }

        if (data?.settings) {
          const settings = data.settings;
          const email =
            settings.contact_email ||
            settings.email ||
            settings.Email ||
            settings.support_email ||
            settings['contact-email'] ||
            settings['support-email'];
          const phone =
            settings.contact_phone ||
            settings.phone ||
            settings.Phone ||
            settings.support_phone ||
            settings['contact-phone'] ||
            settings['support-phone'];
          if (email) setContactEmail(email);
          if (phone) setContactPhone(phone);
          setSocials({
            facebook: settings.facebook || settings.facebook_link,
            instagram: settings.instagram || settings.instagram_link,
            twitter: settings.twitter || settings.twitter_link,
            linkedin: settings.linkedin || settings.linkedin_link,
          });
        }
      } catch (err: any) {
        showToast('error', err?.message || 'Failed to load contact page.');
      }
    };

    loadContactPage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const response = await submitContact(formData);
      const message = response.message ?? "Thank you for reaching out. We'll get back to you soon.";
      setFormData(createInitialFormState());
      setFeedback({ type: 'success', message });
      showToast('success', message);
    } catch (err) {
      const parseErrorMessage = (): string => {
        if (err && typeof err === 'object' && 'response' in err) {
          const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } })
            .response;
          const validationMessages = response?.data?.errors ? Object.values(response.data.errors).flat() : [];
          return (
            validationMessages.join(' ') ||
            response?.data?.message ||
            'Unable to send your message right now. Please try again.'
          );
        }

        return err instanceof Error
          ? err.message
          : 'Unable to send your message right now. Please try again.';
      };

      const message = parseErrorMessage();
      setFeedback({ type: 'error', message });
      showToast('error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (feedback?.type === 'error') {
      setFeedback(null);
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const supportIcons = [PhoneCall, Clock, MapPin];

  const [communityTitle, setCommunityTitle] = useState('Studio Socials');
  const [communityHeading, setCommunityHeading] = useState('Peek behind the scenes');
  const [communityDescription, setCommunityDescription] = useState(
    'Follow along @PureSerenityShop for weekly ritual inspiration, playlists, and live product testing.'
  );
  const [socialShowcase, setSocialShowcase] = useState<
    Array<{ image: string; caption: string }>
  >([
    { image: 'assets/images/serim2.jpg', caption: 'Tea tasting hour inside the Pure Serenity studio.' },
    { image: 'assets/images/serim3.jpg', caption: 'New aromatherapy collection landing soon.' },
    { image: 'assets/images/shop7.jpg', caption: 'Community journaling circle every Thursday.' },
  ]);

  const primarySocial =
    socials.instagram ||
    socials.facebook ||
    socials.twitter ||
    socials.linkedin ||
    '#';

const renderFieldLabel = (field: ContactField) => (
  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
    {field.label} {field.optional ? <span className="text-gray-400">(optional)</span> : null}
  </label>
);

  const scrollToForm = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const formElement = document.getElementById('contact-form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#d5c0fa]">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Contact Pure Serenity Shop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/85 to-[#d5c0fa]/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">{heroLabel}</p>
          <h1 className="text-4xl font-bold text-gray-900">{heroTitle}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {getInTouchHeading}
          </h2>
          <p className="text-xl text-gray-600">
            {getInTouchDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-200">
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                {feedback ? (
                  <div
                    className={`rounded-xl px-4 py-3 text-sm border ${
                      feedback.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span>{feedback.message}</span>
                      <button
                        type="button"
                        onClick={() => setFeedback(null)}
                        className="text-xs uppercase tracking-widest text-current/70 hover:text-current font-semibold"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ) : null}

                {CONTACT_FIELDS.map((field) => (
                  <div key={field.name}>
                    {renderFieldLabel(field)}
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={!field.optional}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Share as much detail as possible so we can route your request to the right guide quickly.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full px-6 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up animation-delay-400">
            <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#DC2E7C]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Us
              </h3>
              <a
                href={`mailto:${contactEmail}`}
                className="text-[#DC2E7C] hover:text-[#b82066] transition-colors"
              >
                {contactEmail}
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-[#DC2E7C]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Response Time
              </h3>
              <p className="text-gray-600">
                We typically respond within 24-48 hours
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">
                Have Questions?
              </h3>
              <p className="text-purple-100 text-sm">
                {supportCtaDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 relative h-[45vh] min-h-[320px] overflow-hidden">
        <img
          src={innerImage}
          alt={innerTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4c1d95]/85 via-[#7c3aed]/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
          <div className="max-w-xl space-y-5">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-100">{innerTitle}</p>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              {innerHeading}
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed">
              {innerDescription}
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#support"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#DC2E7C] rounded-full font-semibold shadow-lg hover:bg-purple-50 transition-all duration-300"
              >
                Plan a Studio Visit
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                Send Us a Note
                <Send className="h-4 w-4" />
              </button>
            </div> */}
          </div>
          <div className="hidden lg:block max-w-md text-sm text-purple-100 bg-white/15 border border-white/20 rounded-3xl p-6 backdrop-blur-md">
            <p className="font-semibold uppercase tracking-[0.2em] mb-3">{innerListHeading}</p>
            <ul className="space-y-3 leading-relaxed">
              {innerList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    

      <section id="support" className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 space-y-8">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500">{supportTitle}</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {supportHeading}
              </h2>
              <p className="text-lg text-gray-600">
                {supportDescription}
              </p>
              <div className="space-y-4">
                {supportHighlights.map((highlight, idx) => {
                  const Icon = supportIcons[idx % supportIcons.length];
                  return (
                    <div key={highlight.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#DC2E7C] flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{highlight.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300">
                Schedule a call
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={supportImage}
                alt={supportImageTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-700/40 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-purple-200">{supportImageTitle}</p>
                <p className="text-xl font-semibold">{supportImageDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">{faqTitle}</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {faqHeading}
          </h2>
          <p className="text-lg text-gray-600">
            {faqDescription}
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-[#DC2E7C] font-semibold text-xl">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

  <section className="mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white space-y-6">
              <div className="flex items-center gap-3">
                <Camera className="h-8 w-8" />
                <p className="text-sm uppercase tracking-[0.3em] text-purple-100">{communityTitle}</p>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                {communityHeading}
              </h2>
              <p className="text-lg text-purple-100 leading-relaxed">
                {communityDescription}
              </p>
              {/* <a
                href={primarySocial}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#DC2E7C] rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                Join the community
                <ArrowRight className="h-4 w-4" />
              </a> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {socialShowcase.map((item) => (
                <div key={item.caption || item.image} className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs text-white leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
