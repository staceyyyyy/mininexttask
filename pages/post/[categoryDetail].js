import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useQuery, gql } from '@apollo/client'
import Navbar from '../component/Navbar'
import {
  Grid,Card,CardMedia,Container,Typography
} from '@mui/material';
export const GET_CATEGORY_PRODUCTS = gql`
  query getCategoryProducts($categoryId: Int) {
    category(id: $categoryId){
      id
      name
      url_key
      products{
        items{
          id
          name
          image{
            url
          }
          popular_icon
          rating_summary
          review_count
          url_key
          price_range{
            minimum_price{
              final_price{
                value
              }
              regular_price{
                value
              }
            }
          }
        }
        total_count
      }
    }
  }
`
const CategoryDetail = () => {
  const router = useRouter()
  const id = router.query.categoryDetail
  const { loading, error, data } = useQuery(GET_CATEGORY_PRODUCTS,{
    variables: {
      categoryId: id,
    }
  })
    const res = data
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    return (
        <div className={styles.pageContainer}>
          <Navbar/>
          <Typography variant="h4" gutterBottom component="div">
            {res.category.name}
          </Typography>
          <Container maxWidth="xl">
          <Grid container spacing={3} columns={16}>
          {res.category.products.items.map((product)=> (
            <Grid item xs={4}>
              <Link href={`/post/product/${product.url_key}`} key={product.id}>
                <Card key={product.id}sx={{ height: 450,width: 300 }}>
                  <h2>{product.name}</h2>
                  <CardMedia
                  component="img"
                  image={product.image.url}
                  alt={product.name}
                  height="350"
                  width="300"
                />
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
export default CategoryDetail