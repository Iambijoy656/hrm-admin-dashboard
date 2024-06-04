import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { ThemeContext } from '../../../context/ThemeProvider';
import DefaultLayout from '../../../layout/DefaultLayout';
import api from '../../../Utilities/api';

interface Product {
  id: string;
  productSku: string;
  barcodeType: string;
  openingStockQuantity: number;
  alertQuantity: number;
  purchasePrice: number;
  sellingPrice: number;
  minSellingPrice: number;
  taxType: string;
  tax: number;
  productLength: number;
  productHeight: number;
  productWidth: number;
  productWeight: number;
  packageHeight: number;
  packageWidth: number;
  packageLength: number;
  packageWeight: number;
  measurementUnit: string;
  weightUnit: string;
  unitType: string;
  brandName: string;
  categoryName: string;
  modelName: string;
  isRawMaterial: boolean;
  has_serial_key: boolean;
  productType: string;
  productName: string;
  hsn: string;
}

const ProductList = () => {
  const { mode } = useContext(ThemeContext);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/inventory-management/products/sku/list/all`,
        );
        setData(response?.data?.body?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const tableInfo: MRT_ColumnDef<Product>[] = useMemo(
    () => [
      { accessorKey: 'productSku', header: 'Product SKU' },
      { accessorKey: 'barcodeType', header: 'Barcode Type' },
      { accessorKey: 'openingStockQuantity', header: 'Opening Stock Quantity' },
      { accessorKey: 'alertQuantity', header: 'Alert Quantity' },
      { accessorKey: 'purchasePrice', header: 'Purchase Price' },
      { accessorKey: 'sellingPrice', header: 'Selling Price' },
      { accessorKey: 'minSellingPrice', header: 'Min Selling Price' },
      { accessorKey: 'taxType', header: 'Tax Type' },
      { accessorKey: 'tax', header: 'Tax' },
      { accessorKey: 'productLength', header: 'Product Length' },
      { accessorKey: 'productHeight', header: 'Product Height' },
      { accessorKey: 'productWidth', header: 'Product Width' },
      { accessorKey: 'productWeight', header: 'Product Weight' },
      { accessorKey: 'packageHeight', header: 'Package Height' },
      { accessorKey: 'packageWidth', header: 'Package Width' },
      { accessorKey: 'packageLength', header: 'Package Length' },
      { accessorKey: 'packageWeight', header: 'Package Weight' },
      { accessorKey: 'measurementUnit', header: 'Measurement Unit' },
      { accessorKey: 'weightUnit', header: 'Weight Unit' },
      { accessorKey: 'unitType', header: 'Unit Type' },
      { accessorKey: 'brandName', header: 'Brand Name' },
      { accessorKey: 'categoryName', header: 'Category Name' },
      { accessorKey: 'modelName', header: 'Model Name' },
      { accessorKey: 'isRawMaterial', header: 'Is Raw Material' },
      { accessorKey: 'has_serial_key', header: 'Has Serial Key' },
      { accessorKey: 'productType', header: 'Product Type' },
      { accessorKey: 'productName', header: 'Product Name' },
      { accessorKey: 'hsn', header: 'HSN' },
    ],
    [],
  );

  return (
    <DefaultLayout>
      <Breadcrumb Parent="Inventory" pageName="Product List" />
      <div className="my-16">
        {data.length !== 0 ? (
          <ThemeProvider theme={createTheme({ palette: { mode: mode } })}>
            <MaterialReactTable
              columns={tableInfo}
              data={data}
              enableGrouping
              enableStickyHeader
              initialState={{
                density: 'compact',
                expanded: true,
                grouping: ['productSku'],
                pagination: { pageIndex: 0, pageSize: 10 },
              }}
              enableRowActions
              renderRowActions={({ row }) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '.7rem',
                  }}
                >
                  <Link
                    to={`/dashboard/inventory-management/products/edit-product/${row.original.id}`}
                    color="secondary"
                  >
                    <EditIcon
                      className="dark:text-slate-400"
                      sx={{ fontSize: '20px', color: '#464646' }}
                    />
                  </Link>
                  <IconButton
                    color="error"
                    onClick={() => {
                      // Implement delete functionality here
                    }}
                  >
                    <DeleteIcon
                      className="dark:text-red-400"
                      sx={{ fontSize: '20px' }}
                    />
                  </IconButton>
                </Box>
              )}
            />
          </ThemeProvider>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductList;
