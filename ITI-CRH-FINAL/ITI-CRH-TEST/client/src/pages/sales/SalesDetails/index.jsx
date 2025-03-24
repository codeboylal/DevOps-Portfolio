import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.css'
import SalesDetailsContainer from '../../../components/Container/Sales/SalesDetailsContainer'
import PageSetup from '../../../components/Container/pageSetup/pageSetup'
import BuildingLoader from '../../../components/loader/loader'
import ScrollBar from '../../../components/scrollBar/scrollBar'
import cost from './img/cost.svg';
import document from './img/document.svg';
import email from './img/email.svg';
import fire from './img/fire.svg';
import frame from './img/frame.svg';
import home from './img/home.svg';
import land from './img/land.svg';
import location from './img/location.svg';
import person from './img/person.svg';
import phone from './img/phone.svg';
import edit from './img/edit.svg';
import down_arrow from './img/down_arrow.svg';
import useOutsideClick from '../../../hooks/useOutsideClick';
import arrow from './img/arrow.svg';
import pdf from './img/pdf.svg';
import useWindowSize from '../../../hooks/useWindowSize'
import Box from '../../../components/Container/displayCenter/box/box'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/button/button'

const propertyInfo = [
    { name: "Full address for easy identification", icon: location },
    { name: "Land Width", icon: land },
    { name: "Land Depth", icon: land },
    { name: "Total Land Size", icon: land },
    { name: "Driveway", icon: person },
    { name: "Developer", icon: person },
    { name: "Bush Fire", icon: fire },
    { name: "Title Date", icon: frame },
    { name: "Settlement Date", icon: frame },
    { name: "Land Type", icon: land }
];

const propertyData = [
    { name: "Land Width", value: [{ name: "13 ft." }] },
    { name: "Land Depth", value: [{ name: "15 ft." }] },
    { name: "Total Land Size", value: [{ name: "100 sq." }] },
    { name: "Driveway", value: [{ name: "Left/Right/Not Sure" }] },
    { name: "Developer", value: [{ name: "Mambourin Estate" }] },
    { name: "Bush Fire", value: [{ name: "Yes/no" }] },
    { name: "Title Date", value: [{ name: "2025/10/10" }] },
    { name: "Settlement Date", value: [{ name: "2025/10/10" }] },
    { name: "Land Type", value: [{ name: "Regular/irregular/corner" }] }
];

const quoteFields = [
    { name: "Quote Number", icon: document },
    { name: "Quote Date", icon: frame },
    { name: "Total House Cost", icon: cost },
    { name: "Builder", icon: person }
];

const quoteData = [
    { name: "Quote Number", value: [{ name: "Q-1001" }] },
    { name: "Quote Date", value: [{ name: "01/01/2019" }] },
    { name: "Total House Cost", value: [{ name: "100,000 USD" }] },
    { name: "Builder", value: [{ name: "Abhinav Kumar" }] }
];

const contactFields = [
    { name: "Full Name", icon: person },
    { name: "Address", icon: home },
    { name: "Email", icon: email },
    { name: "Contact", icon: phone }
];

const contactData = [
    { name: "Full Name", value: [{ name: "Dikshant" }] },
    { name: "Address", value: [{ name: "Full address for easy identification" }] },
    { name: "Email", value: [{ name: "john@gmail.com" }] },
    { name: "Contact", value: [{ name: "Lorem Ipsum dor" }] }
];

const SalesDetails = () => {
    const [loading, setLoading] = useState(false);
    const { windowInWidth } = useWindowSize();
    const navigate = useNavigate();
    return (
        <div className={styles.mainContainer}>
            <PageSetup active={"Sale Details"} appBar={true} style={{ flexGrow: 3 }}>
                <div className={styles.detailsHeader}>
                    <div className={styles.headerTitle}>Sales</div>
                    <div className={styles.headerBtns}>
                        <Button
                            height='auto'
                            width="auto"
                            onClick={() => navigate('/quotations')}
                        >
                            <span className={styles.generateBtn} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Generate
                                <img src={down_arrow} className={styles.icon} alt="↓" />
                            </span>
                        </Button>
                        <Button
                            text="Quotation"
                            height="auto"
                            width="auto"
                            onClick={() => navigate('/quotations')}
                        />
                    </div>
                </div>
                {loading ? (
                    <BuildingLoader loaderValue={true} height="70vh" width="100%" marginTop="0px" />
                ) : (
                    <ScrollBar className={styles.scrollBar}>
                        <div className={styles.details}>
                            <div className={styles.quoteOwenerDetails}>
                                <SalesDetailsContainer fields={quoteFields} data={quoteData} style={{ flexGrow: 1 }} headerBtn={<ProgressStatus />} />
                                <SalesDetailsContainer fields={contactFields} data={contactData} headerBtn={<EditBtn />} />
                            </div>
                            <SalesDetailsContainer fields={propertyInfo} data={propertyData} headerBtn={<EditBtn />} collapsible={windowInWidth < 768} visibleCount={1} />
                        </div>
                        <div className={styles.notes}>
                            <h2>Add Notes</h2>
                            <textarea />
                        </div>
                        <Box />
                    </ScrollBar>
                )
                }
            </PageSetup >
            <SalesDocsModal />
        </div >
    );
};

export default SalesDetails


const ProgressStatus = () => {
    const statusClassMap = {
        "in progress": styles.inProgressStatus,
        "on hold": styles.onHoldStatus,
        "complete": styles.completed,
        "not started": styles.notStarted,
    };
    const singleCardData = {
        status: 'in progress',
    }
    return (
        <span
            className={`${styles.status} ${statusClassMap[singleCardData?.status] || ""}`}
        >
            {singleCardData?.status}
        </span>
    )
}

const EditBtn = () => {
    return (
        <div className={styles.editBtn} role='button'>
            <img src={edit} alt="&#x1F58A;" className={styles.editIcon} />
            Edit
        </div>
    )
}

const SalesDocsModal = ({ modalContentClass }) => {
    const modalRef = useRef(null);
    const { windowInWidth } = useWindowSize();
    const [isLargeScreen, setIsLargeScreen] = useState(windowInWidth > 1900);
    const [showModal, setShowModal] = useState(false);
    useOutsideClick(modalRef, () => setShowModal(false));
    const fileData = [
        {
            id: 1,
            name: "Project Proposal.pdf",
            size: "2.5 MB",
            type: "pdf",
        },
        {
            id: 2,
            name: "Marketing Plan.pdf",
            size: "8 MB",
            type: "pdf",
        },
        {
            id: 3,
            name: "Financial Report.pdf",
            size: "12 MB",
            type: "pdf",
        },
        {
            id: 4,
            name: "User Guide.pdf",
            size: "5 MB",
            type: "pdf",
        },
        {
            id: 5,
            name: "Presentation Slides.pdf",
            size: "10 MB",
            type: "pdf",
        },
        {
            id: 6,
            name: "Client Contract.pdf",
            size: "3 MB",
            type: "pdf",
        },
    ];

    useEffect(() => {
        setIsLargeScreen(windowInWidth > 1900);
    }, [windowInWidth])

    return (
        <>
            {isLargeScreen || <button className={styles.toggleBtn} onClick={() => setShowModal(!showModal)} style={showModal ? { pointerEvents: 'none' } : {}}>
                <img src={arrow} alt="" />
            </button>}
            {
                (showModal || isLargeScreen) && (
                    <div className={isLargeScreen ? styles.largeScModal : styles.modal}>
                        <div ref={modalRef} className={isLargeScreen ? styles.largeScModalContentWrapper : styles.modalContentWrapper}>
                            <div className={`${isLargeScreen ? styles.largeScModalContent : styles.modalContent} ${modalContentClass}`}>
                                <div className={styles.modalHeader}>
                                    <h2 className={styles.modalTitle}>Documents</h2>
                                    {isLargeScreen ? <div className={styles.addBtn}>Add Document <span className={styles.plusIcon}>+</span></div> : <span className={styles.closeModalBtn} onClick={() => setShowModal(false)}>&times;</span>}
                                </div>
                                {isLargeScreen || <div className={styles.addBtn}>Add Document <span className={styles.plusIcon}>+</span></div>}
                                <div className={styles.modalBody}>
                                    {fileData.map((file) => (
                                        <FileListComponent key={file.id} name={file.name} size={file.size} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

function FileListComponent({ id, name, size }) {
    return (
        <div className={styles.fileItem} key={id}>
            <div className={styles.fileIcon}>
                <img src={pdf} alt="" />
            </div>
            <div className={styles.fileDetails}>
                <div className={styles.fileName}>{name}</div>
                <div className={styles.fileSize}>{size}</div>
            </div>
            <div className={styles.fileActions}>
                <span className={styles.actionIcon + ' ' + styles.email}></span>
                <span className={styles.actionIcon + ' ' + styles.download}></span>
                <span className={styles.actionIcon + ' ' + styles.delete}></span>
            </div>
        </div>
    );
}