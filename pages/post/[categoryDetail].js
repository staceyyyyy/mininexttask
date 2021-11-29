import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

function CategoryDetail({ detail }) {
    const router = useRouter()
    // console.log("detail",detail)
    // console.log("r",router.query.categoryDetail)
    return (
        <div className={styles.main}>
          <h1>All {router.query.categoryDetail} Menu</h1>
          <a href="/" className={styles.ref}>Back to Menu</a>
          <div className={styles.container}>
            {detail.map((menu)=> (
              <Link href={`/post/menu/${menu.idMeal}`} key={menu.idMeal}>
                <div className={styles.grid} className={styles.card} key={menu.idMeal}>
                  <h2>{menu.strMeal}</h2>
                  <Image 
                  src={menu.strMealThumb}
                  width={300}
                  height={300}
                />
                </div>
              </Link>
            ))}
            </div>
        </div>
    )
}
export async function getServerSideProps (ctx) {
  // console.log("ctxparamMenu",ctx.params)
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ctx.params.categoryDetail}`) 
  const datas = await res.json()
  // console.log("datas",datas.meals)
  return { 
    props : { detail: datas.meals }
  }
}

export default CategoryDetail