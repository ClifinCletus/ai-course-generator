//ChapterContent.jsx
import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from 'react-markdown';

//*** VV IMP ****** the detailed content of the chapter and the video etc all been shown via this component

const ChapterContent = ({ chapter, content }) => {
  console.log("content in component", content)
  console.log("content in chapter", chapter)
  
  // YouTube options for different screen sizes
  const getYouTubeOpts = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    if (isMobile) {
      return {
        height: "220",
        width: "100%",
        playerVars: {
          autoplay: 0,
        },
      };
    } else if (isTablet) {
      return {
        height: "315",
        width: "560",
        playerVars: {
          autoplay: 0,
        },
      };
    } else {
      return {
        height: "390",
        width: "640",
        playerVars: {
          autoplay: 0,
        },
      };
    }
  };

  const [opts, setOpts] = React.useState(getYouTubeOpts()); //youtube options for various screens


  // *** VV IMP *** : used to set the youtube options based on the screen resize
  React.useEffect(() => {
    const handleResize = () => {
      setOpts(getYouTubeOpts());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-none">
      {/* Chapter Header */}
      <div className="mb-6">
        <h2 className="font-medium text-xl sm:text-2xl lg:text-3xl mb-2 break-words">
          {chapter?.chapterName}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          {chapter?.about}
        </p>
      </div>

      {/* Video Section */}
      {content?.videoId && (
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <YouTube 
                    videoId={content.videoId} 
                    opts={opts}
                    className="w-full h-full max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      {content?.content && (
        <div className="space-y-4 sm:space-y-6 sm:mt-5">
          {content.content.map((item, index) => (
            <div key={index} className="bg-sky-50 rounded-lg p-4 sm:p-5 lg:p-6">
              <h2 className="font-medium text-lg sm:text-xl mb-3 break-words">
                {item?.title}
              </h2>
              
              {/* Markdown Content */}
              <div className="prose prose-sm sm:prose-base max-w-none prose-headings:break-words prose-p:break-words">
                <ReactMarkdown>{item?.explanation}</ReactMarkdown>
              </div>

              {/* Code Example */}
              {item.codeExample && (
                <div className="mt-4 bg-black text-white rounded-md overflow-hidden">
                  <div className="p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-xs sm:text-sm">
                      <code className="break-all sm:break-normal whitespace-pre-wrap sm:whitespace-pre">
                        {item.codeExample}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {!content && (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading chapter content...</div>
        </div>
      )}
    </div>
  );
};

export default ChapterContent;