import React from 'react';
import lotus from '../assets/draupadi_logo.png';
import DetailFormNew from '../components/DetailFormNew';
import ShareBox from '../components/ShareBox';
import Article from '../components/Article';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className='bg-[#f5f5f5] flex flex-col items-center h-screen w-full'>
      <img src={lotus} alt='draupadi-logo' className='w-52' />
      <div className='flex flex-col-reverse sm:flex-row justify-between'>
        <div className='w-full h-full sm:w-1/8 p-4 sm:p-10'>
          <Article heading={`Draupadi`} content={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, cupiditate? Fuga et earum minima ut, doloribus numquam maxime est provident animi totam qui.`} />
          <Article heading={`Contact Us`} content={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, cupiditate? Fuga et earum minima ut, doloribus numquam maxime est provident animi totam qui.`} />
          
        </div>
        <div id='form' className='flex flex-col items-center sm:mt-0 mt-16 sm:p-10 w-full sm:w-3/4'>
          <h1 className='font-bold'>Help Us Being a Hand to Someone in Danger</h1>
          <DetailFormNew />
          <ShareBox />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;