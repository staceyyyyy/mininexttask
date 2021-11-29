import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery, gql } from '@apollo/client'
// import { withAppolo } from '../lib/apollo'

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

function Home({ posts }) {
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
        <main className={styles.main}>
        <h1 className={styles.title}>
          NEXT MINI APP
        </h1>
        <p className={styles.description}>
          Created by:<code className={styles.code}>Stacey</code>
        </p>
        {res.categories.items[0].children.map((category,index) => 
          (
            <div key={index}>
              <p>
                {category.name}
              </p>
            </div>
          ))
        }
        <div className={styles.container}> 
          {/* {posts.map((post)=> (
            <Link href={`/post/${post.strCategory}`} key={post.idCategory}>
            <div className={styles.grid} className={styles.card}>
              <h2>{post.strCategory}</h2>
              <Image 
                src={post.strCategoryThumb}
                width={300}
                height={300}
              />
            </div>
              </Link>
          ))} */}
        </div>
      </main>
    </div>
  )
}
// export async function getServerSideProps() {
//   const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//   const data = await res.json()
//   // console.log("data",data)
//   return {
//     props: { posts: data.categories }, // will be passed to the page component as props
//   }
  
// }

export default Home