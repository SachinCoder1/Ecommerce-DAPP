import Head from "next/head";
import Particles from "react-tsparticles";
import tsConfig from "../../configs/tsConfig.json";
import { loadFull } from "tsparticles";

export default function TsParticles() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="bg-black min-h-screen">
      <Particles init={particlesInit} options={tsConfig} />
    </div>
  );
}
