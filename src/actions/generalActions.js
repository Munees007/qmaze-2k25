import { db } from '../db';
import { collection, addDoc, getDocs, query, where,updateDoc } from 'firebase/firestore';
import { setGeneralState } from '../slices/GeneralSlice';

export const fetchData = async (dispatch) => {
    try {
        let data = { departments: [], colleges: [] };
        const deptData = await getDocs(collection(db, 'departments'))
        deptData.forEach((doc) => {
            data.departments.push(doc.data())
        })
        const collegeData = await getDocs(collection(db, 'colleges'))
        collegeData.forEach((doc) => {
            data.colleges.push(doc.data())
        })
        const generalData=await getDocs(collection(db,"general"));
        data={...data,general:generalData.docs[0].data()}
        dispatch(setGeneralState(data))
    } catch (err) {
        console.log(err)
    }
}

export const addNewCollege = async (dispatch, collegeName, messageApi) => {
    try {
        if (collegeName.trim() !== "") {
            const existName = await getDocs(query(collection(db, "colleges"), where("collegeName", "==", collegeName)))
            if (existName.docs.length > 0) {
                messageApi.open({
                    type: "error",
                    content: "College already exists"
                })
            }
            else {
                const addedCollege = await addDoc(collection(db, "colleges"), { collegeName })
                messageApi.open({
                    type: "success",
                    content: "College Name Added"
                })
                fetchData(dispatch)
            }
        }
        else {
            messageApi.open({
                type: "error",
                content: "Please provide college name"
            })
        }

    } catch (err) {
        console.log(err);
    }
}

export const addNewTeam = async (data, messageApi) => {
    try {
        const existEmail = await getDocs(query(collection(db, "teams"), where("email", "==", data.email)))
        if (existEmail.docs.length > 0) {
            messageApi.open({
                type: "error",
                content: "Email already registered"
            })
        }
        else {
            const existTeam = await getDocs(query(collection(db, "teams"), where("collegeName", "==", data.collegeName), where("deptName", "==", data.deptName)));
            if (existTeam.docs.length > 0) {
                messageApi.open({
                    type: "error",
                    content: "Team already exist...Login to proceed"
                })
            }
            else {
                const docRef = await addDoc(collection(db, "teams"), {...data,paymentType:"offline",paymentStatus:"pending",paymentProof:"",lotNo:await getLotNumber(),teamMembers:[],eventParticipants:[]})
                messageApi.open({
                    type: "success",
                    content: "Team Registered Login to continue"
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

//To Generate Lot Number 
export const getLotNumber=async()=>{
    const existTeams=await getDocs(query(collection(db,"teams")));
    return existTeams.docs.length+1
}

// export const handleNetmazeFlags=async(dispatch,data)=>{
//     try{
//         // const existTeams=await getDocs(query(collection(db,"general")));
//         const ref=await updateDoc(existTeams.docs[0].ref,{isNetmazeStarts:data?.isNetmazeStarts,publishNetmazeAnswerKey:data?.publishNetmazeAnswerKey})
//     }catch(err){
//         console.log(err);
//     }
// }