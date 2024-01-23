"use client";
import Home from "./components/Home";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  useEffect(() => {
    const metamasklogin = async () => {
      try {

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
      } catch (error) {
        alert("install metamask extension")
      }
    };
    // metamasklogin();
  })
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login")
    }
  }, [])
  return (
    <Home />
  )
}
