'use client'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();
  const user = useSelector((state) => state.user);

  return (
    <div>
      
    </div>
  );
};

export default Home;
