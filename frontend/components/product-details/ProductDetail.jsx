import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { IPFS_URL } from "../../constants";

export default function ProductDetail({
  productId,
  metadata,
  price,
  quantity,
  children,
}) {
  const [parsedMetaData, setParsedMetaData] = useState({});
  useEffect(() => {
    const fetchMetaData = async () => {
      const data = await fetch(`${IPFS_URL}${metadata}`);
      const JSONData = await data.json();
      setParsedMetaData(JSONData);
    };
    fetchMetaData();
  }, []);
  return (
    <>
      {!parsedMetaData ? (
        "loading..."
      ) : (
        <div className="mt-6 p-2 bg-white shadow-lg">
          <div className="md:grid grid-cols-2">
            <div className="">
              <img
                className=" py-5 mx-auto"
                src={`${IPFS_URL}${parsedMetaData?.imageURL}`}
                alt={parsedMetaData?.title}
              />
            </div>
            <div className="flex flex-col justify-around p-7">
              <div className="space-y-5">
                <p className="md:text-6xl text-4xl font-bold text-blue-500">
                  {parsedMetaData?.title}
                </p>
                <p className="text-gray-600">{parsedMetaData?.description}</p>
                <p className="text-gray-600 text-3xl">
                  Total Quantity Available : {quantity} Units
                </p>
                <p className="font-bold md:text-4xl text-3xl text-green-500 flex items-center gap-x-1.5">
                  <span className="text-gray-600 text-xl">Price :</span>
                  <FaEthereum className="text-[#3c3c3d]" />
                  {price} Ether
                </p>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
