export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
  affiliate_link: string;
  price: number;
  featured: boolean;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Wellness',
    slug: 'wellness',
    description: 'Products to enhance your overall wellbeing',
    image_url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Relaxation',
    slug: 'relaxation',
    description: 'Tools and items to help you unwind',
    image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adfba2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Home Comfort',
    slug: 'home-comfort',
    description: 'Create a peaceful sanctuary at home',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Spiritual Balance',
    slug: 'spiritual-balance',
    description: 'Items for mindfulness and spiritual growth',
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Shop Pet Essentials',
    slug: 'shop-pet-essentials',
    description: 'Comforting care picks for the four-legged members of the family',
    image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80'
  }
];

export const products: Product[] = [
  {
    id: '1',
    category_id: '1',
    name: 'Jennifer Aniston Perfume',
    description: 'Jennifer Aniston by Jennifer Aniston Eau de Parfum Womens Perfume - 0.33 fl oz',
    image_url: 'assets/images/shop1.jpg',
    affiliate_link: 'https://www.amazon.com/Jennifer-Aniston-Parfum-Womens-Perfume/dp/B07CKR1JNM?crid=3HZIFHDVQKLBN&dib=eyJ2IjoiMSJ9.P4HaPc1YOIPESwOjGvL7Ma0u1haO9yi0qW60BOnxOUwyqrHmQ_bmJuhhVxxHA6b-3xQJKx2ecpwdVWsnRdsZXalO5IW9PU6BQfyAEHBX3G7DA0NFaF3AT_V83xnA0vbII6npTmli3Ooz5h_zDB8AyWKqe-QW8Ji41qgzl7YUPyZMKg_Jcu2sEwTyKv-9SC4WsPe3HukT0Wj8J7GejS6zzh8-phTJkXRzLp-XoohzIUsBEVTbPsyha-aO_j3EQVNcGsVTnqqG3dLvfZnzNPWBrui65JUPUH471uaAy1xWlAA.JIrY-N_RqLFeZZcqxc8k_O5iBCFekCCgoKyya_x3_I8&dib_tag=se&keywords=Aniston%2BEau%2BParfum&qid=1761686206&sprefix=%2Caps%2C622&sr=8-3&th=1&linkCode=ll1&tag=pureserenity-20&linkId=e760712fa12a63dba20d97f496dbc7aa&language=en_US&ref_=as_li_ss_tl',
    price: 24.99,
    featured: true
  },
  {
    id: '2',
    category_id: '1',
    name: 'Olay Ultra rich Moisture Butter',
    description: 'Olay Body Wash for Women, Ultra Moisture, 24hr Moisturizing, Hydrating & Refreshing, B3 Vitamin Complex, Free of Parabens & Phthalates, For All Skin Types, Shea Butter Scent, 22 fl oz (Pack of 4)',
    image_url: 'assets/images/shop2.jpg',
    affiliate_link: 'https://www.amazon.com/Olay-Ultra-Rich-Moisture-Butter/dp/B0BHH1LBX2?crid=32LLDY65D6Y8L&dib=eyJ2IjoiMSJ9.DEXjqcpe5vJL6jYEiv4me8k4CgyaHaGPezBeFj3v4okDIyqtobO6ISy8jfv3tU2uEmAj3P7HpsHefZQv9MpnXDqNyX4FvuTzErS-PoNZl_9UUrYDMfpe0_TtVZ_DaSD1ezFX7NtpYF3Trn26kJH3eObKsB8BBAqefpdbly4KtHBj6lIOBqJB0YK6zMJ-MmNiysDOfKFQmJlHKZ8mqMSt5y83zocZLPul8LNMxAfNSLZItM6KUaYT4YD8pReN7s0TiT6JjwrwENU3zN3UdbKVxHRvcBFzIpH7Et4o_NaRieM.gUSWH_z2uT_NA2PvT1XndiS2fhzOR8ZmrDyPjh-syIY&dib_tag=se&keywords=necessaire%2Bbody%2Bwash&qid=1761739642&sprefix=Necessaire%2BBody%2Blotion%2Caps%2C232&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=pureserenity-20&linkId=8c8a11fa9a1e707b64e464c2f53fd426&language=en_US&ref_=as_li_ss_tl',
    price: 39.99,
    featured: true
  },
  {
    id: '3',
    category_id: '1',
    name: 'Cetaphil Moisturizing cream',
    description: 'Cetaphil Face & Body Moisturizer, Hydrating Moisturizing Cream for Dry to Very Dry, Sensitive Skin, NEW 16 oz 2 Pack, Fragrance Free, Non-Comedogenic, Non-Greasy',
    image_url: 'assets/images/shop3.jpg',
    affiliate_link: 'https://www.amazon.com/Moisturizer-Hydrating-Moisturizing-Non-Comedogenic-Non-Greasy/dp/B01H20MA62?crid=3QTSJZNUSALL3&dib=eyJ2IjoiMSJ9.4s3py5bOtCIJhvWB9AyYtkxClNA-WYZs0528oIk8lm4_0zSM5AKtjVyI2hMcTbX77dbeXRxIqdW4UN-ZFGqmfNqPFnHhMFcRRd3-YEFtOkJ21XFeOQ8UsKKD9jz96-Pe6Np-4k--4QEEG6_eJ6E9Lx9Wk3cH4yuIAaTbU8lFdilbGx2UDlOwf9iJRP-Y5hvUef5nAFAuNKhL8PlIN_GF8WtiRPouhg7g96CMIeFiP0lmCPsXUtWLDEL6EPh_ZqyZWcn24o9vJxEXBkkAQmaw1zOQMBbDDBj3CcbXjxcIyyU.QdH8g_T3TjjgfQldNY-qkptcWf2ZQxbR87JTu7U_ahU&dib_tag=se&keywords=Cetaphil%2BHydrating%2BMoisturizing%2BLotion&qid=1761739794&rdc=1&sprefix=cetaphil%2Bhydrating%2Bmoisturizing%2Blotion%2Caps%2C241&sr=8-7&th=1&linkCode=ll1&tag=pureserenity-20&linkId=fd4503bf39f92128409f3c2a2058868e&language=en_US&ref_=as_li_ss_tl',
    price: 49.99,
    featured: false
  },
  {
    id: '4',
    category_id: '2',
    name: 'Cerava Face Moisturizer',
    description: 'CeraVe Moisturizing Cream, Body and Face Moisturizer for Dry Skin, Body Cream with Hyaluronic Acid and Ceramides, Daily Moisturizer, Oil-Free, Fragrance Free, Non-Comedogenic, 19 Ounce',
    image_url: 'assets/images/shop4.jpg',
    affiliate_link: 'https://www.amazon.com/CeraVe-Moisturizing-Cream-Daily-Moisturizer/dp/B00TTD9BRC?crid=3QTSJZNUSALL3&dib=eyJ2IjoiMSJ9.4s3py5bOtCIJhvWB9AyYtkxClNA-WYZs0528oIk8lm4_0zSM5AKtjVyI2hMcTbX77dbeXRxIqdW4UN-ZFGqmfNqPFnHhMFcRRd3-YEFtOkJ21XFeOQ8UsKKD9jz96-Pe6Np-4k--4QEEG6_eJ6E9Lx9Wk3cH4yuIAaTbU8lFdilbGx2UDlOwf9iJRP-Y5hvUef5nAFAuNKhL8PlIN_GF8WtiRPouhg7g96CMIeFiP0lmCPsXUtWLDEL6EPh_ZqyZWcn24o9vJxEXBkkAQmaw1zOQMBbDDBj3CcbXjxcIyyU.QdH8g_T3TjjgfQldNY-qkptcWf2ZQxbR87JTu7U_ahU&dib_tag=se&keywords=Cetaphil%2BHydrating%2BMoisturizing%2BLotion&qid=1761739794&sprefix=cetaphil%2Bhydrating%2Bmoisturizing%2Blotion%2Caps%2C241&sr=8-22-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&linkCode=ll1&tag=pureserenity-20&linkId=175a1921236358a5f7b7170d20492215&language=en_US&ref_=as_li_ss_tl',
    price: 34.99,
    featured: true
  },
  {
    id: '5',
    category_id: '2',
    name: 'Nivea Cocoa butter',
    description: 'NIVEA Cocoa Butter Body Cream with Deep Nourishing Serum, Cocoa Butter Cream for Dry Skin, 16 Ounce Jar',
    image_url: 'assets/images/shop5.jpg',
    affiliate_link: 'https://www.amazon.com/NIVEA-Hyaluronic-Nourishing-72-Hour-Moisturizer/dp/B01H6OYPU8?crid=2YZDE67Q3H3UC&dib=eyJ2IjoiMSJ9.v01rNmRvso3MtB459Q_Ja3DWgGcqki2Br8CmBGpBNU76oHtoyEE3gKOew5ifYLJg51oKy74UxrznBzr4CubJ0dM6gDaHOpg89cYLqS_-41B7kjl-m3ItAsNT8mJaZV32Y7SoYRBoU7Fb7EF7O_HgqAHdAStyYvvYNno6muzM5ZcDIli7ALr9BLsilnE5JpwQUJtcaNMeWas-NV1rMJHAAHO7q75E6YOA4W-G5o4ifrkyX8FIJqooO5T8eYf4IlKaI1pCiqGXX1dQHubDm5lRjdkxc40rUlBW3aBAbL1WWt8.DkCulD--kVJBrTgdJDLIJxWNZQgay2mYwl8F24eU5q0&dib_tag=se&keywords=NIVEA%2BEssentially%2BEnriched%2BBody%2BLotion&qid=1761740106&sprefix=nivea%2Bessentially%2Benriched%2Bbody%2Blotion%2Caps%2C381&sr=8-26&th=1&linkCode=ll1&tag=pureserenity-20&linkId=a3e9a041adbd0088a2dc3bc22c49d0e9&language=en_US&ref_=as_li_ss_tl',
    price: 18.99,
    featured: false
  },
  {
    id: '6',
    category_id: '2',
    name: 'La Roche-Posay Face and Body Lotion',
    description: 'La Roche-Posay Lipikar AP+ Triple Repair Moisturizing Cream | Face & Body Lotion For Dry Skin | Shea Butter & Niacinamide Moisturizer | Gentle Face & Body Cream For Dry, Rough & Sensitive Skin',
    image_url: 'assets/images/shop6.jpg',
    affiliate_link: 'https://www.amazon.com/Roche-Posay-Lipikar-Intense-Repair-Cream/dp/B003QXZWYW?crid=28R2L2SEWKE6T&dib=eyJ2IjoiMSJ9.LoPvY3cSWQK48WfQkdZZ-T41g4IUHDI2bSDvNCrlxSn4sTu0wnZTma2w8YzvPmBOh0xV-Ufcm73fnUggTH34uS-fkQ14PIQABUa69_Y0tXZ9zwg_BxOQaQNpmPPXrClGRGkO2ylF1nfXc-FVBSCfPJZakLVe8JUvex78GFdLXRWEq_8oosiZH2uS0uhI2N6CtLKVUzFeVDycxJ8FGFwhZ7gVUgAouJCtKR6aon8woRJvsy9bVD87Ejdl4QcyrIcU4BB247KcZD6edCgQ2A_SXZMwQyKSBdSUID1QmLAmmk8.Z1j2WMkKnU9R092mmHqcHa_JpaGDgx6LWCgIraBQZus&dib_tag=se&keywords=La%2BRoche-Posay%2BLipikar%2BAP%2B%2BTriple%2BRepair%2BMoisturizing%2BCream%2B%7C%2BFace%2B%26%2BBody&qid=1761740437&sprefix=la%2Broche-posay%2Blipikar%2Bap%2B%2Btriple%2Brepair%2Bmoisturizing%2Bcream%2Bface%2B%26%2Bbody%2Caps%2C277&sr=8-1&th=1&linkCode=ll1&tag=pureserenity-20&linkId=2c451a92fe65ddbd9ec980b428de7d0e&language=en_US&ref_=as_li_ss_tl',
    price: 29.99,
    featured: false
  },
  {
    id: '7',
    category_id: '3',
    name: 'marvee Lifting Mask',
    description: 'MAREE V Line Lifting Mask with 24K Gold - Deep Collagen Face Mask for Women - Jawline Shaper Mask with Retinol & Hyaluronic Acid - Neck Tightening & Firming - Double Chin Strap for Face Lift',
    image_url: 'assets/images/shop7.jpg',
    affiliate_link: 'https://www.amazon.com/MAREE-Gold-Collagen-Facial-Hyaluronic/dp/B0CNDCKXDX?crid=3ER50IP16UDGN&dib=eyJ2IjoiMSJ9.90Sqd4wwnVVjr0PQg2pRY4av5V6Kpc61J7ld8uofkf8Gdunr1f4JyeSx5GDh-Ma7Z7xWBtwuc2EXKfS2uMn88WRrfFrAx_1_k3bo3h427SeTOm4xdiT4gFEDrEpOFX3pNhzKe3HfqoRteAKCml0r2QzYZ325VUjkSPNL_2hpzRXONbIiKcCzMiAIL6RcfTEzxR4ROK8mstQzDXeOuSqxRYFhrvC6klkVuiJWgsMT4Z988GhZlk2p9jvlE6BNJhSlJIQCQA28vxsD69h8FJehPahdUech3k3JjbpYcR0erqg.TCHMuc-Tx8x7Dt8wYgdmGcqRug8E1aG_LqcLY7W_Jyw&dib_tag=se&keywords=nourish+max+instant+face+%2F+neck+lift&qid=1761740742&rdc=1&sprefix=nourish+max+instant+face+%2F+neck+lift%2Caps%2C136&sr=8-8&linkCode=ll1&tag=pureserenity-20&linkId=9a15e3ba700a4fe0f00a0db750fabe61&language=en_US&ref_=as_li_ss_tl',
    price: 79.99,
    featured: true
  },
  {
    id: '8',
    category_id: '3',
    name: 'Loreal Paris Skincare',
    description: 'LOreal Paris Dermo-Expertise Eye Defense Eye Cream with Caffeine and Hyaluronic Acid 0.5 oz',
    image_url: 'assets/images/shop8.jpg',
    affiliate_link: 'https://www.amazon.com/LOreal-Paris-Skincare-Dermo-Expertise-Hyaluronic/dp/B00005333I?crid=2OMLX9E4MRCVP&dib=eyJ2IjoiMSJ9.2GwXhx576SgmLY9Le1BPRD_gyy-yr0l_u3jMNQe3bbGGQ10ZC6jZ74U6bhj-zEX6hkaEgvtGcA-t6JZpmDXEo1hgHEIgpe3kdVATrbmZm4YdpPeBXu2g1QtACZ5U4e1KZgBJ55RZsrIFx0krRx6dTj0Wr75FZjtudpqJ3wgVET0afL9-apgdMnLS4VSvn4smLd6Qk7HcQDji5BcBRpPTJmgwSX5dAhhpC_CX_EwTHkYqPlAXHU75fRcpXUkGiG1m7EgoNefu4qsmd32ZRt6fvTZX78RZD0SvBHM0CdfTWY8.9LBz62--dVF2hzhhnucBuQQuSY-rUI_b6f-jNXEiXZ0&dib_tag=se&keywords=perricone%2Bmd%2Bfirming%2Beye%2Bcream&qid=1761741003&sprefix=Perricone%2BMD%2BBrightening%2Bunder%2Beye%2Bcream%2Caps%2C374&sr=8-45&th=1&linkCode=ll1&tag=pureserenity-20&linkId=7a88cd0cf1daf188f95f06152e6f3f38&language=en_US&ref_=as_li_ss_tl',
    price: 32.99,
    featured: false
  },
  {
    id: '9',
    category_id: '3',
    name: 'Joseon Eye serum',
    description: 'Beauty of Joseon Revive Eye Serum with Retinal Niacinamide Correction for Puffy Eye Bags Fine Lines Dark Circles Wrinkles, Korean Skin Care 30ml, 1 fl.oz',
    image_url: 'assets/images/shop9.jpg',
    affiliate_link: 'https://www.amazon.com/Beauty-Joseon-Revive-eye-serum/dp/B0B45LL4DD?crid=38AMTZ94XIA41&dib=eyJ2IjoiMSJ9._SZA6ploot0PMdQcgQUlrPITUSp42qVmyBziUYZbozIysl-h8xz9SepE6Q5ZubbWNWfC0eZz0ifdiYWXcRC2CO9vW18Z0FuTgQgB4loIi9fu6R72qabdSvJ_8pfxR4-PN8Oox3oc9KyWFEGUAu3wTX198g-t-kRo_OYCsxGQcs_hAEK6Ea8u1anT0pHndBe8i6g7c2-BcOYf0jcY9KVvFBb4Hv-qBKM7rEQYQRX1z2C5FfB3NnSZKdlMcDZGKsvU7HU6UhnGj1J1r_nVn8LvZ_4J_cki1oNYr_AP9qzZWns.faAcEMTkNCVt-MUH09fRVWt0VWaQklB9EDTVhOsrL2E&dib_tag=se&keywords=rodan%2Band%2Bfields%2Beye%2Bcream&qid=1761741294&sprefix=RODAN%2Caps%2C160&sr=8-19&th=1&linkCode=ll1&tag=pureserenity-20&linkId=69267c42e4a6761965e3f2b07a6b19c6&language=en_US&ref_=as_li_ss_tl',
    price: 44.99,
    featured: false
  },
  {
    id: '10',
    category_id: '5',
    name: 'Calming Pet Bed',
    description: 'Ultra-soft donut calming bed that helps anxious pets relax into soothing rest.',
    image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    affiliate_link: 'https://www.amazon.com/Calming-Orthopedic-Anxiety-Relief-Machine/dp/B08KZVPDG6?crid=2N8X4YY4QCMXC&keywords=calming+pet+bed&qid=1700000000&sprefix=calming+pet+bed&sr=8-1&linkCode=ll1&tag=pureserenity-20&linkId=calming-pet-bed&language=en_US&ref_=as_li_ss_tl',
    price: 59.99,
    featured: true
  },
  {
    id: '11',
    category_id: '5',
    name: 'Natural Paw Balm',
    description: 'Protective balm with shea butter and coconut oil to keep paws soft and hydrated.',
    image_url: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=800&q=80',
    affiliate_link: 'https://www.amazon.com/Musher-s-Secret-Natural-Protection-Hydration/dp/B00BKSQA2S?crid=2Z6Y8X9XQBCMZ&keywords=natural+paw+balm&qid=1700000000&sprefix=natural+paw+balm&sr=8-1&linkCode=ll1&tag=pureserenity-20&linkId=natural-paw-balm&language=en_US&ref_=as_li_ss_tl',
    price: 14.99,
    featured: false
  },
  {
    id: '12',
    category_id: '5',
    name: 'Soothing Pet Shampoo',
    description: 'Gentle oatmeal and aloe shampoo formulated to calm sensitive skin and fur.',
    image_url: 'assets/images/pets-shop3.jpg',
    affiliate_link: 'https://www.amazon.com/Earthbath-Oatmeal-Aloe-Shampoo-Sensitive/dp/B0011SOEAA?crid=2X5Z0Y7XQBCMZ&keywords=oatmeal+aloe+pet+shampoo&qid=1700000000&sprefix=oatmeal+aloe+pet+shampoo&sr=8-1&linkCode=ll1&tag=pureserenity-20&linkId=soothing-pet-shampoo&language=en_US&ref_=as_li_ss_tl',
    price: 21.99,
    featured: false
  }
];
