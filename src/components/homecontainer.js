import HomeSlider from './homeSlider'
import HomeContent from './homeContent'

function Home() {
  for (let i = 0; i < 2; i++) {
    localStorage.removeItem(`data${i}`)
  }

  return (
    <div className="grid wide body home">
      <HomeSlider />
      
      <HomeContent type="0" text="What's New"/>

      <HomeContent type="1" text="Coming Soon"/>
    </div>
  );
}

export default Home;
