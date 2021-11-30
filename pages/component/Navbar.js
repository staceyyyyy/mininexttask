import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'
import {
    Tooltip,Box,Button,
    AppBar,Container,Toolbar,
    IconButton
  } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
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
    const res = data
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
      console.log("fr",res.categories.items[0].children)
      console.log(res)
    return (
        <AppBar position="static"style={{ background: '#e2b5bb'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {res.categories.items[0].children.map((category,index) => (
                <Link href={`/post/${category.id}`}>
                <Button
                  key={index}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                {category.name}
                </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="My Cart">
                <Link href={`/component/myCart`}>
                  <IconButton sx={{ p: 0 }}>
                    <ShoppingCart style={{color: "white"}} />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
}