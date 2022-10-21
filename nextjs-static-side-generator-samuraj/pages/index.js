import Link from "next/link";

import axios from "../helpers/axios";

import styles from "../styles/Home.module.css";
// bem-css-modules

export default function Home({ heroes, isRequestFailed }) {
  if (isRequestFailed) {
    return <p>Oops something went wrong...</p>;
  }

  const heroesElements = heroes.map((hero) => (
    <HeroElement key={hero.id} {...hero} />
  ));

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>HERO ENCYCLOPEDIA</h1>
      <ul className={styles["hero-list"]}>{heroesElements}</ul>
    </div>
  );
}

function HeroElement({ id, name, url }) {
  return (
    <li className={styles["hero-list__element"]}>
      <Link href={`/hero/${id}`}>
        <a className={styles["hero-list__link"]}>
          <img
            alt={`Photo of ${name}`}
            className={styles["hero-list__image"]}
            src={url}
          />
          <p className={styles["hero-list__name"]}>{name}</p>
        </a>
      </Link>
    </li>
  );
}

export async function getStaticProps() {
  const { data, status } = await axios.get("/search/a");

  if (status !== 200) {
    return {
      props: {
        isRequestFailed: true,
      },
    };
  }

  const { results } = data;
  const heroes = results.map(({ id, name, image: { url } }) => ({
    id,
    name,
    url,
  }));

  return {
    props: {
      heroes,
      isRequestFailed: false,
    },
  };
}
