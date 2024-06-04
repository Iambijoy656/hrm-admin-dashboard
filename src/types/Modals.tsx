export type Inputs = {
  name: string;
  sku: string;
  hsn: string;
  unit_type: string;
  example: string;
};

export type Options = { value: number | string; label: string };

export interface Photo {
  id: number;
  image: string;
  file: File;
}

// export type UnitType = {
//   value: number | string;
//   label: string;
// };
