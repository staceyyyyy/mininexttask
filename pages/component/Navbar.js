import React,{useState,useEffect} from 'react'
import Image from 'next/Image'
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import { styled} from '@mui/system';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import {Box,Button,AppBar,Container,Toolbar,IconButton,CircularProgress} from '@mui/material';
import imgLogo from '../../styles/ForYou.png';

export const DEFAULT_ATRIBUTE_CATEGORIES_FR = gql`
    fragment defaultAtributeCategoriesFr on CategoryTree {
    id
    name
    og_image
    url_key
    url_path
    description
    }
`
export const GET_CATEGORIES = gql`
    query getCategories{
    categories{
        items{
        id
        name
        description
        children{
            id
            name
            description
            url_key
            products{
            total_count
            }
            include_in_menu
            popular_icon
        }
        }
        total_count
    }
  }
`
export default function Navbar() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [myCart, setMyCart] = useState(null)
  const res = data
  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;
const cartCount= [];
if(localStorage.getItem("myCart")){
  console.log(JSON.parse(localStorage.getItem("myCart")))
  // setMyCart(JSON.parse(localStorage.getItem("myCart") || []))
  cartCount = JSON.parse(localStorage.getItem("myCart"))
} else {
  cartCount = []
}
console.log(cartCount)
const StyledBadge = styled(BadgeUnstyled)`
box-sizing: border-box;
margin: 0;
padding: 0;
color: rgba(0, 0, 0, 0.85);
font-size: 14px;
font-variant: tabular-nums;
list-style: none;
font-feature-settings: 'tnum';
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol';
position: relative;
display: inline-block;
line-height: 1;

& .MuiBadge-badge {
  z-index: auto;
  min-width: 20px;
  height: 20px;
  color: #fff;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  text-align: center;
  background: #ff4d4f;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #fff;
}

& .MuiBadge-dot {
  padding: 0;
  z-index: auto;
  min-width: 6px;
  width: 6px;
  height: 6px;
  background: #ff4d4f;
  border-radius: 100%;
  box-shadow: 0 0 0 1px #fff;
}

& .MuiBadge-anchorOriginTopRightCircular {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transform-origin: 100% 0;
}
`;
    return (
        <AppBar position="static"style={{ background: '#e2b5bb'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link href="/">
            <IconButton sx={{ p: 0 }}>
              <Image
              src={imgLogo}
              width="150px"
              height="100%"
              />
              </IconButton>
              </Link>
              {res.categories.items[0].children.map((category,index) => (
                <Link href={`/post/${category.id}`} key={index}>
                <Button
                  key={index}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                {category.name}
                </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ '& > :not(style) + :not(style)': { ml: 4 } }}>
              <Link href={`/component/myCart`}>
                <IconButton sx={{ p: 0 }}>
                  <StyledBadge badgeContent={typeof cartCount === undefined || cartCount.length=== 0 ? "0" : cartCount.length} overlap="circular">
                    <ShoppingCart style={{color: "white"}} />
                  </StyledBadge>
                </IconButton>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
}