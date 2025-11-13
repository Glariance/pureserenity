import { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  PhoneCall,
  Clock,
  MapPin,
  Camera,
  ArrowRight
} from 'lucide-react';
import { submitContact } from '../lib/storefront';

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await submitContact(formData);
      setSubmitted(true);
      setSuccessMessage(response.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }).response;
        const validationMessages = response?.data?.errors
          ? Object.values(response.data.errors).flat()
          : [];
        const fallbackMessage =
          response?.data?.message ?? 'Unable to send your message right now. Please try again.';
        setErrorMessage(validationMessages.length > 0 ? validationMessages.join(' ') : fallbackMessage);
      } else {
        const fallback =
          err instanceof Error
            ? err.message
            : 'Unable to send your message right now. Please try again.';
        setErrorMessage(fallback);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const supportHighlights = [
    {
      icon: PhoneCall,
      title: 'Text Concierge',
      detail: 'Message us at (333) 555-0192 for quick wellness recommendations.'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      detail: 'Monday-Friday: 9am-6pm EST | Saturday: 10am-2pm EST'
    },
    {
      icon: MapPin,
      title: 'Ritual Studio',
      detail: 'Book a private shopping appointment at our Brooklyn loft.'
    }
  ];

  const faqs = [
    {
      question: 'How soon will I hear back after submitting the form?',
      answer: 'We respond within two business days. For urgent requests, text us using the concierge line and note your order number.'
    },
    {
      question: 'Do you offer custom curated boxes?',
      answer: 'Yes! Share a few details about the recipient or occasion and our team will send 3 tailored bundles to choose from.'
    },
    {
      question: 'Can I pitch my wellness brand for collaboration?',
      answer: 'Absolutely. Tell us about your product story and sustainability practices - our curation team reviews submissions weekly.'
    }
  ];

  const socialShowcase = [
    {
      image: 'assets/images/serim2.jpg',
      caption: 'Tea tasting hour inside the Pure Serenity studio.'
    },
    {
      image: 'assets/images/serim3.jpg',
      caption: 'New aromatherapy collection landing soon.'
    },
    {
      image: 'assets/images/shop7.jpg',
      caption: 'Community journaling circle every Thursday.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#d5c0fa]">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src="assets/images/banner3.jpg"
          alt="Contact Pure Serenity Shop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/85 to-[#d5c0fa]/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">We’re here to help</p>
          <h1 className="text-4xl font-bold text-gray-900">Let’s talk about your wellness journey</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Reach out for personalized recommendations, partnership inquiries, or support with your order.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-200">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {successMessage ?? "Thank you for reaching out. We'll get back to you soon."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSuccessMessage(null);
                      setErrorMessage(null);
                    }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="How can we support you?"
                    />
                  </div>

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
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
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
              )}
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
                href="mailto:hello@pureserenityshop.com"
                className="text-[#DC2E7C] hover:text-[#b82066] transition-colors"
              >
                hello@pureserenityshop.com
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
                Whether you need product recommendations or have inquiries about our affiliate partnerships, we're here to help!
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 relative h-[45vh] min-h-[320px] overflow-hidden">
        <img
          src="assets/images/contact-innerbanner.jpg"
          alt="Inside the Pure Serenity ritual studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4c1d95]/85 via-[#7c3aed]/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
          <div className="max-w-xl space-y-5">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-100">Inner Studio</p>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              Where every Pure Serenity recommendation comes to life
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed">
              Visit our Brooklyn ritual lab or schedule a virtual tour to see how we sample fragrances, test textures, and curate sensory playlists before sharing them with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#support"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#DC2E7C] rounded-full font-semibold shadow-lg hover:bg-purple-50 transition-all duration-300"
            >
                Plan a Studio Visit
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                Send Us a Note
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="hidden lg:block max-w-md text-sm text-purple-100 bg-white/15 border border-white/20 rounded-3xl p-6 backdrop-blur-md">
            <p className="font-semibold uppercase tracking-[0.2em] mb-3">What you'll experience</p>
            <ul className="space-y-3 leading-relaxed">
              <li>Hands-on testing tables for textures, aromatherapy, and soundscapes.</li>
              <li>Weekly guest healers sharing live meditations and ritual demos.</li>
              <li>Playlist curation corner featuring analog mixers and vinyl for ambient layering.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="support" className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 space-y-8">
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500">Need a faster reply?</p>
              <h2 className="text-3xl font-bold text-gray-900">
                Our support guides are ready to help
              </h2>
              <p className="text-lg text-gray-600">
                Whether you are designing a wellness retreat, planning corporate gifting, or selecting your first ritual kit,
                the concierge team has hands-on experience with every product in the shop.
              </p>
              <div className="space-y-4">
                {supportHighlights.map((highlight) => (
                <div key={highlight.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#DC2E7C] flex items-center justify-center shrink-0">
                      <highlight.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{highlight.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300">
                Schedule a call
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative overflow-hidden">
              <img
                src="assets/images/about-people1.jpg"
                alt="Pure Serenity support lounge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-700/40 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-purple-200">Studio Hours</p>
                <p className="text-xl font-semibold">Visit us by appointment for sensory testing sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions we get from the Pure Serenity community
          </h2>
          <p className="text-lg text-gray-600">
            Click below to see how we handle custom orders, collaborations, and support timelines.
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
                <p className="text-sm uppercase tracking-[0.3em] text-purple-100">Studio Socials</p>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">Peek behind the scenes</h2>
              <p className="text-lg text-purple-100 leading-relaxed">
                Follow along @PureSerenityShop for weekly ritual inspiration, playlists, and live product testing.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#DC2E7C] rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                Join the community
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {socialShowcase.map((moment) => (
                <div key={moment.caption} className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs text-white leading-relaxed">
                    {moment.caption}
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
