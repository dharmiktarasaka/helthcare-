export const MOCK_CATEGORIES = [
  { id: "skincare", name: "Skincare", path: "/shop/skincare", subtitle: "Radiant, healthy skin starts here", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop" },
  { id: "haircare", name: "Haircare", path: "/shop/haircare", subtitle: "Nourish your locks from root to tip", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop" },
  { id: "makeup", name: "Makeup", path: "/shop/makeup", subtitle: "Enhance your natural features", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop" },
  { id: "personal-care", name: "Personal Care", path: "/shop/personal-care", subtitle: "Everyday essentials for self-hygiene", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop" },
  { id: "wellness", name: "Wellness", path: "/shop/wellness", subtitle: "Holistic care for your inner peace", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop" },
  { id: "healthcare", name: "Healthcare", path: "/shop/healthcare", subtitle: "Dermatologist-approved health essentials", image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop" },
  { id: "mother-baby", name: "Mother & Baby", path: "/shop/mother-baby", subtitle: "Gentle solutions for mother and child", image: "https://images.unsplash.com/photo-1510154221590-ff63e90a136f?w=600&auto=format&fit=crop" },
  { id: "men", name: "Men's Grooming", path: "/shop/men", subtitle: "Tailored grooming for the modern man", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop" },
  { id: "gift-sets", name: "Gift Sets", path: "/shop/gift-sets", subtitle: "Curated bundles of beauty and wellness", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop" }
];

export const MOCK_CONCERNS = [
  { id: "acne", name: "Acne and Breakouts", path: "/shop?concern=acne", type: "skin" },
  { id: "dry-skin", name: "Dry Skin", path: "/shop?concern=dry-skin", type: "skin" },
  { id: "pigmentation", name: "Pigmentation", path: "/shop?concern=pigmentation", type: "skin" },
  { id: "dull-skin", name: "Dull Skin", path: "/shop?concern=dull-skin", type: "skin" },
  { id: "hair-fall", name: "Hair Fall", path: "/shop?concern=hair-fall", type: "hair" },
  { id: "frizzy-hair", name: "Frizzy Hair", path: "/shop?concern=frizzy-hair", type: "hair" },
  { id: "sensitive-skin", name: "Sensitive Skin", path: "/shop?concern=sensitive-skin", type: "skin" },
  { id: "anti-aging", name: "Anti-Aging Care", path: "/shop?concern=anti-aging", type: "skin" }
];

export const MOCK_BRANDS = ["Lunara Organics", "Aura Botanicals", "Dermacare Pro", "Soma Wellness", "PureBaby", "Alpha Grooming"];

export const MOCK_PRODUCTS = [
  {
    id: "p1",
    slug: "lunara-hyaluronic-acid-serum",
    name: "Hyaluronic Acid Glow Serum",
    brand: "Lunara Organics",
    category: "skincare",
    subCategory: "Serums",
    shortBenefit: "Intense hydration & dewy glow",
    rating: 4.8,
    reviewCount: 142,
    price: 899,
    originalPrice: 1199,
    discount: 25,
    size: "30 ml",
    stockStatus: "In Stock",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop",
    skinType: "all",
    concern: "dry-skin",
    form: "Serum",
    description: "Formulated with multi-weight hyaluronic acid and natural botanicals, this serum sinks deep into the skin's layers to lock in moisture and produce a beautiful, plump, dewy glow. Ideal for dry, dehydrated, or dull skin.",
    benefits: [
      "Provides 24-hour long-lasting hydration",
      "Reduces the appearance of fine lines",
      "Locks in moisture for a plump finish",
      "Dermatologically tested and non-comedogenic"
    ],
    howToUse: "Apply 3-4 drops onto clean, damp face and neck morning and night. Follow up with your favorite Lunara moisturizer.",
    ingredients: "Aqua, Sodium Hyaluronate (Multi-Weight), Aloe Barbadensis Leaf Juice, Glycerin, Panthenol, Phenoxyethanol, Ethylhexylglycerin.",
    suitableFor: "All skin types, especially dry and dehydrated skin.",
    faqs: [
      { q: "Can I use this daily?", a: "Yes, this serum is designed for daily morning and night use." },
      { q: "Is it greasy?", a: "Not at all. It is water-based and absorbs instantly into the skin." }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOffer: false
  },
  {
    id: "p2",
    slug: "dermacare-salicylic-cleanser",
    name: "Salicylic Acid Clarifying Cleanser",
    brand: "Dermacare Pro",
    category: "skincare",
    subCategory: "Cleansers",
    shortBenefit: "Unclogs pores & controls breakouts",
    rating: 4.6,
    reviewCount: 98,
    price: 649,
    originalPrice: 799,
    discount: 18,
    size: "150 ml",
    stockStatus: "In Stock",
    badge: "Dermatologist Tested Demo",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
    skinType: "oily",
    concern: "acne",
    form: "Gel",
    description: "A gentle yet highly effective foaming gel cleanser containing 2% Salicylic Acid (BHA). It helps exfoliate dead skin, dissolve pore-clogging impurities, and prevent future acne breakouts without stripping skin moisture.",
    benefits: [
      "Contains 2% Salicylic Acid for deep pore exfoliation",
      "Reduces excess sebum and shiny spots",
      "Soothes redness and irritation with Tea Tree extract",
      "Fragrance-free and suitable for acne-prone skin"
    ],
    howToUse: "Massage a small amount onto damp skin. Rinse thoroughly with lukewarm water. Use morning and evening.",
    ingredients: "Aqua, Cocamidopropyl Betaine, Salicylic Acid, Glycerin, Niacinamide, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Sodium Hydroxide.",
    suitableFor: "Oily, acne-prone, and combination skin.",
    faqs: [
      { q: "Does it dry out the skin?", a: "It contains hydrating glycerine to minimize dryness, but we recommend following up with a moisturizer." }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOffer: false
  },
  {
    id: "p3",
    slug: "aura-botanicals-rosemary-oil",
    name: "Rosemary & Onion Hair Growth Oil",
    brand: "Aura Botanicals",
    category: "haircare",
    subCategory: "Hair Oil",
    shortBenefit: "Strengthens roots & reduces hair fall",
    rating: 4.7,
    reviewCount: 215,
    price: 549,
    originalPrice: 699,
    discount: 21,
    size: "100 ml",
    stockStatus: "In Stock",
    badge: "Customer Favorite",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop",
    hairType: "dry",
    concern: "hair-fall",
    form: "Oil",
    description: "Infused with pure Rosemary Essential Oil, Red Onion Extract, and a blend of cold-pressed oils, this intensive treatment stimulates blood circulation to the scalp, strengthens roots, and controls hair shedding.",
    benefits: [
      "Fights hair fall and promotes new growth",
      "Adds brilliant shine and deep conditioning",
      "Soothes dry, itchy scalp conditions",
      "100% natural, sulfate-free, and mineral oil-free"
    ],
    howToUse: "Gently massage into the scalp and leave for at least 1 hour or overnight. Wash off with a mild sulfate-free shampoo.",
    ingredients: "Allium Cepa (Red Onion) Bulb Extract, Rosmarinus Officinalis (Rosemary) Leaf Oil, Cocos Nucifera (Coconut) Oil, Argania Spinosa Kernel Oil, Tocopherol.",
    suitableFor: "All hair types experiencing thinning, fall, or dry scalp.",
    faqs: [
      { q: "How often should I apply this?", a: "We recommend using it 2-3 times a week for visible results." }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: "p4",
    slug: "lunara-ceramide-moisturizer",
    name: "Ceramide Barrier Defense Moisturizer",
    brand: "Lunara Organics",
    category: "skincare",
    subCategory: "Moisturizers",
    shortBenefit: "Restores skin barrier & calms sensitivity",
    rating: 4.9,
    reviewCount: 184,
    price: 799,
    originalPrice: 999,
    discount: 20,
    size: "50 ml",
    stockStatus: "In Stock",
    badge: "Vegan Demo",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
    skinType: "dry",
    concern: "sensitive-skin",
    form: "Cream",
    description: "A nourishing, restorative cream loaded with 3 essential Ceramides, Hyaluronic Acid, and Cica. It helps repair a damaged skin barrier, reduces redness, and provides deep hydration for sensitive and dry skin types.",
    benefits: [
      "Fortifies the skin's natural protective barrier",
      "Instantly calms irritation and redness",
      "Locks in hydration for a smooth finish",
      "Free from synthetic fragrances and parabens"
    ],
    howToUse: "Apply generously to clean skin after serums. Smooth over the face and neck until fully absorbed.",
    ingredients: "Aqua, Ceramide NP, Ceramide AP, Ceramide EOP, Centella Asiatica (Cica) Extract, Glycerin, Caprylic/Capric Triglyceride, Sodium Hyaluronate.",
    suitableFor: "Sensitive, dry, and normal skin types.",
    faqs: [
      { q: "Is it suitable for acne-prone skin?", a: "Yes, it is non-comedogenic and repairs the skin barrier which helps calm acne inflammation." }
    ],
    isBestSeller: false,
    isNewArrival: true,
    isOffer: false
  },
  {
    id: "p5",
    slug: "dermacare-spf50-sunscreen",
    name: "Ultra-Light SPF 50+ Sunscreen Gel",
    brand: "Dermacare Pro",
    category: "skincare",
    subCategory: "Sunscreen",
    shortBenefit: "Broad-spectrum UVA/UVB protection",
    rating: 4.5,
    reviewCount: 310,
    price: 599,
    originalPrice: 749,
    discount: 20,
    size: "50 g",
    stockStatus: "In Stock",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop",
    skinType: "all",
    concern: "dull-skin",
    form: "Gel",
    description: "An ultra-light, oil-free gel sunscreen that provides broad-spectrum protection against UVA and UVB rays. It has a matte finish, leaves zero white cast, and is infused with Niacinamide to brighten dull skin.",
    benefits: [
      "High sun protection SPF 50+ PA++++",
      "Zero white cast and absorbs in seconds",
      "Sweat and water-resistant formula",
      "Infused with Niacinamide to even out skin tone"
    ],
    howToUse: "Apply a generous amount (two-finger rule) onto clean face and neck 15 minutes before sun exposure. Reapply every 2 hours.",
    ingredients: "Aqua, Ethylhexyl Methoxycinnamate, Zinc Oxide, Niacinamide, Glycerin, Cyclopentasiloxane, Tocopheryl Acetate.",
    suitableFor: "All skin types, works excellently under makeup.",
    faqs: [
      { q: "Does it feel heavy?", a: "No, the gel base makes it extremely light and weightless." }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: "p6",
    slug: "soma-sleep-gummies",
    name: "Deep Sleep Melatonin Gummies",
    brand: "Soma Wellness",
    category: "wellness",
    subCategory: "Sleep Care",
    shortBenefit: "Promotes restful sleep & relaxation",
    rating: 4.4,
    reviewCount: 76,
    price: 699,
    originalPrice: 899,
    discount: 22,
    size: "60 Gummies",
    stockStatus: "In Stock",
    badge: "Vegan Demo",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop",
    concern: "sensitive-skin",
    form: "Gummy",
    description: "Formulated with Melatonine, Chamomile, and L-Theanine, these delicious strawberry-flavored gummies help calm your mind, ease bedtime anxiety, and promote deep, restful, natural sleep cycle. Non-habit forming.",
    benefits: [
      "Promotes a regular, peaceful sleep cycle",
      "Contains Chamomile and Lavender extracts to ease stress",
      "Gelatin-free, 100% vegan, and natural strawberry flavor",
      "A safe, non-habit forming formula"
    ],
    howToUse: "Chew 1 gummy 30 minutes before bedtime. Do not exceed recommended dosage.",
    ingredients: "Melatonin (3mg), L-Theanine, Chamomile Extract, Lemon Balm Extract, Pectin, Organic Cane Sugar, Natural Strawberry Flavor.",
    suitableFor: "Adults over 18 years looking for natural sleep aid support.",
    faqs: [
      { q: "Is it addictive?", a: "No, Melatonin is a natural hormone and these gummies are formulated to be non-habit forming." }
    ],
    isBestSeller: false,
    isNewArrival: true,
    isOffer: false
  },
  {
    id: "p7",
    slug: "aura-botanicals-argan-shampoo",
    name: "Argan Oil Damage Repair Shampoo",
    brand: "Aura Botanicals",
    category: "haircare",
    subCategory: "Shampoo",
    shortBenefit: "Restores dry & frizzy hair texture",
    rating: 4.6,
    reviewCount: 154,
    price: 499,
    originalPrice: 599,
    discount: 16,
    size: "250 ml",
    stockStatus: "In Stock",
    badge: "Customer Favorite",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop",
    hairType: "dry",
    concern: "frizzy-hair",
    form: "Liquid",
    description: "Packed with pure Moroccan Argan Oil and Hydrolyzed Keratin, this rich moisturizing shampoo cleanses gently while repairing damaged, brittle strands, locking out humidity to tame frizzy, unmanageable hair.",
    benefits: [
      "Intensely hydrates and repairs damaged hair fibers",
      "Eliminates frizz and flyaways for sleek locks",
      "Safe for color-treated and chemically-processed hair",
      "Free from sulfates, parabens, and silicones"
    ],
    howToUse: "Apply to wet hair, lather gently from roots to ends, and rinse thoroughly. Follow with Argan Repair Conditioner.",
    ingredients: "Aqua, Sodium Lauroyl Methyl Isethionate, Moroccan Argan Oil, Hydrolyzed Keratin, Provitamin B5, Coconut-derived surfactants.",
    suitableFor: "Dry, damaged, frizzy, and treated hair.",
    faqs: [
      { q: "Is this safe for colored hair?", a: "Yes, it is completely sulfate-free and safe for color-treated hair." }
    ],
    isBestSeller: false,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: "p8",
    slug: "lunara-tinted-lip-balm",
    name: "Rose Petal Tinted Lip Balm",
    brand: "Lunara Organics",
    category: "makeup",
    subCategory: "Makeup",
    shortBenefit: "Natural flush & intensive hydration",
    rating: 4.8,
    reviewCount: 320,
    price: 299,
    originalPrice: 399,
    discount: 25,
    size: "4.8 g",
    stockStatus: "In Stock",
    badge: "Limited Offer",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop",
    skinType: "all",
    concern: "dry-skin",
    form: "Balm",
    description: "An ultra-nourishing lip balm that offers a soft rose flush. Rich in Shea Butter, Jojoba Oil, and real rose petal extracts, it heals cracked lips, leaving them soft, kissable, and moisturized all day long.",
    benefits: [
      "Deeply moisturizes with organic Shea Butter",
      "Gives a beautiful, natural pink tint",
      "Heals dry and chapped lips in 2 days",
      "100% edible-grade ingredients"
    ],
    howToUse: "Glide onto lips throughout the day as needed. Can be worn alone or under lipstick.",
    ingredients: "Organic Shea Butter, Jojoba Oil, Rose Petal Extract, Beeswax, Vitamin E, Alkanet Root (natural tint).",
    suitableFor: "Dry, chapped lips needing a touch of color.",
    faqs: [
      { q: "Is the color very bright?", a: "No, it is a very subtle, sheer rose pink tint suitable for everyday wear." }
    ],
    isBestSeller: true,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: "p9",
    slug: "alpha-grooming-face-wash",
    name: "Charcoal Deep Clean Face Wash",
    brand: "Alpha Grooming",
    category: "men",
    subCategory: "Men's Care",
    shortBenefit: "Detoxifies skin & controls oiliness",
    rating: 4.5,
    reviewCount: 65,
    price: 349,
    originalPrice: 449,
    discount: 22,
    size: "100 ml",
    stockStatus: "In Stock",
    badge: "New",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop",
    skinType: "oily",
    concern: "dull-skin",
    form: "Gel",
    description: "A purifying face wash for men formulated with Activated Charcoal and Menthol. It pulls out deeply embedded impurities, pollution, and oil from pores while delivering an icy cooling sensation.",
    benefits: [
      "Activated Charcoal acts as an impurity magnet",
      "Provides instant freshness with cooling Menthol",
      "Controls sebum production to prevent acne",
      "Designed specifically for men's thicker skin texture"
    ],
    howToUse: "Apply a small amount to wet face, lather, massage for 30 seconds, and rinse off. Use twice daily.",
    ingredients: "Activated Charcoal, Menthol, Aloe Vera Juice, Tea Tree Extract, Cocamidopropyl Betaine.",
    suitableFor: "Men with oily, combination, or pollution-exposed skin.",
    faqs: [
      { q: "Can women use it?", a: "Yes, it is perfectly safe for women who want a deep-pore charcoal cleanse." }
    ],
    isBestSeller: false,
    isNewArrival: true,
    isOffer: false
  },
  {
    id: "p10",
    slug: "purebaby-moisturizing-lotion",
    name: "Calendula Gentle Baby Lotion",
    brand: "PureBaby",
    category: "mother-baby",
    subCategory: "Personal Care",
    shortBenefit: "Hypoallergenic skin care for babies",
    rating: 4.9,
    reviewCount: 88,
    price: 499,
    originalPrice: 599,
    discount: 16,
    size: "200 ml",
    stockStatus: "In Stock",
    badge: "Dermatologist Tested Demo",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
    skinType: "sensitive",
    concern: "sensitive-skin",
    form: "Cream",
    description: "A clinically tested, hypoallergenic baby lotion enriched with organic Calendula and Sweet Almond Oil. It keeps your baby's delicate skin soft, hydrated, and protected against redness and rash.",
    benefits: [
      "pH balanced and pediatrician recommended",
      "Free from mineral oil, silicones, and synthetic dyes",
      "Soothes dry spots and diaper area irritation",
      "Non-greasy and absorbs instantly"
    ],
    howToUse: "Pump a small amount into your hands and gently rub over your baby's body after bath time.",
    ingredients: "Organic Calendula Officinalis Flower Extract, Sweet Almond Oil, Shea Butter, Chamomile Extract, Water.",
    suitableFor: "Newborns and toddlers with sensitive skin.",
    faqs: [
      { q: "Is it scented?", a: "It has a very mild natural scent from chamomile, with no added artificial perfumes." }
    ],
    isBestSeller: false,
    isNewArrival: false,
    isOffer: false
  },
  {
    id: "p11",
    slug: "dermacare-vitamin-c-serum",
    name: "15% Vitamin C Brightening Serum",
    brand: "Dermacare Pro",
    category: "skincare",
    subCategory: "Serums",
    shortBenefit: "Fades dark spots & pigmentation",
    rating: 4.7,
    reviewCount: 175,
    price: 849,
    originalPrice: 1099,
    discount: 22,
    size: "30 ml",
    stockStatus: "In Stock",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop",
    skinType: "all",
    concern: "pigmentation",
    form: "Serum",
    description: "Concentrated with 15% pure Ethyl Ascorbic Acid, Ferulic Acid, and Vitamin E, this powerful antioxidant serum fights dark spots, hyperpigmentation, sun damage, and brightens up a dull skin tone.",
    benefits: [
      "Visibly reduces pigmentation and dark spots in 4 weeks",
      "Fights free radical damage and signs of aging",
      "Boosts collagen production for firmer skin",
      "Stable formulation that doesn't oxidize quickly"
    ],
    howToUse: "Apply 2-3 drops on dry, clean skin after cleansing in the morning. Always layer with a broad-spectrum sunscreen.",
    ingredients: "Aqua, 3-O-Ethyl Ascorbic Acid (15%), Propanediol, Ferulic Acid, Tocopherol (Vitamin E), Phenoxyethanol.",
    suitableFor: "All skin types seeking radiant, even-toned skin.",
    faqs: [
      { q: "Should I store it in the fridge?", a: "It's best to store it in a cool, dark place away from direct sunlight." }
    ],
    isBestSeller: true,
    isNewArrival: false,
    isOffer: false
  },
  {
    id: "p12",
    slug: "soma-daily-multivitamin",
    name: "Daily Women's Wellness Multivitamin",
    brand: "Soma Wellness",
    category: "wellness",
    subCategory: "Vitamins Demo",
    shortBenefit: "Supports immunity, hair & energy levels",
    rating: 4.6,
    reviewCount: 89,
    price: 799,
    originalPrice: 999,
    discount: 20,
    size: "60 Tablets",
    stockStatus: "In Stock",
    badge: "Vegan Demo",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop",
    concern: "dull-skin",
    form: "Tablet",
    description: "A comprehensive daily nutritional supplement containing 23 essential vitamins and minerals, specifically formulated for women. Enriched with Biotin, Iron, Vitamin D, and Zinc to support daily energy, glowing skin, and strong immunity.",
    benefits: [
      "Boosts daily stamina and reduces fatigue",
      "Promotes stronger hair, nails, and radiant skin",
      "Supports bone density and hormonal balance",
      "100% vegetarian, sugar-free, and gluten-free"
    ],
    howToUse: "Take 1 tablet daily after breakfast or lunch with a glass of water. Do not exceed the recommended dose.",
    ingredients: "Vitamin A, Vitamin C, Vitamin D3, Vitamin E, Vitamin B Complex (B1, B2, B3, B5, B6, Biotin, B9, B12), Calcium, Iron, Zinc.",
    suitableFor: "Women over 18 years seeking to fill daily nutritional gaps.",
    faqs: [
      { q: "Is it safe to consume during pregnancy?", a: "Consult your doctor before taking any supplements if you are pregnant or lactating." }
    ],
    isBestSeller: false,
    isNewArrival: false,
    isOffer: false
  },
  {
    id: "p13",
    slug: "lunara-skincare-glow-kit",
    name: "The Radiant Skin Glow Routine Kit",
    brand: "Lunara Organics",
    category: "gift-sets",
    subCategory: "Gift Sets",
    shortBenefit: "Full 3-step ritual for radiant skin",
    rating: 4.9,
    reviewCount: 52,
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    size: "3 Products Kit",
    stockStatus: "In Stock",
    badge: "Limited Offer",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
    skinType: "all",
    concern: "dull-skin",
    form: "Kit",
    description: "Treat yourself or your loved ones to the ultimate skincare ritual. This curated box includes our best-selling Hyaluronic Acid Serum, Ceramide Moisturizer, and SPF 50 Gel, packed in a premium eco-friendly gift box.",
    benefits: [
      "Complete ritual to cleanse, treat, moisturize, and protect",
      "Saves 24% compared to buying individual products",
      "Perfect premium gifting idea for any occasion",
      "Suitable for all skin types and dermatologically tested"
    ],
    howToUse: "Cleanse face, apply 3 drops of Hyaluronic Serum, wait 1 minute, apply Ceramide Moisturizer, and seal it with SPF 50 in the daytime.",
    ingredients: "See individual packs for details. Pack includes: Hyaluronic Serum (30ml), Ceramide Moisturizer (50ml), SPF 50 Gel (50g).",
    suitableFor: "Anyone looking for a ready-to-use glowing skincare routine.",
    faqs: [
      { q: "Does it come with a gift box?", a: "Yes, it arrives in a beautifully embossed premium pink Lunara gift box." }
    ],
    isBestSeller: true,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: "p14",
    slug: "dermacare-cica-acne-gel",
    name: "Cica & Tea Tree Acne Spot Gel",
    brand: "Dermacare Pro",
    category: "healthcare",
    subCategory: "Hygiene",
    shortBenefit: "Rapidly shrinks active pimples",
    rating: 4.4,
    reviewCount: 110,
    price: 399,
    originalPrice: 499,
    discount: 20,
    size: "15 g",
    stockStatus: "In Stock",
    badge: "Dermatologist Tested Demo",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop",
    skinType: "oily",
    concern: "acne",
    form: "Gel",
    description: "An intensive overnight spot treatment containing 2% Salicylic Acid, Tea Tree Oil, and Cica. It targets stubborn, active pimples, reduces swelling and redness, and prevents scarring without drying out adjacent skin.",
    benefits: [
      "Visible reduction in pimple size overnight",
      "Cica helps prevent acne dark marks and scarring",
      "Transparent gel formula can be worn under makeup",
      "Hypoallergenic and dermatologist-tested demo formula"
    ],
    howToUse: "Dab a small drop directly onto the active acne/pimple. Do not rub. Let it dry. Use as the final step of your night routine.",
    ingredients: "Salicylic Acid (2%), Centella Asiatica (Cica) Extract, Melaleuca Alternifolia (Tea Tree) Extract, Zinc PCA, Aqua.",
    suitableFor: "Oily, sensitive, and acne-prone skin.",
    faqs: [
      { q: "Will it peel my skin?", a: "No, Cica ensures the spot is hydrated and repaired while salicylic acid clears the follicle." }
    ],
    isBestSeller: false,
    isNewArrival: false,
    isOffer: false
  }
];

export const MOCK_SERVICES = [
  {
    id: "s1",
    slug: "skin-consultation",
    title: "Skin Consultation",
    shortDescription: "Complete analysis of skin barriers, texture, moisture, and customized routines.",
    description: "Meet our skin specialists for a deep assessment of your skin health. We analyze your skin type, hydration levels, pore congestion, and active concerns (acne, aging, pigmentation) to draft a clinical, safe, and effective routine tailored just for you.",
    duration: "30 Mins",
    price: 0,
    isFree: true,
    whoItIsFor: "Anyone struggling with chronic acne, dry skin, dullness, or looking to build a science-backed skincare ritual.",
    whatIsIncluded: [
      "Skin type analysis & barrier function check",
      "Custom product ingredient matching report",
      "Personalized morning and night skincare plan",
      "15% Discount voucher for recommended Lunara products"
    ],
    process: [
      "Book an online slot through our easy booking portal",
      "Receive a video link or visit our clinic in Ahmedabad",
      "Discuss skin concerns, active lifestyle, and current products",
      "Get your personalized Lunara Skin Health Card via email/WhatsApp"
    ],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop"
  },
  {
    id: "s2",
    slug: "hair-consultation",
    title: "Hair Consultation",
    shortDescription: "Scalp assessment, hair thinning check, and root nourishment planning.",
    description: "Get a professional evaluation of your scalp health, hair density, and shaft condition. Our hair experts pinpoint reasons for hair fall, breakage, dandruff, or dryness, and recommend clean, nourishing oils, serums, and washing protocols.",
    duration: "45 Mins",
    price: 299,
    isFree: false,
    whoItIsFor: "People suffering from hair thinning, severe dandruff, frizzy texture, or damage from styling treatments.",
    whatIsIncluded: [
      "Scalp microscopy & oiliness level test",
      "Root strength evaluation",
      "Custom hair wash, oiling, and serum routine mapping",
      "Lifestyle and diet supplement recommendation"
    ],
    process: [
      "Select Hair Consultation and choose a preferred date/time",
      "Connect with our trichologist demo assistant online or in person",
      "Review your washing habits and scalp history",
      "Receive your custom Scalp Health Routine"
    ],
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop"
  },
  {
    id: "s3",
    slug: "beauty-consultation",
    title: "Beauty Routine Planning",
    shortDescription: "Personalized makeup styling, shade matching, and product guide.",
    description: "Unsure which foundation shade matches your undertone? Want a natural, clean makeup look for daily wear or an upcoming occasion? Our beauty experts will guide you through shade matching, application techniques, and beauty tools.",
    duration: "30 Mins",
    price: 0,
    isFree: true,
    whoItIsFor: "Makeup beginners and beauty enthusiasts wanting shade matching or personalized clean makeup styling advice.",
    whatIsIncluded: [
      "Undertone matching & foundation shade lookup",
      "Step-by-step application walkthrough",
      "Beauty tool guide (brushes, sponges, blenders)",
      "Curated beauty product checklist"
    ],
    process: [
      "Book a slot and share a clear picture under natural light (optional)",
      "Meet our makeup stylist virtually",
      "Go through colors, textures, and techniques",
      "Get a customized cart recommendation of matching products"
    ],
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop"
  },
  {
    id: "s4",
    slug: "wellness-consultation",
    title: "Personal Wellness Guidance",
    shortDescription: "Dietary supplements matching, sleep cycle management, and self-care routine.",
    description: "A healthy exterior comes from a balanced interior. Our wellness consultants help you understand your body's supplement needs, sleep hygiene habits, and self-care routines. Get guidance on natural vitamins, stress relief, and aromatherapy.",
    duration: "40 Mins",
    price: 499,
    isFree: false,
    whoItIsFor: "Individuals experiencing constant fatigue, sleep issues, stress, or wanting to plan a safe vitamin regimen.",
    whatIsIncluded: [
      "Daily stress and sleep hygiene checklist evaluation",
      "Dietary supplement safety check & matching",
      "Aromatherapy and mindfulness scheduling",
      "Self-care product prescription"
    ],
    process: [
      "Book the Wellness consultation and fill a simple lifestyle form",
      "Conduct a virtual session with our wellness expert",
      "Align on sleep, energy, and relaxation goals",
      "Get a daily nutrition and self-care planner"
    ],
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop"
  }
];

export const MOCK_CASE_STUDIES = [
  {
    id: "c1",
    slug: "priyas-acne-journey",
    title: "Priya's 8-Week Acne Control Transformation",
    concern: "Severe Acne & Redness",
    timeline: "8 Weeks",
    customerName: "Priya Sharma",
    age: 24,
    city: "Ahmedabad",
    productsUsed: ["Salicylic Acid Clarifying Cleanser", "Ceramide Barrier Defense Moisturizer", "Cica & Tea Tree Acne Spot Gel"],
    recommendedRoutine: "Morning: Salicylic Cleanser, Ceramide Cream, SPF 50. Night: Salicylic Cleanser, Hyaluronic Serum (on damp skin), Ceramide Cream, spot apply Cica Gel.",
    outcome: "Reduced active acne nodules by 85%, calmed overall skin inflammation, restored skin barrier function, and reduced dark red spots.",
    disclaimer: "Fictional demo case study. Results may vary depending on individual skin condition.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop"
  },
  {
    id: "c2",
    slug: "rahuls-hairfall-recovery",
    title: "Rahul's Scalp Nourishment & Hair Fall Control",
    concern: "Excessive Hair Fall & Dry Scalp",
    timeline: "12 Weeks",
    customerName: "Rahul Patel",
    age: 29,
    city: "Surat",
    productsUsed: ["Rosemary & Onion Hair Growth Oil", "Argan Oil Damage Repair Shampoo"],
    recommendedRoutine: "Oil scalp with Rosemary Oil thrice a week, leaving it overnight. Wash with Argan Shampoo. Avoid heated dryers.",
    outcome: "Hair fall reduced by 70%. Scalp dryness and itching were resolved, and new baby hair growth was visible near the temples.",
    disclaimer: "Fictional demo case study. Results may vary depending on individual scalp condition.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop"
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: "b1",
    slug: "build-simple-skincare-routine",
    title: "How to Build a Simple Skincare Routine: A Beginner's Guide",
    category: "Skincare",
    date: "July 5, 2026",
    excerpt: "Confused by toners, serums, and acids? Learn the simple 3-step baseline routine that actually works for healthy skin.",
    author: "Dr. Ananya Shah, Dermatologist Consultant",
    tags: ["Skincare", "Beginner Guide", "Healthy Glow"],
    content: `Building a skincare routine doesn't have to require a 10-step process. In fact, using too many active ingredients can damage your skin barrier, leading to irritation, breakouts, and redness.

Here is the ultimate dermatologist-approved 3-step routine:

### 1. Cleanse
Wash your face twice a day with a gentle, sulfate-free cleanser. Choose a gel-based cleanser if you have oily or acne-prone skin, and a cream-based cleanser if you have dry or sensitive skin.
*Recommended product:* [Salicylic Acid Clarifying Cleanser](/product/dermacare-salicylic-cleanser)

### 2. Moisturize
Even if you have oily skin, moisturizing is crucial to maintain moisture balance. It prevents your glands from overproducing sebum.
*Recommended product:* [Ceramide Barrier Defense Moisturizer](/product/lunara-ceramide-moisturizer)

### 3. Protect
Never skip sunscreen! UVA and UVB rays accelerate skin aging, trigger pigmentation, and cause deep cellular damage. Apply SPF 50 every single morning.
*Recommended product:* [Ultra-Light SPF 50+ Sunscreen Gel](/product/dermacare-spf50-sunscreen)

### The Bottom Line
Consistency is key. Stick to this basic routine for 4-6 weeks before adding extra treatment products like vitamin C or retinol serums.`,
    faqSection: [
      { q: "What is a basic skincare routine?", a: "A basic skincare routine consists of three essential steps: Cleanse (removing dirt and oil), Moisturize (hydrating and protecting the skin barrier), and Protect (applying sunscreen daily)." },
      { q: "Which skincare product should I use first?", a: "Always apply products starting from the thinnest consistency to the thickest. For example: Cleanser -> Toner -> Serum -> Moisturizer -> Sunscreen." }
    ],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop"
  },
  {
    id: "b2",
    slug: "identify-your-skin-type",
    title: "How do I identify my skin type at home?",
    category: "Skincare",
    date: "July 2, 2026",
    excerpt: "Knowing your skin type is the first step in buying the right products. Follow this simple wash-and-wait method to find out.",
    author: "Shreya Mehta, Skin Stylist",
    tags: ["Skincare", "Skin Type", "Education"],
    content: `Using products not formulated for your skin type is a common cause of skin sensitivity and product failure. Here is a simple, foolproof way to determine your skin type at home using the 'Bare-Faced Method'.

### Step-by-Step Guide:
1. Wash your face with a mild cleanser to remove makeup, oil, and dirt.
2. Pat dry and leave your skin completely bare (do not apply any toners, serums, or moisturizers).
3. Wait for 1 hour. During this time, try to stay in a room with a moderate temperature.

### The Results:
- **Dry Skin:** Your skin feels tight, parched, and you might notice flaky patches.
- **Oily Skin:** Your face looks shiny and feels greasy, especially on your forehead, nose, and cheeks.
- **Combination Skin:** Your T-zone (forehead, nose, chin) is oily/shiny, but your cheeks feel dry or normal.
- **Normal Skin:** Your skin feels comfortable, not too tight, and not too greasy.
- **Sensitive Skin:** Your skin feels itchy, hot, or displays visible redness.

### What's Next?
Once you identify your skin type, look for formulas tailored to it. Dry skin loves heavy cream moisturizers, while oily skin functions best with water-based gel creams.`,
    faqSection: [
      { q: "How do I identify my skin type?", a: "Wash your face, leave it completely bare without any skincare products, wait for one hour, and observe whether it feels tight (dry), shiny all over (oily), shiny only in the T-zone (combination), or comfortable (normal)." },
      { q: "How do I choose a moisturizer?", a: "Select a cream or oil-rich moisturizer if your skin is dry, a lightweight water-based gel moisturizer if your skin is oily, and a non-comedogenic gentle cream if your skin is sensitive." }
    ],
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop"
  },
  {
    id: "b3",
    slug: "haircare-routine-dry-frizzy-hair",
    title: "The Ultimate Haircare Routine for Dry and Frizzy Hair",
    category: "Haircare",
    date: "June 28, 2026",
    excerpt: "Frizz is a cry for moisture. Discover how to wash, oil, and hydrate your dry strands for a silky smooth finish.",
    author: "Amit Patel, Senior Hair Therapist",
    tags: ["Haircare", "Frizzy Hair", "Nourishment"],
    content: `Frizz occurs when the outer layer of your hair (the cuticle) opens up, allowing humidity to pass through and swell the strands. The primary trigger is lack of moisture.

To tame frizzy hair, you must lock the cuticles down. Here is a step-by-step hydration routine:

### 1. Pre-shampoo Oiling
Massage your scalp with a cold-pressed oil enriched with Rosemary and Argan. This provides a protective coating that prevents the shampoo from stripping all natural sebum.
*Recommended product:* [Rosemary & Onion Hair Growth Oil](/product/aura-botanicals-rosemary-oil)

### 2. Choose a Sulfate-Free Wash
Sulfates are harsh detergents that lather heavily but dehydrate the hair shaft. Switch to a hydrating argan-rich shampoo.
*Recommended product:* [Argan Oil Damage Repair Shampoo](/product/aura-botanicals-argan-shampoo)

### 3. Always Conditioner and Lock
Apply conditioner to the lower two-thirds of your hair. Rinse with cool water to seal the cuticles. Blot dry with a microfiber towel (never rub roughly).

### 4. Apply a Serum on Damp Hair
Apply 2 drops of a nourishing hair serum on damp hair to trap moisture before it evaporates in the air.`,
    faqSection: [
      { q: "How often should I wash my hair?", a: "For dry and frizzy hair, wash 2 times a week. Washing daily strips natural scalp oils and makes frizz worse." },
      { q: "How do I choose shampoo for my hair type?", a: "Choose a moisturizing sulfate-free shampoo for dry/frizzy hair, a clarifying salicylic shampoo for oily scalp, and a gentle daily shampoo for normal hair." }
    ],
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop"
  }
];

export const MOCK_LOCATIONS = [
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    address: "Premium Plaza, 3rd Floor, Bodakdev, Ahmedabad, Gujarat 380054",
    phone: "+91 7600 583 156",
    email: "ahmedabad@tarasaka.com",
    hours: "Monday to Saturday, 9:00 AM to 7:00 PM",
    isHeadquarters: true,
    servicesAvailable: ["Skin Analysis", "Hair Scanning", "Bridal Consultation", "Product Booking Pick-up"]
  },
  {
    id: "surat",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    address: "Royal Emporio, Ring Road, Surat, Gujarat 395002",
    phone: "+91 90162 89684",
    email: "surat@tarasaka.com",
    hours: "Monday to Saturday, 9:30 AM to 6:30 PM",
    isHeadquarters: false,
    servicesAvailable: ["Skin Analysis", "Beauty Makeover Styling", "Product Pick-up"]
  },
  {
    id: "vadodara",
    city: "Vadodara",
    state: "Gujarat",
    country: "India",
    address: "Valkyrie Arcade, Alkapuri, Vadodara, Gujarat 390007",
    phone: "+91 7600 583 156",
    email: "vadodara@tarasaka.com",
    hours: "Monday to Saturday, 9:30 AM to 6:30 PM",
    isHeadquarters: false,
    servicesAvailable: ["Skin Analysis", "Hair Scanning", "Product Pick-up"]
  },
  {
    id: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    address: "Ocean Breeze Wing, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 90162 89684",
    email: "mumbai@tarasaka.com",
    hours: "Monday to Saturday, 10:00 AM to 8:00 PM",
    isHeadquarters: false,
    servicesAvailable: ["Full Skin Consultation", "Full Hair Scanning", "Wellness Therapy Guides", "Mega Store Pick-up"]
  }
];

export const GENERAL_FAQS = [
  {
    q: "What is a patch test?",
    a: "A patch test is a simple way to test if a new cosmetic product causes skin irritation or allergic reactions. Apply a tiny amount of product behind your ear or inner arm, leave it for 24 hours, and check for redness, itching, or swelling."
  },
  {
    q: "How do I compare beauty products?",
    a: "Look at the active ingredient percentages, suitability for your skin or hair type, product form (gel, serum, cream), size, price, and customer reviews. You can also use our built-in Comparison tool."
  },
  {
    q: "What should I consider before buying wellness products?",
    a: "Ensure the product fits your daily lifestyle, check the ingredient list for allergens, look for vegan/vegetarian certifications if applicable, and always consult a doctor if you are on prior medication or pregnant."
  },
  {
    q: "When should I consult a beauty professional?",
    a: "Consult a professional if your skin/hair problems persist despite using basic skincare/haircare products, if you have severe cystic acne, or if you need help determining skin shade matches and custom chemical exfoliating routines."
  }
];
