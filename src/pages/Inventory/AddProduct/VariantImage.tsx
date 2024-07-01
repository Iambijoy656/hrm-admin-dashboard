import React, { useState } from 'react';

interface Photo {
  id: number;
  image: string;
  file: File;
}

interface VariantImageProps {
  handelUploadData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  singleRowData: string;
  rowImage: { [key: string]: Photo[] };
  setRowImage: React.Dispatch<React.SetStateAction<{ [key: string]: Photo[] }>>;
}

const VariantImage: React.FC<VariantImageProps> = ({
  handelUploadData,
  photos,
  setPhotos,
  singleRowData,
  rowImage,
  setRowImage,
}) => {
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
    const remainingPhotos = rowImage[singleRowData]?.filter(
      (photo) => !selectedPhotos.includes(photo.id)
    );
    setPhotos(remainingPhotos);
    rowImage[singleRowData] = remainingPhotos;
    setSelectedPhotos([]);
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>, singleRowData: string) => {
    e.preventDefault();
    const addPhotos = e.target.files;

    if (!addPhotos) return;

    const usedIds = new Set<number>();

    const newPhotos = Array.from(addPhotos).map((file, index) => {
      let id;
      do {
        id = Math.floor(Math.random() * 5000);
      } while (usedIds.has(id));

      usedIds.add(id);
      const photo = URL.createObjectURL(file);
      return { id, image: photo, file };
    });

    setPhotos((prevPhotos) => [...newPhotos]);
    rowImage[singleRowData] = [...newPhotos];
  };

  return (
    <div className="card" style={{ height: '100%', marginBottom: 0 }}>
      <div style={{ padding: '10px' }}>
        <div>
          {/* Header components */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: '1rem',
              marginRight: '1rem',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: '5px', gap: '10px' }}>
              {selectedPhotos.length > 0 && (
                <input
                  readOnly
                  type="checkbox"
                  checked={selectedPhotos.length ? true : false}
                  style={{ width: '14px', height: '14px' }}
                  onChange={() => setSelectedPhotos([])}
                />
              )}
              <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                {selectedPhotos.length > 0 && selectedPhotos.length}{' '}
                {selectedPhotos.length === 0
                  ? 'Gallery'
                  : selectedPhotos.length === 1
                  ? 'File Selected'
                  : 'Files Selected'}{' '}
              </p>
            </div>
            <div
              onClick={handleDeletedPhotos}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '0.875rem',
                color: '#ff0000',
              }}
            >
              {selectedPhotos.length === 0
                ? ''
                : selectedPhotos.length === 1
                ? 'Delete file'
                : 'Delete files'}{' '}
            </div>
          </div>
          <hr />
          {/* grid layout for gallery */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '10px',
              width: '100%',
            }}
          >
            {rowImage[singleRowData]?.map((photo, index) => (
              <div
                key={index}
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
                <label htmlFor={`${photo.id}`} style={{ position: 'relative' }}>
                  <div
                    style={{ width: '70px', height: '70px' }}
                    className={`${
                      selectedPhotos.includes(photo.id) ? 'opacity-7' : 'hover-bg-secondary'
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
                    id={`${photo.id}`}
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
            {/* add image button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                borderWidth: '2px',
                borderStyle: 'dashed',
                backgroundColor: '#f9f9f9',
                borderColor: '#c9cbcf',
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
                    fontWeight: '600',
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
                  onChange={(e) => {
                    handleAddPhoto(e, singleRowData);
                    handelUploadData(e);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantImage;
