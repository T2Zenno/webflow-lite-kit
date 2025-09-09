import React from 'react';
import { ViewType } from '../../hooks/usePageBuilder';
import { BuilderCanvas } from './BuilderCanvas';
import { ProductsView } from '../views/ProductsView';
import { OrdersView } from '../views/OrdersView';
import { CustomersView } from '../views/CustomersView';
import { LibraryView } from '../views/LibraryView';
import { CRMView } from '../views/CRMView';
import { AnalyticsView } from '../views/AnalyticsView';
import { AppsView } from '../views/AppsView';
import { SettingsView } from '../views/SettingsView';

interface WorkspaceProps {
  currentView: ViewType;
}

export const Workspace: React.FC<WorkspaceProps> = ({ currentView }) => {
  const renderView = () => {
    switch (currentView) {
      case 'builder':
        return <BuilderCanvas />;
      case 'products':
        return <ProductsView />;
      case 'orders':
        return <OrdersView />;
      case 'customers':
        return <CustomersView />;
      case 'library':
        return <LibraryView />;
      case 'crm':
        return <CRMView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'apps':
        return <AppsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <BuilderCanvas />;
    }
  };

  return (
    <div className="flex-1 workspace-bg overflow-hidden">
      {renderView()}
    </div>
  );
};