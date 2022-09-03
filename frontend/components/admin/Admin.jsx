import React, { useState } from "react";
import { IPFS_URL } from "../../constants";
import { categories } from "../../data";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { MdAddTask } from "react-icons/md";
import {
  Input,
  Textarea,
  Select,
  Option,
  Button,
  IconButton,
} from "@material-tailwind/react";
import TsParticles from "../../subcomponents/particles-ts/TsParticles";

export default function Admin() {
  /* IPFS Authentication ------------------------------------------------------------------ */

  // env variables --
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
  const PROJECT_SECRET = process.env.NEXT_PUBLIC_PROJECT_SECRET;

  const auth =
    "Basic " +
    Buffer.from(PROJECT_ID + ":" + PROJECT_SECRET).toString("base64");

  // IPFS Client --
  const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  /* Use States ------------------------------------------------------------------ */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    qunatity: "",
  });
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");

  // on change of any input.
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When image is changed.
  const onChangeFiles = async (e) => {
    const fileData = e.target.files[0];
    try {
      const add = await client.add(fileData, {
        progress: (prog) => console.log("Image is uploaded : ", prog),
      });
      const url = `${add.path}`;
      setFile(url);
    } catch (error) {
      console.log("Error...", error);
    }
  };

  return (
    <div className="flex justify-center py-14 px-5">
      <TsParticles />

      <div className="md:w-3/6 space-y-10 text-white">
        <Input
          // color="green"
          variant="outlined"
          name="title"
          onChange={handleInputChange}
          label="Product Title"
        />
        <Textarea
          //   color="green"
          variant="outlined"
          onChange={handleInputChange}
          label="Description (max:300 characters)"
          name="description"
        />
        <Input
          //   color="green"
          variant="outlined"
          size="lg"
          type="file"
          name="image"
          onChange={onChangeFiles}
          label="Select Image"
        />
        <div className="">
          {file && (
            <img
              className="rounded-xl mt-4 mb-10 w-96"
              src={`${IPFS_URL}${file}`}
              alt="Choosen image"
            />
          )}
        </div>
        <div className="flex gap-x-4 w-full justify-center">
          <Input
            // color="green"
            variant="outlined"
            name="amount"
            onChange={handleInputChange}
            label="Required Amount"
          />
          <Select
            // color="green"
            variant="outlined"
            onChange={(e) => setCategory(e)}
            label="Category"
          >
            {categories?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>
        <Button
          className="flex items-center justify-center gap-x-2 bg-primary"
          fullWidth
          //   onClick={handleClick}
        >
          <MdAddTask className="text-xl text-white" />
          Create Product
        </Button>
      </div>
    </div>
  );
}
