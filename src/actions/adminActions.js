import { db, auth } from '../db';
import { setAdminDetails, updateNetmazeQuestions, updateNetmazeParticipants, setLogoutAdmin } from '../slices/AdminSlice';
import { collection, addDoc, getDocs, where, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { forEach } from 'underscore';
import { getLotNumber } from './generalActions';
import { filterByEvent } from '../utils/utils';
import _ from 'underscore';
export const handleAdminSignIn = async (dispatch, navigate, messageApi) => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // console.clear();
        const { email } = result.user;
        fetchAdminData(email, dispatch, messageApi, navigate)
    } catch (err) {
        console.log(err)
    }
}
export const fetchAdminData = async (email, dispatch, messageApi, navigate) => {
    try {
        const res = await getDocs(query(collection(db, "admins"), where("email", "==", email)))
        if (res.docs.length > 0) {
            const resultTeams = await getDocs(query(collection(db, "teams")));
            let teams = [], collegeWise = [], eventWise = [];
            getNetMazeQuestions(dispatch)
            getNetMazeParticipants(dispatch)
            if (resultTeams.docs.length > 0) {
                forEach(resultTeams.docs, (team) => {
                    teams.push(team.data());
                })
                collegeWise = _.groupBy(teams, (team) => {
                    return team.collegeName
                })
                eventWise = filterByEvent(teams);
                collegeWise = Object.fromEntries(Object.entries(collegeWise).sort())
            }
            dispatch(setAdminDetails({ teams, collegeWise, eventWise }))
            navigate('/admin/dashboard')
        } else {
            messageApi.open({
                type: "error",
                content: "Access Denied"
            })
        }
    } catch (err) {

    }
}

export const updateTeamDetails = async (data, lotNo) => {
    try {
        const docRef = await getDocs(query(collection(db, "teams"), where("lotNo", "==", lotNo)))
        const res = await updateDoc(docRef.docs[0].ref, data)
        alert(`Team ${lotNo} updated`)
        window.open('/admin/dashboard/', "_self");
    } catch (err) {
        console.log(err)
    }
}

export const addSpotRegistration = async (data, Modal) => {
    try {
        const existEmail = await getDocs(query(collection(db, "teams"), where("email", "==", data.email)))
        if (existEmail.docs.length > 0) {
            Modal.error({
                title: "Error",
                content: "Email already registered"
            })
        }
        else {
            const existTeam = await getDocs(query(collection(db, "teams"), where("collegeName", "==", data.collegeName), where("deptName", "==", data.deptName)));
            if (existTeam.docs.length > 0) {
                Modal.error({
                    title: "Error",
                    content: "Team already exist...Login to proceed"
                })
            }
            else {
                let lotNo = await getLotNumber()
                const docRef = await addDoc(collection(db, "teams"), { ...data, lotNo })
                Modal.success({
                    title: "Team Registered Successfully",
                    content: (
                        <h1>Lot Number : {lotNo}</h1>
                    ),
                    onOk() {
                        window.open('/admin/dashboard/', '_self')
                    }
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}
export const getNetMazeQuestions = async (dispatch) => {
    try {
        const ques = await getDocs(query(collection(db, "netmazeQuestions")));
        let ugQues = [], pgQues = [], alumniQues = [];
        if (ques.docs.length > 0) {
            forEach(ques.docs, (question) => {
                if (question.data().type == "UG")
                    ugQues.push(question.data())
                if (question.data().type == "PG")
                    pgQues.push(question.data())
                if (question.data().type == "ALUMNI")
                    alumniQues.push(question.data())
            })
            dispatch(updateNetmazeQuestions({ ugQuestions: ugQues, pgQuestions: pgQues, alumniQuestions: alumniQues }))
        }
    } catch (err) {
        console.log(err)
    }
}
export const addNetMazeQuestion = async (data, dispatch, messageApi) => {
    try {
        const docRef = await addDoc(collection(db, "netmazeQuestions"), data)
        messageApi.open({
            type: "success",
            content: "Question added"
        })
        getNetMazeQuestions(dispatch)
    } catch (err) {
        console.log(err)
    }
}

export const deleteNetMazeQuestions = async (data, dispatch, messageApi) => {
    try {
        const docRef = await getDocs(query(collection(db, "netmazeQuestions"), where("levelNumber", "==", data.levelNumber), where("type", "==", data.type)))
        const ref = await deleteDoc(docRef.docs[0].ref)
        messageApi.open({
            type: "success",
            content: "Question Deleted"
        })
        getNetMazeQuestions(dispatch);
    } catch (err) {
        console.log(err)
    }
}

export const getNetMazeParticipants = async (dispatch) => {
    try {
        const res = await getDocs(query(collection(db, "netmazeParticipants")));
        let participants = []
        if (res.docs.length > 0) {
            forEach(res.docs, (participant) => {
                participants.push(participant.data())
            })
            dispatch(updateNetmazeParticipants(participants))
        }
    } catch (err) {
        console.log(err)
    }
}

export const addNetMazeParticipant = async (data, dispatch, messageApi) => {
    try {
        const docRef = await addDoc(collection(db, "netmazeParticipants"), data)
        messageApi.open({
            type: "success",
            content: "Participant added"
        })
        getNetMazeParticipants(dispatch)
    } catch (err) {
        console.log(err)
    }
}
export const deleteNetMazeParticipants = async (data, dispatch, messageApi) => {
    try {
        const docRef = await getDocs(query(collection(db, "netmazeParticipants"), where("lotNo", "==", data)))
        const ref = await deleteDoc(docRef.docs[0].ref)
        messageApi.open({
            type: "success",
            content: "Participant Deleted"
        })
        getNetMazeParticipants(dispatch);
    } catch (err) {
        console.log(err)
    }
}

export const logoutAdmin = async (dispatch, navigate, messageApi) => {
    signOut(auth).then(() => {
        dispatch(setLogoutAdmin())
        messageApi.open({
            type: "success",
            content: "Logout Successfully"
        })
        navigate('/admin')
    }).catch((error) => {
        console.log(error);
    });
}
