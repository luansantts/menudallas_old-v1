import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { connect } from "react-redux";
import { productsActions, promosActions } from "../../store/actions";
import { isEmpty } from "lodash";
import { moneyFormat } from "../../utils/moneyFormat";
import {
  filterPromotionTamanhoArrayMaior,
  filterPromotionTamanhoArrayMenor,
} from "../../utils/filtersPromotion";
import { useRouter } from "next/router";
import slugify from "slugify";

function MainProducts({
  data,
  promos,
  products,
  getAll,
  getAllProds,
  subdomain,
  refreshSearch,
  setRefreshSearch,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [promoTitle, setPromoTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (refreshSearch) {
      if (isEmpty(products)) {
        setProductsData([]);
        setIsLoading(false);
        getAll(data.user_id);
      }

      if (isEmpty(promos)) {
        setIsLoading(false);
        getAllProds(data.user_id);
      }
      setRefreshSearch(false);
    }
  }, [refreshSearch]);

  useEffect(() => {
    if (promos.items && promos.items.length > 0) {
      setPromoTitle(promos.items[0].descricao);
      setProductsData(promos.items[0].produtos);
      setIsLoading(false);
    } else {
      setProductsData([]);
    }

    if (promos.loading) {
      setIsLoading(promos.loading);
    }
  }, [promos]);

  const [sliderRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 5,
      spacing: 22,
      origin: "center",
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 22,
        },
      },
      "(min-width: 769px) and (max-width: 1500px)": {
        slides: {
          perView: 5,
          spacing: 22,
        },
      },
      "(min-width: 1501px) and (max-width: 1920px)": {
        slides: {
          perView: 7,
          spacing: 22,
        },
      },
      "(min-width: 1921px) and (max-width: 3000px)": {
        slides: {
          perView: 10,
          spacing: 22,
        },
      },
    },
  });

  if (productsData.length == 0) {
    return null;
  }

  return (
    <Box mt={["30px", "58px"]} padding={["12px 30px", "12px 50px"]} pt="0">
      <Text
        fontSize="21px"
        color={data?.primary_color}
        fontWeight={600}
        mb={["20px", "27px"]}
      >
        {promoTitle}
      </Text>

      <Box ref={sliderRef} className="keen-slider">
        {productsData.map((product, key) => (
          <Box
            key={key}
            borderRadius="9px"
            className="keen-slider__slide"
            cursor="pointer"
            transition="0.3s"
            _hover={{
              opacity: 0.8,
            }}
            border="1px solid #ECECEC"
            bg="#fff"
            onClick={() =>
              router.push(
                `/produto/${slugify(product.descricao, { lower: true })}?g=${
                  product.id_grupo
                }&p=${product.id}`
              )
            }
          >
            <Flex alignItems="center" justifyContent="center">
              <Image
                className="mainImgProds"
                src={product.foto_destaque}
                width={234}
                height={190}
                style={{
                  height: "190px",
                }}
                objectFit="cover"
                objectPosition="center"
                alt={product.descricao}
                loader={({ src }) => {
                  return src;
                }}
              />
            </Flex>
            <Divider
              borderWidth="1px"
              borderColor={data?.primary_color}
              filter="drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25))"
            />

            <Box padding="14px" mt="5px">
              <Text fontSize={["13px", "16px"]} color="#000" fontWeight={600}>
                {product.descricao}
              </Text>
              <Text
                mt="12px"
                fontSize={["11px", "14px"]}
                color="#000"
                fontWeight={400}
                display="flex"
                alignItems="center"
                gap="8px"
              >
                {product.tamanhos && <Text as="span">De: </Text>}

                {["P", "O"].indexOf(product.tipo) > -1 && (
                  <Text
                    as="span"
                    color="rgb(80, 167, 115)"
                    display="flex"
                    alignItems="center"
                    gap="4px"
                  >
                    {moneyFormat.format(product.valor_de || 0)}{" "}
                    <Text color="rgb(113, 113, 113)">até: </Text>
                    {moneyFormat.format(product.valor_ate || 0)}
                  </Text>
                )}
                <Text as="span" color="rgb(80, 167, 115)">
                  {["P", "O"].indexOf(product.tipo) === -1 &&
                    (product?.em_promocao == false
                      ? moneyFormat.format(product?.valor || 0)
                      : moneyFormat.format(product?.valor_promocao || 0))}
                </Text>
                {["P", "O"].indexOf(product.tipo) === -1 &&
                product?.em_promocao == true ? (
                  <Text
                    textDecoration="line-through"
                    color="rgb(113, 113, 113)"
                  >
                    {product?.em_promocao == true &&
                      moneyFormat.format(product?.valor || 0)}
                  </Text>
                ) : (
                  ""
                )}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function mapState(state) {
  const { promos, products } = state;
  return { promos, products };
}

const actionCreators = {
  getAll: promosActions.getAll,
  getAllProds: productsActions.getAll,
};

export default connect(mapState, actionCreators)(MainProducts);
