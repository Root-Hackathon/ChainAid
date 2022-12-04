import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import RingSpinner from "../../components/loaders/ringSpinner";

const Organization: FC = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <>
      <Head>
        <title>New Organization | ChainAid</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <form
          className="p-10 max-w-xl mx-auto flex flex-col items-center text-black"
          onSubmit={handleSubmit}
        >
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            required
            className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            maxLength={100}
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-3 flex items-center bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md ${
              loading ? "bg-opacity-70" : ""
            }`}
          >
            Create
            {loading ? (
              <div className="ml-2">
                <RingSpinner width={20} color="white" />
              </div>
            ) : (
              ""
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Organization;
