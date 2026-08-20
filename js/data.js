// MGOLD GT Ltd - Product Data Model
// Based on real products from https://www.mgoldgt.com/
// Company: MGOLD GT Ltd, London, UK
// Address: 23c Thames Road, Barking, London, IG11 0HN
// Phone: +44 7879 998 584 | Email: info@mgoldgt.com

const COMPANY = {
  name: 'MGOLD GT Ltd',
  tagline: 'Premium Wholesale Food & Beverage Supplier',
  address: '23c Thames Road, Barking, London, IG11 0HN',
  phone: '+44 7879 998 584',
  email: 'info@mgoldgt.com',
  companyNumber: '14264044',
  director: 'Riffat Zakaria',
  whatsappNumber: '447879998584',
  description: `We are a sister concern wholesaler based in London, UK of a well-known Dubai company MGOLD General Trading LLC. We source from suppliers worldwide to fulfil the needs of the local market and deliver products to our ever-growing network of UK customers (mainly restaurants, cash and carry, small retail outlets, supermarkets, corporate clients).`,
  certifications: ['Halal', 'Kosher'],
  customers: ['Restaurants', 'Cash & Carry', 'Small Retail Outlets', 'Supermarkets', 'Corporate Clients']
};

const CATEGORIES = [
  {
    id: 'wholesale-oil',
    name: 'Wholesale Oil',
    slug: 'wholesale-oil',
    description: 'Premium edible and vegetable oils sourced from Ukraine, Malaysia and worldwide. Available in various packaging including 20L tins, jerry cans, and PET bottles.',
    icon: 'oilCan',
    image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=800&q=80',
    productCount: 5
  },
  {
    id: 'wholesale-liquid',
    name: 'Wholesale Liquid',
    slug: 'wholesale-liquid',
    description: 'Beverages, dairy products and liquid food essentials for the UK wholesale market.',
    icon: 'bottleWater',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80',
    productCount: 4
  },
  {
    id: 'other-wholesale',
    name: 'Other Wholesale Products',
    slug: 'other-wholesale',
    description: 'Dry goods, spices, tea, sugar, salt and milk powder for restaurants and retailers.',
    icon: 'boxesStacked',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80',
    productCount: 5
  }
];

const PRODUCTS = [
  // WHOLESALE OIL
  {
    id: 'sunflower-oil',
    categoryId: 'wholesale-oil',
    name: 'Sunflower Oil',
    subtitle: 'Ukrainian Refined 100% Sunflower Oil',
    shortDescription: 'Ukrainian, refined 100% sunflower oil. Halal, Kosher certified.',
    description: `Pressed from the seeds of the sunflower (Helianthus annuus). Sunflower oil is commonly used in food as a frying oil, and in cosmetic formulations as an emollient.

Sunflower oil is primarily composed of linoleic acid, a polyunsaturated fat, and oleic acid, a monounsaturated fat. Through selective breeding and manufacturing processes, oils of differing proportions of the fatty acids are produced.

The expressed oil has a neutral taste profile. The oil contains a large amount of vitamin E.

In 2018, Ukraine and Russia together accounted for 53% of the world's production of sunflower oil.`,
    origin: 'Ukraine',
    certifications: ['Halal', 'Kosher'],
    packaging: ['20L Tin / Jerry Can', 'PET Bottle 1L', 'PET Bottle 2L', 'Bulk Container'],
    features: [
      '100% refined sunflower oil',
      'High vitamin E content',
      'Neutral taste profile',
      'Ideal for frying and cooking',
      'Available in custom labelling'
    ],
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Bulk container orders available (3-5 containers per month).',
    tags: ['edible-oil', 'frying', 'cooking']
  },
  {
    id: 'canola-oil',
    categoryId: 'wholesale-oil',
    name: 'Canola Oil',
    subtitle: 'Ukrainian Refined 100% Canola / Rapeseed Oil',
    shortDescription: 'Ukrainian, refined 100% Canola/Rapeseed oil. Halal, Kosher certified.',
    description: `Canola oil is a food-grade version derived from rapeseed cultivars bred for low erucic acid content.

Also known as low erucic acid rapeseed (LEAR) oil, it has been generally recognized as safe by the United States Food and Drug Administration.

Canola oil is limited by government regulation to a maximum of 2% erucic acid by weight in the US and the EU, with special regulations for infant food. These low levels of erucic acid do not cause harm in humans.

Rapeseed is extensively cultivated in Canada, France, Belgium, the United Kingdom, the United States, the Netherlands, Germany, Denmark, and Poland. In France and Denmark, especially, the extraction of the oil is an important industry.`,
    origin: 'Ukraine',
    certifications: ['Halal', 'Kosher'],
    packaging: ['20L Tin / Jerry Can', 'PET Bottle 1L', 'PET Bottle 2L', 'Bulk Container'],
    features: [
      'Low erucic acid content',
      'Food-grade refined quality',
      'Recognized as safe by FDA',
      'Low saturated fat',
      'Available in custom labelling'
    ],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Bulk container orders available (3-5 containers per month).',
    tags: ['edible-oil', 'rapeseed', 'cooking']
  },
  {
    id: 'palm-oil',
    categoryId: 'wholesale-oil',
    name: 'Palm Oil',
    subtitle: 'Refined Malaysian CP10 Palm Olein',
    shortDescription: 'Refined Malaysian CP10 Palm Olein. Halal, Kosher certified.',
    description: `Palm oil is an edible vegetable oil derived from the mesocarp (reddish pulp) of the fruit of the oil palms.

The oil is used in food manufacturing, in beauty products, and as biofuel. Palm oil accounted for about 33% of global oils produced from oil crops in 2014.

Palm oils are easier to stabilize and maintain quality of flavor and consistency in processed foods, so are frequently favored by food manufacturers. On average globally, humans consumed 7.7 kg of palm oil per person in 2015.

Demand has also increased for other uses, such as cosmetics and biofuels, creating more demand on the supply encouraging the growth of palm oil plantations in tropical countries.

The biggest producers of palm oil are Indonesia, Malaysia, Thailand and Nigeria.`,
    origin: 'Malaysia',
    certifications: ['Halal', 'Kosher'],
    packaging: ['20L Tin / Jerry Can', 'PET Bottle 1L', 'PET Bottle 2L', 'Bulk Container'],
    features: [
      'Refined CP10 Palm Olein',
      'Excellent stability in processed foods',
      'Consistent flavor quality',
      'Widely used in food manufacturing',
      'Available in custom labelling'
    ],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Bulk container orders available (3-5 containers per month).',
    tags: ['edible-oil', 'palm-olein', 'manufacturing']
  },
  {
    id: 'vegetable-oil',
    categoryId: 'wholesale-oil',
    name: 'Vegetable Oil',
    subtitle: 'Ukrainian Refined 100% Vegetable Oil',
    shortDescription: 'Ukrainian, refined 100% Vegetable oil. Halal, Kosher certified.',
    description: `Premium Ukrainian refined 100% vegetable oil, suitable for a wide range of cooking and food preparation applications.

Our vegetable oil is sourced from reliable suppliers and meets the highest quality standards for the UK wholesale market. Ideal for restaurants, cash and carry outlets, and food manufacturers.

All products are available with custom MGOLD GT labelling upon request.`,
    origin: 'Ukraine',
    certifications: ['Halal', 'Kosher'],
    packaging: ['20L Tin / Jerry Can', 'PET Bottle 1L', 'PET Bottle 2L', 'Bulk Container'],
    features: [
      '100% refined vegetable oil',
      'Versatile cooking applications',
      'Consistent quality',
      'Suitable for high-heat frying',
      'Available in custom labelling'
    ],
    image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Bulk container orders available (3-5 containers per month).',
    tags: ['edible-oil', 'cooking', 'frying']
  },
  {
    id: 'olive-oil',
    categoryId: 'wholesale-oil',
    name: 'Olive Oil',
    subtitle: 'Premium Olive Oil',
    shortDescription: 'Premium olive oil for the UK wholesale market.',
    description: `Premium olive oil sourced for the UK wholesale market. Suitable for restaurants, retail outlets, and food service businesses.

We are always on the lookout for new reliable suppliers providing competitive prices to establish a long-term business relationship for olive oil supply.

All products are available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: ['Halal', 'Kosher'],
    packaging: ['20L Tin / Jerry Can', 'PET Bottle 1L', 'PET Bottle 2L', 'Bulk Container'],
    features: [
      'Premium quality olive oil',
      'Ideal for cooking and dressing',
      'Food service grade',
      'Consistent supply',
      'Available in custom labelling'
    ],
    image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for container pricing.',
    tags: ['edible-oil', 'olive', 'premium']
  },

  // WHOLESALE LIQUID
  {
    id: 'mineral-water',
    categoryId: 'wholesale-liquid',
    name: 'Mineral Water',
    subtitle: 'Premium Mineral Water',
    shortDescription: 'Premium mineral water for wholesale distribution across the UK.',
    description: `Premium mineral water sourced for wholesale distribution across the UK market. Suitable for restaurants, cash and carry, supermarkets, and corporate clients.

We source from reliable suppliers worldwide to fulfil the needs of the local market. All products can be supplied with MGOLD GT custom labelling.

Available in various bottle sizes to meet your business requirements.`,
    origin: 'Various',
    certifications: [],
    packaging: ['500ml Bottle', '1L Bottle', '1.5L Bottle', '5L Bottle', 'Bulk'],
    features: [
      'Premium quality mineral water',
      'Multiple bottle sizes available',
      'Suitable for hospitality and retail',
      'Custom labelling available',
      'Reliable supply chain'
    ],
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for bulk pricing.',
    tags: ['beverage', 'water', 'hospitality']
  },
  {
    id: 'condensed-milk',
    categoryId: 'wholesale-liquid',
    name: 'Condensed Milk',
    subtitle: 'Sweetened Condensed Milk',
    shortDescription: 'Sweetened condensed milk for wholesale supply to UK businesses.',
    description: `Sweetened condensed milk for wholesale supply to UK businesses including restaurants, cash and carry outlets, and retail stores.

A staple ingredient for desserts, beverages, and food manufacturing. We source from reliable suppliers worldwide to ensure consistent quality and competitive pricing.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['397g Can', '1kg Pouch', 'Bulk Container'],
    features: [
      'Sweetened condensed milk',
      'Ideal for desserts and beverages',
      'Consistent quality',
      'Food manufacturing grade',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for container pricing.',
    tags: ['dairy', 'condensed', 'desserts']
  },
  {
    id: 'evaporated-milk',
    categoryId: 'wholesale-liquid',
    name: 'Evaporated Milk',
    subtitle: 'Full Cream Evaporated Milk',
    shortDescription: 'Evaporated milk for wholesale distribution across the UK.',
    description: `Full cream evaporated milk for wholesale distribution across the UK market. Essential for restaurants, bakeries, and food manufacturers.

We source from reliable suppliers to ensure consistent quality and competitive pricing for our UK customer network.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['410g Can', '1kg Pouch', 'Bulk Container'],
    features: [
      'Full cream evaporated milk',
      'Ideal for cooking and baking',
      'Long shelf life',
      'Food service grade',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for container pricing.',
    tags: ['dairy', 'evaporated', 'cooking']
  },
  {
    id: 'soft-drinks',
    categoryId: 'wholesale-liquid',
    name: 'Soft Drinks',
    subtitle: 'Assorted Soft Drinks',
    shortDescription: 'Assorted soft drinks for wholesale supply to UK retailers and hospitality.',
    description: `Assorted soft drinks for wholesale supply to UK retailers, restaurants, cash and carry outlets, and corporate clients.

We source from suppliers worldwide to fulfil the needs of the local market with competitive pricing and reliable delivery.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['330ml Can', '500ml Bottle', '1.5L Bottle', '2L Bottle'],
    features: [
      'Wide range of soft drinks',
      'Multiple packaging options',
      'Suitable for retail and hospitality',
      'Competitive wholesale pricing',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for mixed pallet options.',
    tags: ['beverage', 'soft-drinks', 'retail']
  },

  // OTHER WHOLESALE PRODUCTS
  {
    id: 'milk-powder',
    categoryId: 'other-wholesale',
    name: 'Milk Powder',
    subtitle: 'Full Cream & Skimmed Milk Powder',
    shortDescription: 'Full cream and skimmed milk powder for wholesale supply.',
    description: `Full cream and skimmed milk powder for wholesale supply to UK businesses. Essential for bakeries, food manufacturers, and retail outlets.

We source from reliable suppliers worldwide to ensure consistent quality and competitive pricing for the UK market.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['25kg Bag', '50kg Bag', 'Bulk'],
    features: [
      'Full cream and skimmed options',
      'Long shelf life',
      'Ideal for manufacturing',
      'Consistent quality',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for bulk container pricing.',
    tags: ['dairy', 'powder', 'manufacturing']
  },
  {
    id: 'tea',
    categoryId: 'other-wholesale',
    name: 'Tea',
    subtitle: 'Premium Tea Selection',
    shortDescription: 'Premium tea selection for wholesale distribution.',
    description: `Premium tea selection for wholesale distribution across the UK market. Catering to restaurants, cafes, cash and carry outlets, and retail stores.

We source from reliable suppliers worldwide to fulfil the needs of the local market with quality tea products at competitive prices.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['250g Box', '500g Box', '1kg Bag', 'Bulk'],
    features: [
      'Premium tea selection',
      'Multiple grades available',
      'Suitable for hospitality and retail',
      'Competitive wholesale pricing',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for variety mixes.',
    tags: ['beverage', 'tea', 'hospitality']
  },
  {
    id: 'spices',
    categoryId: 'other-wholesale',
    name: 'Spices',
    subtitle: 'Assorted Wholesale Spices',
    shortDescription: 'Assorted spices for wholesale supply to UK food businesses.',
    description: `Assorted spices for wholesale supply to UK food businesses including restaurants, cash and carry outlets, and food manufacturers.

We source from reliable suppliers worldwide to ensure authentic flavours and consistent quality for the UK market.

Available with custom MGOLD GT labelling and packaging upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['100g Pack', '250g Pack', '500g Pack', '1kg Bag', 'Bulk'],
    features: [
      'Wide variety of spices',
      'Authentic flavours',
      'Food-grade packaging',
      'Suitable for manufacturing',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for mixed spice pallets.',
    tags: ['spices', 'cooking', 'manufacturing']
  },
  {
    id: 'sugar',
    categoryId: 'other-wholesale',
    name: 'Sugar',
    subtitle: 'Refined White & Brown Sugar',
    shortDescription: 'Refined white and brown sugar for wholesale distribution.',
    description: `Refined white and brown sugar for wholesale distribution across the UK market. Essential for restaurants, bakeries, food manufacturers, and retail outlets.

We source from reliable suppliers to ensure consistent quality and competitive pricing for our UK customer network.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['1kg Bag', '5kg Bag', '25kg Bag', '50kg Bag', 'Bulk'],
    features: [
      'Refined white and brown sugar',
      'Food-grade quality',
      'Multiple packaging sizes',
      'Ideal for manufacturing',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1622484211148-2566c6e8f0e3?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for bulk container pricing.',
    tags: ['sugar', 'baking', 'manufacturing']
  },
  {
    id: 'salt',
    categoryId: 'other-wholesale',
    name: 'Salt',
    subtitle: 'Refined Table & Cooking Salt',
    shortDescription: 'Refined table and cooking salt for wholesale supply.',
    description: `Refined table and cooking salt for wholesale supply to UK businesses. Essential for restaurants, food manufacturers, and retail outlets.

We source from reliable suppliers worldwide to ensure consistent quality and competitive pricing.

Available with custom MGOLD GT labelling upon request.`,
    origin: 'Various',
    certifications: [],
    packaging: ['500g Pack', '1kg Bag', '5kg Bag', '25kg Bag', 'Bulk'],
    features: [
      'Refined table and cooking salt',
      'Food-grade quality',
      'Multiple packaging sizes',
      'Essential for food service',
      'Custom labelling available'
    ],
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&q=80',
    minOrder: '1 pallet',
    moqNote: 'Minimum order: 1 pallet. Contact us for bulk pricing.',
    tags: ['salt', 'cooking', 'food-service']
  }
];

// Packaging options for the quote form
const PACKAGING_OPTIONS = {
  '20L Tin / Jerry Can': { unit: 'tin', defaultQty: 100 },
  'PET Bottle 1L': { unit: 'bottle', defaultQty: 500 },
  'PET Bottle 2L': { unit: 'bottle', defaultQty: 300 },
  'Bulk Container': { unit: 'container', defaultQty: 1 },
  '500ml Bottle': { unit: 'bottle', defaultQty: 1000 },
  '1L Bottle': { unit: 'bottle', defaultQty: 500 },
  '1.5L Bottle': { unit: 'bottle', defaultQty: 400 },
  '5L Bottle': { unit: 'bottle', defaultQty: 200 },
  '397g Can': { unit: 'can', defaultQty: 500 },
  '410g Can': { unit: 'can', defaultQty: 500 },
  '1kg Pouch': { unit: 'pouch', defaultQty: 300 },
  '25kg Bag': { unit: 'bag', defaultQty: 50 },
  '50kg Bag': { unit: 'bag', defaultQty: 25 },
  '100g Pack': { unit: 'pack', defaultQty: 500 },
  '250g Pack': { unit: 'pack', defaultQty: 400 },
  '250g Box': { unit: 'box', defaultQty: 200 },
  '500g Pack': { unit: 'pack', defaultQty: 300 },
  '500g Box': { unit: 'box', defaultQty: 150 },
  '1kg Bag': { unit: 'bag', defaultQty: 100 },
  '5kg Bag': { unit: 'bag', defaultQty: 50 },
  '1kg Box': { unit: 'box', defaultQty: 100 },
  'Bulk': { unit: 'kg', defaultQty: 1000 }
};

export { COMPANY, CATEGORIES, PRODUCTS, PACKAGING_OPTIONS };
