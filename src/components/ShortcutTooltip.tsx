import React from 'react';

interface ShortcutTooltipProps {
  shortcuts: {
    run: string;
    format: string;
    reset: string;
  };
}

const ShortcutTooltip: React.FC<ShortcutTooltipProps> = ({ shortcuts }) => {
  return (
    <div className="absolute bottom-4 right-4 p-2 text-sm bg-gray-800 text-white rounded shadow-lg opacity-75 hover:opacity-100">
      <div className="mb-1">
        <kbd className="px-2 py-1 bg-gray-700 rounded">{shortcuts.run}</kbd>
        <span className="ml-2">Run Code</span>
      </div>
      <div className="mb-1">
        <kbd className="px-2 py-1 bg-gray-700 rounded">{shortcuts.format}</kbd>
        <span className="ml-2">Format Code</span>
      </div>
      <div>
        <kbd className="px-2 py-1 bg-gray-700 rounded">{shortcuts.reset}</kbd>
        <span className="ml-2">Reset Code</span>
      </div>
    </div>
  );
};

export default ShortcutTooltip;
