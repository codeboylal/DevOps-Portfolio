const signup = require("../../Models/Sign In Up/SignIn/signInModel.js")
const ResponseHandler = require("../../utils/responseHandler.js")

const getInbox = async (req, res) => {
    try {
        const userId = req?.body?.userId
        const profile = await signup.find({_id:userId})
        let inboxData = []
        if(profile){
            inboxData = profile[0]?.inbox
            let noDesignTask = []
            let data = []
            if(inboxData && inboxData.length > 0 ){
                for (let task of inboxData){
                    if (task?.subtask?.custom_item_id !== 1004 || item.custom_item_id !== 1005){
                        noDesignTask.push(task)
                    }
                }
                const filterData = noDesignTask?.filter(task=>{
                    return !task.completedStatus
                })
                const likeData = filterData?.filter(task=>{
                    return task.likeStatus
                })
                const unLikeData = filterData?.filter(task=>{
                    return !task.likeStatus
                })
                data = [...likeData, ...unLikeData]
            }
            return res.status(200).json(ResponseHandler(200, data, "Inbox data fetched successfully"));
        }
        return res.status(200).json(ResponseHandler(200, null, "No Profile Found"))

    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
    }
};


module.exports = {
    getInbox,
};
