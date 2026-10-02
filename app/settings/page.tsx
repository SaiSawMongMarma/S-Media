import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";

const Page = () => (
  <div className="flex gap-6 pt-6">
    <div className="hidden lg:block lg:w-[22%] xl:w-[20%]"><LeftMenu type="profile" /></div>
    <main className="w-full lg:w-[48%] xl:w-[50%]">
      <div className="p-6 bg-white rounded-lg shadow-md"><h1 className="text-xl font-semibold">Settings</h1><p className="mt-2 text-sm text-gray-500">Manage your profile from the profile card.</p></div>
    </main>
    <div className="hidden lg:block lg:w-[30%]"><RightMenu /></div>
  </div>
);

export default Page;
