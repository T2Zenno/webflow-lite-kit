import React, { useState } from 'react';
import { Sidebar } from './builder/Sidebar';
import { Topbar } from './builder/Topbar';
import { Workspace } from './builder/Workspace';
import { Inspector } from './builder/Inspector';
import { DragDropProvider } from './builder/DragDropProvider';
import { usePageBuilder } from '../hooks/usePageBuilder';

export const PageBuilder = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentView, setCurrentView } = usePageBuilder();

  return (
    <DragDropProvider>
      <div className="h-screen bg-background text-foreground overflow-hidden">
        {/* Topbar */}
        <Topbar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="flex h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          
          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Workspace */}
            <Workspace currentView={currentView} />
            
            {/* Inspector Panel */}
            {currentView === 'builder' && (
              <Inspector />
            )}
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
};