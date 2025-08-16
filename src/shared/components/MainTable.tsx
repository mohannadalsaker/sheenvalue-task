import type { MainTableAction, MainTableColumn } from "../types";

export interface MainTableProps<T extends { id: number }> {
  data: T[];
  columns: MainTableColumn<T>[];
  actions?: MainTableAction[];
}

const MainTable = <T extends { id: number }>({
  columns,
  data,
  actions,
}: MainTableProps<T>) => {
  return (
    <table className="bg-white rounded-md w-full max-h-full relative">
      <thead>
        <tr className="border-b border-b-secondary-text sticky top-0 bg-white">
          {columns.map((col) => (
            <th
              key={col.key as string}
              className="p-3 text-left text-primary-text text-nowrap"
            >
              {col.label}
            </th>
          ))}
          <th className="p-3 text-left text-primary-text text-nowrap">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr key={row.id} className="border-b border-b-secondary-text">
            {columns.map((col) => (
              <td key={col.key as string} className="p-3 text-nowrap">
                {col.format ? col.format(row) : (row[col.key] as string)}
              </td>
            ))}
            {actions && actions.length > 0 && (
              <td className="p-3 ">
                <div className="flex gap-4">
                  {actions.map((act, index) => (
                    <act.icon
                      key={index}
                      size={20}
                      cursor={"pointer"}
                      color={act.type == "delete" ? "red" : "gray"}
                      onClick={() => act.action(row.id)}
                    />
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
