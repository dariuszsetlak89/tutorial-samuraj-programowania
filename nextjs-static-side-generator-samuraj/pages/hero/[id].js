import { useRouter } from "next/router";

import axios from "../../helpers/axios";

export default function Hero({ image, name, powerstats }) {
  const { isFallback } = useRouter();
  const { combat, durability, intelligence, power, speed, strength } =
    powerstats;
  const { back } = useRouter();

  if (isFallback) {
    return <p>Data is loading...</p>;
  }
  return (
    <>
      <h1>Hero {name}</h1>
      <img alt={`Photo of ${name}`} src={image.url} />
      <h2>Hero stats</h2>
      <p>combat: {combat}</p>
      <p>durability: {durability}</p>
      <p>intelligence: {intelligence}</p>
      <p>power: {power}</p>
      <p>speed: {speed}</p>
      <p>strength: {strength}</p>
      <p>
        <button onClick={back}>Back</button>
      </p>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get("/search/a");
  const { results } = data;
  const paths = results.map(({ id }) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(`/${params.id}`);

  return {
    props: {
      ...data,
    },
  };
}
