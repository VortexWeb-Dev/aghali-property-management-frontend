import { Menu, X, Eye, Building2, WalletCards, Users2, Wrench, ListPlus, ShoppingCart } from 'lucide-react';


export const contacts = [
    {
      name: "John Doe",
      phone: "(123) 456-7890",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Alice Johnson",
      phone: "(234) 567-8901",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Michael Brown",
      phone: "(345) 678-9012",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Michael Brown",
      phone: "(345) 678-9012",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Michael Brown",
      phone: "(345) 678-9012",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Michael Brown",
      phone: "(345) 678-9012",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Michael Brown",
      phone: "(345) 678-9012",
      imageUrl: "hero.jpeg"
    },
    {
      name: "Michael Brown",
      phone: "(345) 678-9012",
      imageUrl: "hero.jpeg"
    }
  ];

  export const properties = [
    {
      id: 1,
      name: "Property Name",
      location: "Property Location",
      type: "Property Type",
      amenities: ["1", "2", "3", "4"],
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 2,
      name: "Property Name",
      location: "Property Location",
      type: "Property Type",
      amenities: ["1", "2", "3", "4"],
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 3,
      name: "Property Name",
      location: "Property Location",
      type: "Property Type",
      amenities: ["1", "2", "3", "4"],
      imageUrl: "/api/placeholder/400/300"
    },
    {
      id: 4,
      name: "Property Name",
      location: "Property Location",
      type: "Property Type",
      amenities: ["1", "2", "3", "4"],
      imageUrl: "/api/placeholder/400/300"
    }
  ];

 export const links = [
    { icon: Eye, text: 'Dashboard', to: '/' },
    { icon: Building2, text: 'Properties', to: '/properties' },
    { icon: WalletCards, text: 'Accounting', to: '/accounting' },
    { icon: Users2, text: 'Contacts', to: '/contacts' },
    { icon: Wrench, text: 'Maintenance', to: '/maintenance' },
    { icon: ListPlus, text: 'Listings', to: '/listings' }
  ];

 export const stats = [
    { icon: Eye, title: 'Total views', value: 'USD 3.456K', change: 0.43, isPositive: true },
    { icon: ShoppingCart, title: 'Total Profit', value: 'USD 45.2K', change: 4.35, isPositive: true },
    { icon: Building2, title: 'Total Property', value: '2,450', change: 2.59, isPositive: true },
    { icon: Users2, title: 'Total Visitors', value: '3,456', change: -0.95, isPositive: false }
  ];