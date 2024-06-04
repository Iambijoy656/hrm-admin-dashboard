import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import React, { ChangeEvent, useState } from 'react';
import { Photo } from '../../types/Modals';

interface ProductImageProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const ProductImage: React.FC<ProductImageProps> = ({ photos, setPhotos }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const handleSelectedPhotos = (id: number) => {
    const isPhotoExist = selectedPhotos.find((photo) => photo === id);
    if (!isPhotoExist) {
      setSelectedPhotos((prev) => [...prev, id]);
    } else {
      const remainingPhotos = selectedPhotos.filter((photo) => photo !== id);
      setSelectedPhotos(remainingPhotos);
    }
  };

  const handleDeletedPhotos = () => {
    const remainingPhotos = photos.filter(
      (photo) => !selectedPhotos.includes(photo.id),
    );
    setPhotos(remainingPhotos);
    setSelectedPhotos([]);
  };

  const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const addPhotos = e.target.files;

    if (!addPhotos) return;

    const newPhotos: Photo[] = Array.from(addPhotos).map((file) => {
      let id;
      const usedIds = new Set<number>();

      do {
        id = Math.floor(Math.random() * 5000);
      } while (usedIds.has(id));

      usedIds.add(id);

      const photo = URL.createObjectURL(file);
      return { id, image: photo, file };
    });

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  return (
    <div className="card" style={{ height: '100%',width:"100%",}}>
  
     
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                // height: '5px',
                gap: '10px',
              }}
            >
              {selectedPhotos.length > 0 && (
                <input
                  readOnly
                  type="checkbox"
                  checked={selectedPhotos.length > 0}
                  style={{
                    width: '14px',
                    height: '14px',
                  }}
                  onChange={() => setSelectedPhotos([])}
                />
              )}
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  // marginTop: '18px',
                }}
              >
                {selectedPhotos.length > 0 && selectedPhotos.length}{' '}
                {selectedPhotos.length === 0
                  ? ''
                  : selectedPhotos.length === 1
                  ? 'File Selected'
                  : 'Files Selected'}
              </p>
            </div>
            <div
              onClick={handleDeletedPhotos}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '0.875rem',
                // color: '#ff0000',
              }}
            >
              {selectedPhotos.length === 0 ? (
                ''
              ) : selectedPhotos.length === 1 ? (
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{
                    fontSize: { xs: '.7rem', md: '.7rem' }, // Set font size for the button text
                    '& .MuiButton-startIcon': {
                      marginRight: '4px', // Adjust spacing between icon and text if needed
                    },
                  }}
                  // startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{
                    fontSize: { xs: '.7rem', md: '.7rem' }, // Set font size for the button text
                    '& .MuiButton-startIcon': {
                      marginRight: '4px', // Adjust spacing between icon and text if needed
                    },
                  }}
                  // startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
          {/* <hr /> */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
           
              gap: '10px',
              padding: '10px',
              width: '100%',

            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  display: 'flex',
                  flex: '0 0 70px',
                  flexDirection: 'column',
                  border: '2px solid #c9cbcf',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  width: '70px',
                  height: '70px',
                }}
              >
                <label
                  htmlFor={photo.id.toString()}
                  style={{ position: 'relative' }}
                >
                  <div
                    style={{ width: '70px', height: '70px' }}
                    className={`${
                      selectedPhotos.includes(photo.id)
                        ? 'opacity-7'
                        : 'hover-bg-secondary'
                    }`}
                  >
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        aspectRatio: '1/1',
                        backgroundSize: '100% 100%',
                        backgroundImage: `url("${photo.image}")`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                  </div>
                  <input
                    type="checkbox"
                    name="gender"
                    id={photo.id.toString()}
                    checked={selectedPhotos.includes(photo.id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                    }}
                    onChange={() => handleSelectedPhotos(photo.id)}
                  />
                </label>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                margin:"0 auto",
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                borderWidth: '2px',
                borderStyle: 'dashed',
                // backgroundColor: '#f9f9f9',
                borderColor: '#464646',
                width: '70px',
                height: '70px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  width: '70px',
                  height: '70px',
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http:www.w3.org/2000/svg"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
                </svg>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: '11px',
                    marginBottom: 0,
                  }}
                >
                  Add
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '70px',
                    width: '70px',
                    opacity: '0',
                    cursor: 'pointer',
                  }}
                  onChange={handleAddPhoto}
                />
              </label>
            </div>
          </div>
        
    
    </div>
  );
};

export default ProductImage;
