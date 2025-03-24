import React from "react";
import Button from "../../../components/button/button";
import styles from "../quotationPage/quotation.module.css";


const QuotationTable = ({
  heading = "",
  data = [],
  totalCost = "0 USD",
  onEdit = () => {},
  onDelete = () => {},
  onPreview = () => {},
  children,
}) => {
  console.log(data);

  return (
    <div
      className={`h-auto w-full bg-white rounded-md p-4 shadow-md border border-[#D8D8D8] hover:border-black group ${styles.quoteContainer}`}
    >
      {/* Table Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{heading}</h1>
          <p className="text-gray-500">019874572</p>
        </div>
        <div className="flex gap-[20px] space-x-2">{children}</div>
      </div>

      {/* Table */}
      <table style={{
        marginTop:"20px"
      }} className={`w-full text-left border-collapse`}>
        <thead className={``}>
          <tr>
            <th className={` ${styles.p} w-full flex rounded-l-md bg-[#F3F3F3] group-hover:bg-[#d1d0d0] ${styles.th}`}>
              <input
                type="checkbox"
                name="selectedFeature"
                onChange={() => {}}
                aria-label="Select feature"
                className=" "
              />
            </th>
            <th className={` ${styles.p}w-1/12 text-base leading-[14px] font-bold bg-[#F3F3F3] group-hover:bg-[#d1d0d0] ${styles.th}`}>
              Features
            </th>
            <th className={` ${styles.p}w-6/12 bg-[#F3F3F3] group-hover:bg-[#d1d0d0] ${styles.th}`}>Description</th>
            <th className={` ${styles.p}w-1/12 bg-[#F3F3F3] group-hover:bg-[#d1d0d0] ${styles.th}`}>Cost</th>
            <th className={` ${styles.p}w-2/12 bg-[#F3F3F3] group-hover:bg-[#d1d0d0] ${styles.th}`}>Display Item</th>
            <th className={` ${styles.p}w-2/12 rounded-r-md bg-[#F3F3F3] group-hover:bg-[#d1d0d0] ${styles.th}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Render Each Feature Row */}
          {data.map((item, index) => (
            <tr className="border-b border-[#D8D8D8] group-hover:border-black" key={index}>
              <td className={` ${styles.check} flex`}>
                <input
                  type="checkbox"
                  name="selectedFeature"
                  onChange={() => {}}
                  aria-label="Select feature"
                  className="border border-gray-400"
                />
              </td>
              <td className={` ${styles.innerPadding} align-top`}>
                {item.feature}
              </td>
              {/* Combine all descriptions in a single cell OR you can structure differently */}
              <td className={` ${styles.innerPadding} align-top`}>
                {item.description.map((desc, idx) => (
                  <div key={idx} className="mb-2">
                    {desc}
                  </div>
                ))}
              </td>
              <td className={` ${styles.innerPadding} align-top`}>
                {item.costs.map((cost, idx) => (
                  <div key={idx} className="mb-2">
                    {cost}
                  </div>
                ))}
              </td>
              <td
                className={` ${styles.innerPadding}`}
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >                  <table>

                {item.displayItem.map((disp, idx) => (
                  // <div>
                  //   <input
                  //     type="checkbox"
                  //     checked={disp}
                  //     onChange={() => {}}
                  //     className="border border-gray-200 "
                  //     key={idx}
                  //   />
                  // </div>
                  <tr>
                  <td>
                     <input
                       type="checkbox"
                       checked={disp}
                       onChange={() => {}}
                       className="border border-gray-200 "
                       key={idx}
                     />
                  </td>
                </tr>

                ))}
              </table>
              </td>
              <td className={` ${styles.innerPadding}`}>
                {item.description.map((_, idx) => (
                  <div key={idx}>
                    <button
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      style={{ marginLeft: "10px" }}
                      onClick={() => onEdit(index, idx)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.4875 1.51264C14.1593 1.18452 13.7142 1.00018 13.2502 1.00018C12.7861 1.00018 12.341 1.18452 12.0128 1.51264L11.2415 2.28398L13.7162 4.75864L14.4875 3.98731C14.8156 3.65913 15 3.21405 15 2.74998C15 2.2859 14.8156 1.84082 14.4875 1.51264ZM13.0088 5.46598L10.5342 2.99131L4.93417 8.59131C4.52274 9.00254 4.22029 9.50982 4.05417 10.0673L3.52084 11.8573C3.49509 11.9437 3.49317 12.0354 3.51528 12.1228C3.53739 12.2102 3.58271 12.29 3.64645 12.3537C3.71018 12.4174 3.78996 12.4628 3.87734 12.4849C3.96472 12.507 4.05646 12.5051 4.14284 12.4793L5.93284 11.946C6.49032 11.7799 6.99761 11.4774 7.40884 11.066L13.0088 5.46598Z"
                          fill="#1E293B"
                        />
                        <path
                          d="M3.5 3.5C2.96957 3.5 2.46086 3.71071 2.08579 4.08579C1.71071 4.46086 1.5 4.96957 1.5 5.5V12.5C1.5 13.0304 1.71071 13.5391 2.08579 13.9142C2.46086 14.2893 2.96957 14.5 3.5 14.5H10.5C11.0304 14.5 11.5391 14.2893 11.9142 13.9142C12.2893 13.5391 12.5 13.0304 12.5 12.5V9C12.5 8.86739 12.4473 8.74022 12.3536 8.64645C12.2598 8.55268 12.1326 8.5 12 8.5C11.8674 8.5 11.7402 8.55268 11.6464 8.64645C11.5527 8.74022 11.5 8.86739 11.5 9V12.5C11.5 12.7652 11.3946 13.0196 11.2071 13.2071C11.0196 13.3946 10.7652 13.5 10.5 13.5H3.5C3.23478 13.5 2.98043 13.3946 2.79289 13.2071C2.60536 13.0196 2.5 12.7652 2.5 12.5V5.5C2.5 5.23478 2.60536 4.98043 2.79289 4.79289C2.98043 4.60536 3.23478 4.5 3.5 4.5H7C7.13261 4.5 7.25979 4.44732 7.35355 4.35355C7.44732 4.25979 7.5 4.13261 7.5 4C7.5 3.86739 7.44732 3.74021 7.35355 3.64645C7.25979 3.55268 7.13261 3.5 7 3.5H3.5Z"
                          fill="#1E293B"
                        />
                      </svg>
                    </button>
                    <button
                      className=" cursor-pointer text-red-600 hover:text-red-800"
                      style={{ marginLeft: "10px" }}
                      onClick={() => onDelete(index, idx)}
                    >
                      <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.00001 1.98536V2.13669C9.866 2.21588 10.7285 2.32975 11.5853 2.47803C11.65 2.48923 11.7119 2.51307 11.7674 2.54818C11.8229 2.5833 11.8709 2.62899 11.9087 2.68266C11.9465 2.73634 11.9734 2.79693 11.9878 2.861C12.0022 2.92506 12.0039 2.99133 11.9927 3.05603C11.9815 3.12072 11.9576 3.18258 11.9225 3.23807C11.8874 3.29355 11.8417 3.34158 11.788 3.3794C11.7344 3.41723 11.6738 3.44411 11.6097 3.45851C11.5456 3.47292 11.4794 3.47457 11.4147 3.46336L11.2753 3.44003L10.6053 12.1534C10.5667 12.6557 10.3399 13.125 9.97019 13.4674C9.6005 13.8098 9.11521 14 8.61134 14H3.38934C2.88547 14 2.40018 13.8098 2.03049 13.4674C1.6608 13.125 1.43397 12.6557 1.39534 12.1534L0.724671 3.44003L0.585338 3.46336C0.52064 3.47457 0.454368 3.47292 0.390307 3.45851C0.326245 3.44411 0.265648 3.41723 0.211976 3.3794C0.10358 3.30301 0.0299695 3.18669 0.00733768 3.05603C-0.0152941 2.92536 0.0149068 2.79106 0.0912966 2.68266C0.167686 2.57427 0.284008 2.50066 0.414671 2.47803C1.27152 2.32958 2.13399 2.21571 3 2.13669V1.98536C3 0.942693 3.80867 0.0520263 4.87734 0.0180263C5.62581 -0.0059274 6.37486 -0.0059274 7.12334 0.0180263C8.19201 0.0520263 9.00001 0.942693 9.00001 1.98536ZM4.90934 1.01736C5.63649 0.994104 6.36419 0.994104 7.09134 1.01736C7.59334 1.03336 8.00001 1.45603 8.00001 1.98536V2.06069C6.6679 1.97979 5.33211 1.97979 4 2.06069V1.98536C4 1.45603 4.40601 1.03336 4.90934 1.01736ZM4.67267 4.98069C4.67013 4.91503 4.65469 4.85051 4.62721 4.79082C4.59974 4.73113 4.56078 4.67744 4.51255 4.6328C4.46433 4.58817 4.40779 4.55347 4.34615 4.53069C4.28452 4.50791 4.219 4.49749 4.15334 4.50003C4.08768 4.50257 4.02316 4.51801 3.96347 4.54549C3.90378 4.57296 3.85008 4.61192 3.80545 4.66014C3.76081 4.70837 3.72611 4.76491 3.70333 4.82655C3.68055 4.88818 3.67013 4.9537 3.67267 5.01936L3.904 11.0194C3.90913 11.1519 3.96669 11.2769 4.06402 11.367C4.11222 11.4116 4.16873 11.4463 4.23032 11.4691C4.29191 11.4918 4.35739 11.5022 4.423 11.4997C4.48862 11.4972 4.5531 11.4817 4.61275 11.4543C4.6724 11.4268 4.72606 11.3879 4.77066 11.3397C4.81526 11.2915 4.84994 11.235 4.8727 11.1734C4.89547 11.1118 4.90588 11.0463 4.90334 10.9807L4.67267 4.98069ZM8.32601 5.01936C8.33089 4.95244 8.32226 4.88522 8.30062 4.8217C8.27898 4.75818 8.24478 4.69967 8.20006 4.64965C8.15533 4.59963 8.10099 4.55913 8.04028 4.53055C7.97957 4.50197 7.91373 4.48591 7.84668 4.48331C7.77963 4.48072 7.71274 4.49164 7.65 4.51544C7.58726 4.53924 7.52996 4.57542 7.4815 4.62183C7.43304 4.66824 7.39441 4.72394 7.36793 4.78559C7.34144 4.84724 7.32764 4.91359 7.32734 4.98069L7.09601 10.9807C7.09088 11.1133 7.13864 11.2425 7.22878 11.3399C7.31892 11.4373 7.44406 11.4949 7.57667 11.5C7.70928 11.5052 7.83849 11.4574 7.93589 11.3673C8.03328 11.2771 8.09088 11.152 8.09601 11.0194L8.32601 5.01936Z"
                          fill="#1E293B"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer: Total Cost */}
      <div className={`${styles.p} mt-4`}>
        <div className="text-lg flex justify-between font-semibold">
          <p>Total Added Cost:</p> <p>{totalCost}</p>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;
