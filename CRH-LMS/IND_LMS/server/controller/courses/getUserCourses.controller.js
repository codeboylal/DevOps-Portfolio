// const { ResponseHandler } = require("../../utils/responseHandler.js");
// const { Course } = require("../../models/course/course.model.js");
// const { User } = require("../../models/user.js");

// const getUserCoursesController = async (req, res) => {
//   try {
//     const { profileId, purchased, page, filter } = req.params;
//     let courseFilter = "All"
//     if(!filter || filter === undefined){
//       courseFilter = "All"
//     }else{
//       courseFilter = filter
//     }
//     if (!profileId || purchased === undefined) {
//       return res
//         .status(200)
//         .json(ResponseHandler(false, null, "No Id found in params"));
//     }

//     const isPurchased = purchased === "true"; // Convert string to boolean
//     const pageNumber = parseInt(page, 10) || 1;
//     const limit = 6; // Number of courses per page
//     const skip = (pageNumber - 1) * limit;

//     // Fetch user profile first
//     const profile = await User.findById(profileId);
//     if (!profile) {
//       return res
//         .status(200)
//         .json(ResponseHandler(false, null, "No user found in DB"));
//     }

//     // Convert purchasedCourses to a Map for quick lookup
//     const purchasedCoursesMap = new Map(
//       profile.purchasedCourses.map((uc) => [uc.courseId.toString(), uc])
//     );

//     // Fetch courses efficiently with `.lean()`
//     const courses = await Course.find().skip(skip).limit(limit).lean();

//     // Filter and map courses
//     const filteredCourses = courses
//       .map(
//         ({
//           _id,
//           name,
//           difficulty,
//           duration,
//           shortDesc,
//           image,
//           currency,
//           reviews,
//           lessons,
//           tag,
//           enrolledUsers,
//           reviewUsers,
//         }) => {
//           const courseIdStr = _id.toString();
//           const purchased =
//             enrolledUsers.includes(profileId) ||
//             reviewUsers.includes(profileId);

//           // Define conditional properties
//           const additionalFields = !isPurchased
//             ? {
//                 duration,
//                 currency,
//                 reviews,
//                 tag,
//                 difficulty,
//                 lessons,
//               }
//             : {
//                 courseStatus:
//                   purchasedCoursesMap.get(courseIdStr)?.courseStatus || null,
//                 userlessons:
//                   purchasedCoursesMap.get(courseIdStr)?.lessons || [],
//                 userModule: purchasedCoursesMap.get(courseIdStr)?.userModule,
//               };

//           return {
//             _id,
//             name,
//             image,
//             shortDesc,
//             purchased,
//             inReview: reviewUsers.includes(profileId),
//             ...additionalFields, // Spread only if `isPurchased` is false
//           };
//         }
//       )
//       .filter((course) =>
//         isPurchased ? course.purchased === isPurchased : true
//       );

//     // Fetch total count for pagination metadata
//     const totalCourses = isPurchased
//       ? filteredCourses.length
//       : await Course.countDocuments();
//     const totalPages = Math.ceil(totalCourses / limit);

//     return res.status(200).json(
//       ResponseHandler(
//         true,
//         {
//           courses: filteredCourses,
//           pagination: {
//             totalCourses,
//             totalPages,
//             currentPage: pageNumber,
//             limit,
//           },
//         },
//         "Courses Fetched Successfully"
//       )
//     );
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json(ResponseHandler(false, null, "Internal Server Error"));
//   }
// };

// module.exports = {
//   getUserCoursesController,
// };

const { ResponseHandler } = require("../../utils/responseHandler.js");
const { Course } = require("../../models/course/course.model.js");
const { User } = require("../../models/user.js");

const getUserCoursesController = async (req, res) => {
  try {
    const { profileId, purchased, page } = req.params;
    let courseFilter = req?.query?.filter || "All";
    const searchQuery = req?.query?.searchQuery ;
    if (!profileId || purchased === undefined) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No Id found in params"));
    }

    const isPurchased = purchased === "true"; // Convert string to boolean
    const pageNumber = parseInt(page, 10) || 1;
    const limit = 6; // Number of courses per page
    const skip = (pageNumber - 1) * limit;

    // Fetch user profile first
    const profile = await User.findById(profileId);
    if (!profile) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No user found in DB"));
    }

    // Convert purchasedCourses to a Map for quick lookup
    const purchasedCoursesMap = new Map(
      profile.purchasedCourses.map((uc) => [uc.courseId.toString(), uc])
    );

    // Fetch courses efficiently with `.lean()`
    let dbCourses = await Course.find().skip(skip).limit(limit).lean();

    if (searchQuery) {
      dbCourses = dbCourses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    

    let courses = [];
    // Apply filter logic
    if (courseFilter !== "All") {
      for (let course of dbCourses) {
        if (courseFilter === "Active") {
          courseFilter = "In Progress";
        }
        if (purchasedCoursesMap.get(course?._id?.toString())?.courseStatus === courseFilter) {
          courses.push(course);
        }
      }
    } else {
      courses = dbCourses;
    }


    

    // Filter and map courses
    const filteredCourses = courses
      .map(
        ({
          _id,
          name,
          difficulty,
          duration,
          shortDesc,
          image,
          currency,
          reviews,
          lessons,
          tag,
          enrolledUsers,
          reviewUsers,
        }) => {
          const courseIdStr = _id.toString();
          const purchased =
            enrolledUsers.includes(profileId) ||
            reviewUsers.includes(profileId);

          // Define conditional properties
          const additionalFields = !isPurchased
            ? {
                duration,
                currency,
                reviews,
                tag,
                difficulty,
                lessons,
              }
            : {
                courseStatus:
                  purchasedCoursesMap.get(courseIdStr)?.courseStatus || null,
                userlessons:
                  purchasedCoursesMap.get(courseIdStr)?.lessons || [],
                userModule: purchasedCoursesMap.get(courseIdStr)?.userModule,
              };

          return {
            _id,
            name,
            image,
            shortDesc,
            purchased,
            inReview: reviewUsers.includes(profileId),
            ...additionalFields, // Spread only if `isPurchased` is false
          };
        }
      )
      .filter((course) =>
        isPurchased ? course.purchased === isPurchased : true
      );

    // Fetch total count for pagination metadata
    const totalCourses = isPurchased
      ? filteredCourses.length
      : dbCourses.length;
    const totalPages = Math.ceil(totalCourses / limit);

    return res.status(200).json(
      ResponseHandler(
        true,
        {
          courses: filteredCourses,
          pagination: {
            totalCourses,
            totalPages,
            currentPage: pageNumber,
            limit,
          },
        },
        "Courses Fetched Successfully"
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  getUserCoursesController,
};
