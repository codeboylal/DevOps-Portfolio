import React, { useState, useEffect, useRef } from "react";
import styles from "../sales/sales.module.css";
import PageSetup from "../../components/Container/pageSetup/pageSetup";
import consSvg from './imgs/cons.svg';
import ScrollBar from "../../components/scrollBar/scrollBar";
import BuildingLoader from "../../components/loader/loader";
import BelowAppBarMobile from "../../components/belowAppBarMobile/belowAppBarMobile";
import StatusFilter from "../../components/Container/projectsModule/statusFilter/statusFilter";
import statusArrow from "./imgs/statusArrow.svg";
import useOutsideClick from "../../hooks/useOutsideClick";
import SalesCard from "../../components/Container/Sales/salesCard";
import CommonInputField from "../../components/textField/input";
import Button from "../../components/button/button";

const SalesModal = () => {
  const modalRef = useRef(null);
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  useOutsideClick(modalRef, () => setShowModal(false));
  return (
    <>
      <Button
        text="Add lead +"
        height="auto"
        width="auto"
        onClick={() => setShowModal(!showModal)}
      />
      {
        showModal && (
          <div className={styles.modal}>
            {/* <form ref={modalRef} className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Add Lead</h2>
                <span className={styles.closeModalBtn} onClick={() => setShowModal(false)}>&times;</span>
              </div>
              <div className={styles.leadForm}>
                <h3 className={styles.sectionTitle}>Owner Details</h3>
                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Full Name</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Address</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Email</label>
                    <input type="email" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Contact</label>
                    <input type="text" className={styles.input} />
                  </div>
                </div>
                <h3 className={styles.sectionTitle} style={{ marginTop: "50px" }}>Property Details</h3>
                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Lot Number</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Street Number</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Suburb</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Post Code</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Land Width</label>
                    <input type="text" className={styles.input} />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel}>Land Depth</label>
                    <input type="text" className={styles.input} />
                  </div>

                </div>

                <h3 className={styles.drivewayLabel}>Driveway</h3>
                <div className={styles.radioGroup}>
                  <label><input type="radio" name="driveway" value="left" /> Left</label>
                  <label><input type="radio" name="driveway" value="right" /> Right</label>
                  <label><input type="radio" name="driveway" value="not_sure" /> Not Sure</label>
                </div>

                <div className={styles.noteSection}>
                  <div className={styles.noteTitle}>
                    <label>Note</label>
                    <span className={styles.charCount}>{note.length}/150</span>
                  </div>
                  <textarea
                    className={`${styles.textarea} ${styles.input}`}
                    maxLength={150}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={`${styles.footerBtn} ${styles.cancelBtn}`}>
                  Cancel
                </button>
                <button className={styles.footerBtn}>
                  Save
                </button>
              </div>
            </form> */}
            <LeadForm modalRef={modalRef} setShowModal={setShowModal} />
          </div>
        )
      }
    </>
  )
}

const LeadForm = ({ modalRef, setShowModal }) => {
  const initialFormData = {
    fullName: "",
    address: "",
    email: "",
    contact: "",
    lotNumber: "",
    streetNumber: "",
    suburb: "",
    postCode: "",
    landWidth: "",
    landDepth: "",
    driveway: "",
    note: ""
  }
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  const validationRules = {
    fullName: {
      test: (value) => !/\d/.test(value),
      errorMessage: "Full Name should not contain numbers"
    },
    email: {
      isFinalValidation: true,
      test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Invalid email address"
    },
    contact: {
      test: (value) => /^\d{0,10}$/.test(value) && (!value || !isNaN(value)),
      errorMessage: "Contact can not be greater than 10-digit"
    },
    note: {
      test: (value) => value.length <= 150,
      errorMessage: "Maximum 150 characters allowed"
    }
  };

  const validateInput = (name, value) => {
    const rule = validationRules[name];
    if (rule?.isFinalValidation || !rule) return true;
    const error = rule && !rule.test(value) ? rule.errorMessage : "";
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && /[^\d]/.test(value)) return;
    if (!validateInput(name, value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    setErrors({});
  }

  return (
    <form ref={modalRef} className={styles.modalContent} onSubmit={e => e.preventDefault()}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Add Lead</h2>
        <span className={styles.closeModalBtn} onClick={() => setShowModal(false)}>&times;</span>
      </div>
      <div className={styles.leadForm}>
        <h3 className={styles.sectionTitle}>Owner Details</h3>
        <div className={styles.formGroup}>
          <CommonInputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={!!errors.fullName} errorText={errors.fullName} />
          <CommonInputField label="Address" name="address" value={formData.address} onChange={handleChange} />
          <CommonInputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} errorText={errors.email} />
          <CommonInputField label="Contact" name="contact" value={formData.contact} onChange={handleChange} error={!!errors.contact} errorText={errors.contact} />
        </div>

        <h3 className={styles.sectionTitle} style={{ marginTop: "50px" }}>Property Details</h3>
        <div className={styles.formGroup}>
          <CommonInputField label="Lot Number" name="lotNumber" value={formData.lotNumber} onChange={handleChange} />
          <CommonInputField label="Street Number" name="streetNumber" value={formData.streetNumber} onChange={handleChange} />
          <CommonInputField label="Suburb" name="suburb" value={formData.suburb} onChange={handleChange} />
          <CommonInputField label="Post Code" name="postCode" value={formData.postCode} onChange={handleChange} />
          <CommonInputField label="Land Width" name="landWidth" value={formData.landWidth} onChange={handleChange} />
          <CommonInputField label="Land Depth" name="landDepth" value={formData.landDepth} onChange={handleChange} />
        </div>

        <h3 className={styles.drivewayLabel}>Driveway</h3>
        <div className={styles.radioGroup}>
          <label><input type="radio" name="driveway" value="left" checked={formData.driveway === "left"} onChange={handleChange} /> Left</label>
          <label><input type="radio" name="driveway" value="right" checked={formData.driveway === "right"} onChange={handleChange} /> Right</label>
          <label><input type="radio" name="driveway" value="not_sure" checked={formData.driveway === "not_sure"} onChange={handleChange} /> Not Sure</label>
        </div>

        <div className={styles.noteSection}>
          <div className={styles.noteTitle}>
            <label>Note</label>
            <span className={styles.charCount}>{formData.note.length}/150</span>
          </div>
          <CommonInputField label="Note" type="text" name="note" value={formData.note} onChange={handleChange} error={!!errors.note} errorText={errors.note} />
          {/* <textarea
            className={`${styles.textarea} ${styles.input}`}
            name="note"
            value={formData.note}
            onChange={handleChange}
          ></textarea>
          {errors.note && <span className={styles.errorText}>{errors.note}</span>} */}
        </div>
      </div>
      <div className={styles.modalFooter}>
        <button className={`${styles.footerBtn} ${styles.cancelBtn}`} type="reset" onClick={handleReset}>Cancel</button>
        <button className={styles.footerBtn} type="submit">Save</button>
      </div>
    </form>
  );
}

const Sales = () => {
  // refs
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  // states
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [likePlansActive, setLikePlansActive] = useState(
    JSON.parse(sessionStorage.getItem("likedProjects")) || false
  );
  const [selectedStatus, setSelectedStatus] = useState(
    () => localStorage.getItem("selectedStatus") || "In Progress"
  );
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      id: 1,
      img: null,
      title: "Quote number",
      address: 'House #987, Bank Road, Street 4, New York House #987, Bank Road, Street 4, New York',
      userName: 'John Doe',
      userContact: '(907) 656-108-787',
      date: '01/01/20219',
      amount: '100,000'
    },
    {
      id: 2,
      img: null,
      title: "Quote number",
      address: 'House #987, Bank Road, Street 4, New York House #987, Bank Road, Street 4, New York',
      userName: 'John Doe',
      userContact: '(907) 656-108-787',
      date: '01/01/20219',
      amount: '100,000'
    },
    {
      id: 3,
      img: null,
      title: "Quote number",
      address: 'House #987, Bank Road, Street 4, New York House #987, Bank Road, Street 4, New York',
      userName: 'John Doe',
      userContact: '(907) 656-108-787',
      date: '01/01/20219',
      amount: '100,000'
    }
  ]

  useOutsideClick(popupRef, () => setShowStatusFilter(false));

  return (
    // <div className={styles.mainContainer}>
    //   <PageSetup active={"sales"} appBar={true}>
    //     <BelowAppBarMobile
    //       setFilterPopUpState={setShowStatusFilter}
    //       handleLikePlans={() => setLikePlansActive(!likePlansActive)}
    //       likePlansActive={likePlansActive}
    //     />
    //     <div className={styles.salesHeader}>
    //       <div className={styles.salesHeaderLeft}>
    //         <div className={styles.headerTitle}>Sales</div>
    //         <div
    //           ref={dropdownRef}
    //           className={styles.statusDropdown}
    //           onClick={() => setShowStatusFilter(true)}
    //           style={showStatusFilter ? { pointerEvents: 'none' } : {}}
    //         >
    //           Status
    //           <span className={styles.dropdownArrow}>
    //             <img
    //               src={statusArrow}
    //               alt="status arrow"
    //               className={showStatusFilter ? styles.rotate : ""}
    //             />
    //           </span>
    //         </div>
    //       </div>
    //       <div>
    //         <SalesModal />
    //       </div>
    //     </div>

    //     {loading ? (
    //       <BuildingLoader loaderValue={true} height="70vh" width="100%" marginTop="0px" />
    //     ) : (
    //       <ScrollBar className={styles.mainCards}>
    //         {cards.map(card => <SalesCard key={card.id} {...card} />)}
    //       </ScrollBar>
    //     )}
    //     {showStatusFilter && (
    //       <>
    //         <div className={styles.overlay}></div>
    //         <div ref={popupRef} className={styles.statusFilterPopup}>
    //           <StatusFilter
    //             setSelectedStatus={setSelectedStatus}
    //             closePopup={() => setShowStatusFilter(false)}
    //           />
    //         </div>
    //       </>
    //     )}
    //   </PageSetup >
    // </div >
    <div className={styles.mainContainer}>
      <PageSetup active={"sales"} appBar={true}>
        <div className={styles.contentContainer}>
        <ScrollBar>

          <div className={styles.centeredContent}>
            <div className={styles.imageContainer}>
              <img
                src={consSvg}
                alt="Coming Soon"
                className={styles.comingSoonImage}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.comingSoonTitle}>Coming Soon!</h2>
              <p className={styles.comingSoonSubtitle}>
                This feature is under development. Stay tuned for updates!
              </p>
            </div>
          </div>
          </ScrollBar>

        </div>
      </PageSetup>
    </div>
  );
};

export default Sales;
