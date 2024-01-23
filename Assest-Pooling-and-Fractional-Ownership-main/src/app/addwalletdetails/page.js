"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();

  useEffect(() => {

  }, []);


  const [data, setdata] = useState({
    useremail: "",
    walletaddress: "",
  });
  const onchange = (e) => {
    let APFOS_useremail = localStorage.getItem("APFOS_useremail");
    let val = e.target.value;
    if (validateMetaMaskAddress(val)) {
      setdata({
        useremail: APFOS_useremail,
        walletaddress: val,
      });
    } else {
      toast.error("Invalid MetaMask Wallet Address", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  };
  const validateMetaMaskAddress = (address) => {
    // Regular expression to validate MetaMask wallet address format
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addwalletaddress`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.status === 200) {
      toast.success("Wallet Address Add Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/");
    } else if (response.status === 201) {
      toast.error("Invalid Format", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Empty Field", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setdata({
      useremail: APFOS_useremail,
      walletaddress: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-wrap lg:py-0">
      <div className="mb-6 md:mb-0 flex flex-row justify-center my-2">
        <p className="text-2xl text-center text-white font-bold ml-3 bg-red-500 w-auto h-auto py-1 -2">
          <span className=" bg-black text-white px-2 py-1">Bluechip</span> Art{" "}
        </p>
      </div>
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            MetaMask Wallet Details
          </h1>

          <form className="space-y-4 md:space-y-6" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Enter Wallet Address
              </label>
              <input
                onChange={(e) => onchange(e)}
                type="text"
                name="walletaddress"
                id="walletaddress"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="0x12r45... 6HJ9"
                required=""
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
