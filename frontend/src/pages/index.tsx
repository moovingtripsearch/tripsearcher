import React from 'react';
import Image from 'next/image';
import background from '../../public/assets/background.jpg'
import WelcomePage from '../components/Welcomepage/WelcomePage';

const HomePage: React.FC = () => {
  return (
    <main>
      <div className='absolute -z-10 w-full'>
        <Image 
            src={background} alt='background image' className='w-full' width={1000} height={1000} />
      </div>
      <div>
        <WelcomePage />
      </div>
    </main>
  );
};

export default HomePage;