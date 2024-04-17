import Image from 'next/image'; // Import next/image component

const PropertyIcon = () => {
  return (
    <div>
      {/* 
        Use the next/image component with the src attribute pointing to the image file in the public directory.
        Specify the width and height of the image as props.
      */}
      <Image src="/property.png" alt="Custom Icon" width={40} height={40} />
    </div>
  );
};

export default PropertyIcon;