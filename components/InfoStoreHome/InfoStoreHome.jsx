import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaHamburger,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingBag,
  FaWhatsapp,
} from "react-icons/fa";
import { MdInfo, MdMessage, MdShare } from "react-icons/md";
import { InlineShareButtons } from "sharethis-reactjs";
import { StatusStore } from "../StatusStore";
import { getOpened } from "../../utils/getOpened";
import { moneyFormat } from "../../utils/moneyFormat";
import Stars from "./Stars";

const sanitizeNumber = (value = "") => value.replace(/\D/g, "");

const buildAddressLine = (data = {}) => {
  const street = [data?.endereco, data?.numero].filter(Boolean).join(", ");
  const cityState = [data?.cidade, data?.estado].filter(Boolean).join("/");
  const districtChunk = [data?.bairro, cityState].filter(Boolean).join(", ");
  return [street, districtChunk].filter(Boolean).join(" - ");
};

const getPrimaryColor = (data) => data?.primary_color || "#1E90FF";

const createActionButtonStyles = (primaryColor) => ({
  variant: "outline",
  borderRadius: "18px",
  borderColor: "rgba(17, 34, 64, 0.1)",
  bg: "white",
  w: ["54px", "60px"],
  h: ["54px", "60px"],
  minW: ["54px", "60px"],
  p: 0,
  transition: "all 0.25s ease",
  _hover: {
    borderColor: primaryColor,
    transform: "translateY(-2px)",
    boxShadow: "0 12px 28px rgba(17, 34, 64, 0.12)",
  },
  _focusVisible: {
    borderColor: primaryColor,
    boxShadow: `0 0 0 3px ${primaryColor}33`,
  },
});

const welcomeOptions = [
  { id: "dine-in", label: "Para comer aqui", icon: FaHamburger },
  { id: "take-away", label: "Para levar", icon: FaShoppingBag },
];

const WelcomeCard = ({ data, primaryColor }) => {
  const description =
    data?.frase_home ||
    "Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!";

  return (
    <Box w="100%" maxW={["320px", "420px"]}>
      <Box
        w="100%"
        borderRadius={["24px", "28px"]}
        bg="white"
        boxShadow="0 20px 40px rgba(17, 34, 64, 0.08)"
        px={["20px", "36px"]}
        py={["30px", "44px"]}
      >
        <Stack spacing={[6, 8]} align="center" textAlign="center">
          <Box
            w={["86px", "104px"]}
            h={["86px", "104px"]}
            borderRadius="22px"
            boxShadow="0 12px 28px rgba(17, 34, 64, 0.16)"
            bg="white"
            backgroundImage={`url("${
              data.logo_home
                ? data.logo_home
                : "https://imgmenudallas.s3.sa-east-1.amazonaws.com/noimage.png"
            }")`}
            backgroundSize="contain"
            backgroundPosition="center"
            bgRepeat="no-repeat"
          />

          <Stack spacing={[1, 2]} align="center">
            <Text
              fontSize={["sm", "md"]}
              fontWeight={600}
              color="#3A3A3A"
              letterSpacing="-0.01em"
            >
              {data.nome}
            </Text>
            <Text
              fontSize={["24px", "28px"]}
              fontWeight={700}
              color="#112240"
              letterSpacing="-0.02em"
            >
              Seja bem-vindo!
            </Text>
            <Text
              fontSize={["13px", "15px"]}
              lineHeight="1.7"
              color="#6F7A8A"
              maxW="290px"
            >
              {description}
            </Text>
          </Stack>

          <Box
            w="100%"
            border="1px solid rgba(17, 34, 64, 0.08)"
            borderRadius="26px"
            px={["12px", "18px"]}
            py={["14px", "18px"]}
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: "18px",
              bottom: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              background: "rgba(17, 34, 64, 0.12)",
              display: "block",
            }}
          >
            <SimpleGrid columns={2} spacing={[3, 4]}>
              {welcomeOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="unstyled"
                  type="button"
                  bg="#FFFFFF"
                  borderRadius="20px"
                  border="1px solid rgba(17, 34, 64, 0.1)"
                  boxShadow="0 10px 20px rgba(17, 34, 64, 0.06)"
                  py={["16px", "20px"]}
                  px={["16px", "20px"]}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={[2, 3]}
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: primaryColor,
                    transform: "translateY(-2px)",
                    boxShadow: "0 16px 28px rgba(17, 34, 64, 0.12)",
                  }}
                  _active={{
                    transform: "translateY(0px)",
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    w={["58px", "62px"]}
                    h={["58px", "62px"]}
                    borderRadius="18px"
                    bg="#FAFAFA"
                    border="1px solid rgba(17, 34, 64, 0.08)"
                  >
                    <Icon
                      as={option.icon}
                      fontSize={["30px", "34px"]}
                      color={primaryColor}
                    />
                  </Flex>
                  <Text
                    fontWeight={600}
                    color="#112240"
                    fontSize={["sm", "sm"]}
                  >
                    {option.label}
                  </Text>
                </Button>
              ))}
            </SimpleGrid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

function InfoStoreHome({ data = {}, type = 1, subdomain }) {
  const primaryColor = getPrimaryColor(data);
  const shareUrl = subdomain
    ? `https://${subdomain}.${process.env.NEXT_PUBLIC_BASE_URL_DOMAIN}`
    : `https://${process.env.NEXT_PUBLIC_BASE_URL_DOMAIN}`;

  if (type === 1) {
    return <WelcomeCard data={data} primaryColor={primaryColor} />;
  }

  const storeIsOpen = getOpened(data);
  const addressLine = buildAddressLine(data);
  const buttonStyles = createActionButtonStyles(primaryColor);

  return (
    <Box
      borderRadius="40px 40px 0 0"
      bg="white"
      borderTop="4px solid rgba(17, 34, 64, 0.08)"
      mt={["-2.5rem", "-3.5rem"]}
      pb={["36px", "52px"]}
      px={["20px", "5%"]}
    >
      <Box
        w={["120px", "140px"]}
        h={["120px", "140px"]}
        borderRadius="36px"
        boxShadow="0 20px 52px rgba(17, 34, 64, 0.15)"
        bg="white"
        m="0 auto"
        position="relative"
        top={["-60px", "-72px"]}
        backgroundImage={`url("${
          data.logo_home
            ? data.logo_home
            : "https://imgmenudallas.s3.sa-east-1.amazonaws.com/noimage.png"
        }")`}
        backgroundSize="cover"
        backgroundPosition="center"
        bgRepeat="no-repeat"
      />

      <Box mt={["-60px", "-72px"]}>
        <Flex
          flexWrap={["wrap", "nowrap"]}
          justifyContent="center"
          alignItems="center"
          gap={[2, 4]}
        >
          <Text
            as="h1"
            color={primaryColor}
            fontSize={["26px", "32px"]}
            lineHeight={["28px", "36px"]}
            fontWeight={700}
            textAlign="center"
          >
            {data.nome}
          </Text>
          <Flex alignItems="center">
            <Stars data={data} subdomain={subdomain} />
          </Flex>
        </Flex>

        <Flex
          mt={[4, 6]}
          mb={[6, 8]}
          justifyContent="center"
          alignItems="center"
          gap={[3, 4]}
          flexWrap="wrap"
        >
          <StatusStore status={storeIsOpen} />
          {data?.frase_home && (
            <Text
              color="neutral.600"
              fontSize="sm"
              maxW="360px"
              textAlign="center"
            >
              {data.frase_home}
            </Text>
          )}
        </Flex>

        <Flex justifyContent="center" mb={[8, 10]}>
          <Button
            as={Link}
            href="/lista"
            variant="solid"
            bg={`linear-gradient(120deg, ${primaryColor} 0%, ${
              data?.accent_color || primaryColor
            } 100%)`}
            color="#fff"
            px={["28px", "36px"]}
            py={["16px", "18px"]}
            borderRadius="18px"
            fontSize="sm"
            fontWeight={600}
            transition="all 0.3s ease"
            _hover={{
              opacity: 0.9,
              boxShadow: "0 16px 32px rgba(17, 34, 64, 0.22)",
            }}
          >
            Faça seu pedido
          </Button>
        </Flex>

        <Flex mt="14px" justifyContent="center" flexWrap="wrap" gap={[3, 4]}>
          {data?.numero_whats && (
            <Button
              as="a"
              href={`https://wa.me/55${sanitizeNumber(data?.numero_whats)}`}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonStyles}
            >
              <Icon as={FaWhatsapp} color={primaryColor} fontSize="20px" />
            </Button>
          )}

          {data?.telefone && (
            <Button
              as="a"
              href={`tel:${sanitizeNumber(data?.telefone)}`}
              {...buttonStyles}
            >
              <Icon as={FaPhone} color={primaryColor} fontSize="20px" />
            </Button>
          )}

          {(data?.endereco || data?.numero) && (
            <Button
              as="a"
              href={`https://www.google.com/maps/place/${encodeURIComponent(
                `${data?.endereco || ""}, ${data?.numero || ""} - ${
                  data?.bairro || ""
                }, ${data?.cidade || ""}/${data?.estado || ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonStyles}
            >
              <Icon as={FaMapMarkerAlt} color={primaryColor} fontSize="20px" />
            </Button>
          )}

          {data?.instagram && (
            <Button
              as="a"
              href={data?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonStyles}
            >
              <Icon as={FaInstagram} color={primaryColor} fontSize="20px" />
            </Button>
          )}

          {data?.facebook && (
            <Button
              as="a"
              href={data?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonStyles}
            >
              <Icon as={FaFacebook} color={primaryColor} fontSize="20px" />
            </Button>
          )}

          <Button as={Link} href="/sobre" {...buttonStyles}>
            <Icon as={MdInfo} color={primaryColor} fontSize="20px" />
          </Button>

          <Menu isLazy>
            <MenuButton as={Button} {...buttonStyles}>
              <Icon as={MdShare} color={primaryColor} fontSize="20px" />
            </MenuButton>
            <MenuList p="12px" borderRadius="16px" minW="220px">
              <InlineShareButtons
                config={{
                  alignment: "center",
                  color: "social",
                  enabled: true,
                  font_size: 16,
                  networks: [
                    "whatsapp",
                    "linkedin",
                    "messenger",
                    "facebook",
                    "twitter",
                  ],
                  padding: 12,
                  radius: 4,
                  show_total: true,
                  size: 30,
                  url: shareUrl,
                }}
              />
            </MenuList>
          </Menu>

          <Button as={Link} href="/avaliacoes" {...buttonStyles}>
            <Icon as={MdMessage} color={primaryColor} fontSize="20px" />
          </Button>
        </Flex>

        <Flex
          flexWrap="wrap"
          justifyContent="center"
          mt={[8, 10]}
          gap={[3, 6]}
          alignItems="center"
        >
          <Flex alignItems="center" gap={3}>
            <Image
              src="/img/moneyIcon.png"
              width={17}
              height={23}
              objectFit="cover"
              alt="Menu Dallas Dinheiro"
              style={{ minHeight: 23 }}
            />
            <Text fontSize="sm" color="neutral.700">
              Pedido mínimo{" "}
              <Text as="b">{moneyFormat.format(data?.valor_minimo)}</Text>
            </Text>
          </Flex>

          {data?.frase_tempo_buscar && (
            <Flex alignItems="center" gap={3}>
              <Image
                src="/img/clockIcon.png"
                width={17}
                height={17}
                objectFit="cover"
                alt="Tempo para retirada"
                style={{ minHeight: 17 }}
              />

              <Text fontSize="sm" color="neutral.700">
                {data?.frase_tempo_buscar}
              </Text>
            </Flex>
          )}

          {data?.frase_tempo_delivery && (
            <Flex alignItems="center" gap={3}>
              <Image
                src="/img/motoIcon.png"
                width={17}
                height={12}
                objectFit="cover"
                alt="Tempo de entrega"
                style={{ minHeight: 12 }}
              />

              <Text fontSize="sm" color="neutral.700">
                {data?.frase_tempo_delivery}
              </Text>
            </Flex>
          )}
        </Flex>

        {addressLine && (
          <Text
            textAlign="center"
            mt={[6, 8]}
            color="neutral.700"
            fontSize="sm"
            fontWeight={500}
          >
            {addressLine}
          </Text>
        )}

        <Box w="90px" m="0 auto" mt={[6, 8]}>
          <StatusStore status={storeIsOpen} />
        </Box>
      </Box>
    </Box>
  );
}

export default InfoStoreHome;
