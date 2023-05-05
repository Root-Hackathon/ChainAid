import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ethers } from "ethers";
import RingSpinner from "../../components/loaders/ringSpinner";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/WalletAuthWrapper";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";

const Supporter: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [provider, setProvider] = useState<Web3Provider>();

  const [loading, setLoading] = useState(false);

  const { contract } = useContext(WalletAuthContext) as WalletAuthContextType;
  const checkIfWalletIsConnected = async (): Promise<number | undefined> => {
    return provider?.listAccounts().then((accounts) => {
      if (accounts.length > 0) {
        console.log(`Wallet is connected with address: ${accounts[0]}`);
        return 1;
      } else {
        console.log("Wallet is not connected");
        return 0;
      }
    });
  };
  useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      // window.ethereum is defined
      setProvider(
        new ethers.providers.Web3Provider(
          window.ethereum as unknown as ExternalProvider,
        ),
      );
    } else {
      // window.ethereum is undefined
      console.log();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let walletConnected = await checkIfWalletIsConnected();
    if (walletConnected == 1) {
      setLoading(true);
      console.log("hi");
    } else {
      alert("Connect to wallet!");
    }

    // if (contract) {
    //   await contract.addOrg(name,email,contact,website, {
    //     value: ethers.utils.parseEther("0.1"),
    //   });
    // }

    setLoading(false);
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
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            required
            className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            maxLength={100}
          />
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
            }}
            placeholder="Contact"
            required
            className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            maxLength={100}
          />

          <input
            id="value"
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Deposit value"
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
            {loading ? (
              <div className="ml-2">
                Creating <RingSpinner width={20} color="white" />
              </div>
            ) : (
              <div>Create</div>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Supporter;
