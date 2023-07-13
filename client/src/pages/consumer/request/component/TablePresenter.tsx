import { FC } from "react";
import styled from "styled-components";

interface TablePresenterProps {
  data: { rows: string[] }[];
}

const TableView = styled.table`
  margin-top: 10px;
  width: 100%;
  tr:first-child > td {
    background-color: #f2f2f7;
  }
  tr {
    word-break: break-all;
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

export const TablePresenter: FC<TablePresenterProps> = ({ data }) => {
  return (
    <TableView>
      <tbody>
        {data.map(({ rows }, row_index) => {
          return (
            <tr key={`row-${row_index}`}>
              {rows.map((row, col_index) => {
                return (
                  <td key={`column-${col_index}`}>
                    <p className="text-b3 w-full bg-transparent text-center whitespace-pre-wrap">
                      {row}
                    </p>
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
