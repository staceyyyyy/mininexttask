import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Image from 'next/image'
function idMenu({ menu }) {
    const router = useRouter()
    // console.log("rouM",router.query)
    return (
        <div className={styles.main}>
          <a href="/" className={styles.ref}>Back to Menu</a>
          <div className={styles.container}>
            {menu.map((name)=> (
              <div className={styles.grid} className={`${styles.card} ${styles.detail}`} key={name.idMeal}>
                <h2>{name.strMeal}</h2>
                <Image 
                  src={name.strMealThumb}
                  width={300}
                  height={300}
                />
                <h5>Category: {name.strCategory}</h5>
                <h3>How to:</h3>
                <p>{name.strInstructions}</p>
                <iframe 
                  src={`https://www.youtube.com/embed/${name.strYoutube.split("=")[1]}`}
                  frameBorder="0"
                  width="500"
                  height="500"
                />
              </div>
            ))}
            </div>
        </div>
    )
}
export async function getServerSideProps (ctx) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ctx.params.idMenu}`) 
  const datas = await res.json()
  // console.log("data",datas.meals)
  return { 
    props : { menu : datas.meals}
  }
}

export default idMenu