"use client";

/**
 * DataTable — reusable table with action buttons
 * @param {Object}     props
 * @param {string}     props.title
 * @param {string}     props.seeAllHref
 * @param {string[]}   props.columns        - Column header labels
 * @param {string[]}   props.dataKeys        - Keys matching each column (last key = "action")
 * @param {Object[]}   props.rows            - Array of data objects
 * @param {Function}   props.onApprove       - (row) => void
 * @param {Function}   props.onDecline       - (row) => void
 * @param {boolean}    props.showActions     - Whether to render Approve/Decline buttons
 */
export default function DataTable({
  title = "Data",
  seeAllHref = "#",
  columns = [],
  dataKeys = [],
  rows = [],
  onApprove,
  onDecline,
  showActions = true,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <a href={seeAllHref} className="text-xs text-[#4CAF50] font-medium hover:underline">
          See All
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th key={col} className="text-left py-2 px-3 text-gray-400 font-medium whitespace-nowrap">
                  {col}
                </th>
              ))}
              {showActions && (
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                {dataKeys.map((key) => (
                  <td key={key} className="py-3 px-3 text-gray-600 whitespace-nowrap">
                    {row[key]}
                  </td>
                ))}
                {showActions && (
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onDecline?.(row)}
                        className="px-3 py-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-[11px] font-medium"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => onApprove?.(row)}
                        className="px-3 py-1 rounded-full bg-[#4CAF50] text-white hover:bg-[#43a047] transition-colors text-[11px] font-medium"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
