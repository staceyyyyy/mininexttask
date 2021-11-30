import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import { useQuery, gql } from '@apollo/client'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Tooltip,Grid,Box,Chip,
  CircularProgress,IconButton,Typography,
  Card,CardActions,CardContent,CardMedia,
  Container
} from '@mui/material';
import Navbar from '../../component/Navbar'

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
  // let myCart = localStorage.setItem('myCart')
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
    localStorage.setItem('myCart', productName)
    console.log('added',productName)
  }
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
            </Box>
            ))}
          </div>
    )
}
export default productName