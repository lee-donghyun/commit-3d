import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useEffect } from "react";
import crawler from "../helper/crawler";
import run from "../helper/three";
import styles from "../helper/Name.module.css";
import Head from "next/head";

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
      <Head>
        <title>{name}</title>
        <meta name="description" content="visualize your commits 3d" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content="visualize your commits 3d" />
        <meta
          property="og:image"
          content={`https://puppeteer-screenshot-demo.vercel.app/api/screenshot?page=https://commit-3d.vercel.app/${encodeURIComponent(
            name
          )}&isDev=false`}
        />
      </Head>
      <h1 className={styles.name}>@{name}</h1>
      <h1 className={styles.commits}>
        {total.toLocaleString()} commits
        <br />
        {activeDays}D
      </h1>
      <div className={styles.search}>
        <button
          className={styles.button}
          onClick={() => {
            location.pathname = "/";
          }}
        >
          Search
        </button>
        <button className={styles.button + " rotater"}>Rotate</button>
      </div>
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
