import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import FinalDefenseModal from "../components/Modal/FinalDefenseModal";
import PreDefense from "../components/Modal/PreDefense";
import DefaultLayout from "../layout/DefaultLayout";

const SchedulePage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Project Schedule" />
            <div className=" bg-base-200 dark:bg-black  py-10 px-0 lg:px-10">
                <div className="hero-content flex-col  lg:flex-row-reverse lg:justify-between">
                    <div>
                        <h1 className="text-center text-xl mb-2">Teacher Name</h1>
                        <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                    </div>
                    <div className="pl-10">
                        <h1 className="text-4xl font-bold">Project Name</h1>
                        <p className="py-6 text-2xl">Submit Pre Defense</p>
                        <button onClick={() => {
                            const modal = document.getElementById('pre_defense_modal') as HTMLDialogElement | null;
                            if (modal) {
                                modal.showModal();
                            }
                        }} className="btn btn-primary">Click Here</button>

                        <div className="mt-5">

                            <p className="py-6 text-2xl">Submit Final Defense</p>
                            <button
                                onClick={() => {
                                    const modal = document.getElementById('final_defense_modal') as HTMLDialogElement | null;
                                    if (modal) {
                                        modal.showModal();
                                    }
                                }}

                                className="btn btn-primary">Click Here</button>
                        </div>
                    </div>

                </div>
            </div>

            <PreDefense />
            <FinalDefenseModal />
        </DefaultLayout>






    );
};

export default SchedulePage;