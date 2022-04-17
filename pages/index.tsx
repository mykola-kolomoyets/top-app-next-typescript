import Head from "next/head";
import Image from "next/image";

import { Typography } from "../components";
import { HeaderTag } from "../utils/enums";

export default function Home() {
  return <Typography.Header tag={HeaderTag.h1}>Hello world</Typography.Header>;
}
