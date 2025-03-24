const Course = require("../../Model/courseModel.js");
const ResponseHandler = require("../../utils/responseHandler.js"); 
const User = require("../../Model/UserModel/model.js")

const coursePurchase = async (req, res) => {
    try {
        // Await the result of the findOne query
        const course = await Course.findOne({ _id: req.body.courseId });

        // Check if the course exists
        if (!course) {
            return res.status(404).json(ResponseHandler(404, null, 'Course Not Found'));
        }

        if (req.body.tag === "Paid") {
            if (course?.ReviewStudents?.includes(req.body.userId)) {
                return res.status(400).json(ResponseHandler(400, course, 'User is Already in Review Students'));
            }

            // Initialize ReviewStudents if it's undefined
            course.ReviewStudents = course.ReviewStudents || [];
            course.ReviewStudents.push(req.body.userId);
        } else if (req.body.tag === "Free") {
            if (course?.EnrolledStudents?.includes(req.body.userId)) {
                return res.status(400).json(ResponseHandler(400, course, 'User is Already in Enrolled Students'));
            }

            // Initialize EnrolledStudents if it's undefined
            course.EnrolledStudents = course.EnrolledStudents || [];
            course.EnrolledStudents.push(req.body.userId);


            const user = await User.findOne({_id:req.body.userId});

            if(!user){
                return res.status(404).json(ResponseHandler(404, null, 'User Not Found'));
            }

            if(!user?.continueWatching){
                user.continueWatching = []
            }

            user?.continueWatching.push({
                courseId: req.body.courseId,
                id: user?.continueWatching?.length + 1,
                image: course.image,
                title: course.coursename,
                description: course.courseDescription,
                lessons: "0/"+course.courseLesson,
                progress: 0,
                startDate: "21-October-2024",
                completionDate:"",
                Grade: 0,
                courseInstructor: course?.courseInstructor,
                company: course?.courseEducator,
                Tag: course?.Tag
            })

            if(!user?.instructorsData){
                user.instructorsData = []
            }
            
            // console.log(((course?.courseInstructor[0]).split(" ")?.[1]).slice(0,4))
            user?.instructorsData.push([course?.courseInstructor[0], course?.coursename, (((course?.courseInstructor[0]).split(" "))?.[1])?.slice(0,4)])

            // console.log(user)
            // user.course.courseDetails[0][1] += 1
            // user.course.courseDetails[3][1]+=1

            await user.save()

        }

        // Save the updated course document
        await course.save();

        return res.status(200).json(ResponseHandler(200, course, 'Course Details updated successfully!'));
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    }
};


module.exports = coursePurchase;
