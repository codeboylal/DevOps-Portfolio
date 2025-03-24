import React from "react";
import QuotationTable from "../quotationPage/QuotationContainer";
import Button from "../../../components/button/button";
import styles from "../quotationPage/quotation.module.css";
import { data } from "../dummyData/data";
import PageSetup from "../../../components/Container/pageSetup/pageSetup";

const TemplateDetails = () => {
  return (
    <>
      <PageSetup active="Template" appBar={true}>
        <div className="">
          <QuotationTable
            heading="Single Story"
            data={data}
            totalCost="100,000 USD"
          >
            <span>
              <Button
                text="Add Item +"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>

            <span>
              <Button
                text="Save"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>
          </QuotationTable>
        </div>
      </PageSetup>
    </>
  );
};

export default TemplateDetails;
