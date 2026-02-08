import React, { useState, useEffect } from "react";
import { useTambo } from "./TamboProvider";

interface PageCanvasProps {
  pages?: Array<{
    name: string;
    path: string;
    components: string[];
  }>;
  selectedPage?: string;
  onSelection?: (pageName: string) => void;
  loading?: boolean;
  error?: string;
}

export const PageCanvas: React.FC<PageCanvasProps> = ({
  pages = [],
  selectedPage,
  onSelection,
  loading = false,
  error,
}) => {
  const { renderComponent, listComponents } = useTambo();
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPage && selectedPage !== currentPage) {
      setCurrentPage(selectedPage);
    }
  }, [selectedPage, currentPage]);

  const handlePageSelect = (pageName: string) => {
    setCurrentPage(pageName);
    if (onSelection) {
      onSelection(pageName);
    }
  };

  if (loading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-6 w-1/4 mb-4"></div>
          <div className="bg-gray-300 h-4 w-full mb-2"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-300 h-4 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
        <h3 className="text-red-600 font-semibold mb-2">Error Loading Page</h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const currentPageData = pages.find((p) => p.name === currentPage);

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Page Canvas</h3>
        <div className="text-sm text-gray-500">
          {currentPage ? `Current: ${currentPage}` : "Select a page to preview"}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {pages.map((page) => (
          <button
            key={page.name}
            onClick={() => handlePageSelect(page.name)}
            className={`p-2 text-sm rounded border ${
              currentPage === page.name
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>

      {currentPageData && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium mb-2">{currentPageData.name}</h4>
          <p className="text-sm text-gray-600 mb-3">
            Path: {currentPageData.path}
          </p>

          <div className="grid gap-4">
            {currentPageData.components.map((componentName, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded p-3 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{componentName}</span>
                  <span className="text-xs text-gray-500">
                    Component {index + 1}
                  </span>
                </div>
                <div className="min-h-20 border-2 border-dashed border-gray-200 rounded p-2">
                  {renderComponent(componentName)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
