import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      {/* Heading */}
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {/* Skills List */}
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px] rounded">
              <div
                className="h-2 rounded"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating * 20 + '%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS for print-specific styles */}
      <style>
        {`
          @media print {
            /* Progress bar background */
            .h-2 {
              background-color: #e0e7ff; /* Light neutral background */
              border-radius: 4px;
              height: 8px;
            }

            /* Dynamic progress bar color */
            .h-2 div {
              background-color: ${resumeInfo?.themeColor || '#4f46e5'}; /* Fallback theme color */
              border-radius: 4px;
              height: 8px;
            }

            /* Exact color adjustment for print */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default SkillsPreview;
