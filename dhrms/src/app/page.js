"use client";
import { Box, Typography } from "@mui/material";
import Searchbar from "../components/SearchBar";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
 

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Ensure the container takes up the full height of the viewport
    >
      <Box maxWidth={"sm"}>
        <Typography textAlign="center" my={2}>
          MUI <code>{`<SearchBar/>`}</code> Tutorial
        </Typography>
        <Box>
          <Searchbar
            onSubmit={(searchTerm) => {
              router.push({
                pathname: "/search",
                query: {
                  search: searchTerm,
                },
              });
            }}
            inputProps={{}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;