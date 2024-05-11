import { useForm } from "react-hook-form";
;
const FinalDefenseModal = () => {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data: any) => {
        console.log(data);

        // const userData = {
        //   name: data.name,
        //   email: data.email,
        //   card_id: data.card_id,
        //   password: data.password
        // }
        // api
        //   .post("/create-student", userData)
        //   .then((res: any) => {
        //     console.log(res);
        //     if (res.status === 200) {
        //       toast.success("Create User Successfully");
        //       reset()
        //     }
        //   })
        //   .catch((err: any) => {
        //     console.log(err);
        //     toast.error("Please try again");
        //   });
    }



    return (
        <>
            {/* <button className="btn" onClick={openModal}>Open Modal</button> */}
            <dialog id="final_defense_modal" className="modal">
                <div className="modal-box dark:bg-black">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Project Link
                            </label>
                            <input
                                {...register("project", {
                                    required: "Project Link is required",
                                })}
                                type="text"
                                placeholder="Title"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {errors.project && (
                                <p className="text-red-500 text-xs mt-1">{errors.project.message as React.ReactNode}</p> // Explicitly cast to ReactNode
                            )}
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Project Report Link
                            </label>
                            <input
                                {...register("report", {
                                    required: "Project Report is required",
                                })}
                                type="text"
                                placeholder="Object"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {errors.report && (
                                <p className="text-red-500 text-xs mt-1">{errors.report.message as React.ReactNode}</p> // Explicitly cast to ReactNode
                            )}
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                PPT Link
                            </label>
                            <input
                                {...register("ppt", {
                                    required: "PPT is required",
                                })}
                                type="text"
                                placeholder="PPT"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {errors.ppt && (
                                <p className="text-red-500 text-xs mt-1">{errors.ppt.message as React.ReactNode}</p> // Explicitly cast to ReactNode
                            )}
                        </div>




                        <div className="mb-5">
                            <input
                                type="submit"
                                value="Submit"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                            />
                        </div>
                    </form>

                </div>
            </dialog>
        </>
    );
};

export default FinalDefenseModal;
