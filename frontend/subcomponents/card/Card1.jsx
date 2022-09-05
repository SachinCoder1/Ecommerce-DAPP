import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaEthereum } from "react-icons/fa";
import { BsPersonCheckFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import Link from "next/link";
import { timeConverter } from "../../utils/DateConverter";
import { useRouter } from "next/router";
import { IPFS_URL } from "../../constants";
import { useContext, useState, useEffect } from "react";
import { MainContext } from "../../context/MainContext";

export default function Card1({ metadata, price, publishedDate, productId, selectedCategory }) {
  const router = useRouter();
  const { isAdmin } = useContext(MainContext);
  const [parsedMetaData, setParsedMetaData] = useState({})
  useEffect(() => {

    const fetchMetaData = async() => {
        const data = await fetch(`${IPFS_URL}${metadata}`);
        const JSONData = await data.json();
        setParsedMetaData(JSONData);
    } 
    fetchMetaData();
    
  }, [price, selectedCategory])
  
  return (
    <Card className="w-96 cursor-pointer md:hover:scale-105 transition-all hover:shadow-xl">
      <CardHeader floated={false} className="h-56">
        <Link href={`/${productId}`}>
          <img src={`${IPFS_URL}${parsedMetaData?.imageURL}`} alt={parsedMetaData?.title} />
        </Link>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {parsedMetaData?.title}
        </Typography>
        {/* <Typography>{description.slice(0, 80)}...</Typography> */}
      </CardBody>

      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography className="flex items-center gap-x-1" variant="lead">
          <FaEthereum className="text-[#3c3c3d]" /> {price} ETH
        </Typography>
        {/* <Typography 
            variant="small"
            color="gray"
            className="flex gap-1 items-center"
          >
            <BsPersonCheckFill />
            {address && address.slice(0, 6)}...{address.slice(address.length - 4)}
          </Typography> */}
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">
          <Button
            onClick={() => router.push(`/${productId}`)}
            className="bg-primary px-8 flex items-center gap-x-2"
          >
            View <AiOutlineArrowRight className="text-lg" />
          </Button>
        </Typography>
        {isAdmin() && (
          <Typography
            variant="small"
            color="gray"
            className="flex gap-1 items-center"
          >
            <MdDateRange />
            {timeConverter(publishedDate)}
          </Typography>
        )}
      </CardFooter>
    </Card>
  );
}
