import Image from 'next/image';
import Featured from './_components/featured';
import Hero from './_components/hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />
    </div>
  );
}
