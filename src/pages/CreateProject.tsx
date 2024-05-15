import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
import api from '../Utilities/api';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "../css/select.css"
import { Teacher } from '../types/teacher';
import { TeacherType } from '../types/selectInputTeacher';

const CreateProject = () => {
    const animatedComponents = makeAnimated();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [selectedTeachers, setSelectedTeachers] = useState<Array<TeacherType>>([]);


    const handleSelectChange = (selectedOption: any) => {
        if (selectedOption && selectedOption.length <= 5) {
            setSelectedTeachers(selectedOption);
        } else {
            setIsDisabled(!isDisabled)
        }
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/get-all-teacher");
                setTeachers(res?.data)

            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);
    let allTeachers = teachers.map(teacher => ({ label: teacher.name, value: teacher.id }));



    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data: any) => {
        const formData = {
            student_id: data.student_id,
            title: data.title,
            object: data.object,
            mythology: data.mythology,
            ppt: data.ppt,
            status: "pending",
            supervisor1: selectedTeachers[0]?.label,
            supervisor2: selectedTeachers[1]?.label,
            supervisor3: selectedTeachers[2]?.label,
            supervisor4: selectedTeachers[3]?.label,
            supervisor5: selectedTeachers[4]?.label
        }

        console.log(formData);


        api
            .post("/create-project", formData)
            .then((res: any) => {
                console.log(res);
                if (res.status === 200) {
                    toast.success("Create Project Successfully");
                    reset()

                }
            })
            .catch((err: any) => {
                console.log(err);
                toast.error("Please try again");
            });
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Create Project" />

            <div className="rounded-sm border mb-12 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Submit your project
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Student Id
                        </label>
                        <input
                            {...register("student_id", {
                                required: "Student Id is required",
                            })}
                            type="text"
                            placeholder="Title"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.student_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.student_id.message as React.ReactNode}</p>
                        )}
                    </div>


                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Title
                        </label>
                        <input
                            {...register("title", {
                                required: "Title is required",
                            })}
                            type="text"
                            placeholder="Title"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title.message as React.ReactNode}</p>
                        )}
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Object
                        </label>
                        <input
                            {...register("object", {
                                required: "Object is required",
                            })}
                            type="text"
                            placeholder="Object"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.object && (
                            <p className="text-red-500 text-xs mt-1">{errors.object.message as React.ReactNode}</p> // Explicitly cast to ReactNode
                        )}
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Mythology
                        </label>
                        <input
                            {...register("mythology", {
                                required: "Mythology is required",
                            })}
                            type="text"
                            placeholder="Object"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.mythology && (
                            <p className="text-red-500 text-xs mt-1">{errors.mythology.message as React.ReactNode}</p> // Explicitly cast to ReactNode
                        )}
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            PPT
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

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Select Supervisor
                        </label>
                        <Select
                            className="focus:bg-slate-600 "
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            isMulti
                            options={allTeachers}
                            onChange={handleSelectChange}
                            isDisabled={isDisabled}
                        // onChange={(selectedOption) => {
                        //     setSelectedTeachers(selectedOption as TeacherType[]);
                        // }}
                        />
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
        </DefaultLayout>


    );
};

export default CreateProject;