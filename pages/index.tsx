import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../helper/Home.module.css";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <Head>
        <title>Commit 3D</title>
        <meta name="description" content="visualize your commits 3d" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Commit 3D" />
        <meta property="og:description" content="visualize your commits 3d" />
        <meta
          property="og:image"
          content="https://puppeteer-screenshot-demo.vercel.app/api/screenshot?page=https://commit-3d.vercel.app/lee-donghyun&isDev=false"
        />
      </Head>
      <div>
        <h1 className={styles.logo}>Commit 3D</h1>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              location.pathname = encodeURIComponent(name);
            }}
          >
            <label htmlFor="name">enter your github name : </label>
            <input
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
