import { Container } from "@mui/material";
import Image from "next/image";

export default function ComingSoon() {
  return (
    <Container maxWidth="sm" className="text-center mt-20">
      <div className="relative w-full h-60 sm:h-72 md:h-96 lg:h-[30rem] xl:h-[36rem] 2xl:h-[42rem]">
        <Image
          src="/comingsoon.jpeg"
          alt="Coming Soon"
          layout="fill"
          objectFit="contain" // Changed from 'cover' to 'contain'
        />
      </div>
    </Container>
  );
}