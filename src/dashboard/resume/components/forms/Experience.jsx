import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
};

function Experience() {
    const [experinceList, setExperinceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.Experience?.length > 0) {
            setExperinceList(resumeInfo?.Experience);
        }
    }, []);

    const handleChange = (index, event) => {
        const newEntries = [...experinceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperinceList(newEntries);
    };

    const handleRichTextEditor = (value, index) => {
        const newEntries = [...experinceList];
        newEntries[index].workSummery = value;
        setExperinceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperinceList([...experinceList, { ...formField }]);
    };

    const RemoveExperience = () => {
        setExperinceList(experinceList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            Experience: experinceList,
        });
    }, [experinceList]);

    const onSave = async () => {
        setLoading(true);

        const payload = { 
            data: { 
                Experience: experinceList.map(({ id, ...rest }) => rest) 
            } 
        };

        console.log("Sending payload:", JSON.stringify(payload, null, 2));

        try {
            const res = await GlobalApi.UpdateResumeDetail(params?.resumeId, payload);
            console.log("API Response:", res);
            toast('Details updated!');
        } catch (error) {
            console.error("API Error:", error.response?.data || error);
            toast.error('Failed to update experience!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {experinceList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div>
                                    <label className="text-xs">Position Title</label>
                                    <Input name="title" onChange={(event) => handleChange(index, event)} defaultValue={item?.title} />
                                </div>
                                <div>
                                    <label className="text-xs">Company Name</label>
                                    <Input name="companyName" onChange={(event) => handleChange(index, event)} defaultValue={item?.companyName} />
                                </div>
                                <div>
                                    <label className="text-xs">City</label>
                                    <Input name="city" onChange={(event) => handleChange(index, event)} defaultValue={item?.city} />
                                </div>
                                <div>
                                    <label className="text-xs">State</label>
                                    <Input name="state" onChange={(event) => handleChange(index, event)} defaultValue={item?.state} />
                                </div>
                                <div>
                                    <label className="text-xs">Start Date</label>
                                    <Input type="date" name="startDate" onChange={(event) => handleChange(index, event)} defaultValue={item?.startDate} />
                                </div>
                                <div>
                                    <label className="text-xs">End Date</label>
                                    <Input type="date" name="endDate" onChange={(event) => handleChange(index, event)} defaultValue={item?.endDate} />
                                </div>
                                <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummery}
                                        onRichTextEditorChange={(value) => handleRichTextEditor(value, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary">
                            + Add More Experience
                        </Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary">
                            - Remove
                        </Button>
                    </div>
                    <Button disabled={loading} onClick={onSave} className="self-end sm:self-auto">
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Experience;
