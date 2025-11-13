const innerBanner = {
  eyebrow: 'Privacy Policy',
  title: 'Privacy & Data Care',
  subtitle:
    'We honor your privacy as carefully as we curate your wellness routine. Explore how we collect, safeguard, and use your information.',
  image: 'assets/images/banner3.jpg'
};

export default function Privacy() {
  const policySections = [
    {
      title: 'Our Commitment to Your Privacy',
      body:
        'Pure Serenity collects only the information needed to fulfill your orders, personalize recommendations, and keep you informed about new rituals. We never sell or rent your personal data to third parties.'
    },
    {
      title: 'What We Collect',
      body:
        'When you shop with us or subscribe to Pure Notes, we may store your name, email address, shipping details, and purchase history. Any payment information is processed securely by our trusted payment partners.'
    },
    {
      title: 'How We Use Your Information',
      body:
        'Your details help us deliver orders, respond to support requests, tailor product suggestions, and share relevant content. We also use aggregated analytics to improve the Pure Serenity experience across our site.'
    },
    {
      title: 'Staying in Control',
      body:
        'You can update your preferences or unsubscribe from marketing emails at any time using the link provided in our messages. For data removal or additional questions, reach out to privacy@pureserenityshop.com.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf2fa] via-[#f8daed] to-[#d5c0fa]">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src={innerBanner.image}
          alt={innerBanner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2fa]/90 via-[#f8daed]/80 to-[#d5c0fa]/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-sm tracking-[0.3em] uppercase text-purple-500">{innerBanner.eyebrow}</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl leading-tight">
            {innerBanner.title}
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            {innerBanner.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16">
        <section className="bg-white/90 backdrop-blur rounded-3xl shadow-xl px-8 py-10 space-y-8">
          {policySections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#5F4D8B]">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </section>

        <footer className="text-center bg-white/80 backdrop-blur rounded-3xl shadow-lg px-6 py-8 space-y-4">
          <h3 className="text-xl font-semibold text-[#DC2E7C]">Need More Details?</h3>
          <p className="text-gray-600">
            Email our privacy team at{' '}
            <a
              href="mailto:privacy@pureserenityshop.com"
              className="text-[#5F4D8B] font-medium hover:text-[#DC2E7C] transition-colors"
            >
              privacy@pureserenityshop.com
            </a>{' '}
            and we will respond within two business days.
          </p>
        </footer>
      </div>
    </div>
  );
}
