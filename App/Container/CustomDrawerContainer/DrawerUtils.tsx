export const profileData = [
  {
    title: "My Wishlist",
  },
  {
    title: "Personal Details",
  },
  {
    title: "Change Password",
  },
  {
    title: "Delete Account",
  },
  {
    title: "Address Book",
  },
  {
    title: "Update Email Address",
  },
  {
    title: "Order History",
  },
  {
    title: "Support Tickets",
  },
  {
    title: "Sign Out",
  },
];

export const menuData = [
  {
    title: "Beauty & Skincare",
    isExpanded: false,
    children: [
      {
        title: "Face",
      },
      {
        title: "Lips",
      },
      {
        title: "Eyes",
      },
      {
        title: "Sets",
      },
      {
        title: "Skincare",
      },
    ],
  },
  {
    title: "Fragrances",
    isExpanded: false,
    children: [
      {
        title: "Women",
      },
      {
        title: "Men",
      },
      {
        title: "Oriental",
      },
      {
        title: "Sets",
      },
      {
        title: "Newly Added",
      },
      {
        title: "Offers",
      },
    ],
  },
  {
    title: "Jewellery & Watches",
    isExpanded: false,
    children: [
      {
        title: "Jewellery",
        isExpanded: false,
        children: [
          {
            title: "Bracelets",
          },
          {
            title: "Earings",
          },
          {
            title: "Necklaces",
          },
        ],
      },
      {
        title: "Watches",
        isExpanded: false,
        children: [
          {
            title: "Men",
          },
          {
            title: "Women",
          },
          {
            title: "Kids",
          },
        ],
      },
    ],
  },
  {
    title: "Gifts & Accesories",
    isExpanded: false,
    children: [
      {
        title: "Handbags",
      },
      {
        title: "Wallets",
      },
      {
        title: "Pens",
        isExpanded: false,
        children: [
          {
            title: "Pen 1",
          },
          {
            title: "Pen 2",
          },
          {
            title: "Pen 3",
          },
        ],
      },
      {
        title: "Travel Accessories",
      },
      {
        title: "Fashion Accessories",
      },
      {
        title: "Children gifts",
      },
    ],
  },
  {
    title: "Eyewear",
    isExpanded: false,
    children: [
      {
        title: "Sunglasses",
      },
      {
        title: "Optical Glasses",
      },
      {
        title: "Contact Lenses",
      },
    ],
  },
  {
    title: "Baby",
    isExpanded: false,
    children: [
      {
        title: "Strollers & Accessories",
      },
      {
        title: "Strollers Bags & Organizers",
      },
      {
        title: "Travel Bags & Backpacks",
      },
      {
        title: "Children Travel Bags",
      },
      {
        title: "Travel Accessories & Essentials",
      },
      {
        title: "Toys & Games",
      },
    ],
  },
  {
    title: "Electronics",
    isExpanded: false,
    children: [
      {
        title: "Mobiles",
      },
      {
        title: "Tablets",
      },
      {
        title: "Gaming",
      },
      {
        title: "Accessories",
      },
    ],
  },
  {
    title: "Souvenirs",
    isExpanded: false,
    children: [
      {
        title: "Saudia Exclusives",
      },
      {
        title: "Bags",
      },
      {
        title: "Purses & Wallets",
      },
      {
        title: "Keychains",
      },
      {
        title: "Fridge Magnets",
      },
      {
        title: "Decor & More",
      },
      {
        title: "Pins & Spoons",
      },
      {
        title: "Mugs",
      },
    ],
  },
  {
    title: "Daily Offers",
  },
  {
    title: "Clearance",
  },
  {
    title: "World Cup",
  },
  {
    title: "Ramdan Offers",
  },
];

export const getSubMenus = (title: string, menus: any) => {
  let subMenus = [];
  menus.map(item => {
    if (item.title === title) {
      subMenus.push(...item.children);
    }
  });
  return subMenus;
};
