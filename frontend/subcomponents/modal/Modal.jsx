import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Modal({ text, open, setOpen, children }) {
//   const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button size="small" className="text-base" variant="text" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>{text}</DialogHeader>
        <DialogBody divider>{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className=""
          >
            <span>Cancel</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
