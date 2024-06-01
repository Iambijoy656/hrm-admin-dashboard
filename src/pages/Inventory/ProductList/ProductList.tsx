import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import api from '../../../Utilities/api';

const ProductList = () => {
  const [data, setData] = useState([]);

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

  const tableInfo = useMemo(
    () => [
      {
        accessorKey: 'productSku',
        header: 'productSku',
      },
      {
        accessorKey: 'barcodeType',
        header: 'barcodeType',
      },
      {
        accessorKey: 'openingStockQuantity',
        header: 'openingStockQuantity',
      },
      {
        accessorKey: 'alertQuantity',
        header: 'alertQuantity',
      },
      {
        accessorKey: 'purchasePrice',
        header: 'purchasePrice',
      },
      {
        accessorKey: 'sellingPrice',
        header: 'sellingPrice',
      },
      {
        accessorKey: 'minSellingPrice',
        header: 'minSellingPrice',
      },
      {
        accessorKey: 'taxType',
        header: 'taxType',
      },
      {
        accessorKey: 'tax',
        header: 'tax',
      },
      {
        accessorKey: 'productLength',
        header: 'productLength',
      },
      {
        accessorKey: 'productHeight',
        header: 'productHeight',
      },
      {
        accessorKey: 'productWidth',
        header: 'productWidth',
      },
      {
        accessorKey: 'productWeight',
        header: 'productWeight',
      },
      {
        accessorKey: 'packageHeight',
        header: 'packageHeight',
      },
      {
        accessorKey: 'packageWidth',
        header: 'packageWidth',
      },
      {
        accessorKey: 'packageLength',
        header: 'packageLength',
      },
      {
        accessorKey: 'packageWeight',
        header: 'packageWeight',
      },
      {
        accessorKey: 'measurementUnit',
        header: 'measurementUnit',
      },
      {
        accessorKey: 'weightUnit',
        header: 'weightUnit',
      },
      {
        accessorKey: 'unitType',
        header: 'unitType',
      },
      {
        accessorKey: 'brandName',
        header: 'brandName',
      },
      {
        accessorKey: 'categoryName',
        header: 'categoryName',
      },
      {
        accessorKey: 'modelName',
        header: 'modelName',
      },
      {
        accessorKey: 'isRawMaterial',
        header: 'isRawMaterial',
      },
      {
        accessorKey: 'has_serial_key',
        header: 'has_serial_key',
      },
      {
        accessorKey: 'productType',
        header: 'productType',
      },
      {
        accessorKey: 'productName',
        header: 'productName',
      },
      {
        accessorKey: 'hsn',
        header: 'hsn',
      },
    ],
    [],
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product List" />

      {/* <fieldset className="w-full space-y-1 dark:text-gray-100 my-3 md:flex md:justify-end">
        <label htmlFor="Search" className="hidden">
          Search
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="search"
              className="p-1 focus:outline-none focus:ring"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 dark:text-gray-100"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full md:w-36 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none  dark:bg-boxdark dark:text-gray-100 focus:dark:bg-gray-900 border focus:dark:border-white"
          />
        </div>
      </fieldset> */}

      <div className="my-16">
        {data?.length !== 0 ? (
          <MaterialReactTable
            muiTableBodyCellProps={{
              className: 'dark:bg-boxdark dark:text-white',
            }}
            columns={tableInfo}
            data={data}
            enableGrouping
            enableStickyHeader
            initialState={{
              density: 'compact',
              expanded: true, // expand all groups by default
              grouping: ['productSku'], // an array of columns to group by default (can be multiple)
              pagination: { pageIndex: 0, pageSize: 10 },
              // sorting: [{ id: 'state', desc: false }], // sort by state by default
            }}
            muiToolbarAlertBannerChipProps={{}}
            muiTableContainerProps={{
              className: 'dark:bg-boxdark dark:text-white',
              sx: { maxHeight: '700px' },
            }}
            muiTableHeadCellProps={{
                className: 'dark:bg-boxdark dark:text-white', // Add your custom class here
              }}
              muiTableFooterCellProps={{
                className: 'dark:bg-boxdark dark:text-white', // Add your custom class here
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
                  to={`/dashboard/inventory-management/products/edit-product/${row?.original?.id}`}
                  color="secondary"
                >
                  <EditIcon
                    className="dark:text-slate-400"
                    sx={{
                      fontSize: '20px',
                      color: '#464646',
                    }}
                  />
                </Link>
                <IconButton
                  color="error"
                  onClick={() => {
                    // data.splice(row.index, 1); // assuming simple data table
                    // setData([...data]);
                    // console.log(row?.original?.id)
                    // handleDelete(row?.original?.id);
                  }}
                >
                  <DeleteIcon
                    className="dark:text-red-400"
                    sx={{
                      fontSize: '20px',
                    }}
                  />
                </IconButton>
              </Box>
            )}
          />
        ) : (
          <p>not found</p>
          //   <div style={{ height: '100vh' }}>
          //     <div className="d-flex align-items-center justify-content-center">
          //       <div className="loader-box">
          //         <div className="loader">
          //           <div className="line bg-primary"></div>
          //           <div className="line bg-primary"></div>
          //           <div className="line bg-primary"></div>
          //           <div className="line bg-primary"></div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductList;
