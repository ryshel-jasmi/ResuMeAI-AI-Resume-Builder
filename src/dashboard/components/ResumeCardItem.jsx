import { Loader2Icon, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast('Resume Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="">
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg"
          style={{
            borderTop: `4px solid ${resume?.themeColor || "#ff6666"}`, // Add thin border at the top
          }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor || "#ff6666", // Only bottom section color changes
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        {/* Dropdown Menu for Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex items-center justify-center rounded-full p-2 cursor-pointer"
              style={{
                background: resume?.themeColor || "#ff6666", // Only dropdown button color changes
              }}
            >
              <MoreVertical className="h-4 w-4 text-white" />
            </div>
          </DropdownMenuTrigger>

          {/* Dropdown Menu Content */}
          <DropdownMenuContent
            align="end"
            className="!bg-[#ffffff] !text-black !border-none !rounded-lg shadow-lg"
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)', // A subtle shadow for visibility
              zIndex: 9999, // Make sure it stays on top of other content
            }}
          >
            <DropdownMenuItem
              onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete Confirmation Alert */}
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume and remove
                your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
