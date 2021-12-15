import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useQuery, gql } from '@apollo/client'
import Navbar from './component/Navbar'
import {CircularProgress,Typography} from '@mui/material';
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

function Home() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
    const res = data
    if (loading) return <CircularProgress />
    if (error) return <p>Error :(</p>;
      console.log("fr",res.categories.items[0].children)
      console.log(res)
  return (
    <div>
      <Head>
        <title>E-COMMERCE</title>
      </Head>
      <Navbar/>  
      <div className={styles.pageContainer}>
      <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
          alt="img"
          width="500px"
          height="800px"
        />
        <Typography variant="h1" component="div" gutterBottom className={styles.type}>
          Find the best you
        </Typography>
      </div>
    </div>
  ) 
}
export default Home