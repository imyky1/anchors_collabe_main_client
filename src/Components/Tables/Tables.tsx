import React from "react";
import "./Table.css"; // import CSS file for styling
import { IoIosArrowDown } from "react-icons/io";

export const Table1 = ({ headers, rows, cellStyles }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => {
                console.log(cell?.props?.children);
                return (
                  <td
                    key={cellIndex}
                    style={cellStyles ? cellStyles(cellIndex, cell) : {}}
                  >
                    {Array.isArray(cell?.props?.children) &&
                    cell?.props?.children?.length > 2 ? (
                      <div className="flex items-center gap-[4px]">
                        {cell?.props?.children[0]}
                        {cell?.props?.children[1]}
                        {cell?.props?.children[2]}
                        {cell?.props?.children?.length > 3 &&
                          `+${cell?.props?.children?.length - 3}`}
                        {cell?.props?.children?.length > 3 && (
                          <div style={{cursor:'pointer'}}>
                            <IoIosArrowDown />
                          </div>
                        )}
                      </div>
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
