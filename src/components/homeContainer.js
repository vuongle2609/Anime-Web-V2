import HomeSlider from './homeSlider'
import HomeContent from './homeContent'
import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      localStorage.removeItem(`data${i}`)
    }
    document.querySelector('.box-nav').classList.add('active');

    return () => {
      document.querySelector('.box-nav').classList.remove('active');
    }
  }, [])

  return (
    <div className="grid wide body home">
      <HomeSlider />
      
      <HomeContent type="0" text="What's New"/>

      <HomeContent type="1" text="Coming Soon"/>
    </div>
  );
}

export default Home;
