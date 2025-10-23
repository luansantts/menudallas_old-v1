import { Box } from '@chakra-ui/react'
import React from 'react'

function HeaderHomeStore({ data }) {
    return (
        <Box w='100%' bgImage={data?.imagem_capa ? 'url("' + data?.imagem_capa + '")' : ''}
            bg={!data?.imagem_capa && data?.accent_color}
            minH={['220px', '370px']} backgroundSize={['cover', '']}></Box>
    )
}

export default HeaderHomeStore
