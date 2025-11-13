import type { Category, Product } from './products';

export const petCategories: Category[] = [
  {
    id: 'wellness',
    name: 'Wellness & Supplements',
    slug: 'pet-wellness',
    description: 'Joint support, probiotics, and immune boosters to keep pets thriving.',
    image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grooming',
    name: 'Spa & Grooming',
    slug: 'pet-grooming',
    description: 'Low-stress grooming tools that keep coats smooth and tangle-free.',
    image_url: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'home-care',
    name: 'Home Care & Cleanup',
    slug: 'pet-home-care',
    description: 'Keep shared spaces fresh with smart clean-up essentials.',
    image_url: 'https://images.unsplash.com/photo-1582719231233-6cf4e2ac41b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hydration',
    name: 'Hydration & Feeding',
    slug: 'pet-hydration',
    description: 'Fountains and feeders that encourage healthy drinking habits.',
    image_url: 'https://images.unsplash.com/photo-1559251606-c623743a6d88?auto=format&fit=crop&w=800&q=80'
  }
];

export const petProducts: Product[] = [
  {
    id: 'pet-1',
    category_id: 'wellness',
    name: 'Wuffes Advanced Dog Hip and Joint Supplement',
    description: 'Veterinarian-formulated chews with glucosamine, MSM, and turmeric to support mobility.',
    image_url: 'assets/images/wuffes-advanced-dog-hip-and-joint.jpg',
    affiliate_link:
      'https://www.amazon.com/Wuffes-Chewable-Supplement-Medium-Breeds/dp/B0C1HG6XC8?th=1&linkCode=ll1&tag=pureserenity-20&linkId=934d3d47dce7d77c3532c4e8d18724b7&language=en_US&ref_=as_li_ss_tl',
    price: 69.95,
    featured: true
  },
  {
    id: 'pet-2',
    category_id: 'home-care',
    name: 'Amazon Basics Dog and Puppy Pee Pads',
    description: 'Multi-layered, leakproof training pads with quick-dry technology for tidy floors.',
    image_url: 'assets/images/amazon-basics-dog-and-puppy-pee-pads.jpg',
    affiliate_link:
      'https://www.amazon.com/Amazon-Basics-Leak-Proof-Quick-Dry-Absorbency/dp/B00MW8G62E?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&rdc=1&sr=8-6&th=1&linkCode=ll1&tag=pureserenity-20&linkId=a9bd29b48207b9468877287c38dfbf08&language=en_US&ref_=as_li_ss_tl',
    price: 24.99,
    featured: false
  },
  {
    id: 'pet-3',
    category_id: 'home-care',
    name: 'Amazon Basics Dog Poop Bags',
    description: 'Durable, leak-resistant waste bags with dispenser for tidy walks and backyard clean-up.',
    image_url: 'assets/images/amazon-basics-dog-poop-bags.jpg',
    affiliate_link:
      'https://www.amazon.com/AmazonBasics-Waste-Bags-Dispenser-Leash/dp/B00NABTC8M?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&rdc=1&sr=8-7&th=1&linkCode=ll1&tag=pureserenity-20&linkId=ef41502268259786894ac5d28fba69c3&language=en_US&ref_=as_li_ss_tl',
    price: 14.99,
    featured: false
  },
  {
    id: 'pet-4',
    category_id: 'wellness',
    name: 'Purina Pro Plan Veterinary Supplements (Dog)',
    description: 'Probiotic powder that supports digestive balance and immune health in dogs.',
    image_url: 'assets/images/purina-pro-plan-veterinary-supplements2.jpg',
    affiliate_link:
      'https://www.amazon.com/Purina-Veterinary-Fortiflora-Nutritional-Supplement/dp/B001650NNW?content-id=amzn1.sym.a1bc2dac-8d07-44d1-9477-59bc11451909%3Aamzn1.sym.a1bc2dac-8d07-44d1-9477-59bc11451909&cv_ct_cx=Pet+products&keywords=Pet+products&pd_rd_i=B001650NNW&pd_rd_r=d43e7883-f084-4e40-9df0-3b1e1360d1dd&pd_rd_w=agZsj&pd_rd_wg=CauVN&pf_rd_p=a1bc2dac-8d07-44d1-9477-59bc11451909&pf_rd_r=BD23SDEATSWJGAQRZ6JC&qid=1762195958&rdc=1&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-2-9428117c-b940-4daa-97e9-ad363ada7940-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&psc=1&linkCode=ll1&tag=pureserenity-20&linkId=e0104e3ceba02c00f96a8dfcc0440345&language=en_US&ref_=as_li_ss_tl',
    price: 30.99,
    featured: true
  },
  {
    id: 'pet-5',
    category_id: 'wellness',
    name: 'Zesty Paws Dog Allergy Relief',
    description: 'Skin health chews with omegas, probiotics, and EpiCor postbiotics to calm itching.',
    image_url: 'assets/images/zesty-paws-dog-allergy-relief-dog-itching.jpg',
    affiliate_link:
      'https://www.amazon.com/Zesty-Paws-Dog-Allergy-Relief/dp/B071WCV19B?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&rdc=1&sr=8-24&th=1&linkCode=ll1&tag=pureserenity-20&linkId=d3571c040687645daaba050ea63b55d8&language=en_US&ref_=as_li_ss_tl',
    price: 31.97,
    featured: true
  },
  {
    id: 'pet-6',
    category_id: 'home-care',
    name: 'POOPH Odor Eliminator',
    description: 'Fragrance-free, non-toxic spray that neutralizes pet odors on contact.',
    image_url: 'assets/images/pooph-pet-odor-eliminator.jpg',
    affiliate_link:
      'https://www.amazon.com/POOPH%C2%AE-Odor-Eliminator-Spray-Contact/dp/B09PF4KVHJ?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&rdc=1&sr=8-43&th=1&linkCode=ll1&tag=pureserenity-20&linkId=a7d27406fc002d5913210585fbb02826&language=en_US&ref_=as_li_ss_tl',
    price: 26.99,
    featured: false
  },
  {
    id: 'pet-7',
    category_id: 'hydration',
    name: 'Veken 95oz Pet Fountain',
    description: 'Triple-filtration pet fountain with quiet pump to keep water fresh and enticing.',
    image_url: 'assets/images/veken-innovation-award-winner.jpg',
    affiliate_link:
      'https://www.amazon.com/Veken-Fountain-Automatic-Dispenser-Replacement/dp/B08NCDBT7Q?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&sr=8-54&th=1&linkCode=ll1&tag=pureserenity-20&linkId=6c6606a1c583d5fbd0ef8df650cfb299&language=en_US&ref_=as_li_ss_tl',
    price: 33.99,
    featured: true
  },
  {
    id: 'pet-8',
    category_id: 'grooming',
    name: 'oneisall Dog Clipper Low Noise Grooming Kit',
    description: 'Cordless grooming set with quiet motor and guide combs for stress-free trims.',
    image_url: 'assets/images/oneisall-dog-clipper-low-noise.jpg',
    affiliate_link:
      'https://www.amazon.com/ONEISALL-Cllippers-Rechargeable-Cordless-Electric/dp/B01HRSZRXM?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&sr=8-59&th=1&linkCode=ll1&tag=pureserenity-20&linkId=e66ba935283e6f9fe260ba4a5b60f84f&language=en_US&ref_=as_li_ss_tl',
    price: 32.99,
    featured: false
  },
  {
    id: 'pet-9',
    category_id: 'wellness',
    name: 'Pet Honesty Dog Breath Freshener Dental Powder',
    description: 'Plaque-fighting dental powder with probiotics for cleaner teeth and fresher breath.',
    image_url: 'assets/images/dog-breath-freshener-dental-powder.jpg',
    affiliate_link:
      'https://www.amazon.com/Pet-Honesty-Freshener-Cleaning-Postbiotics/dp/B0DM3486LG?dib=eyJ2IjoiMSJ9.rKU-d3f6mBlbdlgmWWr9sIYMpTmo0jPDl75UHgxqWGosCguX6qM6O5Rsd848u3jdEAEIkuYJo2gdB-P6fMVigRansipTWGT0RnVo2lRgj5h_QbivfPe5wbjAMfPzacxyvvnwXYptAbrLn7KFlBrq9ebCQ6GWzTMlGXWcpuiEoBqQJCxlfZnZc9D7D31D3ImD-ZcyiQk0hTBCkEA1ZqNTYlxZQbdg-CDTSoQk_RXgVZpdViAkyQ7EkP99-2oIZIJRUIklxIFmGZOvYMZu31zUBUcxM6X1_bNA2od0MSpS3Rk.89dhWpSQTj7cLXxB3Rwz36pvWjO4btZ3W0MBtWz5OA0&dib_tag=se&keywords=Pet%2Bproducts&qid=1762195958&rdc=1&sr=8-58&th=1&linkCode=ll1&tag=pureserenity-20&linkId=3ff2a6fcbfb3c24a2c1f9bc3aa1b7062&language=en_US&ref_=as_li_ss_tl',
    price: 23.99,
    featured: false
  },
  {
    id: 'pet-10',
    category_id: 'wellness',
    name: 'Purina Pro Plan Veterinary Supplements FortiFlora (Cat)',
    description: 'Cat-specific probiotic supplement that helps maintain healthy intestinal microflora.',
    image_url: 'assets/images/purina-pro-plan-veterinary-supplements-fortiflora-cat.jpg',
    affiliate_link:
      'https://www.amazon.com/Purina-Veterinary-Fortiflora-Nutritional-Supplement/dp/B001650OE0?crid=59GHIHC8QH8T&dib=eyJ2IjoiMSJ9.ZN2wjgR2XMm1cEa-4Qa1oVtaH0BNqh_qJKmhr44kz6Kcz596yxMhjoLDHiddv4UN_Nu68tP24vbaPRQXMrPUCwbldjn7LE2Adp7CxyzixJ-PZcGkyNAqHhAYMFIwspGvZz7wShGXLHQH0-Q0qlkLOnDpFfJpzzQnslyjpX6lqUGyPySIpn4OkFDOAl7fyc_7nPE7a5M9zi9c5nxKYbtf96vhfqUIkVgWmBcrVN1nw557OZHTSXrcv6UISVS_b0K4FK2txh4Z291FksChI2G3r52xum-BnQqzAbUWuIMGqvw.Lgm_gwV1Ci0AQzGQH0Qx-0ishs6EGXj6J2d4ZxZi4Q8&dib_tag=se&keywords=pet%2Bproducts%2Bfor%2Bcats&qid=1762196877&rdc=1&sprefix=Pet%2Bproducts%2B%2Caps%2C246&sr=8-5-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=pureserenity-20&linkId=705159099a7de919be8ff56fab02f273&language=en_US&ref_=as_li_ss_tl',
    price: 29.99,
    featured: true
  }
];
