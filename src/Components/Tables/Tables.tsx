import { useState } from "react";
import "./Table.css"; // import CSS file for styling
import { IoIosArrowDown } from "react-icons/io";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";



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
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const isCellArray = Array.isArray(cell?.props?.children);
                return (
                  <td
                    key={cellIndex}
                    style={cellStyles ? cellStyles(cellIndex, cell) : {}}
                  >
                    {isCellArray ? (
                      <div className="flex items-center justify-center relative">
                        {cell?.props?.children
                          ?.slice(0, 3)
                          .map((element, index) => (
                            <div key={index}>{element}</div>
                          ))}
                        {cell?.props?.children?.length > 3 && (
                          <div
                          style={{ cursor: "pointer", display:'flex',justifyContent:'center', alignItems:'center' }}
                          data-tooltip-content={cell?.props?.children
                            ?.slice(3)
                            .map((divElement) => divElement.props.children) // Extract text content of the div
                            .join(', ')} // Convert array to string
                          data-tooltip-id={`tooltip-${rowIndex}-${cellIndex}`}
                        >
                          {`+ ${cell?.props?.children?.length-3}` }
                          <IoIosArrowDown />
                        </div>
                        )}
                        
                        <ReactTooltip   id={`tooltip-${rowIndex}-${cellIndex}`} 
                          className="tooltip-class" 
                           />
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

