import { useRouter } from "next/router";

export default function PageNotFound() {
  const { back } = useRouter();

  return (
    <p>
      <p>
        Oops something went wrong... Back to previous page
        <button onClick={back}>Back</button>
      </p>
    </p>
  );
}
