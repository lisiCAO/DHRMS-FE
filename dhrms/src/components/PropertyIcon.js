import Image from 'next/image'; // Import next/image component

const PropertyIcon = () => {
  return (
    <div>
      <Image src="/property.png" alt="Custom Icon" width={40} height={40} />
    </div>
  );
};

export default PropertyIcon;