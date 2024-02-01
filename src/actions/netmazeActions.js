import { db, auth } from '../db';
import { collection, addDoc, getDocs, where, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { encryptData, decryptData } from '../utils/utils';
import { setNetmazeUserData, setNetmazeQuestionData, setNetmazeUserLogout, incrementCurrentAttempt, setCurrentQuestion } from '../slices/NetmazeSlice';
import { setAnswerKey } from '../slices/AnswerKeySlice';
import { store } from '../store';

export const handleNetmazeLogin = async (dispatch, messageApi) => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.clear();
        const { email } = result.user;
        const res = await getDocs(query(collection(db, "netmazeParticipants"), where("email", "==", email)))
        if (res.docs.length > 0) {
            let resultData = res.docs[0].data();
            if (resultData?.isLogin) {
                messageApi.open({
                    type: "error",
                    content: "Already one device logged in"
                })
                return 0
            }
            else {
                fetchNetmazeData(email, dispatch, messageApi)
            }
        } else {
            messageApi.open({
                type: "error",
                content: "Access Denied"
            })
        }
    } catch (err) {
        console.log(err)
    }
}
export const fetchNetmazeData = async (email, dispatch, messageApi) => {
    try {
        const res = await getDocs(query(collection(db, "netmazeParticipants"), where("email", "==", email)))
        if (res.docs.length > 0) {
            let resultData = res.docs[0].data();
            if (!resultData?.isLogin) {
                const ref = await updateDoc(res.docs[0].ref, { isLogin: true })
            }
            const ques = await getDocs(query(collection(db, "netmazeQuestions"), where("type", "==", resultData.type)))
            let questions = []
            let currentQuestion = null
            ques.docs.forEach(element => {
                questions.push(element.data())
                if (resultData?.level == element.data().levelNumber)
                    currentQuestion = element.data()
            });
            messageApi.success("Logged in successfully");
            dispatch(setNetmazeQuestionData(encryptData(questions)))
            dispatch(setNetmazeUserData(encryptData(resultData)))
            dispatch(setCurrentQuestion(encryptData(currentQuestion)))
        } else {
            messageApi.open({
                type: "error",
                content: "Access Denied"
            })
        }
    } catch (err) {

    }
}

export const revealClue = async (data, dispatch, messageApi) => {
    console.log(data)
    try {
        const res = await getDocs(query(collection(db, "netmazeParticipants"), where("email", "==", data?.email), where("lotNo", "==", data?.lotNo)));
        const ref = await updateDoc(res.docs[0].ref, data)
        if (data?.currentAttempt == 100)
            messageApi.success("Clue one revealed")
        if (data?.currentAttempt == 200)
            messageApi.success("Clue two revealed")
        dispatch(setNetmazeUserData(encryptData(data)))
    } catch (err) {
        console.log(err);
    }
}
export const updateCurrentAttempt = async (dispatch, messageApi) => {
    try {
        dispatch(incrementCurrentAttempt())
        const userData = decryptData(store.getState().netmaze.userData);
        if (userData.currentAttempt == 100)
            revealClue(userData, dispatch, messageApi)
        if (userData.currentAttempt == 200)
            revealClue(userData, dispatch, messageApi)
    } catch (err) {
        console.log(err)
    }
}

export const levelUpgrade = async (dispatch, messageApi) => {
    try {
        let userData = decryptData(store.getState().netmaze.userData);
        let currentScore = 0;
        if (userData?.currentAttempt <= 100)
            currentScore = 10;
        else if (userData?.currentAttempt > 100 && userData?.currentAttempt <= 200)
            currentScore = 8;
        else
            currentScore = 5;
        userData = { ...userData, level: userData?.level + 1, totalAttempt: userData?.totalAttempt + userData?.currentAttempt, score: userData?.score + currentScore, currentAttempt: 0 }
        const res = await getDocs(query(collection(db, "netmazeParticipants"), where("email", "==", userData?.email), where("lotNo", "==", userData?.lotNo)));
        const ref = await updateDoc(res.docs[0].ref, userData)
        let ques = decryptData(store.getState().netmaze.questions);
        let currentQues = ques.filter((question) => {
            return question?.levelNumber == userData?.level
        })[0]
        messageApi.success("Level Upgraded 🔥")
        dispatch(setNetmazeUserData(encryptData(userData)));
        dispatch(setCurrentQuestion(encryptData(currentQues)))
    } catch (err) {
        console.log(err)
    }
}

export const fetchNetmazeResult = async (dispatch) => {
    try {
        const quesRes = await getDocs(query(collection(db, "netmazeQuestions")))
        const participantsRes = await getDocs(query(collection(db, "netmazeParticipants")))
        let ugq = [], pgq = [], aq = []
        if (quesRes.docs.length > 0) {
            quesRes.forEach(ques => {
                if (ques.data().type == "UG")
                    ugq.push(ques.data())
                if (ques.data().type == "PG")
                    pgq.push(ques.data())
                if (ques.data().type == "ALUMNI")
                    aq.push(ques.data())
            });
        }
        let ugp = [], pgp = [], ap = []
        if (participantsRes.docs.length > 0) {
            participantsRes.forEach(ques => {
                if (ques.data().type == "UG")
                    ugp.push(ques.data())
                if (ques.data().type == "PG")
                    pgp.push(ques.data())
                if (ques.data().type == "ALUMNI")
                    ap.push(ques.data())
            });
        }
        let questions={ug:ugq,pg:pgq,alumni:aq}
        let participants={ug:ugp,pg:pgp,alumni:ap}
        dispatch(setAnswerKey({questions,participants}))
    } catch (err) {
        console.log(err)
    }
}

export const logoutNetmazeParticipants = async (email, dispatch, messageApi) => {
    try {
        signOut(auth).then(async () => {
            const res = await getDocs(query(collection(db, "netmazeParticipants"), where("email", "==", email)))
            const ref = await updateDoc(res.docs[0].ref, { isLogin: false })
            messageApi.open({
                type: "success",
                content: "Logout successfully"
            })
            dispatch(setNetmazeUserLogout())
        })
    } catch (err) {
        console.log(err)
    }
}