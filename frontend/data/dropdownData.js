export const categories = [
  { label: "Mobiles", value: "mobile" },
  { label: "Fashion", value: "fashion" },
  { label: "Television", value: "television" },
  { label: "Electronics", value: "electronics" },
  { label: "Laptop", value: "laptop" },
  { label: "Camera", value: "camera" },
  { label: "Toys", value: "toys" },
];

const getPath = (name) => {
  const PATH = "/images/categories/";
  return `${PATH}${name}_img.webp`;
};
export const homePageCategories = [
  {
    imgSrc: getPath("all"),
    text: "All",
    url: "all",
  },
  {
    imgSrc: getPath("mobile"),
    text: "Mobile",
    url: "mobile",
  },
  {
    imgSrc: getPath("clothes"),
    text: "Fashion",
    url: "fashion",
  },
  {
    imgSrc: getPath("television"),
    text: "Electronics",
    url: "electronics",
  },
  {
    imgSrc: getPath("laptops"),
    text: "Laptop",
    url: "laptop",
  },
  {
    imgSrc: getPath("camera"),
    text: "Camera",
    url: "camera",
  },
  {
    imgSrc: getPath("toys"),
    text: "Beauty, Toys & More",
    url: "toys",
  },
];
