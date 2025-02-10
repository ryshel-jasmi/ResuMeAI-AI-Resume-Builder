import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Editor, EditorProvider, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle} , Based on the position title, give me 5-7 bullet points for my experience in my resume (Please do not add experience level and No JSON array) , give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue || '');
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
        if (!resumeInfo?.Experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true);
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);

        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = await result.response.text();
            setValue(resp.replace('[', '').replace(']', ''));
            onRichTextEditorChange(resp.replace('[', '').replace(']', ''));
        } catch (error) {
            console.error("AI Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between my-2">
                <label className="text-xs">Summary</label>
                <Button variant="outline" size="sm" onClick={GenerateSummeryFromAI} disabled={loading} className="flex gap-2 border-primary text-primary">
                    {loading ? <LoaderCircle className="animate-spin" /> : <><Brain className="h-4 w-4" /> Generate from AI </>}
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e.target.value);
                }}>
                    <Toolbar>
                        <BtnBold /><BtnItalic /><BtnUnderline /><BtnStrikeThrough /><Separator />
                        <BtnNumberedList /><BtnBulletList /><Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
