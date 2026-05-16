export const SERVICES = [
  {
    num: '01',
    slug: 'cocteles-exclusivos',
    title: 'Cócteles Exclusivos',
    title_en: 'Exclusive Cocktails',
    tagline: 'Creación exclusiva de cócteles únicos que reflejan la esencia de tu evento.',
    tagline_en: 'Exclusive creation of unique cocktails that reflect the essence of your event.',
    description:
      'Nuestros bartenders diseñan cócteles a medida que sorprenderán a tus invitados. Cada receta nace de combinar ingredientes de calidad local con técnicas innovadoras, pensadas para el calor y el ambiente de Ibiza. Todos los cócteles pueden prepararse con nuestra versión picante usando tequila infusionado con chili.',
    description_en:
      'Our bartenders design bespoke cocktails that will surprise your guests. Each recipe is born from combining quality local ingredients with innovative techniques, designed for the heat and atmosphere of Ibiza. All cocktails can be prepared with our spicy version using chili-infused tequila.',
    features: [
      'Recetas personalizadas para cada evento',
      'Ingredientes frescos y de producción local',
      'Presentación innovadora y estética',
      'Versión picante disponible en todos los cócteles',
    ],
    features_en: [
      'Custom recipes for each event',
      'Fresh and locally produced ingredients',
      'Innovative and aesthetic presentation',
      'Spicy version available for all cocktails',
    ],
    image: 'https://static.wixstatic.com/media/a90734_ee9c8f0f089d41a1aed2ed4faf8c2cfb~mv2.jpg',
    menu: [
      {
        category: 'Tequila & Mezcal',
        items: [
          {
            name: "L'Extranjero",
            profile: 'Fresco, herbáceo y aromático',
            profile_en: 'Fresh, herbaceous and aromatic',
            ingredients: 'Tequila / mezcal · Licor de jazmín · Vermut con eneldo · Shiso morado · Lima · Agave · Tónica',
            ingredients_en: 'Tequila / mezcal · Jasmine liqueur · Dill vermouth · Purple shiso · Lime · Agave · Tonic',
            image: 'https://static.wixstatic.com/media/a90734_a623fe6e5c704de99532c50d624712c1~mv2.jpg',
          },
          {
            name: 'Tommy the Smoker',
            profile: 'Ahumado y especiado con toques de humo',
            profile_en: 'Smoky and spiced with hints of smoke',
            ingredients: 'Tequila / mezcal · Licor de chipotle · Agave de té negro ahumado · Lima',
            ingredients_en: 'Tequila / mezcal · Chipotle liqueur · Smoked black tea agave · Lime',
            image: 'https://static.wixstatic.com/media/a90734_f7df197373434ffba0e9b1feb0969c4c~mv2.jpg',
          },
          {
            name: 'Mexiático',
            profile: 'Afrutado con toque de cilantro fresco',
            profile_en: 'Fruity with a touch of fresh coriander',
            ingredients: 'Tequila / mezcal · Licor de mandarina · Puré de lychee · Cilantro · Lima',
            ingredients_en: 'Tequila / mezcal · Mandarin liqueur · Lychee purée · Coriander · Lime',
            image: 'https://static.wixstatic.com/media/a90734_bbb986b668584b4682bc6043b436a33c~mv2.jpg',
          },
        ],
      },
      {
        category: 'Gin',
        items: [
          {
            name: 'For Gin Sake',
            profile: 'Mezcla aromática de frutas exóticas con toque asiático',
            profile_en: 'Aromatic blend of exotic fruits with an Asian twist',
            ingredients: 'Gin · Sake · Licor de rosa · Licor de lychee · Lima · Sirope de té verde con jazmín',
            ingredients_en: 'Gin · Sake · Rose liqueur · Lychee liqueur · Lime · Green tea & jasmine syrup',
            image: 'https://static.wixstatic.com/media/a90734_0eda213e005840f1936dd6858b950284~mv2.jpg',
          },
          {
            name: 'Gingerito',
            profile: 'Mojito de gin con jengibre fresco',
            profile_en: 'Gin mojito with fresh ginger',
            ingredients: 'Gin · Licor de jengibre · Lima · Jengibre fresco · Cerveza de jengibre',
            ingredients_en: 'Gin · Ginger liqueur · Lime · Fresh ginger · Ginger beer',
            image: 'https://static.wixstatic.com/media/a90734_51c54e79073f4c78a2652a04ace73404~mv2.jpg',
          },
        ],
      },
      {
        category: 'Vodka',
        items: [
          {
            name: 'Curcumule',
            profile: 'Moscow Mule actualizado con cúrcuma fresca',
            profile_en: 'Moscow Mule updated with fresh turmeric',
            ingredients: 'Vodka · Zumo fresco de jengibre y cúrcuma · Angostura bitters · Lima · Cerveza de jengibre',
            ingredients_en: 'Vodka · Fresh ginger & turmeric juice · Angostura bitters · Lime · Ginger beer',
            image: 'https://static.wixstatic.com/media/a90734_c1c06cbc02a943a5b57044bca2dea044~mv2.jpg',
          },
        ],
      },
      {
        category: 'Aperitivos',
        category_en: 'Aperitifs',
        items: [
          {
            name: 'Exotic Fling',
            profile: 'Fresco y afrutado, muy fácil de beber',
            profile_en: 'Fresh and fruity, very easy to drink',
            ingredients: 'Vodka · Licor de maracuyá · Zumo fresco de sandía · Lima · Cava · Soda',
            ingredients_en: 'Vodka · Passion fruit liqueur · Fresh watermelon juice · Lime · Cava · Soda',
            image: 'https://static.wixstatic.com/media/a90734_4c408789420143478786ca6eeb44d041~mv2.jpg',
          },
          {
            name: 'El Capo',
            profile: 'Afrutado con notas amargas',
            profile_en: 'Fruity with bitter notes',
            ingredients: 'Amaro · Puré de pera · Licor de naranja · Soda',
            ingredients_en: 'Amaro · Pear purée · Orange liqueur · Soda',
            image: 'https://static.wixstatic.com/media/a90734_586c7b1c5db1481e8e86430b841546bb~mv2.jpg',
          },
          {
            name: "L'Hulo",
            profile: 'Hugo con toque cítrico y aromático',
            profile_en: 'Hugo with a citrus and aromatic twist',
            ingredients: 'Gin (opcional) · Licor de flor de saúco · Menta · Puré de lulo · Lima · Cava · Soda',
            ingredients_en: 'Gin (optional) · Elderflower liqueur · Mint · Lulo purée · Lime · Cava · Soda',
            image: 'https://static.wixstatic.com/media/a90734_8b72e90b15c94ef880d4508dd0be0437~mv2.jpg',
          },
        ],
      },
    ],
  },

  {
    num: '02',
    slug: 'zumos-naturales',
    title: 'Zumos Naturales & Recuperación',
    title_en: 'Natural Juices & Recovery',
    tagline: 'Una forma sana y deliciosa de disfrutar las frutas más frescas.',
    tagline_en: 'A healthy and delicious way to enjoy the freshest fruits.',
    description:
      'No toda celebración requiere alcohol — y la mañana siguiente a menudo pide algo reconstituyente. Nuestro servicio de zumos naturales lleva frutas 100% recién exprimidas a tu evento, con opciones adaptadas al sabor, la nutrición y las necesidades dietéticas de tus invitados.',
    description_en:
      'Not every celebration requires alcohol — and the morning after often calls for something restorative. Our natural juice service brings 100% freshly squeezed fruits to your event, with options tailored to the taste, nutrition and dietary needs of your guests.',
    features: [
      'Zumo 100% natural, exprimido en el momento',
      'Información detallada sobre las propiedades de cada fruta',
      'Opciones personalizadas para distintas necesidades',
      'Perfecto como complemento al servicio de barra',
    ],
    features_en: [
      '100% natural juice, freshly squeezed on the spot',
      'Detailed information on the properties of each fruit',
      'Personalised options for different needs',
      'Perfect as a complement to the bar service',
    ],
    image: 'https://static.wixstatic.com/media/f073099baa4743f6ade772242b5fdcc4.jpg',
    menu: [
      {
        category: 'Smoothies & Detox',
        items: [
          {
            name: 'Green Detox',
            profile: 'Depurativo y energizante',
            profile_en: 'Cleansing and energising',
            ingredients: 'Manzana verde · Pepino · Jengibre · Lima · Menta',
            ingredients_en: 'Green apple · Cucumber · Ginger · Lime · Mint',
            image: 'https://static.wixstatic.com/media/a90734_734f5a8427b94a6fa92170425e7d630b~mv2.jpg',
          },
          {
            name: 'Tropical Recovery',
            profile: 'Refrescante y reconstituyente',
            profile_en: 'Refreshing and restorative',
            ingredients: 'Piña · Mango · Coco · Cúrcuma · Lima',
            ingredients_en: 'Pineapple · Mango · Coconut · Turmeric · Lime',
            image: 'https://static.wixstatic.com/media/a90734_7ce91a95af8e4f199acd40dfcfd2761d~mv2.jpg',
          },
          {
            name: 'Berry Boost',
            profile: 'Antioxidante y dulce',
            profile_en: 'Antioxidant and sweet',
            ingredients: 'Fresas · Frambuesas · Moras · Granada · Naranja',
            ingredients_en: 'Strawberries · Raspberries · Blackberries · Pomegranate · Orange',
            image: 'https://static.wixstatic.com/media/a90734_cb4a8ff4854d44cb85689ec6666288ff~mv2.jpg',
          },
        ],
      },
      {
        category: 'Zumos Frescos',
        category_en: 'Fresh Juices',
        items: [
          {
            name: 'Citrus Power',
            profile: 'Clásico y revitalizante',
            profile_en: 'Classic and revitalising',
            ingredients: 'Naranja · Pomelo · Limón · Jengibre',
            ingredients_en: 'Orange · Grapefruit · Lemon · Ginger',
            image: 'https://static.wixstatic.com/media/a90734_001d3e9fb52747f3b538d4b922eb7948~mv2.jpg',
          },
          {
            name: 'Watermelon Breeze',
            profile: 'Hidratante y veraniego',
            profile_en: 'Hydrating and summery',
            ingredients: 'Sandía · Menta · Lima · Agua de coco',
            ingredients_en: 'Watermelon · Mint · Lime · Coconut water',
            image: 'https://static.wixstatic.com/media/a90734_868e898b0ebe4ae698a7ef14beb4dec4~mv2.jpg',
          },
        ],
      },
    ],
  },

  {
    num: '03',
    slug: 'alquiler-barra',
    title: 'Alquiler de Barra & Equipamiento',
    title_en: 'Bar & Equipment Rental',
    tagline: 'Todo lo que necesitas para ofrecer un servicio profesional en tu evento.',
    tagline_en: 'Everything you need to offer a professional service at your event.',
    description:
      'Nuestras barras modulares están diseñadas para adaptarse a cualquier espacio: desde íntimas terrazas de villas hasta grandes recintos al aire libre. Suministramos e instalamos todo lo necesario para una barra profesional completa — refrigeración, cristalería, herramientas de mixología y elementos de marca.',
    description_en:
      'Our modular bars are designed to adapt to any space: from intimate villa terraces to large outdoor venues. We supply and install everything needed for a complete professional bar — refrigeration, glassware, mixology tools and branding elements.',
    features: [
      'Barras modulares adaptadas a tu espacio y estética',
      'Cristalería de alta gama disponible para alquiler',
      'Equipamiento completo para mixología profesional',
      'Montaje, servicio y desmontaje incluidos',
      'Personal cualificado disponible bajo petición',
    ],
    features_en: [
      'Modular bars adapted to your space and aesthetic',
      'High-end glassware available for rental',
      'Complete equipment for professional mixology',
      'Assembly, service and dismantling included',
      'Qualified staff available on request',
    ],
    image: 'https://static.wixstatic.com/media/a90734_641d65b19c8f4028891ef2d98d1d5b6f~mv2.jpg',
    priceLists: [
      { label: 'Rental Bar', file: '/bar.pdf' },
      { label: 'Rental Glass', file: '/glass.pdf' },
    ],
  },

  {
    num: '04',
    slug: 'gestion-eventos',
    title: 'Gestión Integral de Eventos',
    title_en: 'Full Event Management',
    tagline: 'Nos encargamos de todo para que tú simplemente disfrutes.',
    tagline_en: 'We take care of everything so you can simply enjoy.',
    description:
      'Desde licencias y permisos hasta coordinación de proveedores y personal en el día, nuestro servicio de gestión integral elimina cada carga logística de tus manos. Trabajamos con bodas, retiros corporativos y celebraciones privadas — guiándote en cada decisión y ejecutando con precisión para que la experiencia supere todas las expectativas.',
    description_en:
      'From licenses and permits to supplier coordination and on-the-day staffing, our full management service removes every logistical burden from your hands. We work with weddings, corporate retreats and private celebrations — guiding you through every decision and executing with precision so the experience exceeds all expectations.',
    features: [
      'Organización completa del evento y logística',
      'Gestión de licencias y permisos necesarios',
      'Coordinación de todos los proveedores',
      'Diseño del menú de bebidas y ambiente',
      'Acompañamiento personalizado de principio a fin',
    ],
    features_en: [
      'Complete event organisation and logistics',
      'Management of necessary licenses and permits',
      'Coordination of all suppliers',
      'Drinks menu and atmosphere design',
      'Personalised support from start to finish',
    ],
    image: 'https://static.wixstatic.com/media/a90734_7f480df04eb24b60beea3a954df4ba79~mv2.jpg',
  },
]
