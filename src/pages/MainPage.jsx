import HeatMap from '../components/HeatMap';
import PerformanceChart from '../components/PerformanceChart';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

const MainPage = () => {
  return (
    <main className="bg-[#eee] flex gap-[2px]">
      {/* SideBar */}
      <SideBar />
      <div className="w-full ml-[82px] h-screen">
        <TopBar />
        <div className="px-4 pt-3 pb-6">
          <PerformanceChart />
          {/* <HeatMap /> */}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
