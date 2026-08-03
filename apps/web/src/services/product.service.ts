import { mockNetworks, mockBundles, Network, Bundle } from "@/lib/mock-data";

/**
 * Product Service
 * Acts as the abstraction layer between the UI and the data source.
 * Currently uses mock data. In Phase 8, these will be replaced with API calls (fetch / axios)
 * without requiring any changes to the UI components.
 */

export const getNetworks = async (): Promise<Network[]> => {
  return mockNetworks;
};

export const getBundles = async (): Promise<Bundle[]> => {
  return mockBundles;
};

export const getBundlesByNetwork = async (networkName: string): Promise<Bundle[]> => {
  return mockBundles.filter(b => b.network.toLowerCase() === networkName.toLowerCase());
};

export const getBundleById = async (id: string): Promise<Bundle | undefined> => {
  return mockBundles.find(b => b.id === id);
};
