import HomeSlider from './sliderhome'
import HomeNews from './homenews'
import HomeComing from './homecoming'

function Home() {
  return (
    <div className="grid wide body home fade-in-top">
      <HomeSlider />
      
      <HomeNews />

      <HomeComing />
    </div>
  );
}

export default Home;
