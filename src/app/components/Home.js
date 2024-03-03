"use client";
import react, { useState, useEffect } from "react";
import Slider from "./Slider";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";



const Home = () => {
  const [portfoliodata, setportfoliodata] = useState([]);
  const [dollarPrice, setDollarPrice] = useState(0);
  const [currency, setcurrency] = useState("$")

  const router = useRouter();
  // useEffect(() => {
  //   allportfoliodata();
  // }, []);
  useEffect(() => {
    async function dollarconverter() {
      let Dollarprice = (await fetch("https://api.exchangerate-api.com/v4/latest/USD"));
      let price = await Dollarprice.json()
      setDollarPrice(price.rates["INR"])
    }
    dollarconverter()
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token").toString();
      const decoded = jwtDecode(token);
      console.log(decoded);
      // Check for expired token
      var dateNow = new Date() / 1000;
      if (dateNow > decoded.exp) {
        alert("Your session has been expired.");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        if (decoded.role == "user") {
          allportfoliodata();
        }
        if (decoded.role == "admin") {
          router.push('/dashboard/portfolios');
        }
      }
    }
  }, []);


  const allportfoliodata = async () => {
    // alert("calling ")
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/portfolio/TopPortfolio`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: "",
      }
    );
    const response = await res.json();
    console.log(response.error)
    console.log("completed");
    setportfoliodata(response.error);
  };
  return (
    <div className="min-h-screen flex flex-col justify-start items-center w-auto p-4 md:p-10 overflow-hidden">
      <div className="mx-auto w-full md:w-[60vw] h-auto">
        <Slider />
      </div>
      <div className="flex flex-wrap w-full justify-center items-center">
        <div className="text-center w-full my-2">
          <span className="text-white font-bold text-xl">Top</span>
        </div>
        {portfoliodata &&
          portfoliodata.map((elem, index) => {
            console.log(elem);
            if (index < 6) {
              return (
                <div key={index}>
                <div className="bg-white shadow-md rounded-lg max-w-sm m-2">
                  <Link
                    key={index}
                    href={`/Portfolio/portfoliodetails?pid=${elem._id}`}
                  >
                    <h2 className="m-1 md:m-2 p-1 md:p-3 font-bold text-blue-600 text-3xl">
                      {elem.PortfolioName}
                    </h2>
                  </Link>
                  <div className="m-1 md:m-2 px-4 pb-4 items-center">
                    
                      <span className="block w-full text-center text-sm font-bold  p-1 md:p-2 text-black">Prices</span>
                    <div className="flex flex-row flex-wrap items-center justify-center ">
                      <span className="text-sm font-bold m-1 md:m-2 px-2 py-2 rounded bg-orange-700 text-white">
                        Previous:{currency=="₹"?`₹${elem.PortfolioPrice && elem.PortfolioPrice[0].Price}
                        `:`$${elem.PortfolioPrice && (elem.PortfolioPrice[0].Price / dollarPrice).toFixed(2)}`}
                      </span>
                      <span className="text-sm font-bold m-1 md:m-2 px-2 py-2 rounded bg-green-700 text-white">
                        Current:{currency=="₹"?`₹${elem.PortfolioPrice && elem.PortfolioPrice[0].Price}
                        `:`$${elem.PortfolioPrice && (elem.PortfolioPrice[0].Price / dollarPrice).toFixed(2)}`}
                      </span>
                      <span className="text-sm font-bold m-1 md:m-2 px-2 py-2 rounded bg-pink-700 text-white">
                        Remaining:{currency=="₹"?`₹${Math.round(elem.RemainingPrice)}`
                        :`$${((elem.RemainingPrice) / dollarPrice).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-around my-2 mt-4">
                    <Link href={`/dashboard?pid=${elem._id}`} className="flex w-full items-center justify-center my-2 m-2">
                            <span className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                             View Graph
                            </span>
                          </Link>
                             <Link
                             className="flex w-full items-center justify-center my-2 m-2"
                              onClick={() => {
                                Cookies.set("price", `${elem.Price}`);
                              }}
                              href={`Portfolio/assests/buyassest?pid=${elem._id}`}
                            >
                               <span className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                             Buy
                            </span>
                            </Link>
                          </div>
                    <div className="w-full mx-auto flex justify-center items-end">
                    <button className="m-1 text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-1 px-3 text-center" onClick={()=>setcurrency("$")}>$</button>
                    <button className="m-1 text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-1 px-3 text-center" onClick={()=>setcurrency("₹")}>₹</button>
                    </div>
                  </div>
                </div>
              </div>

              );
            }
          })}
      </div>
    </div>
  );
};

export default Home;
