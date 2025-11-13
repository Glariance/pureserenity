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

export default function About() {
  const innerBanner = {
    title: 'About Pure Serenity Shop',
    subtitle:
      'We curate thoughtful wellness rituals, meaningful partnerships, and cozy moments that bring calm into every day.',
    image: 'assets/images/banner1.jpg'
  };

  const values = [
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
  ];

  const timeline = [
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

  const team = [
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

  const initiatives = [
    {
      icon: Leaf,
      title: 'Conscious Sourcing',
      description: 'Small-batch artisans and certified eco-friendly suppliers anchor our catalog.'
    },
    {
      icon: Globe,
      title: 'Giving Circles',
      description: '1% of every affiliate order funds mental health nonprofits within our community.'
    },
    {
      icon: HandHeart,
      title: 'Wellness Scholarships',
      description: 'Free access to restorative workshops for caregivers and teachers each season.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={innerBanner.image}
          alt={innerBanner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/85 to-[#d5c0fa]/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">Inside Pure Serenity</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {innerBanner.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {innerBanner.subtitle}
          </p>
        </div>
      </section>

      <section id="mission" className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              In a world that moves too fast, we're here to help you slow down. We curate products that encourage mindfulness, promote relaxation, and support your journey toward a more balanced life. Each item in our collection is chosen with intention and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {values.map((value, index) => (
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
              <p className="text-sm tracking-[0.3em] uppercase text-purple-200">Join Our Wellness Community</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Membership that keeps your rituals inspired
              </h2>
              <p className="text-lg text-purple-100 leading-relaxed">
                Discover products that nurture your mind, body, and spirit. Whether you're beginning your wellness journey or deepening your practice, we're here to support you every step of the way.
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
                <li className="bg-white/10 rounded-2xl p-4 border border-white/15">
                  Weekly ritual circles
                </li>
                <li className="bg-white/10 rounded-2xl p-4 border border-white/15">
                  Live meditations & workshops
                </li>
                <li className="bg-white/10 rounded-2xl p-4 border border-white/15">
                  Curated playlists & guides
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative h-72 sm:h-80 lg:h-[420px] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
                <img
                  src="assets/images/about-us1.jpg"
                  alt="Pure Serenity community gathering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/15 backdrop-blur-md rounded-2xl p-5 text-sm text-purple-50 border border-white/20">
                  &ldquo;Every Sunday we gather virtually to slow down, share wins, and explore the ritual of the week&mdash;led by our guest coaches and community guides.&rdquo;
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
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-4">Our Story</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Crafted from a love of nourished moments
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Pure Serenity is the culmination of years spent studying rituals from around the world, chatting with
                healers, and testing thousands of tactile products. Each milestone has been shaped by community feedback
                and a devotion to approachable, joy-filled wellness.
              </p>
            </div>
            <div className="space-y-6">
              {timeline.map((entry) => (
                <div key={entry.year} className="flex flex-col sm:flex-row gap-6 bg-white rounded-3xl shadow-lg overflow-hidden">
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
            Our Commitment to You
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-4">
              We understand that finding quality wellness products can be overwhelming. That's why we do the research for you, testing and vetting each item before adding it to our shop.
            </p>
            <p className="mb-4">
              As an affiliate partner with trusted brands, we earn a small commission when you purchase through our links. This helps us continue curating the best products for you, at no extra cost.
            </p>
            <p>
              Your trust means everything to us. We only recommend products we genuinely believe will enhance your wellness journey.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-gradient-to-b from-[#fdf2fa] to-[#f8daed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-3">Meet the Collective</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The people guiding your wellness journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are storytellers, listeners, and curious explorers who believe that soft moments can change a day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
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
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500 mb-4">Collective Impact</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Intentional shopping with ripple effects
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every affiliate purchase supports mindful makers, reduces waste through small-batch production, and
                funds community care initiatives. Together we keep wellness accessible, transparent, and kind.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {initiatives.map((initiative) => (
                <div
                  key={initiative.title}
                  className="bg-white rounded-3xl p-6 shadow-lg ring-1 ring-purple-100 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <initiative.icon className="h-6 w-6 text-[#DC2E7C]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{initiative.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {initiative.description}
                    </p>
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
              <p className="text-sm tracking-[0.3em] uppercase text-purple-500">Inside the Ritual Lab</p>
              <h2 className="text-4xl font-bold text-gray-900">
                Testing every product we recommend
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our light-filled studio is where we brew tea samples, compare textures, and build routine playlists at
                sunrise. We only share the products that evoke a genuine wow. Your trust guides every pick.
              </p>
              <div className="flex items-center gap-4">
                <Sun className="h-10 w-10 text-purple-500" />
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  Sunrise sessions | sound baths | sensory testing
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="assets/images/serim2.jpg"
                  alt="Tea tasting setup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="assets/images/serim3.jpg"
                  alt="Wellness product styling"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="assets/images/serim1.jpg"
                  alt="Calming studio environment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


