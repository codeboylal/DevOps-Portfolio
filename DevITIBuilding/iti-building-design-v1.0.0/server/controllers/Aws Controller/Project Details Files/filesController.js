// const { s3 } = require('../../../config/awsConfig');
// const File = require('../../../Models/AWS Model/Project Details/filesModel');
// const {FileNaming} = require('../../../Models/projects/fileNamingSystem');


// // const getFiles = async (req, res) => {
// //   const bucketName = process.env.AWS_BUCKET_NAME;
// //   const { jobType, projectFolder } = req.query;

// //   if (!jobType || !projectFolder) {
// //     return res.status(400).json({ error: "Missing required parameters: jobType and projectFolder" });
// //   }

// //   try {
// //     // Step 1: List all folders under the job type (jobs_running or jobs_completed)
// //     const listParams = {
// //       Bucket: bucketName,
// //       Prefix: `${jobType}/`, // List all folders inside jobs_running or jobs_completed
// //       Delimiter: "/3) PDF/5) BUILDING PERMIT/",
// //     };

// //     const listedObjects = await s3.listObjectsV2(listParams).promise();

// //     // Step 2: Find the correct project folder (e.g., "813_PERSAUD_LOT 1251, 19 BISTRE ROAD, TARNEIT 3029/")
// //     const matchingFolder = listedObjects.CommonPrefixes.find(folder =>
// //       folder.Prefix.startsWith(`${jobType}/${projectFolder}_`)
// //     );

// //     if (!matchingFolder) {
// //       return res.status(404).json({ error: `No matching folder found for project: ${projectFolder}` });
// //     }

// //     const fullProjectFolder = matchingFolder.Prefix; // Example: "jobs_running/813_PERSAUD_LOT 1251, 19 BISTRE ROAD, TARNEIT 3029/"

// //     // Step 3: Fetch files from the correct project folder
// //     const params = {
// //       Bucket: bucketName,
// //       Prefix: fullProjectFolder, // Use the full folder name dynamically
// //     };

// //     const data = await s3.listObjectsV2(params).promise();

// //     if (!data.Contents || data.Contents.length === 0) {
// //       return res.status(404).json({ error: "No files found in S3." });
// //     }

// //     const pdfFiles = data.Contents.filter(file => file.Key.toLowerCase().endsWith(".pdf"));

// //     if (pdfFiles.length === 0) {
// //       return res.status(404).json({ error: "No PDF files found in S3." });
// //     }

// //     const files = pdfFiles.map((file) => {
// //       const fileName = file.Key.split("/").pop();
// //       const folder = file.Key.substring(0, file.Key.length - fileName.length).trim();
// //       console.log("File Name:", fileName.match(/[^_]+$/)[0]);
// //       return {
// //         name: fileName,
// //         folder: folder,
// //         // size: file.Size || "Unknown",
// //         size: file.Size ? `${(file.Size / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
// //         lastModified: file.LastModified || "Unknown",
// //       };

// //     });

// //     const fileNames = await FileNaming.find()

  

// //     // const fileNamesArray = fileNames.map((file) => {
// //     //   return (
// //     //     console.log(file?.data?.custom_fields[3]?.value)
// //     // )
    
// //     // })
// //     const fileNamesArray = fileNames.map((file) => {
// //       if (!Array.isArray(file?.data?.custom_fields)) {
// //         console.log("custom_fields is missing or not an array");
// //         return;
// //       }
// //       console.log("Filesss",file?.data?.name.match(/[^_]+$/)[0]);
    
// //       const portalField = file?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value ;

    
// //       console.log('PortalNaming',portalField ?? "portal Naming not found");
// //     });
    

// //     res.json(files);
// //   } catch (error) {
// //     console.error("AWS S3 Error:", error);
// //     res.status(500).json({ error: "Error fetching files from S3", details: error.message });
// //   }
// // };



// // const getFiles = async (req, res) => {
// //   const bucketName = process.env.AWS_BUCKET_NAME;
// //   const { jobType, projectFolder } = req.query;

// //   if (!jobType || !projectFolder) {
// //     return res.status(400).json({ error: "Missing required parameters: jobType and projectFolder" });
// //   }

// //   try {
// //     // Step 1: List all folders under the job type (jobs_running or jobs_completed)
// //     const listParams = {
// //       Bucket: bucketName,
// //       Prefix: `${jobType}/`,
// //       Delimiter: "/3) PDF/5) BUILDING PERMIT/",
// //     };

// //     const listedObjects = await s3.listObjectsV2(listParams).promise();

// //     // Step 2: Find the correct project folder
// //     const matchingFolder = listedObjects.CommonPrefixes.find(folder =>
// //       folder.Prefix.startsWith(`${jobType}/${projectFolder}_`)
// //     );

// //     if (!matchingFolder) {
// //       return res.status(404).json({ error: `No matching folder found for project: ${projectFolder}` });
// //     }

// //     const fullProjectFolder = matchingFolder.Prefix;

// //     // Step 3: Fetch files from the correct project folder
// //     const params = {
// //       Bucket: bucketName,
// //       Prefix: fullProjectFolder,
// //     };

// //     const data = await s3.listObjectsV2(params).promise();

// //     if (!data.Contents || data.Contents.length === 0) {
// //       return res.status(404).json({ error: "No files found in S3." });
// //     }

// //     const pdfFiles = data.Contents.filter(file => file.Key.toLowerCase().endsWith(".pdf"));

// //     if (pdfFiles.length === 0) {
// //       return res.status(404).json({ error: "No PDF files found in S3." });
// //     }

// //     // Fetch Portal Naming data
// //     const fileNames = await FileNaming.find();

// //     // Log available portal names for debugging
// //     console.log("Available Portal Naming Entries:");
// //     fileNames.forEach((file) => {
// //       const portalField = file?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value;
// //       console.log(portalField);
// //     });

// //     // Process file names
// //     const files = pdfFiles.map((file) => {
// //       const fileName = file.Key.split("/").pop();
// //       // const extractedFileName = fileName.match(/[^_]+$/)?.[0]?.trim().toLowerCase() || "Unknown";
// //       // const extractedFileName = fileName.replace(/\.pdf$/i, "").trim().toLowerCase();
// //       const extractedFileName = fileName.match(/[^_]+$/)?.[0]?.replace(/\.pdf$/i, "").trim().toLowerCase() || "Unknown";


// //       const folder = file.Key.substring(0, file.Key.length - fileName.length).trim();

// //       // Find matching portalField
// //       const matchingPortalFile = fileNames.find((file) => {
// //         const portalField = file?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value;
// //         if (!portalField) return false;
// //         return portalField.trim().toLowerCase() === extractedFileName;
// //       });

      

// //       console.log(`Checking: ${extractedFileName} -> Match Found: ${matchingPortalFile ? "Yes" : "No"}`);

// //       return {
// //         name: fileName,
// //         folder: folder,
// //         size: file.Size ? `${(file.Size / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
// //         lastModified: file.LastModified || "Unknown",
// //         portalNaming: matchingPortalFile ? extractedFileName : "No File Name Found",
// //       };
// //     });

// //     res.json(files);
// //   } catch (error) {
// //     console.error("AWS S3 Error:", error);
// //     res.status(500).json({ error: "Error fetching files from S3", details: error.message });
// //   }
// // };

// // const getFiles = async (req, res) => {
// //   const bucketName = process.env.AWS_BUCKET_NAME;
// //   const { jobType, projectFolder } = req.query;

// //   if (!jobType || !projectFolder) {
// //     return res.status(400).json({ error: "Missing required parameters: jobType and projectFolder" });
// //   }

// //   try {
// //     const listParams = {
// //       Bucket: bucketName,
// //       Prefix: `${jobType}/`,
// //       Delimiter: "/3) PDF/5) BUILDING PERMIT/",
// //     };

// //     const listedObjects = await s3.listObjectsV2(listParams).promise();
// //     const matchingFolder = listedObjects.CommonPrefixes.find(folder =>
// //       folder.Prefix.startsWith(`${jobType}/${projectFolder}_`)
// //     );

// //     if (!matchingFolder) {
// //       return res.status(404).json({ error: `No matching folder found for project: ${projectFolder}` });
// //     }

// //     const fullProjectFolder = matchingFolder.Prefix;
// //     const params = { Bucket: bucketName, Prefix: fullProjectFolder };
// //     const data = await s3.listObjectsV2(params).promise();

// //     if (!data.Contents || data.Contents.length === 0) {
// //       return res.status(404).json({ error: "No files found in S3." });
// //     }

// //     const pdfFiles = data.Contents.filter(file => file.Key.toLowerCase().endsWith(".pdf"));

// //     if (pdfFiles.length === 0) {
// //       return res.status(404).json({ error: "No PDF files found in S3." });
// //     }

// //     const fileNames = await FileNaming.find();

// //     const files = pdfFiles.map((file) => {
// //       const fileName = file.Key.split("/").pop();
// //       // const extractedFileName = fileName.match(/[^_]+$/)?.[0] || "Unknown";
// //       const extractedFileName = fileName.replace(/\.pdf$/i, "").match(/[^_]+$/)?.[0] || "Unknown";

// //       const folder = file.Key.substring(0, file.Key.length - fileName.length).trim();

// //       console.log("File Name:", extractedFileName);

// //       const matchingPortalFile = fileNames.find((dbFile) => {
// //         const dbExtractedFileName = dbFile?.data?.name?.match(/[^_]+$/)?.[0];
// //         console.log("Filesss:", dbExtractedFileName);
// //         return dbExtractedFileName === extractedFileName;
// //       });

// //       const portalField = matchingPortalFile
// //         ? matchingPortalFile?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value
// //         : " No File Name Found";

// //         console.log("Portal Field:", portalField);

// //       return {
// //         name: fileName,
// //         folder: folder,
// //         size: file.Size ? `${(file.Size / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
// //         lastModified: file.LastModified || "Unknown",
// //         portalNaming: portalField,
// //       };
// //     });

// //     res.json(files);
// //   } catch (error) {
// //     console.error("AWS S3 Error:", error);
// //     res.status(500).json({ error: "Error fetching files from S3", details: error.message });
// //   }
// // };



// const getFiles = async (req, res) => {
//   const bucketName = process.env.AWS_BUCKET_NAME;
//   const { jobType, projectFolder } = req.query;

//   if (!jobType || !projectFolder) {
//     return res.status(400).json({ error: "Missing required parameters: jobType and projectFolder" });
//   }

//   try {
//     const listParams = {
//       Bucket: bucketName,
//       Prefix: `${jobType}/`,
//       Delimiter: "/3) PDF/5) BUILDING PERMIT/",
//     };

//     const listedObjects = await s3.listObjectsV2(listParams).promise();
//     const matchingFolder = listedObjects.CommonPrefixes.find(folder =>
//       folder.Prefix.startsWith(`${jobType}/${projectFolder}_`)
//     );

//     if (!matchingFolder) {
//       return res.status(404).json({ error: `No matching folder found for project: ${projectFolder}` });
//     }

//     const fullProjectFolder = matchingFolder.Prefix;
//     const params = { Bucket: bucketName, Prefix: fullProjectFolder };
//     const data = await s3.listObjectsV2(params).promise();

//     if (!data.Contents || data.Contents.length === 0) {
//       return res.status(404).json({ error: "No files found in S3." });
//     }

//     const pdfFiles = data.Contents.filter(file => file.Key.toLowerCase().endsWith(".pdf"));

//     if (pdfFiles.length === 0) {
//       return res.status(404).json({ error: "No PDF files found in S3." });
//     }

//     const fileNames = await FileNaming.find();

//     const files = pdfFiles.map((file) => {
//       const fileName = file.Key.split("/").pop();
//       const extractedFileName = fileName.replace(/\.pdf$/i, "").match(/[^_]+$/)?.[0] || "Unknown";

//       const normalizedExtractedFileName = extractedFileName.trim().toLowerCase(); // Trim and lowercase

//       const folder = file.Key.substring(0, file.Key.length - fileName.length).trim();

//       // console.log("File Name:", normalizedExtractedFileName);

//       const matchingPortalFile = fileNames.find((dbFile) => {
//         if (!dbFile?.data?.name) return false;

//         const dbExtractedFileName = dbFile.data.name.replace(/\.pdf$/i, "").match(/[^_]+$/)?.[0] || "";
//         const normalizedDbExtractedFileName = dbExtractedFileName.trim().toLowerCase(); // Trim and lowercase

//         // console.log("Filesss:", normalizedDbExtractedFileName);

//         return normalizedDbExtractedFileName === normalizedExtractedFileName;
//       });

//       const portalField = matchingPortalFile
//         ? matchingPortalFile?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value
//         : "-";

//       // console.log("Portal Field:", portalField);

//       return {
//         name: fileName,
//         folder: folder,
//         size: file.Size ? `${(file.Size / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
//         lastModified: file.LastModified || "Unknown",
//         portalNaming: portalField,
//       };
//     });

//     res.json(files);
//   } catch (error) {
//     console.error("AWS S3 Error:", error);
//     res.status(500).json({ error: "Error fetching files from S3", details: error.message });
//   }
// };










// const downloadFile = async (req, res) => {
//   try {
//     let { key } = req.query;

//     if (!key) {
//       console.error(" No key provided");
//       return res.status(400).json({ error: "Invalid file key" });
//     }

//     //  Decode the key properly
//     const decodedKey = decodeURIComponent(key);
//     console.log("Decoded S3 Key:", decodedKey);

//     const bucketName = process.env.AWS_BUCKET_NAME;

//     //  Check if file exists
//     try {
//       await s3.headObject({ Bucket: bucketName, Key: decodedKey }).promise();
//       console.log(" File exists in S3:", decodedKey);
//     } catch (err) {
//       console.error(" File not found:", decodedKey);
//       return res.status(404).json({ error: "File not found in S3" });
//     }

//     //  Generate signed URL
//     const params = {
//       Bucket: bucketName,
//       Key: decodedKey,
//       Expires: 3600, // 1-hour expiry
//     };

//     const signedUrl = await s3.getSignedUrlPromise("getObject", params);

//     console.log(" Signed URL generated:", signedUrl);
//     res.json({ url: signedUrl });

//   } catch (error) {
//     console.error(" Server error:", error);
//     res.status(500).json({ error: "Failed to generate signed URL" });
//   }
// };



// const previewFile = async (req, res) => {
//   try {
//     let { key } = req.query;
//     if (!key) {
//       return res.status(400).json({ error: "Invalid file key" });
//     }

//     const decodedKey = decodeURIComponent(key);
//     const bucketName = process.env.AWS_BUCKET_NAME;

//     try {
//       await s3.headObject({ Bucket: bucketName, Key: decodedKey }).promise();
//     } catch (err) {
//       return res.status(404).json({ error: "File not found in S3" });
//     }

//     // Get file extension
//     const extension = decodedKey.split('.').pop().toLowerCase();
//     const previewableFormats = ["pdf", "jpg", "jpeg", "png", "gif", "txt"];

//     if (!previewableFormats.includes(extension)) {
//       return res.status(400).json({ error: "Preview not supported for this file type." });
//     }

//     // Generate signed URL with inline Content-Disposition
//     const params = {
//       Bucket: bucketName,
//       Key: decodedKey,
//       Expires: 3600, // 1-hour expiry
//       ResponseContentDisposition: "inline", // Forces browser preview
//       ResponseContentType: getMimeType(extension), // Ensures proper content type
//     };

//     const signedUrl = await s3.getSignedUrlPromise("getObject", params);
//     res.json({ url: signedUrl });

//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate preview URL" });
//   }
// };

// // Helper function to determine MIME type
// const getMimeType = (extension) => {
//   const mimeTypes = {
//     pdf: "application/pdf",
//     jpg: "image/jpeg",
//     jpeg: "image/jpeg",
//     png: "image/png",
//     gif: "image/gif",
//     txt: "text/plain",
//   };
//   return mimeTypes[extension] || "application/octet-stream";
// };


// module.exports = { getFiles, downloadFile, previewFile };



const { s3 } = require('../../../config/awsConfig');
const File = require('../../../Models/AWS Model/Project Details/filesModel');
const {FileNaming} = require('../../../Models/projects/fileNamingSystem');



// const getFiles = async (req, res) => {
//   const bucketName = process.env.AWS_BUCKET_NAME;
//   const { jobType, projectFolder } = req.query;

//   if (!jobType || !projectFolder) {
//     return res.status(400).json({ error: "Missing required parameters: jobType and projectFolder" });
//   }

//   try {
//     const listParams = {
//       Bucket: bucketName,
//       Prefix: `${jobType}/`,
      // Delimiter: "/3) PDF/5) BUILDING PERMIT/",
//       // Prefix: `${jobType}/${projectFolder}_/3) PDF/5) BUILDING PERMIT/`,
//     };

//     const listedObjects = await s3.listObjectsV2(listParams).promise();
//     const matchingFolder = listedObjects.CommonPrefixes.find(folder =>
//       folder.Prefix.startsWith(`${jobType}/${projectFolder}_`)
//     );

//     if (!matchingFolder) {
//       return res.status(404).json({ error: `No matching folder found for project: ${projectFolder}` });
//     }

//     const fullProjectFolder = matchingFolder.Prefix;
//     const params = { Bucket: bucketName, Prefix: fullProjectFolder };
//     const data = await s3.listObjectsV2(params).promise();

//     if (!data.Contents || data.Contents.length === 0) {
//       return res.status(404).json({ error: "No files found in S3." });
//     }

//     const pdfFiles = data.Contents.filter(file => file.Key.toLowerCase().endsWith(".pdf"));

//     if (pdfFiles.length === 0) {
//       return res.status(404).json({ error: "No PDF files found in S3." });
//     }

//     const fileNames = await FileNaming.find();

//     const files = pdfFiles.map((file) => {
//       const fileName = file.Key.split("/").pop();
//       const extractedFileName = fileName.replace(/\.pdf$/i, "")?.split("_")?.[1] || "Unknown";

//       const normalizedExtractedFileName = extractedFileName.trim().toLowerCase(); // Trim and lowercase

//       const folder = file.Key.substring(0, file.Key.length - fileName.length).trim();

//       // console.log("File Name:", normalizedExtractedFileName);

//       const matchingPortalFile = fileNames.find((dbFile) => {
//         if (!dbFile?.data?.name) return false;

//         const dbExtractedFileName = dbFile?.data?.name?.replace(/\.pdf$/i, "")?.split("_")?.[1] || "";
//         const normalizedDbExtractedFileName = dbExtractedFileName.trim().toLowerCase(); // Trim and lowercase

//         // console.log("Filesss:", normalizedDbExtractedFileName);

//         return normalizedDbExtractedFileName === normalizedExtractedFileName;
//         // return normalizedDbExtractedFileName.includes(normalizedExtractedFileName)
//       });

//       const portalField = matchingPortalFile
//         ? matchingPortalFile?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value
//         : "-";

//       // console.log("Portal Field:", portalField);

//       return {
//         name: fileName,
//         folder: folder,
//         size: file.Size ? `${(file.Size / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
//         lastModified: file.LastModified || "Unknown",
//         portalNaming: portalField,
//       };
//     });

//     res.json(files);
//   } catch (error) {
//     console.error("AWS S3 Error:", error);
//     res.status(500).json({ error: "Error fetching files from S3", details: error.message });
//   }
// };





const getFiles = async (req, res) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const { jobType, projectFolder } = req.query;

  if (!jobType || !projectFolder) {
    return res.status(400).json({ error: "Missing required parameters: jobType and projectFolder" });
  }

  try {
    // Step 1: Find the project folder dynamically
    const listParams = {
      Bucket: bucketName,
      Prefix: `${jobType}/`,
      Delimiter: "/",
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();
    const matchingFolder = listedObjects.CommonPrefixes.find(folder =>
      folder.Prefix.startsWith(`${jobType}/${projectFolder}_`)
    );

    if (!matchingFolder) {
      return res.status(404).json({ error: `No matching folder found for project: ${projectFolder}` });
    }

    const fullProjectFolder = matchingFolder.Prefix;

    // Step 2: Fetch only files directly inside "5) BUILDING PERMIT"
    const targetPrefix = `${fullProjectFolder}3) PDF/5) BUILDING PERMIT/`;

    const params = {
      Bucket: bucketName,
      Prefix: targetPrefix,  // Fetch from this folder
      Delimiter: "/",         // Do not fetch files inside subfolders
    };

    const data = await s3.listObjectsV2(params).promise();

    if (!data.Contents || data.Contents.length === 0) {
      return res.status(404).json({ error: "No files found in S3." });
    }

    // Step 3: Filter only PDF files
    const pdfFiles = data.Contents.filter(file => file.Key.toLowerCase().endsWith(".pdf"));

    if (pdfFiles.length === 0) {
      return res.status(404).json({ error: "No PDF files found in S3." });
    }

    // Step 4: Match file names with Portal Naming
    const fileNames = await FileNaming.find();

    const files = pdfFiles.map((file) => {
      const fileName = file.Key.split("/").pop();
      // const extractedFileName = fileName?.match(/JOBNO_[0-9]+/i)?.[0]?.replace(/\.pdf$/i, "") || "-";

      const extractedFileName = fileName?.replace(/^[0-9]+_/, "")?.replace(/\.pdf$/i, "")?.trim() || "-";




      const normalizedExtractedFileName = extractedFileName.trim().toLowerCase();

      const folder = file.Key.substring(0, file.Key.length - fileName.length).trim();

      const matchingPortalFile = fileNames.find((dbFile) => {
        if (!dbFile?.data?.name) return false;

        const dbExtractedFileName = dbFile?.data?.name?.match(/JOBNO_(.*)/i)?.[1] || fileName?.data?.name?.replace(/\.pdf$/i, "") || "-";
        // console.log(extractedFileName , dbExtractedFileName)
        const normalizedDbExtractedFileName = dbExtractedFileName.trim().toLowerCase();
        return normalizedExtractedFileName.includes(normalizedDbExtractedFileName);
      });

      const portalField = matchingPortalFile
        ? matchingPortalFile?.data?.custom_fields?.find(field => field?.name === "Portal Naming")?.value
        : "-";

      return {
        name: fileName,
        folder: folder,
        size: file.Size ? `${(file.Size / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
        lastModified: file.LastModified || "Unknown",
        portalNaming: portalField,
      };
    });

    res.json(files);
  } catch (error) {
    console.error("AWS S3 Error:", error);
    res.status(500).json({ error: "Error fetching files from S3", details: error.message });
  }
};










const downloadFile = async (req, res) => {
  try {
    let { key } = req.query;

    if (!key) {
      console.error(" No key provided");
      return res.status(400).json({ error: "Invalid file key" });
    }

    //  Decode the key properly
    const decodedKey = decodeURIComponent(key);
    console.log("Decoded S3 Key:", decodedKey);

    const bucketName = process.env.AWS_BUCKET_NAME;

    //  Check if file exists
    try {
      await s3.headObject({ Bucket: bucketName, Key: decodedKey }).promise();
      console.log(" File exists in S3:", decodedKey);
    } catch (err) {
      console.error(" File not found:", decodedKey);
      return res.status(404).json({ error: "File not found in S3" });
    }

    //  Generate signed URL
    const params = {
      Bucket: bucketName,
      Key: decodedKey,
      Expires: 3600, // 1-hour expiry
    };

    const signedUrl = await s3.getSignedUrlPromise("getObject", params);

    console.log(" Signed URL generated:", signedUrl);
    res.json({ url: signedUrl });

  } catch (error) {
    console.error(" Server error:", error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};



const previewFile = async (req, res) => {
  try {
    let { key } = req.query;
    if (!key) {
      return res.status(400).json({ error: "Invalid file key" });
    }

    const decodedKey = decodeURIComponent(key);
    const bucketName = process.env.AWS_BUCKET_NAME;

    try {
      await s3.headObject({ Bucket: bucketName, Key: decodedKey }).promise();
    } catch (err) {
      return res.status(404).json({ error: "File not found in S3" });
    }

    // Get file extension
    const extension = decodedKey.split('.').pop().toLowerCase();
    const previewableFormats = ["pdf", "jpg", "jpeg", "png", "gif", "txt"];

    if (!previewableFormats.includes(extension)) {
      return res.status(400).json({ error: "Preview not supported for this file type." });
    }

    // Generate signed URL with inline Content-Disposition
    const params = {
      Bucket: bucketName,
      Key: decodedKey,
      Expires: 3600, // 1-hour expiry
      ResponseContentDisposition: "inline", // Forces browser preview
      ResponseContentType: getMimeType(extension), // Ensures proper content type
    };

    const signedUrl = await s3.getSignedUrlPromise("getObject", params);
    res.json({ url: signedUrl });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate preview URL" });
  }
};

// Helper function to determine MIME type
const getMimeType = (extension) => {
  const mimeTypes = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    txt: "text/plain",
  };
  return mimeTypes[extension] || "application/octet-stream";
};


module.exports = { getFiles, downloadFile, previewFile };