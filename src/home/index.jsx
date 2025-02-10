import Header from '@/components/custom/Header';
import { UserButton } from '@clerk/clerk-react';
import { AtomIcon, Edit, Share2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div>
        <section className="z-50 bg-gradient-to-r from-purple-100 to-pink-100 py-8 px-4 mx-auto max-w-full text-center lg:py-16 lg:px-12 rounded-lg">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            Build Your Resume <span className='text-gradient'>With AI</span>
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 xl:px-48">
            Effortlessly Craft a Standout Resume with Our AI-Powered Builder
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:ring-purple-300 cursor-pointer"
            >
              Get Started
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </section>

        <section className="py-8 bg-white z-50 px-4 mx-auto max-w-full text-center lg:py-16 lg:px-12 rounded-lg shadow-xl">
          <h2 className="font-bold text-3xl text-gray-900">How it Works?</h2>
          <h3 className="text-md text-gray-500 mb-8">Create Your AI Generated Resume Easily</h3>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:border-purple-500"
            >
              <AtomIcon className='h-8 w-8 text-purple-500'/>
              <h2 className="mt-4 text-xl font-bold text-gray-900">Create Your Resumes</h2>
              <p className="mt-1 text-sm text-gray-600">
                Generate personalized resumes tailored for your job search with AI.
              </p>
            </div>

            <div
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:border-pink-500"
            >
              <Edit className='h-8 w-8 text-pink-500'/>
              <h2 className="mt-4 text-xl font-bold text-gray-900">Edit Your Resumes</h2>
              <p className="mt-1 text-sm text-gray-600">
                Modify your resume to add personal touches and match job requirements.
              </p>
            </div>

            <div
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:border-purple-500"
            >
              <Share2 className='h-8 w-8 text-purple-500'/>
              <h2 className="mt-4 text-xl font-bold text-gray-900">Download & Share Your Resumes</h2>
              <p className="mt-1 text-sm text-gray-600">
                Download and easily share your resume in various formats.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
