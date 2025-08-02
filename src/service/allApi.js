import commonAPI from "./commonAPI"
import SERVER_URL from "./server"
// add a transaction
export const addTransactionAPI=async(reqBody)=>{
    return await commonAPI('post',`${SERVER_URL}/transactions`,reqBody)
}
// add a new user api
export const addUserAPI=async(reqBody)=>{
    return await commonAPI('post',`${SERVER_URL}/users`,reqBody)
}
// api for login
export const loginUserAPI=async()=>{
    return await commonAPI('get',`${SERVER_URL}/users`,'')
}
// api to get full transaction history
export const getAllTransactionsAPI=async()=>{
    return await commonAPI('get',`${SERVER_URL}/transactions`,'')
}
// api to add a comment
export const addCommentAPI=async(reqBody)=>{
    return await commonAPI('post',`${SERVER_URL}/comments`,reqBody)
}
// api to get all comments data
export const getAllCommentsAPI=async()=>{
    return await commonAPI('get',`${SERVER_URL}/comments`,'')
}
// api to add a reply comment
export const AddReplyCommentAPI=async(commentId,reqBody)=>{
    return await commonAPI('put',`${SERVER_URL}/comments/${commentId}`,reqBody)
}
// api to get all user data
export const getAllUserDataAPI=async()=>{
    return await commonAPI('get',`${SERVER_URL}/users`,'')
}
// api to delete a comment
export const deleteCommentAPI=async(commentId)=>{
    return await commonAPI('delete',`${SERVER_URL}/comments/${commentId}`,'')
}
// api to update a user
export const updateUserRoleAPI=async(userId,reqBody)=>{
    return await commonAPI('put',`${SERVER_URL}/users/${userId}`,reqBody)
}
// api to delete a user 
export const deleteUserAPI=async(userId)=>{
    return await commonAPI('delete',`${SERVER_URL}/users/${userId}`,'')
}