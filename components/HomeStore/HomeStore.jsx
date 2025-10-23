import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import InfoStoreHome from "../InfoStoreHome/InfoStoreHome";

function HomeStore({ data, subdomain }) {
  return (
    <>
      <Head>
        <style>
          {`
            body {
              background: #f5f7fb !important;
            }
          `}
        </style>
      </Head>

      <Box
        bg="#f5f7fb"
        minH="100vh"
        px={["18px", "32px"]}
        py={["48px", "80px"]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <InfoStoreHome data={data} subdomain={subdomain} />
      </Box>
    </>
  );
}

export default HomeStore;
