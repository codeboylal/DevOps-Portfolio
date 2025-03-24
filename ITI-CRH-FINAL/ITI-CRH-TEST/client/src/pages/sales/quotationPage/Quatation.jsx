import React from "react";
import { data } from "../dummyData/data";
import styles from "../quotationPage/quotation.module.css";
import Button from "../../../components/button/button";
import QuotationContainer from "./QuotationContainer";
import TemplateDetails from "../TemplateDetails/TemplateDetails";
import PageSetup from "../../../components/Container/pageSetup/pageSetup";

const Quatation = () => {
  const handleEdit = () => {
    console.log("Edit button clicked");
  };
  const handleDelete = () => {
    console.log("Delete button clicked");
  };
  const handlePreview = () => {
    console.log("preview button clicked");
  };

  return (
    <>
    <PageSetup active="Quotation" appBar={true} >
      <div>
        <div className={`${styles.flex + " " + styles.justifyBetween}`}>
          <h1 className={styles.headText}>Quotations</h1>
          <div className={styles.flex}>
            <span>
              <Button
                text="Choose Package"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>
            <span>
              <Button
                text="Add Variations +"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>
          </div>
        </div>

        <div className="h-[calc(100vh-150px)] overflow-scroll">
          <QuotationContainer
            heading="Quotation"
            data={data}
            totalCost="100,000 USD"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPreview={handlePreview}
          >
            <span>
              <Button
                text="Generate PDF"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>

            <span>
              <Button
                text="Change Package"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>

            <span>
              <Button
                text="Add Items+"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>

            <span>
              <Button
                text="Preview"
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
          </QuotationContainer>

          <QuotationContainer
            heading="Variations"
            data={data}
            totalCost="100,000 USD"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPreview={handlePreview}
          >
            <span>
              <Button
                text="Change Package"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>

            <span>
              <Button
                text="Add Items +"
                height="auto"
                width="auto"
                className={styles.btn1}
              />
            </span>

            <span>
              <Button
                text="Preview"
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
          </QuotationContainer>
          {/* <TemplateDetails/> */}
        </div>
      </div>
    </PageSetup>
    </>
  );
};

export default Quatation;
