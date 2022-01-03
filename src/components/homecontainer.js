import HomeSlider from './sliderhome'
import HomeNews from './homenews'
import { useLocation } from "react-router-dom";
import HomeComing from './homecoming'

function Home() {
  let location = useLocation()
  console.log(location)
  
  return (
    <div className="grid wide body home fade-in-top">
      <HomeSlider />
      
      <HomeNews />

      <HomeComing />
    </div>
  );
}

export default Home;
