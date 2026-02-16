export interface Product {
  id: number;
  title: string;
  price: number;
  priceWithDiscount?: number;
  img: string;
  battery: string;
  memorry: string;
  hdd: string;
  cameraMain: string;
  cameraFront: string;
  display: string;
  color: string;
  processor: string;
  isNew?: boolean;
  isHit?: boolean;
  description: string;
}
