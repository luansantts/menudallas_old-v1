import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { moneyFormat } from "../../utils/moneyFormat";
import { getOpened } from "../../utils/getOpened";
import Swal from "sweetalert2";

function FooterStore({ data, subdomain }) {
  const [bag, setBag] = useState([]);
  const [total, setTotal] = useState(0);
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const b = localStorage.getItem("@menu-digital:" + subdomain + ":bag");

    console.debug("subdomain", subdomain);

    if (b !== null) {
      setBag(JSON.parse(b));

      if (JSON.parse(b).length > 0) {
        let cont = 0;
        JSON.parse(b).forEach((element) => {
          cont = cont + element.valor_total * element.quantidade;
        });
        setTotal(cont);
      }
    }
  }, [subdomain]);

  useEffect(() => {
    setOpened(getOpened(data));
  }, [data]);

  return (
    <Flex
      onClick={() => {
        if (!opened) {
          return Swal.fire({
            title: "Loja fechada",
            text: "Desculpe, a loja não está aberta no momento. Tente novamente mais tarde.",
            icon: "warning",
            confirmButtonColor: data?.primary_color || "#3085d6",
            confirmButtonText: "OK",
          });
        }

        return bag !== null && bag.length > 0
          ? router.push("/meu-pedido")
          : false;
      }}
      cursor={bag !== null && bag.length > 0 && "pointer"}
      padding={["12px 25px", "12px 25px"]}
      pl={["0px", "15px"]}
      // bg={bag !== null && bag.length > 0 ? data?.primary_color : "#b7b7b7"}
    >
      <Box position="relative">
        <Box
          top={["-1", "-1"]}
          right={["-4", "-4"]}
          position="absolute"
          borderRadius="100px"
          bg={bag !== null && bag.length > 0 ? data?.primary_color : "#b7b7b7"}
          color="white"
          minW="20px"
          h="18px"
          fontSize="12px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {bag.length}
        </Box>
        <Image
          src="/img/shopIcon.png?cache=12"
          width={32}
          height={32}
          objectFit="cover"
          objectPosition="center"
          alt="Menu Dallas Vetor"
        />
      </Box>
    </Flex>
  );
}

export default FooterStore;
