const fs = require('fs');

const dataStr = `
=== MTN ===
Non-Expiry
4GB
20.00 / 25.00
8GB
22.00 / 27.00
10GB
24.50 / 29.50
14GB
27.33 / 32.33
17GB
29.99 / 34.99
20GB
34.99 / 39.99
15GB Plus
39.45 / 44.45
25GB
45.00 / 50.00
30GB
52.00 / 57.00
40GB
65.00 / 70.00
50GB
78.00 / 83.00
75GB
105.00 / 110.00
100GB
130.00 / 135.00
150GB
175.00 / 180.00
200GB
220.00 / 225.00
250GB
255.00 / 260.00
300GB
290.00 / 295.00
400GB
330.00 / 335.00
500GB
350.00 / 355.00
750GB
380.00 / 385.00
1TB
400.00 / 405.00
7 Days
5GB
20.00 / 25.00
14 Days
12GB
25.00 / 30.00
30 Days
25GB
40.00 / 45.00
Monthly
40GB
60.00 / 65.00
Business
20GB + 1200 mins
63.99 / 68.99
30GB + 1350 mins
100.99 / 105.99
40GB + 1550 mins
133.79 / 138.79
50GB + 1700 mins
155.99 / 160.99

=== Telecel ===
Non-Expiry
8GB
17.45 / 22.45
11GB
21.79 / 26.79
15GB
43.79 / 48.79
25GB
45.00 / 50.00
30GB
52.00 / 57.00
40GB
65.00 / 70.00
50GB
78.00 / 83.00
75GB
105.00 / 110.00
100GB
130.00 / 135.00
150GB
175.00 / 180.00
200GB
220.00 / 225.00
250GB
255.00 / 260.00
300GB
290.00 / 295.00
400GB
330.00 / 335.00
500GB
350.00 / 355.00
750GB
380.00 / 385.00
1TB
400.00 / 405.00
7 Days
10GB
20.00 / 25.00
14 Days
18GB
30.00 / 35.00
30 Days
30GB
50.00 / 55.00
Monthly
50GB
80.00 / 85.00
Business
20GB +100 mins
79.99 / 84.99
30GB +315 mins
99.99 / 104.99
40GB +550 mins
145.60 / 150.60
50GB +1115 mins
163.99 / 168.99
100GB +1500 mins
330.79 / 335.79

=== AirtelTigo ===
Non-Expiry
7GB
18.50 / 23.50
7GB+
19.50 / 24.50
8GB
19.99 / 24.99
8GB+
21.00 / 26.00
10GB
22.50 / 27.50
15GB
26.99 / 31.99
20GB
32.99 / 37.99
25GB
39.99 / 44.99
30GB
46.99 / 51.99
40GB
58.99 / 63.99
50GB
73.99 / 78.99
75GB
95.99 / 100.99
100GB
122.99 / 127.99
150GB
165.99 / 170.99
200GB
205.99 / 210.99
250GB
235.99 / 240.99
300GB
265.99 / 270.99
400GB
305.99 / 310.99
500GB
335.00 / 340.00
750GB
355.00 / 360.00
1TB
385.00 / 390.00
7 Days
6GB
17.50 / 22.50
14 Days
12GB
24.50 / 29.50
30 Days
20GB
31.99 / 36.99
Monthly
40GB
57.99 / 62.99
`;

let lines = dataStr.split('\n').map(l => l.trim()).filter(l => l);

let currentNetwork = '';
let currentCategory = '';
let bundles = [];

for(let i=0; i<lines.length; i++) {
  const line = lines[i];
  if(line.startsWith('=== ')) {
    currentNetwork = line.replace('=== ', '').replace(' ===', '');
    continue;
  }
  if(line === 'Non-Expiry' || line === '7 Days' || line === '14 Days' || line === '30 Days' || line === 'Monthly' || line === 'Business') {
    currentCategory = line;
    continue;
  }
  
  let size = line;
  i++;
  let priceLine = lines[i];
  if(!priceLine) break;
  let parts = priceLine.split('/');
  let standard = parseFloat(parts[0].trim());
  let instant = parseFloat(parts[1].trim());
  
  let isPopular = size === '10GB' || size === '50GB';
  let recommended = isPopular;
  
  let slug = currentNetwork.toLowerCase() + '-' + currentCategory.replace(/\s+/g, '-').toLowerCase() + '-' + size.replace(/\s+/g, '-').replace(/\+/g, 'plus').toLowerCase();
  
  bundles.push({
    id: slug,
    network: currentNetwork,
    category: currentCategory,
    validity: currentCategory,
    name: currentNetwork + ' ' + size,
    size: size,
    standardPrice: standard,
    instantPrice: instant,
    deliveryOptions: [
      { type: "standard", price: standard, eta: "Few minutes" },
      { type: "instant", price: instant, eta: "10–60 seconds", recommended: true }
    ],
    isPopular: isPopular,
    recommended: recommended,
    description: size + ' valid for ' + currentCategory
  });
}

const fileContent = `export interface Network {
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

export const mockBundles: Bundle[] = ${JSON.stringify(bundles, null, 2)};

export const mockOrder = {
  reference: "REF-98237498",
  status: "SUCCESS",
  product: "MTN 10GB",
  recipientPhone: "024XXXXXXX",
  amount: 29.50,
  date: new Date().toISOString(),
};
`;

fs.writeFileSync('C:/Users/HP/datahouse/apps/web/src/lib/mock-data.ts', fileContent);
console.log('Done generating mock-data.ts. Generated bundles:', bundles.length);
