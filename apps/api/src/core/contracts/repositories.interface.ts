export interface OrderRepository {
  create(orderData: any): Promise<any>;
  findById(id: string): Promise<any>;
  findByReference(reference: string): Promise<any>;
  update(id: string, updateData: any): Promise<any>;
  updateStatus(id: string, status: string): Promise<any>;
  findPending(): Promise<any[]>;
  findFailed(): Promise<any[]>;
  delete(id: string): Promise<boolean>;
}

export interface ProductRepository {
  findNetworks(): Promise<any[]>;
  findBundles(): Promise<any[]>;
  findBundleById(id: string): Promise<any>;
}
