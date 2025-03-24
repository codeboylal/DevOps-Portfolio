import React, { useEffect, useState, useRef } from "react";
import { useToaster } from "../../../../Toaster";

import styles from "./edit.module.css";
import cx from "classnames";

import profile from "./assets/profile.jpeg";
import camera from "./assets/camera.svg";
import check from "./assets/check.svg";
import radioDot from "./assets/radioDot.svg";
import chevronDown from "./assets/chevronDown.svg";

import CommonButton from "../../../../components/button/button";
import CommonInputField from "../../../../components/textField/input";
import TypeDropdown from "../../dropDown/typeDropDown";
import ScrollBar from "../../../../components/scrollBar/scrollBar";
import { edituser } from "../../../../services/user/manageUser";
import { getUserData } from "../../../../services/user/getUser";
import { sendResetPassLink } from "../../../../services/mail/resetPass";

import BuildingLoader from "../../../../components/loader/loader.jsx";

function Edit({
  userType = "", //user, companyAdmin , ITI
  setEditPopUp,
  email,
  setRefresh,
  id,
  majorType = "",
}) {
  const setToast = useToaster();

  const [editLoading, setEditLoading] = useState(true);

  const [userId] = useState(localStorage.getItem("id") || null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    discount: "",
    role: [],
    access: [],
    payment: [],
  });

  const [formError, setFormError] = useState({
    nameError: "",
    typeError: "",
    roleError: "",
  });

  const [selected, setSelected] = useState("Type");
  const [selectedId, setSelectedId] = useState("1");

  const changeFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    // changeFormData("type", selected)
    setFormData((prevData) => ({
      ...prevData,
      type: selected === "Type" ? "Individual" : selected,
    }));
    if (
      selected?.toLowerCase() === "type" ||
      selected?.toLowerCase() === "iti" ||
      selected?.toLowerCase() === "individual"
    ) {
      setRoleOption([
        {
          label: "Admin",
          value: false,
        },
        {
          label: "Staff",
          value: false,
        },
        {
          label: "Contractors",
          value: false,
        },
      ]);
    } else {
      let optionSet = false;
      for (let i of roleOption) {
        if (i?.value) {
          optionSet = true;
        }
      }
      if (!optionSet) {
        setRoleOption([
          {
            label: "Admin",
            value: false,
          },
          {
            label: "Staff",
            value: false,
          },
          {
            label: "Contractors",
            value: true,
          },
        ]);
      }
    }
  }, [selected]);

  // useEffect(() => {
  //     console.log(formData)
  // }, [formData])

  const [typeShow, setTypeShow] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const [roleOption, setRoleOption] = useState([
    {
      label: "Admin",
      value: false,
    },
    {
      label: "Staff",
      value: false,
    },
    {
      label: "Contractors",
      value: false,
    },
  ]);

  const handleRoleClick = (index) => {
    setRoleOption((prevOption) =>
      prevOption.map((option, i) =>
        i === index ? { ...option, value: true } : { ...option, value: false }
      )
    );
  };

  useEffect(() => {
    changeFormData("role", roleOption);
  }, [roleOption]);

  const [accessOption, setAccessOption] = useState([
    {
      label: "Display Center",
      value: false,
    },
    {
      label: "Sales",
      value: false,
    },
    {
      label: "Chat",
      value: false,
    },
    {
      label: "Pre-Construction",
      value: false,
    },
    {
      label: "Construction",
      value: false,
    },
  ]);

  const handleCheckClick = (index) => {
    setAccessOption((prevOption) =>
      prevOption.map((option, i) =>
        i === index ? { ...option, value: !option.value } : option
      )
    );
  };

  useEffect(() => {
    changeFormData("access", accessOption);
  }, [accessOption]);

  const [paymentOption, setPaymentOption] = useState([
    {
      label: "Company",
      value: false,
    },
    {
      label: "Individual",
      value: false,
    },
  ]);

  const handlePaymentClick = (index) => {
    setPaymentOption((prevOption) =>
      prevOption.map((option, i) =>
        i === index ? { ...option, value: true } : { ...option, value: false }
      )
    );
  };

  useEffect(() => {
    changeFormData("payment", paymentOption);
  }, [paymentOption]);

  useEffect(() => {
    if (id) {
      getUserData({ userId: id })
        .then((response) => {
          // console.log(response?.data)
          let data = response?.data?.data;
          if (data?.accountType === "individual") {
            setSelected("Individual");
          } else {
            setSelected(
              data?.accountType === "Type" || data?.accountType === ""
                ? "Individual"
                : data?.accountType
            );
          }
          setFormData({
            name: data?.name,
            discount: data?.discount,
            type:
              data?.accountType === "Type" || data?.accountType === ""
                ? "Individual"
                : data?.accountType,
          });
          // console.log(response?.data?.data?.userImg);
          setBase64String(response?.data?.data?.userImg);
          setImage(response?.data?.data?.userImg);
          if (response?.data?.data?.accountTypeId) {
            setSelectedId(response?.data?.data?.accountTypeId);
          } else {
            setSelectedId("1");
          }
          if (
            data?.role === "companyAdmin" ||
            data?.role === "companyStaff" ||
            data?.role === "companyContractors"
          ) {
            setRoleOption([
              {
                label: "Admin",
                value: data?.role === "companyAdmin",
              },
              {
                label: "Staff",
                value: data?.role === "companyStaff",
              },
              {
                label: "Contractors",
                value: data?.role === "companyContractors",
              },
            ]);
          }
          // setRoleOption(data?.role)
          setAccessOption(data?.access);
          setPaymentOption(data?.payment);
          setEditLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleSaveClick = async() => {
    // console.log("Save button clicked")
    // console.log(formData)
    setEditLoading(true)
    let ret = false;
    if (!formData?.name) {
      setFormError((prevData) => ({
        ...prevData,
        nameError: "This field is required",
      }));
      ret = true;
    } else if (formData?.name?.length > 20 || formData?.name?.length < 3) {
      setFormError((prevData) => ({
        ...prevData,
        nameError: "Name should be between 3 to 20 characters",
      }));
      ret = true;
    }
    if (ret) {
      return;
    }
    // console.log(userId, email, selectedId, formData);
    setEditPopUp(false);
    await edituser({
      id: userId,
      email,
      formData,
      selectedId,
      image: base64String,
    })
      .then((response) => {
        // console.log(response?.data)
        setRefresh(true);
        setEditPopUp(false);
        setToast(
          response?.data?.message,
          response?.data?.status === 200 ? "success" : "error"
        );
        if (userId === localStorage.getItem("id")) {
          sessionStorage.setItem("name", formData?.name);
          sessionStorage.setItem("userImg", image);
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Please try again", "error");
      });
      setEditLoading(false)
  };

  const handleCancelButton = () => {
    // console.log("Edit Pop up Cancel Button CLicked by", `${userType}`)
    setEditPopUp(false);
  };

  const [Client_URL, setClient_URL] = useState("");
  const [Path, setPath] = useState("");

  useEffect(() => {
    setClient_URL(window.location.origin);
    setPath(window.location.pathname.substring(1)); // Remove the leading "/"
  }, []);

  const handleChangePassword = async() => {
    // console.log("Change Password Clicked");
    setEditLoading(true)
    await sendResetPassLink({
      email,
      adminId: userId,
      adminRequest: Path?.toLowerCase() === "profile" ? false : true,
      Client_URL,
    })
      .then((response) => {
        console.log(response?.data);
        setToast("Reset password link has been sent to your email", "success");
      })
      .catch((err) => {
        console.log(err);
        setToast("Can not generate reset password link", "error");
      })
      setEditLoading(false)
  };

  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState(""); // Stores Base64 string
  const fileInputRef = useRef(null);

  // Trigger file input when clicking the div
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection and convert to Base64
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set image preview
        // console.log(reader.result);
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <div
      className={styles.outerDiv}
      onClick={() => {
        setTypeShow(false);
      }}
    >
      <div className={styles.mainDiv}>
        <span className={cx(styles.heading, styles.padd)}>Edit Profile</span>
        {editLoading ? (
          <BuildingLoader marginTop={""} height="200px" />
        ) : (
          <ScrollBar>
            <div className={cx(styles.mainDiv, styles.padd)}>
              <div className={styles.profileDiv}>
                <div
                  className={styles.imgDiv}
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={image || profile}
                    alt={"ITI Building Design"}
                    className={styles.img}
                  />
                  <img
                    src={camera}
                    className={cx(styles.camera, styles.pointer)}
                    alt="ITI Building Design"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div>
                <CommonInputField
                  label={"Name"}
                  height={"70px"}
                  value={formData?.name}
                  error={!!formError?.nameError}
                  errorText={formError?.nameError}
                  onChange={(e) => {
                    handleInputChange("name", e.target.value);
                  }}
                />
              </div>
              <div
                className={cx(styles.col16, styles.inputsDiv)}
                style={{
                  display: majorType === "ITI" ? "" : "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{ position: typeShow && "relative", width: "100%" }}
                >
                  <div
                    style={{
                      display: typeShow && "",
                      borderColor: typeShow && "transparent",
                      cursor: "pointer",
                    }}
                    className={styles.select}
                    onClick={() => {
                      setTypeShow(true);
                    }}
                  >
                    <span>{selected}</span>
                    <img src={chevronDown} alt="ITI Building Design" />
                  </div>
                  <TypeDropdown
                    editPopup={true}
                    typeShow={typeShow}
                    setTypeShow={setTypeShow}
                    setSelected={setSelected}
                    setSelectedId={setSelectedId}
                  />
                </div>
                <CommonInputField
                  label={"Discount"}
                  height={"70px"}
                  value={formData?.discount}
                  onChange={(e) => {
                    handleInputChange("discount", e.target.value);
                  }}
                />
              </div>
              <div
                className={styles.col16}
                style={{
                  display:
                    selected?.toLowerCase() === "individual" ||
                    selected?.toLowerCase() === "iti" ||
                    selected?.toLowerCase() === "type"
                      ? "none"
                      : majorType === "ITI"
                      ? ""
                      : majorType === "companyAdmin"
                      ? ""
                      : "none",
                }}
              >
                <span className={styles.subHeading}>Role</span>
                <div className={styles.optionsDiv}>
                  {roleOption?.map((item, index) => {
                    return (
                      <div key={index} className={styles.valueLabelDiv}>
                        <div
                          className={cx(
                            styles.checkBox,
                            styles.pointer,
                            styles.center,
                            styles.radius50
                          )}
                          onClick={() => {
                            handleRoleClick(index);
                          }}
                        >
                          {item?.value && (
                            <img src={radioDot} alt="ITI Building Design" />
                          )}
                        </div>
                        <span>{item?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={styles.col16}
                style={{
                  display: majorType !== "ITI" && "none",
                }}
              >
                <span className={styles.subHeading}>Access</span>
                <div className={styles.optionsDiv}>
                  {accessOption?.map((item, index) => {
                    return (
                      <div key={index} className={styles.valueLabelDiv}>
                        <div
                          className={cx(styles.checkBox, styles.pointer)}
                          style={{
                            borderColor: item?.value && "transparent",
                          }}
                          onClick={() => {
                            handleCheckClick(index);
                          }}
                        >
                          {item?.value && (
                            <img src={check} alt="ITI Building Design" />
                          )}
                        </div>
                        <span>{item?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={styles.col16}
                style={{
                  display:
                    majorType === "ITI"
                      ? ""
                      : majorType === "companyAdmin"
                      ? ""
                      : "none",
                }}
              >
                <span className={styles.subHeading}>Payment</span>
                <div className={styles.optionsDiv}>
                  {paymentOption?.map((item, index) => {
                    return (
                      <div key={index} className={styles.valueLabelDiv}>
                        <div
                          className={cx(
                            styles.checkBox,
                            styles.pointer,
                            styles.center,
                            styles.radius50
                          )}
                          onClick={() => {
                            handlePaymentClick(index);
                          }}
                        >
                          {item?.value && (
                            <img src={radioDot} alt="ITI Building Design" />
                          )}
                        </div>
                        <span>{item?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollBar>
        )}
        <div className={cx(styles.buttonContainer, styles.padd)}>
          <div style={{display: editLoading && 'none'}}>
            <CommonButton
              text={"Reset Password"}
              width={"141px"}
              height={"37px"}
              borderRadius={"100px"}
              onClick={handleChangePassword}
            />
          </div>
          <div className={styles.rightButtonContainer}>
            <button
              className={cx(styles.cancelButton, styles.pointer)}
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <div style={{display: editLoading && 'none'}}>
              <CommonButton
                text={"Save"}
                width={"76"}
                height={"37px"}
                borderRadius={"100px"}
                onClick={handleSaveClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
