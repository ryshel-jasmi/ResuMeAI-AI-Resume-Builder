import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState();
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        GetResumeInfo();
    }, []);

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId)
            .then(resp => {
                console.log(resp.data.data);
                setResumeInfo(resp.data.data);
            })
            .catch(error => {
                console.error("Error fetching resume:", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after API call
            });
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {loading ? ( 
                    <div className="col-span-2 text-center text-gray-500">
                        Loading...
                    </div>
                ) : (
                    <>
                        {/* Form Section */}
                        <FormSection />
                        {/* Preview Section */}
                        <ResumePreview />
                    </>
                )}
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;
