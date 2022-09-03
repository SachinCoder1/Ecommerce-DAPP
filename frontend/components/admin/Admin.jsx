import React, { useState } from "react";
import {
  CONTRACT_ADDRESS,
  IPFS_URL,
  PROJECT_ID,
  PROJECT_SECRET,
} from "../../constants";
import EcomABI from "../../constants/Ecommerce.json";
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
// import TsParticles from "../../subcomponents/particles-ts/TsParticles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";

export default function Admin() {
  /* IPFS Authentication ------------------------------------------------------------------ */

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
      toast.success("Product Image Uploaded!");
      setFile(url);
    } catch (error) {
      console.log("Error...", error);
      toast.error("Error While uploading Image, Try Again");
    }
  };

  const handleClick = async () => {
    const { title, description, price, qunatity } = formData;
    if (!title || !description || !file || !price || !qunatity || !category) {
      toast.error("Some Feilds Are Missing");
      return;
    }

    try {
      const metadata = {
        title,
        description,
        imageURL: file,
      };
      const stringifyData = JSON.stringify(metadata)

      const add = await client.add(stringifyData);
      const url = `${add.path}`;
      toast.success("Product Data Uploaded!");
      console.log("Meta Data URL -> ", url)

      const amountInWEI = ethers.utils.parseEther(price);
      console.log("amount in wei -> ", amountInWEI)

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        EcomABI.abi,
        signer
      );

      const productData = await contract.addProduct(
        amountInWEI,
        qunatity,
        url,
        category
      );
      await productData.wait();
      toast.promise(productData.wait(), {
        pending: "Wait...",
        success: "Product Successfully Added👌",
        error: "Some Error Occured. 🤯",
      });

      if (productData.to) {
        setFormData({ title: "", description: "", price: "", qunatity: "" });
        setFile("");
        setCategory("");

    //  router.push("/pastcampigns");
      }
    } catch (error) {
      console.log("error... ", error);
      toast.error("Error occured. Please try Again.");
    }
  };

  return (
    <div className="flex justify-center py-14 px-5">
      {/* <TsParticles /> */}
      <ToastContainer autoClose={2500} />

      <div className="md:w-3/6 space-y-10 text-white">
        <Input
          // color="green"
          variant="outlined"
          name="title"
          onChange={handleInputChange}
          label="Product Title"
          value={formData.title}
        />
        <Textarea
          //   color="green"
          variant="outlined"
          onChange={handleInputChange}
          label="Product Description"
          name="description"
          value={formData.description}
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
        <Input
          //   color="green"
          variant="outlined"
          size="lg"
          name="qunatity"
          onChange={handleInputChange}
          label="Total Quantity Of Product"
          value={formData.qunatity}
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
            name="price"
            onChange={handleInputChange}
            label="Product Price"
          />
          <Select
            // color="green"
            variant="outlined"
            onChange={(e) => setCategory(e)}
            label="Proeduct Category"
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
          onClick={handleClick}
        >
          <MdAddTask className="text-xl text-white" />
          Create Product
        </Button>
      </div>
    </div>
  );
}