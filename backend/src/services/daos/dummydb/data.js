// Not final data structure

export const businesses = [
    {
      id: 1,
      name: "Hoku Helsinki",
      category: "Hawaiian, Asian Fusion",
      phone: "+358 12 345 6789",
      website: "http://www.hoku.fi",
      address: {
        street: "Annankatu 28",
        postal: "01000",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 3,
        average: 4.66,
        ratings: [
          { id: 1, name: "John D.", rating: "5", comment: "Amazing food and great atmosphere. Highly recommend the poke bowl!" },
          { id: 2, name: "Jane S.", rating: "4", comment: "Delicious dishes but a bit crowded during peak hours. Worth the wait!" },
          { id: 3, name: "Alex R.", rating: "5", comment: "Fantastic flavors and friendly staff. Will definitely come back!" }
        ]
      }
    },
    {
      id: 2,
      name: "Tokyo Street",
      category: "Japanese, Sushi",
      phone: "+358 12 987 6543",
      website: "http://www.tokyostreet.fi",
      address: {
        street: "Erottajankatu 10",
        postal: "01010",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "Sarah T.", rating: "5", comment: "Best sushi in Helsinki!" },
          { id: 2, name: "Tom K.", rating: "4", comment: "Great ambiance but a bit pricey." }
        ]
      }
    },
    {
      id: 3,
      name: "Nordic Bites",
      category: "Nordic, Scandinavian",
      phone: "+358 13 555 6677",
      website: "http://www.nordicbites.fi",
      address: {
        street: "Kluuvikatu 4",
        postal: "01020",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 5.0,
        ratings: [
          { id: 1, name: "Lars P.", rating: "5", comment: "Authentic Nordic flavors!" },
          { id: 2, name: "Emily V.", rating: "5", comment: "A must-visit for Nordic cuisine lovers." }
        ]
      }
    },
    {
      id: 4,
      name: "Café Bonjour",
      category: "French, Café",
      phone: "+358 14 555 2233",
      website: "http://www.cafebonjour.fi",
      address: {
        street: "Mannerheimintie 22",
        postal: "01030",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "Anais M.", rating: "5", comment: "Cozy place with delicious pastries!" },
          { id: 2, name: "Pierre J.", rating: "4", comment: "Feels like a piece of Paris in Helsinki." }
        ]
      }
    },
    {
      id: 5,
      name: "Pasta House",
      category: "Italian",
      phone: "+358 15 222 4567",
      website: "http://www.pastahouse.fi",
      address: {
        street: "Pohjoisesplanadi 9",
        postal: "01040",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "Marco P.", rating: "5", comment: "Best pasta outside Italy!" },
          { id: 2, name: "Julia R.", rating: "4", comment: "Lovely Italian dishes but a bit crowded." }
        ]
      }
    },
    {
      id: 6,
      name: "Spice Route",
      category: "Indian",
      phone: "+358 16 333 8877",
      website: "http://www.spiceroute.fi",
      address: {
        street: "Aleksanterinkatu 15",
        postal: "01050",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "Rahul D.", rating: "5", comment: "Authentic Indian flavors." },
          { id: 2, name: "Priya S.", rating: "4", comment: "Great spices, but a bit too spicy for me." }
        ]
      }
    },
    {
      id: 7,
      name: "Green Leaf",
      category: "Vegetarian, Organic",
      phone: "+358 17 555 9999",
      website: "http://www.greenleaf.fi",
      address: {
        street: "Lönnrotinkatu 5",
        postal: "01060",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.0,
        ratings: [
          { id: 1, name: "Ella N.", rating: "5", comment: "Perfect spot for vegetarians!" },
          { id: 2, name: "Sam H.", rating: "3", comment: "Healthy options but limited variety." }
        ]
      }
    },
    {
      id: 8,
      name: "Fiesta Mexicana",
      category: "Mexican",
      phone: "+358 18 222 8888",
      website: "http://www.fiestamexicana.fi",
      address: {
        street: "Yrjönkatu 12",
        postal: "01070",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "Carlos M.", rating: "5", comment: "Authentic Mexican food!" },
          { id: 2, name: "Sofia L.", rating: "4", comment: "Loved the tacos, but service was slow." }
        ]
      }
    },
    {
      id: 9,
      name: "Burger Haven",
      category: "American, Fast Food",
      phone: "+358 19 111 7777",
      website: "http://www.burgerhaven.fi",
      address: {
        street: "Keskuskatu 3",
        postal: "01080",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "David T.", rating: "5", comment: "Best burgers in town!" },
          { id: 2, name: "Linda W.", rating: "4", comment: "Great burgers, though a bit greasy." }
        ]
      }
    },
    {
      id: 10,
      name: "Korean Grill",
      category: "Korean, BBQ",
      phone: "+358 20 333 4444",
      website: "http://www.koreangrill.fi",
      address: {
        street: "Fredrikinkatu 8",
        postal: "01090",
        city: "Helsinki",
        country: "Finland"
      },
      images: ["food1.jpg", "food2.jpg", "food3.jpg"],
      reviews: {
        total: 2,
        average: 4.5,
        ratings: [
          { id: 1, name: "Jihoon K.", rating: "5", comment: "Tastes just like home!" },
          { id: 2, name: "Mina L.", rating: "4", comment: "Good BBQ but a bit smoky indoors." }
        ]
      }
    }
]