import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useEffect } from "react";
import crawler from "../helper/crawler";
import run from "../helper/three";
import styles from "../styles/name.module.css";

type Props = {
  data: CommitData[];
  name: string;
};

const VisulaizerPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data, name }) => {
  const total = data.reduce((acc, v) => acc + v.count, 0);
  const activeDays = data.filter((v) => v.count > 0).length;

  useEffect(() => {
    run(data);
  }, []);
  return (
    <div>
      <h1 className={styles.name}>@{name}</h1>
      <h1 className={styles.commits}>
        {total.toLocaleString()} commits
        <br />
        {activeDays}D
      </h1>
      <a className={styles.search} href="/">
        Search
      </a>
    </div>
  );
};

export default VisulaizerPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  try {
    const name = String(context?.query?.name);
    const data = (await crawler(name)) as CommitData[];
    return {
      props: {
        data,
        name,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
