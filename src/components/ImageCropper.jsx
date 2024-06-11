import React, { useState } from 'react';

const ImageCropper = ({ imageURL, cropDimensions }) =>
{
    const [croppedImage, setCroppedImage] = useState(null);

    const cropImage = () =>
    {
        const image = new Image();
        image.crossOrigin = 'anonymous'; // Enable CORS for the image
        image.onload = () =>
        {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions to crop dimensions
            canvas.width = cropDimensions.width;
            canvas.height = cropDimensions.height;

            // Perform the crop
            ctx.drawImage(image, cropDimensions.x, cropDimensions.y, cropDimensions.width, cropDimensions.height, 0, 0, cropDimensions.width, cropDimensions.height);

            // Convert cropped image to data URL
            const dataURL = canvas.toDataURL('image/jpeg');

            // Set the cropped image
            setCroppedImage(dataURL);
        };

        image.src = imageURL;
    };

    return (
        <div>
            <button onClick={cropImage}>Crop Image</button>
            {croppedImage && <img src={croppedImage} alt="Cropped" />}
        </div>
    );
};

export default ImageCropper;
