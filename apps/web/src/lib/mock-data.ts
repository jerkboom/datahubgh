export interface Network {
  id: string;
  name: string;
  slug: string;
  color: string;
  logo: string;
}

export interface BundleDeliveryOption {
  type: "standard" | "instant";
  price: number;
  eta: string;
  recommended?: boolean;
}

export interface Bundle {
  id: string;
  network: string;
  category: string;
  validity: string;
  name: string;
  size: string;
  standardPrice: number;
  instantPrice: number;
  deliveryOptions: BundleDeliveryOption[];
  isPopular: boolean;
  recommended: boolean;
  description: string;
}

export const mockNetworks: Network[] = [
  { id: "net-1", name: "MTN", slug: "mtn", color: "bg-yellow-400", logo: "🟡" },
  { id: "net-2", name: "Telecel", slug: "telecel", color: "bg-red-500", logo: "🔴" },
  { id: "net-3", name: "AirtelTigo", slug: "airteltigo", color: "bg-blue-600", logo: "🔵" },
];

export const mockBundles: Bundle[] = [
  {
    "id": "mtn-non-expiry-4gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 4GB",
    "size": "4GB",
    "standardPrice": 20,
    "instantPrice": 25,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 20,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 25,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "4GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-8gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 8GB",
    "size": "8GB",
    "standardPrice": 22.00,
    "instantPrice": 27.00,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 22.00,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 27.00,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "8GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-10gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 10GB",
    "size": "10GB",
    "standardPrice": 24.50,
    "instantPrice": 29.50,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 24.50,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 29.50,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "10GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-14gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 14GB",
    "size": "14GB",
    "standardPrice": 27.33,
    "instantPrice": 32.33,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 27.33,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 32.33,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "14GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-17gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 17GB",
    "size": "17GB",
    "standardPrice": 29.99,
    "instantPrice": 34.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 29.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 34.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "17GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-20gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 20GB",
    "size": "20GB",
    "standardPrice": 34.99,
    "instantPrice": 39.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 34.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 39.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "20GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-15gb-plus",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 15GB Plus",
    "size": "15GB Plus",
    "standardPrice": 39.45,
    "instantPrice": 44.45,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 39.45,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 44.45,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "15GB Plus valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-25gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 25GB",
    "size": "25GB",
    "standardPrice": 45,
    "instantPrice": 50,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 45,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 50,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "25GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-30gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 30GB",
    "size": "30GB",
    "standardPrice": 52,
    "instantPrice": 57,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 52,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 57,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "30GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-40gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 40GB",
    "size": "40GB",
    "standardPrice": 65,
    "instantPrice": 70,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 65,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 70,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-50gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 50GB",
    "size": "50GB",
    "standardPrice": 78,
    "instantPrice": 83,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 78,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 83,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "50GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-75gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 75GB",
    "size": "75GB",
    "standardPrice": 105,
    "instantPrice": 110,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 105,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 110,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "75GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-100gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 100GB",
    "size": "100GB",
    "standardPrice": 130,
    "instantPrice": 135,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 130,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 135,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "100GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-150gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 150GB",
    "size": "150GB",
    "standardPrice": 175,
    "instantPrice": 180,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 175,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 180,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "150GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-200gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 200GB",
    "size": "200GB",
    "standardPrice": 220,
    "instantPrice": 225,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 220,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 225,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "200GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-250gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 250GB",
    "size": "250GB",
    "standardPrice": 255,
    "instantPrice": 260,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 255,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 260,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "250GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-300gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 300GB",
    "size": "300GB",
    "standardPrice": 290,
    "instantPrice": 295,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 290,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 295,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "300GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-400gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 400GB",
    "size": "400GB",
    "standardPrice": 330,
    "instantPrice": 335,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 330,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 335,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "400GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-500gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 500GB",
    "size": "500GB",
    "standardPrice": 350,
    "instantPrice": 355,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 350,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 355,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "500GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-750gb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 750GB",
    "size": "750GB",
    "standardPrice": 380,
    "instantPrice": 385,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 380,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 385,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "750GB valid for Non-Expiry"
  },
  {
    "id": "mtn-non-expiry-1tb",
    "network": "MTN",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "MTN 1TB",
    "size": "1TB",
    "standardPrice": 400,
    "instantPrice": 405,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 400,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 405,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "1TB valid for Non-Expiry"
  },
  {
    "id": "mtn-7-days-5gb",
    "network": "MTN",
    "category": "7 Days",
    "validity": "7 Days",
    "name": "MTN 5GB",
    "size": "5GB",
    "standardPrice": 20,
    "instantPrice": 25,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 20,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 25,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "5GB valid for 7 Days"
  },
  {
    "id": "mtn-14-days-12gb",
    "network": "MTN",
    "category": "14 Days",
    "validity": "14 Days",
    "name": "MTN 12GB",
    "size": "12GB",
    "standardPrice": 25,
    "instantPrice": 30,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 25,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 30,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "12GB valid for 14 Days"
  },
  {
    "id": "mtn-30-days-25gb",
    "network": "MTN",
    "category": "30 Days",
    "validity": "30 Days",
    "name": "MTN 25GB",
    "size": "25GB",
    "standardPrice": 40,
    "instantPrice": 45,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 40,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 45,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "25GB valid for 30 Days"
  },
  {
    "id": "mtn-monthly-40gb",
    "network": "MTN",
    "category": "Monthly",
    "validity": "Monthly",
    "name": "MTN 40GB",
    "size": "40GB",
    "standardPrice": 60,
    "instantPrice": 65,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 60,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 65,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB valid for Monthly"
  },
  {
    "id": "mtn-business-20gb-plus-1200-mins",
    "network": "MTN",
    "category": "Business",
    "validity": "Business",
    "name": "MTN 20GB + 1200 mins",
    "size": "20GB + 1200 mins",
    "standardPrice": 63.99,
    "instantPrice": 68.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 63.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 68.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "20GB + 1200 mins valid for Business"
  },
  {
    "id": "mtn-business-30gb-plus-1350-mins",
    "network": "MTN",
    "category": "Business",
    "validity": "Business",
    "name": "MTN 30GB + 1350 mins",
    "size": "30GB + 1350 mins",
    "standardPrice": 100.99,
    "instantPrice": 105.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 100.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 105.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "30GB + 1350 mins valid for Business"
  },
  {
    "id": "mtn-business-40gb-plus-1550-mins",
    "network": "MTN",
    "category": "Business",
    "validity": "Business",
    "name": "MTN 40GB + 1550 mins",
    "size": "40GB + 1550 mins",
    "standardPrice": 133.79,
    "instantPrice": 138.79,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 133.79,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 138.79,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB + 1550 mins valid for Business"
  },
  {
    "id": "mtn-business-50gb-plus-1700-mins",
    "network": "MTN",
    "category": "Business",
    "validity": "Business",
    "name": "MTN 50GB + 1700 mins",
    "size": "50GB + 1700 mins",
    "standardPrice": 155.99,
    "instantPrice": 160.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 155.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 160.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "50GB + 1700 mins valid for Business"
  },
  {
    "id": "telecel-non-expiry-8gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 8GB",
    "size": "8GB",
    "standardPrice": 17.45,
    "instantPrice": 22.45,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 17.45,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 22.45,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "8GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-11gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 11GB",
    "size": "11GB",
    "standardPrice": 21.79,
    "instantPrice": 26.79,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 21.79,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 26.79,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "11GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-15gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 15GB",
    "size": "15GB",
    "standardPrice": 43.79,
    "instantPrice": 48.79,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 43.79,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 48.79,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "15GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-25gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 25GB",
    "size": "25GB",
    "standardPrice": 45,
    "instantPrice": 50,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 45,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 50,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "25GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-30gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 30GB",
    "size": "30GB",
    "standardPrice": 52,
    "instantPrice": 57,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 52,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 57,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "30GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-40gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 40GB",
    "size": "40GB",
    "standardPrice": 65,
    "instantPrice": 70,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 65,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 70,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-50gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 50GB",
    "size": "50GB",
    "standardPrice": 78,
    "instantPrice": 83,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 78,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 83,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "50GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-75gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 75GB",
    "size": "75GB",
    "standardPrice": 105,
    "instantPrice": 110,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 105,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 110,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "75GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-100gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 100GB",
    "size": "100GB",
    "standardPrice": 130,
    "instantPrice": 135,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 130,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 135,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "100GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-150gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 150GB",
    "size": "150GB",
    "standardPrice": 175,
    "instantPrice": 180,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 175,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 180,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "150GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-200gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 200GB",
    "size": "200GB",
    "standardPrice": 220,
    "instantPrice": 225,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 220,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 225,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "200GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-250gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 250GB",
    "size": "250GB",
    "standardPrice": 255,
    "instantPrice": 260,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 255,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 260,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "250GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-300gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 300GB",
    "size": "300GB",
    "standardPrice": 290,
    "instantPrice": 295,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 290,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 295,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "300GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-400gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 400GB",
    "size": "400GB",
    "standardPrice": 330,
    "instantPrice": 335,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 330,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 335,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "400GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-500gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 500GB",
    "size": "500GB",
    "standardPrice": 350,
    "instantPrice": 355,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 350,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 355,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "500GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-750gb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 750GB",
    "size": "750GB",
    "standardPrice": 380,
    "instantPrice": 385,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 380,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 385,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "750GB valid for Non-Expiry"
  },
  {
    "id": "telecel-non-expiry-1tb",
    "network": "Telecel",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "Telecel 1TB",
    "size": "1TB",
    "standardPrice": 400,
    "instantPrice": 405,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 400,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 405,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "1TB valid for Non-Expiry"
  },
  {
    "id": "telecel-7-days-10gb",
    "network": "Telecel",
    "category": "7 Days",
    "validity": "7 Days",
    "name": "Telecel 10GB",
    "size": "10GB",
    "standardPrice": 20,
    "instantPrice": 25,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 20,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 25,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "10GB valid for 7 Days"
  },
  {
    "id": "telecel-14-days-18gb",
    "network": "Telecel",
    "category": "14 Days",
    "validity": "14 Days",
    "name": "Telecel 18GB",
    "size": "18GB",
    "standardPrice": 30,
    "instantPrice": 35,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 30,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 35,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "18GB valid for 14 Days"
  },
  {
    "id": "telecel-30-days-30gb",
    "network": "Telecel",
    "category": "30 Days",
    "validity": "30 Days",
    "name": "Telecel 30GB",
    "size": "30GB",
    "standardPrice": 50,
    "instantPrice": 55,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 50,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 55,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "30GB valid for 30 Days"
  },
  {
    "id": "telecel-monthly-50gb",
    "network": "Telecel",
    "category": "Monthly",
    "validity": "Monthly",
    "name": "Telecel 50GB",
    "size": "50GB",
    "standardPrice": 80,
    "instantPrice": 85,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 80,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 85,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "50GB valid for Monthly"
  },
  {
    "id": "telecel-business-20gb-plus100-mins",
    "network": "Telecel",
    "category": "Business",
    "validity": "Business",
    "name": "Telecel 20GB +100 mins",
    "size": "20GB +100 mins",
    "standardPrice": 79.99,
    "instantPrice": 84.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 79.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 84.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "20GB +100 mins valid for Business"
  },
  {
    "id": "telecel-business-30gb-plus315-mins",
    "network": "Telecel",
    "category": "Business",
    "validity": "Business",
    "name": "Telecel 30GB +315 mins",
    "size": "30GB +315 mins",
    "standardPrice": 99.99,
    "instantPrice": 104.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 99.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 104.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "30GB +315 mins valid for Business"
  },
  {
    "id": "telecel-business-40gb-plus550-mins",
    "network": "Telecel",
    "category": "Business",
    "validity": "Business",
    "name": "Telecel 40GB +550 mins",
    "size": "40GB +550 mins",
    "standardPrice": 145.6,
    "instantPrice": 150.6,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 145.6,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 150.6,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB +550 mins valid for Business"
  },
  {
    "id": "telecel-business-50gb-plus1115-mins",
    "network": "Telecel",
    "category": "Business",
    "validity": "Business",
    "name": "Telecel 50GB +1115 mins",
    "size": "50GB +1115 mins",
    "standardPrice": 163.99,
    "instantPrice": 168.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 163.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 168.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "50GB +1115 mins valid for Business"
  },
  {
    "id": "telecel-business-100gb-plus1500-mins",
    "network": "Telecel",
    "category": "Business",
    "validity": "Business",
    "name": "Telecel 100GB +1500 mins",
    "size": "100GB +1500 mins",
    "standardPrice": 330.79,
    "instantPrice": 335.79,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 330.79,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 335.79,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "100GB +1500 mins valid for Business"
  },
  {
    "id": "airteltigo-non-expiry-7gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 7GB",
    "size": "7GB",
    "standardPrice": 18.5,
    "instantPrice": 23.5,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 18.5,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 23.5,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "7GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-7gbplus",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 7GB+",
    "size": "7GB+",
    "standardPrice": 19.5,
    "instantPrice": 24.5,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 19.5,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 24.5,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "7GB+ valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-8gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 8GB",
    "size": "8GB",
    "standardPrice": 19.99,
    "instantPrice": 24.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 19.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 24.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "8GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-8gbplus",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 8GB+",
    "size": "8GB+",
    "standardPrice": 21,
    "instantPrice": 26,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 21,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 26,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "8GB+ valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-10gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 10GB",
    "size": "10GB",
    "standardPrice": 22.5,
    "instantPrice": 27.5,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 22.5,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 27.5,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "10GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-15gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 15GB",
    "size": "15GB",
    "standardPrice": 26.99,
    "instantPrice": 31.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 26.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 31.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "15GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-20gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 20GB",
    "size": "20GB",
    "standardPrice": 32.99,
    "instantPrice": 37.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 32.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 37.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "20GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-25gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 25GB",
    "size": "25GB",
    "standardPrice": 39.99,
    "instantPrice": 44.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 39.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 44.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "25GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-30gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 30GB",
    "size": "30GB",
    "standardPrice": 46.99,
    "instantPrice": 51.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 46.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 51.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "30GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-40gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 40GB",
    "size": "40GB",
    "standardPrice": 58.99,
    "instantPrice": 63.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 58.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 63.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-50gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 50GB",
    "size": "50GB",
    "standardPrice": 73.99,
    "instantPrice": 78.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 73.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 78.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": true,
    "recommended": true,
    "description": "50GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-75gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 75GB",
    "size": "75GB",
    "standardPrice": 95.99,
    "instantPrice": 100.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 95.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 100.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "75GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-100gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 100GB",
    "size": "100GB",
    "standardPrice": 122.99,
    "instantPrice": 127.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 122.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 127.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "100GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-150gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 150GB",
    "size": "150GB",
    "standardPrice": 165.99,
    "instantPrice": 170.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 165.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 170.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "150GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-200gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 200GB",
    "size": "200GB",
    "standardPrice": 205.99,
    "instantPrice": 210.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 205.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 210.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "200GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-250gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 250GB",
    "size": "250GB",
    "standardPrice": 235.99,
    "instantPrice": 240.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 235.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 240.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "250GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-300gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 300GB",
    "size": "300GB",
    "standardPrice": 265.99,
    "instantPrice": 270.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 265.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 270.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "300GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-400gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 400GB",
    "size": "400GB",
    "standardPrice": 305.99,
    "instantPrice": 310.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 305.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 310.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "400GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-500gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 500GB",
    "size": "500GB",
    "standardPrice": 335,
    "instantPrice": 340,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 335,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 340,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "500GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-750gb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 750GB",
    "size": "750GB",
    "standardPrice": 355,
    "instantPrice": 360,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 355,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 360,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "750GB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-non-expiry-1tb",
    "network": "AirtelTigo",
    "category": "Non-Expiry",
    "validity": "Non-Expiry",
    "name": "AirtelTigo 1TB",
    "size": "1TB",
    "standardPrice": 385,
    "instantPrice": 390,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 385,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 390,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "1TB valid for Non-Expiry"
  },
  {
    "id": "airteltigo-7-days-6gb",
    "network": "AirtelTigo",
    "category": "7 Days",
    "validity": "7 Days",
    "name": "AirtelTigo 6GB",
    "size": "6GB",
    "standardPrice": 17.5,
    "instantPrice": 22.5,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 17.5,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 22.5,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "6GB valid for 7 Days"
  },
  {
    "id": "airteltigo-14-days-12gb",
    "network": "AirtelTigo",
    "category": "14 Days",
    "validity": "14 Days",
    "name": "AirtelTigo 12GB",
    "size": "12GB",
    "standardPrice": 24.5,
    "instantPrice": 29.5,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 24.5,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 29.5,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "12GB valid for 14 Days"
  },
  {
    "id": "airteltigo-30-days-20gb",
    "network": "AirtelTigo",
    "category": "30 Days",
    "validity": "30 Days",
    "name": "AirtelTigo 20GB",
    "size": "20GB",
    "standardPrice": 31.99,
    "instantPrice": 36.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 31.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 36.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "20GB valid for 30 Days"
  },
  {
    "id": "airteltigo-monthly-40gb",
    "network": "AirtelTigo",
    "category": "Monthly",
    "validity": "Monthly",
    "name": "AirtelTigo 40GB",
    "size": "40GB",
    "standardPrice": 57.99,
    "instantPrice": 62.99,
    "deliveryOptions": [
      {
        "type": "standard",
        "price": 57.99,
        "eta": "Few minutes"
      },
      {
        "type": "instant",
        "price": 62.99,
        "eta": "10–60 seconds",
        "recommended": true
      }
    ],
    "isPopular": false,
    "recommended": false,
    "description": "40GB valid for Monthly"
  }
];

export const mockOrder = {
  reference: "REF-98237498",
  status: "SUCCESS",
  product: "MTN 10GB",
  recipientPhone: "024XXXXXXX",
  amount: 29.50,
  date: new Date().toISOString(),
};
