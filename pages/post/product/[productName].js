import { useRouter } from 'next/router'
import React, {useState} from 'react'
// import styles from '../../../styles/Home.module.css'
import { useQuery, gql } from '@apollo/client'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Tooltip,Grid,Box,Chip,
  CircularProgress,IconButton,Typography,
  Card,CardActions,CardContent,CardMedia,Collapse,Snackbar,Slide,Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../../component/Navbar'
import { DataArray } from '@mui/icons-material';

export const GET_PRODUCT = gql`
  query getProduct($urlKey: String) {
    products(filter: {
      url_key: {
        eq: $urlKey
      }
    }){
      items{
        id
        name
        description {
          html
        }
        image{
          url
        }
        price_range{
          maximum_price{
            final_price{
              value
            }
            regular_price{
              value
            }
          }
        }
        qty_available
        rating_summary
        categories{
          name
        }
      }
    }
  }
`
const productName = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const productName = router.query.productName
  const { loading, error, data } = useQuery(GET_PRODUCT,{
    variables: {
      urlKey: productName
    }
  })
  if (loading) return <CircularProgress />
  if (error) return <p>Error :(</p>
  const productDetail = data.products.items
  function createMarkup() {
    return {__html: productDetail[0].description.html};
  }
  const addProductToCart = ()=> {
    let myCart = []
    myCart = JSON.parse(localStorage.getItem('myCart')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    myCart.push(productDetail);

    // Alert the array value
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('myCart', JSON.stringify(myCart));
    console.log('added',myCart)
    console.log('eh',productDetail)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  
    return (
      <div>
        <Navbar/>
            {productDetail.map((product,index)=> (
              <Box sx={{ flexGrow: 1 }} key={index} style={{marginTop:"3rem"}}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={product.image.url}
                      alt={product.name}
                      height="440"
                      width="300"
                    />
                  </Card>
                </Grid>
                <Grid item xs={4}>
                <CardContent>
                  <Typography variant="h6" display="block" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="overline" display="block" gutterBottom>
                    {productDetail[0].price_range.maximum_price.final_price.value}
                  </Typography>
                  {product.categories.map((cat,index)=> (
                    <Chip label={cat.name} size="small" variant="outlined" key={index}/>
                    ))}
                </CardContent>
                <CardContent>
                <Typography variant="caption" color="text.secondary">
                    <div dangerouslySetInnerHTML={createMarkup()} />
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <Tooltip title="Add to Cart">
                  <IconButton aria-label="add to cart">
                    <AddShoppingCartIcon onClick={addProductToCart}/>
                  </IconButton>
                  </Tooltip>
                </CardActions>
                </Grid>
              </Grid>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Product added to cart"
                action={action}
              />
            </Box>
            ))}
          </div>
    )
}
export default productName