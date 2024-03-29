import Layout from "@/components/layout";
import Head from "next/head";
import Card from "@/components/card";
import { getAllEvents } from "@/utils/events";
import styles from "@/styles/Home.module.scss";

export default function Home({ eventData }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Benvenuti nel mio blog</h1>

        {eventData.map((event) => (
          <Card data={event} key={event.uuid} />
        ))}
      </Layout>
    </>
  );
}

export const getStaticProps = () => {
  const eventData = getAllEvents();

  return {
    props: {
      eventData,
    },
  };
};
