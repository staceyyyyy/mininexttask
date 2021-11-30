import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery, gql } from '@apollo/client'
import {
  Tooltip,Grid,Box,Chip,Button,
  AppBar,Container,Toolbar,Menu,MenuItem,Avatar,
  IconButton,Typography
} from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Navbar from './component/Navbar'

// import { withAppolo } from '../lib/apollo'
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
      console.log("fr",res.categories.items[0].children)
      console.log(res)
  return (
    <div>
      <Head>
      <title>E-COMMERCE</title>
     </Head>
     <Navbar/>  
      {/* <AppBar position="static"style={{ background: '#e2b5bb'}}>
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
                <IconButton sx={{ p: 0 }}>
                  <ShoppingCart style={{color: "white"}} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}
      <Container fixed style={{textAlign: "center"}}>
        <Typography variant="h3" component="div" gutterBottom>
        NEXT JS MINI APP PROJECT
        </Typography>
      </Container>
    </div>

      // {/* <Head>
      //   <title>E-COMMERCE</title>
      // </Head>
      //   <main className={styles.main}>
      //   <h1 className={styles.title}>
      //     NEXT MINI APP
      //   </h1>
      //   {res.categories.items[0].children.map((category,index) => 
      //     (
      //       <div key={index}>
      //     <ListItemButton  key={category.id}>
      //       <Link href={`/post/${category.id}`}>
      //       <ListItemText primary={category.name} />
      //       </Link>
      //     </ListItemButton>
      //        </div>
      //     ))
      //   }
      // </main>*/}
  ) 
}
export default Home