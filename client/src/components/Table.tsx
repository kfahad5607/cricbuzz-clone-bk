import { CellValue, Column, RowData } from "../entities/table";

interface Props {
  columns: Column[];
  data: RowData[];
  rowStripes?: boolean;
}

const BASE_CELL_CLASS = "first:ps-3 last:pe-3 px-1.5 py-1.5";

const defaultColumnRender = (val: CellValue) => <>{val}</>;

const getRenderer = (column: Column): Column["render"] =>
  column.render || defaultColumnRender;

const Table = ({ columns, data, rowStripes = false }: Props) => {
  return (
    <div className="text-sm">
      {/* Head */}
      <div className="bg-slate-200 text-gray-600">
        {/* Head row */}
        <div className="flex items-center">
          {/*  Head Cell*/}
          {columns.map((column, columnIdx) => (
            <div
              key={columnIdx}
              className={`${BASE_CELL_CLASS} ${column.classNames}`}
            >
              {column.title}
            </div>
          ))}
        </div>
      </div>
      {/* Body */}
      <div>
        {/* Row */}
        {data.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex items-center ${
              rowStripes ? "border-b last:border-0" : ""
            }`}
          >
            {/* Cell */}
            {columns.map((column, columnIdx) => (
              <div
                key={columnIdx}
                className={`${BASE_CELL_CLASS} ${column.classNames}`}
              >
                {getRenderer(column)!(row[column.dataKey], row, columnIdx)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
