import { FC } from 'react';
import styled from 'styled-components';

interface TableProps {
  data: { rows: string[] }[];
  onChange?: (row_index: number, col_index: number, text: string) => void;
}

const TableView = styled.table`
  width: 100%;
  tr:first-child > td {
    background-color: #f2f2f7;
  }
  tr {
    border-bottom: 1px solid #c7c7cc;
  }
  td {
    padding: 12px;
    border-right: 1px solid #c7c7cc;
    :first-child {
      background-color: #fbfbfd;
    }
  }
  td:last-child {
    border-right: none;
  }
`;

export const Table: FC<TableProps> = ({ data, onChange }) => {
  return (
    <TableView>
      <tbody>
        {data.map(({ rows }, row_index) => {
          return (
            <tr key={`row-${row_index}`}>
              {rows.map((row, col_index) => {
                return (
                  <td key={`column-${col_index}`}>
                    <input
                      type="text"
                      className="text-b3 placeholder:text-gray400 w-full bg-transparent text-center"
                      placeholder="입력"
                      value={row}
                      onChange={(e) =>
                        onChange?.(row_index, col_index, e.target.value)
                      }
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </TableView>
  );
};
