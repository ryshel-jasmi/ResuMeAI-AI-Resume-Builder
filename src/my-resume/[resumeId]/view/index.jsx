import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState({}); // ✅ Fix: Initialize with an empty object
    const { resumeId } = useParams();

    useEffect(() => {
        if (resumeId) {
            GetResumeInfo();
        }
    }, [resumeId]); // ✅ Fix: Add dependency to avoid fetching with undefined resumeId

    const GetResumeInfo = async () => {
        try {
            const resp = await GlobalApi.GetResumeById(resumeId);
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        } catch (error) {
            console.error("Error fetching resume:", error);
        }
    };

    const HandleDownload = () => {
        window.print();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />

                <div className="my-10 mx-10 md:mx-20 lg:mx-36">
                    <h2 className="text-center text-2xl font-medium">
                        Congrats! Your Ultimate AI-generated Resume is ready!
                    </h2>
                    <p className="text-center text-gray-400">
                        Now you are ready to download your resume and you can share a unique 
                        resume URL with your friends and family.
                    </p>
                    <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 px-5 md:px-44 my-10">
    <Button className="w-full md:w-auto md:self-start" onClick={HandleDownload}>
        Download
    </Button>

    <RWebShare
        data={{
            text: "Hello Everyone, this is my resume. Please open the URL to see it.",
            url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
            title: (resumeInfo?.firstName || "My") + " " + (resumeInfo?.lastName || "Resume"),
        }}
        onClick={() => console.log("Shared successfully!")}
    >
        <Button className="w-full md:w-auto md:self-end">Share</Button>
    </RWebShare>
</div>

                </div>
            </div>

            <div className="my-0 mx-0 md:mx-20 lg:mx-96">
                <div id="print-area">
                    <ResumePreview /> {/* ✅ Fix: Ensure ResumePreview is properly imported */}
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
