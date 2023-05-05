import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css"
export default function Home() {
  
  return (
    <>
      <Head>
        <title>ChainAid</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      
      <div className={styles.heroText}>
          <h1>ChainAssist</h1>
          <p className={styles.tagline}>Easy support with easy pay</p>
          {/* <button className={styles.tryBtn}>Try Demo --""> </button> */}
          
      
      </div>
        
   
        
      </main>
    </>
  );
}
