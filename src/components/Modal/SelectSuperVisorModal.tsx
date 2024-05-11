import { useState } from "react";
import { MdOutlineSupervisorAccount } from "react-icons/md";
const SelectSuperVisorModal = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };
    return (
        <>
            {/* <button className="btn" onClick={openModal}>Open Modal</button> */}
            <dialog id="supervisor_selector_modal" className="modal">
                <div className="modal-box dark:bg-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Select a Supervisor
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <MdOutlineSupervisorAccount className="text-xl" />
                                </span>

                                <select
                                    value={selectedOption}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        changeTextColor();
                                    }}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                                        }`}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select Supervisor
                                    </option>
                                    <option value="USA" className="text-body dark:text-bodydark">
                                        Supervisor 1
                                    </option>
                                    <option value="UK" className="text-body dark:text-bodydark">
                                        Supervisor 2
                                    </option>
                                    <option value="Canada" className="text-body dark:text-bodydark">
                                        Supervisor 3
                                    </option>
                                </select>


                            </div>
                        </div>


                        <div className="mt-10">
                            <input
                                type="submit"
                                value="Approve"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                            />
                        </div>

                    </form>
                </div>
            </dialog>
        </>
    );
};

export default SelectSuperVisorModal;
