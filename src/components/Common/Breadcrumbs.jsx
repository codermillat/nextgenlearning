import { memo } from 'react';
import { Link } from 'react-router-dom';
import StructuredData from '../SEO/StructuredData';
import { generateBreadcrumbSchema } from '../SEO/StructuredData';

/**
 * Breadcrumb navigation component with structured data
 * Wrapped in React.memo for performance optimization
 */
const Breadcrumbs = memo(function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      {breadcrumbSchema && <StructuredData data={breadcrumbSchema} />}
      <nav aria-label="Breadcrumb" className="breadcrumbs bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-x-2 py-3 text-sm text-gray-600 overflow-x-auto list-none m-0 p-0">
            {items.map((item, index) => (
              <li key={index} className="flex items-center m-0 p-0 list-none">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {item.url && index < items.length - 1 ? (
                  <Link
                    to={item.url}
                    className="hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className={`whitespace-nowrap ${index === items.length - 1 ? 'font-semibold text-gray-900' : ''}`}>
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
});

export default Breadcrumbs;

