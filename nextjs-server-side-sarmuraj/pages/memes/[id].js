import { useRouter } from "next/router";

export default function Mem({ mem: { name, url } }) {
  // console.log("Jestem na froncie");
  // console.log(mem);
  const { back } = useRouter();
  return (
    <>
      <h1>Mem</h1>
      <p>
        <button onClick={() => back()}>Powrót</button>
      </p>
      <p>
        <img src={url} alt={`Mem ${name}`} />
      </p>
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log("Jestem na backendzie");
  const { id } = context.params;
  const response = await fetch("https://api.imgflip.com/get_memes");
  const { data, success } = await response.json();

  if (!success) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const mem = data.memes.find((mem) => mem.id === id);

  return {
    props: {
      mem,
    },
  };
}
