

"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "../../../../css/BuyAssestList.css";

export default function Main() {
  const router = useRouter();

  const [portfoliodata, setportfoliodata] = useState("");
  let total = 0;
  const fetchdata = async () => {
    let APFOS_useremail = localStorage.getItem("APFOS_useremail");
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/portfolio/Assest/SellAssestList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: APFOS_useremail }),
    });
    const response = await res.json();
    setportfoliodata(response.error);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="mx-auto m-4 md:m-8 md:px-16 px-2 h-screen">
      <h1 className="mx-auto bg-white p-2 rounded w-fit text-3xl font-semibold mb-4">
        All Assets
      </h1>
      <div className=" bg-white shadow-md rounded-lg md:overflow-hidden overflow-scroll">
        <div className="relative overflow-x-auto overflow-y-hidden">
          <table className="w-full px-4 text-md text-left  text-black ">
            <thead className="text-md text-white uppercase bg-blue-400 ">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Asset Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Invest Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Current Price                </th>
                <th scope="col" className="px-6 py-3">
                  Sell Price
                </th>
              </tr>
            </thead>
            <tbody>
              {portfoliodata &&
                portfoliodata.map((data) => (
                  <tr key={data._id} className="bg-white border-b ">
                    <td
                      scope="row"
                      className="px-6 py-4  text-gray-900 whitespace-nowrap "
                    >

                      <p className="text-lg font-semibold">
                        {data.AssestTitle}
                      </p>
                      <p className="text-gray-500">
                        Lorem ipsum dolor sit amet
                      </p>

                    </td>
                    <td className="px-6 py-4">{data.OrginalBuyPrice}</td>
                    <td className="px-6 py-4">
                      {data.AssestBuyPrice}
                    </td>

                    <td className="px-6 py-4">
                      {data.SellPrice}
                    </td>
                  </tr>
                ))}

              <tr className="bg-white border-b ">
                <td className="px-6 py-4">
                  <p className="text-lg font-semibold">
                    Assets:{portfoliodata && portfoliodata.length}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {portfoliodata && portfoliodata.forEach(element => {
                    total += parseFloat(element.OrginalBuyPrice);
                  })}
                  <p className="text-lg font-semibold">Total Assets Sell Price:{total}</p>
                </td>

                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
