import { Box, Checkbox, FormControlLabel } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type TreeType = {
  id: number;
  parent_id?: number;
  name_s: string;
  label?: string;
  value?: number;
  children: TreeType[];
  checked?: boolean;
};

type TreeSelectProps = {
  tree: TreeType;
  setShowTree: Dispatch<SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<TreeType | undefined>>;
};
export default function ExtendedTree({
  tree,
  setShowTree,
  setSelected,
}: TreeSelectProps) {
  const [expand, setExpend] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    TreeType | undefined
  >();

  //   const handleSelected=(data:TreeType)=>{
  // const item=
  //   }
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <span className='mx-2 cursor-pointer' onClick={() => setExpend(!expand)}>
          {expand ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </span>
        {/* <MenuItem
          value={tree?.name_s}
          onClick={() => {
            setSelected(tree);
            setShowTree(false);
          }}
        >
          {tree?.name_s}
        </MenuItem> */}

        <FormControlLabel
          control={
            <Checkbox
              onClick={() => {
                setSelectedItem(tree);
                setSelected(tree);
                setShowTree(false);
              }}
              checked={selectedItem?.id === tree?.id}
              sx={{
                transform: 'scale(0.8)',
                '& .MuiSvgIcon-root': { fontSize: 24 },
              }}
            />
          }
          label={tree?.name_s}
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: expand ? 'block' : 'none',
          paddingLeft: '10px',
        }}
      >
        {tree?.children?.map((item, index) => (
          <ExtendedTree
            tree={item}
            key={index}
            setSelected={setSelected}
            setShowTree={setShowTree}
          />
        ))}
      </Box>
    </Box>
  );
}
