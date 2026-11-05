/* ===========================================================
   ATOMIC GRILL - EDIT THIS FILE TO CHANGE PRICES, ITEMS, LINKS
   Prices are numbers in GH₵ (cedis). Don't remove commas or quotes.
   =========================================================== */

const SITE = {
  tel: "+233539592487",          // used by the Call button
  whatsapp: "233539592487",      // country code + number, no + or leading 0
  mapsUrl: "https://share.google/WsBtscdH0ncF9LfLQ",
  boltUrl: "",                   // REPLACE: Bolt Food link. Leave "" to hide the button.
  instagram: "https://www.instagram.com/atomicgrillgh", // CHECK this is the right page
  tiktok: "https://www.tiktok.com/@atomicgrillgh",      // CHECK this is the right page
  facebook: "",                  // REPLACE: Facebook page link. Leave "" to hide it.
  orderMessage:
    "Hi Atomic Grill, I'd like to place an order.\n\nOrder:\n\nDelivery or pickup:\nMy location (for delivery):"
};

// Photos live in /images. Each tab shows its photos beside (desktop) or above (phone) the list.
const MENU = [
  {
    id: "rice", label: "Rice",
    photos: [
      { src: "images/rice-fried.webp", alt: "Fried rice with grilled chicken" },
      { src: "images/rice-jollof.webp", alt: "Jollof rice with grilled chicken" }
    ],
    sections: [
      { title: "Fried Rice", note: "Served with your choice of protein.", items: [
        { name: "Fried rice & chilli", price: 55 },
        { name: "BBQ sauced wings", price: 90 },
        { name: "BBQ sauced thigh", price: 95 },
        { name: "Grilled wings", price: 85 },
        { name: "Grilled thigh", price: 90 },
        { name: "Tilapia", price: 95 },
        { name: "Half chicken", price: 145 },
        { name: "Full chicken", price: 175 },
        { name: "Beef fried rice", price: 90 },
        { name: "Chicken fried rice", price: 85 },
        { name: "Assorted fried rice", desc: "Chicken & beef", price: 95 }
      ]},
      { title: "Jollof Rice", note: "Served with your choice of protein.", items: [
        { name: "Jollof rice & chilli", price: 60 },
        { name: "BBQ sauced wings", price: 90 },
        { name: "BBQ sauced thigh", price: 95 },
        { name: "Grilled wings", price: 85 },
        { name: "Grilled thigh", price: 90 },
        { name: "Tilapia", price: 100 },
        { name: "Half chicken", price: 150 },
        { name: "Full chicken", price: 180 },
        { name: "Beef jollof", price: 95 },
        { name: "Chicken jollof", price: 90 },
        { name: "Assorted jollof", desc: "Chicken & beef", price: 100 }
      ]}
    ]
  },
  {
    id: "chips", label: "Chips",
    photos: [
      { src: "images/chips-yam.webp", alt: "Fried yam chips with chilli sauce" },
      { src: "images/chips-fries.webp", alt: "Golden French fries with ketchup" }
    ],
    sections: [
      { title: "Yam Chips", items: [
        { name: "Yam chips & chilli", price: 50 },
        { name: "BBQ sauced wings", price: 85 },
        { name: "BBQ sauced thigh", price: 90 },
        { name: "Grilled wings", price: 80 },
        { name: "Grilled thigh", price: 85 },
        { name: "Tilapia", price: 90 },
        { name: "Half chicken", price: 140 },
        { name: "Full chicken", price: 170 }
      ]},
      { title: "French Fries", items: [
        { name: "Fries & ketchup", price: 50 },
        { name: "BBQ sauced wings", price: 85 },
        { name: "BBQ sauced thigh", price: 90 },
        { name: "Grilled wings", price: 80 },
        { name: "Grilled thigh", price: 85 },
        { name: "Tilapia", price: 90 },
        { name: "Half chicken", price: 140 },
        { name: "Full chicken", price: 170 }
      ]}
    ]
  },
  {
    id: "chicken", label: "Grilled Chicken",
    photos: [
      { src: "images/chicken-hero.webp", alt: "Plate of flame-grilled chicken" },
      { src: "images/chicken-bbq.webp", alt: "BBQ glazed chicken wings" }
    ],
    sections: [
      { title: "Grilled Chicken", note: "Served without sides.", items: [
        { name: "Full chicken", desc: "Chicken only", price: 130 },
        { name: "Half chicken", desc: "Chicken only", price: 90 },
        { name: "Grilled chicken wings", price: 55 },
        { name: "BBQ chicken wings", price: 60 },
        { name: "Grilled chicken thigh", price: 65 },
        { name: "BBQ chicken thigh", price: 70 }
      ]},
      { title: "Extras", items: [
        { name: "Coleslaw", price: 15 },
        { name: "Salad with salad dressing", price: 45 },
        { name: "Grilled chicken salad", price: 90 },
        { name: "Grilled tilapia", price: 80 },
        { name: "Extra egg", price: 10 }
      ]}
    ]
  },
  {
    id: "noodles", label: "Noodles",
    photos: [{ src: "images/noodles.webp", alt: "Stir-fried noodles with beef, chicken and peppers" }],
    sections: [
      { title: "Noodles", items: [
        { name: "Vegetable", price: 80 },
        { name: "Sausage", price: 85 },
        { name: "Chicken", price: 90 },
        { name: "Beef", price: 95 },
        { name: "Assorted", desc: "Chicken & beef", price: 100 }
      ]}
    ]
  },
  {
    id: "shawarma", label: "Shawarma & Loaded Fries",
    photos: [
      { src: "images/shawarma.webp", alt: "Grilled chicken shawarma wrap" },
      { src: "images/loaded-fries.webp", alt: "Loaded fries with beef, cheese and sauce" },
      { src: "images/hero-wrap.webp", alt: "Atomic Grill shawarma in branded paper" }
    ],
    sections: [
      { title: "Shawarma", note: "Fresh, made to order.", items: [
        { name: "Vegetable", price: 50 },
        { name: "Chicken", price: 60 },
        { name: "Beef", price: 60 },
        { name: "Assorted", desc: "Chicken & beef", price: 70 }
      ]},
      { title: "Loaded Fries", items: [
        { name: "Cheesy", price: 80 },
        { name: "Sausage", price: 85 },
        { name: "Chicken", price: 90 },
        { name: "Beef", price: 95 },
        { name: "Loaded breakfast", desc: "Egg, sausage & cheese", price: 100 },
        { name: "Full blast", desc: "Chicken, beef & sausage", price: 110 }
      ]},
      { title: "Add-ons", items: [
        { name: "Extra egg", price: 10 },
        { name: "Extra cheese", price: 15 },
        { name: "Extra sausage", price: 10 },
        { name: "Extra chicken", price: 15 },
        { name: "Extra beef", price: 15 }
      ]}
    ]
  },
  {
    id: "drinks", label: "Drinks & Dessert",
    photos: [
      { src: "images/juice.webp", alt: "Fresh fruit juices with watermelon, pineapple and hibiscus" },
      { src: "images/milkshake.webp", alt: "Chocolate, Oreo and berry milkshakes" },
      { src: "images/icedtea.webp", alt: "Glasses of iced tea with fruit" },
      { src: "images/icecream.webp", alt: "Bowl of chocolate and strawberry ice cream" }
    ],
    sections: [
      { title: "Fresh Juice", note: "Made fresh every day.", items: [
        { name: "Hibiscus (Sobolo)", price: 25 },
        { name: "Pineapple & ginger", price: 25 },
        { name: "Watermelon", price: 30 },
        { name: "Pineapple & watermelon", price: 30 },
        { name: "Beetroot & apple", price: 30 },
        { name: "Seasonal fruit mix", price: 25 },
        { name: "Ginger shot", price: 35 }
      ]},
      { title: "Milkshakes", items: [
        { name: "Choco Bomb", desc: "Rich chocolate, topped with chocolate goodness", price: 75 },
        { name: "Berry Blast", desc: "A berrylicious blend of berries & cream", price: 75 },
        { name: "Oreo Fusion", desc: "Creamy, crunchy & absolutely irresistible", price: 75 }
      ]},
      { title: "Iced Teas", items: [
        { name: "Chill Zone", desc: "1 flavour", price: 25 },
        { name: "Fruit Blast", desc: "2 flavours mixed", price: 30 },
        { name: "Icy Amie", desc: "3 flavours mixed", price: 35 }
      ]},
      { title: "Soft Drinks", items: [
        { name: "Water", price: 5 },
        { name: "Coke", desc: "300ml", price: 15 },
        { name: "Coke", desc: "1 litre", price: 35 },
        { name: "Fanta", desc: "300ml", price: 15 },
        { name: "Sprite", desc: "300ml", price: 15 },
        { name: "Alvaro", price: 25 },
        { name: "Malt", price: 25 },
        { name: "BB Cocktail", price: 25 },
        { name: "Ceres", price: 55 },
        { name: "Don Simon", price: 55 }
      ]},
      { title: "Dessert", items: [
        { name: "Ice cream", desc: "2 scoops", price: 25 }
      ]}
    ]
  }
];

/* Hero slider. Prices are looked up from MENU above (tab id, section title, item name),
   so a price change in the menu also updates the slide. "from: true" shows the lowest price in the section.
   Photos: images/hero-<img>-800.webp and images/hero-<img>-1600.webp */
const HERO_SLIDES = [
  { img: "chicken",  title: "Half grilled chicken",       alt: "Half grilled chicken on a plate with lemon, tomato and salad", price: ["chicken", "Grilled Chicken", "Half chicken"] },
  { img: "jollof",   title: "Jollof rice & grilled wings", alt: "Jollof rice served with grilled chicken wings",              price: ["rice", "Jollof Rice", "Grilled wings"] },
  { img: "shawarma", title: "Chicken shawarma",            alt: "Two chicken shawarma wraps on a wooden board",               price: ["shawarma", "Shawarma", "Chicken"] },
  { img: "fries",    title: "Full Blast loaded fries",     alt: "Loaded fries topped with grilled chicken, cheese and sauce", price: ["shawarma", "Loaded Fries", "Full blast"] },
  { img: "drinks",   title: "Fresh juice & milkshakes",    alt: "A row of colourful milkshakes and fresh juices",             price: ["drinks", "Fresh Juice"], from: true }
];
