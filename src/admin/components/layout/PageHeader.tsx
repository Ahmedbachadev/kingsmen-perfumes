import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  action,
}) => {
  return (
    <div className="mb-6 md:mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500 mb-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/admin" className="hover:text-neutral-900 transition-colors">
            Admin
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-neutral-900 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-neutral-800 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
            {title}
          </h1>
          {description && (
            <p className="text-neutral-500 mt-1.5 text-sm md:text-base">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};
