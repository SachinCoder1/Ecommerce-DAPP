import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { IPFS_URL } from "../../constants";
import { MainContext } from "../../context/MainContext";
import Modal from "../../subcomponents/modal/Modal";

export default function ProductDetail({
  updateProduct,
  productId,
  metadata,
  price,
  quantity,
  quantityInput,
  setQuantityInput,
  open,
  setOpen,
  children,
}) {
  const { isAdmin } = useContext(MainContext);
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
                <p className="text-gray-600 md:text-3xl text-xl gap-x-1 flex items-center">
                  Total Quantity Available : {quantity} Units
                  {isAdmin() && (
                    <span>
                      <Modal
                        open={open}
                        setOpen={setOpen}
                        text={parsedMetaData.title}
                      >
                        <div className="flex w-full text-center flex-col space-y-5">
                          <Typography
                            variant="lead"
                            color="black"
                            className="text-center"
                          >
                            Current Quantity : {quantity}
                          </Typography>

                          <Input
                            name="quantity"
                            type="number"
                            value={quantityInput}
                            onChange={(e) => {
                              setQuantityInput(e.target.value);
                            }}
                            label="Enter New Quantity"
                          />
                          <Button
                            onClick={() => updateProduct()}
                            className="flex items-center justify-center text-base gap-x-2 bg-primary"
                            fullWidth
                            disabled={!quantityInput.length}
                          >
                            Update Now
                            <AiOutlineArrowRight className="text-2xl" />
                          </Button>
                        </div>
                      </Modal>
                    </span>
                  )}
                </p>
                <p className="mb-5 font-bold md:text-4xl text-3xl text-primary flex items-center gap-x-1.5">
                  <span className="text-gray-600 text-xl">Price :</span>
                  <FaEthereum className="text-[#3c3c3d]" />
                  {price} Ether
                </p>
              </div>
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
