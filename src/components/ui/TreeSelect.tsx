import { Box } from '@mui/material';
import ExtendedTree from './ExtendedTree';
import { Dispatch, SetStateAction } from 'react';

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
  tree: TreeType[];
  setShowTree: Dispatch<SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<TreeType | undefined>>;
};

const TreeSelect = ({ tree, setShowTree, setSelected }: TreeSelectProps) => {
  return (
    <Box>
      {tree?.map((children, index) => (
        <Box>
          <ExtendedTree
            tree={children}
            key={index}
            setSelected={setSelected}
            setShowTree={setShowTree}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TreeSelect;
