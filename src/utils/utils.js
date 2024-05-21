import { Table, Tag, Space, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { store } from '../store';
import _ from 'underscore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import header from '../assets/header.jpg';
import { deleteNetMazeQuestions, deleteNetMazeParticipants } from '../actions/adminActions';
var cryptjs = require('crypto-js');


const teamsTableColumns = [
    {
        title: 'Lotno',
        dataIndex: 'lotNo',
        key: 'lotNo'
    },
    {
        title: 'Dept Type',
        dataIndex: 'deptType',
        key: 'deptType',
        render: (text) => <Tag color='blue'>{text}</Tag>
    },
    {
        title: 'Department',
        dataIndex: 'deptName',
        key: 'deptName',
    },
    {
        title: 'Head counts',
        dataIndex: 'counts',
        key: 'counts',
    },
    {
        title: 'Action',
        key: 'lotNo',
        dataIndex: "lotNo",
        render: (lotNo) => (
            <Space size="middle">
                <Link to={`/admin/dashboard/team?lotno=${lotNo}`}>Edit</Link>
                <Button type='link' onClick={() => {
                    generateTeamReport(lotNo)
                }}>Report</Button>
            </Space>
        ),
    },
];

const eventMembersTableColumn = [
    {
        title: 'Sno',
        dataIndex: 'sno',
        key: 'sno'
    },
    {
        title: 'Lot Number',
        dataIndex: 'lotNo',
        key: 'lotNo',
    },
    {
        title: 'Participants',
        dataIndex: 'members',
        key: 'members',
        render: (_, { members }) => (
            <>
                {
                    members.map((member, index) => {
                        return <div key={index}>{member}</div>
                    })
                }
            </>
        )
    },
    {
        title: 'College Name',
        dataIndex: 'collegeName',
        key: 'collegeName',
    }
]

const netmazeQuestionTableColumn = [
    {
        title: 'Level',
        dataIndex: 'levelNumber',
        key: 'levelNumber'
    },
    {
        title: 'Question',
        dataIndex: 'questionName',
        key: 'questionName'
    },
    {
        title: 'Image',
        dataIndex: 'questionUrl',
        key: 'questionUrl',
        render: (data) => (
            <Space size="middle">
                <Image src={data} width={80} />
            </Space>
        )
    },
    {
        title: 'Clue 1',
        dataIndex: 'clueOne',
        key: 'clueOne',
    },
    {
        title: 'Clue 2',
        dataIndex: 'clueTwo',
        key: 'clueTwo',
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
    },
    {
        title: 'Action',
        key: 'deleteData',
        dataIndex: "deleteData",
        render: (data) => (
            <Space size="middle">
                <Button type='link' onClick={() => {
                    deleteNetMazeQuestions(data, data.dispatch, data.messageApi);
                }}>Delete</Button>
            </Space>
        ),
    },
];

const netmazeAnswerKeyColumn = [
    {
        title: 'Level',
        dataIndex: 'levelNumber',
        key: 'levelNumber'
    },
    {
        title: 'Question',
        dataIndex: 'questionName',
        key: 'questionName'
    },
    {
        title: 'Image',
        dataIndex: 'questionUrl',
        key: 'questionUrl',
        render: (data) => (
            <Space size="middle">
                <Image src={data} width={80} />
            </Space>
        )
    },
    {
        title: 'Clue 1',
        dataIndex: 'clueOne',
        key: 'clueOne',
    },
    {
        title: 'Clue 2',
        dataIndex: 'clueTwo',
        key: 'clueTwo',
    },
    {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
    }
];

const netmazeParticipantsTableColumn = [
    {
        title: 'Lot Number',
        dataIndex: 'lotNo',
        key: 'lotNo'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'CollegeName',
        dataIndex: 'collegeName',
        key: 'collegeName',
    },
    {
        title: 'Action',
        key: 'deleteData',
        dataIndex: "deleteData",
        render: (data) => (
            <Space size="middle">
                <Button type='link' onClick={() => {
                    deleteNetMazeParticipants(data.lotNo, data.dispatch, data.messageApi);
                }}>Delete</Button>
            </Space>
        ),
    },
];

const netmazeLeaderboard = [
    {
        title: "Rank",
        dataIndex: "rank",
        key: "rank"
    },
    {
        title: 'Lot Number',
        dataIndex: 'lotNo',
        key: 'lotNo'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level'
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score'
    },
    {
        title: 'CollegeName',
        dataIndex: 'collegeName',
        key: 'collegeName',
    },
    {
        title: 'Total Attempt',
        dataIndex: 'totalAttempt',
        key: 'totalAttempt',
    }
];

export const generateTeamReport = (lotNo) => {

    const teams = store.getState()?.admin?.data?.teams;

    const team = _.find(teams, (teamIteratee) => { return teamIteratee.lotNo == lotNo })

    var doc = new jsPDF({ format: "a4" });

    var teamData = team?.teamMembers.map((teamMember) => {
        return [teamMember.name, teamMember.email]
    })

    var eventData = team?.eventParticipants.map((event) => {
        return [event.eventName, event.members]
    })

    const pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.addImage(header, "PNG", 15, 0, 180, 40);
    doc.setFontSize(14);
    doc.text("DEPARTMENT OF COMPUTER APPLICATIONS", pageWidth / 2, 44, { align: "center" });
    doc.setFontSize(12);
    doc.text("QMAZE 2K24 - State Level Technical Symposium", pageWidth / 2, 52, { align: "center" });
    doc.setFont("helvetica", "normal", "normal");
    doc.setFontSize(10);
    doc.text(`Lot Number : ${team?.lotNo}`, 15, 68);
    doc.text(`College : ${team?.collegeName}`, 80, 68);
    doc.text(`Department : ${team?.deptName} [${team?.deptType}]`, 15, 73);
    doc.text(`Payment Status : ${team?.paymentStatus}`, 80, 73);
    doc.text(`${team?.name}`, 15, 83);
    doc.text(`${team?.email}`, 15, 88);
    doc.text(`${team?.contactNumber}`, 15, 93);

    doc.setFontSize(12);
    doc.text("Team Members", 15, 103);

    doc.autoTable({
        head: [['Name', 'Email']],
        body: teamData,
        startY: 108,
        styles: {
            fontSize: 8
        }
    })

    doc.text("Event Members", 15, 213);
    doc.autoTable({
        head: [['Event Name', 'Participants']],
        body: eventData,
        startY: 218,
        styles: {
            fontSize: 8
        }
    })

    doc.save(`${team?.lotNo}.pdf`);

}

export const generateEventReport = (data, type) => {
    var doc = new jsPDF({ format: "a4" })

    const events = store.getState()?.general?.data?.general.events;

    var participantsData = data?.map((value, index) => {
        var members = "";
        value?.members.map((mem) => {
            members += mem + "\n"
        })
        return [index + 1, value?.lotNo, members, value?.collegeName]
    })

    var eventInfo = null;
    if (type == "PG") {
        eventInfo = events?.pgEvents.filter((event) => {
            return event.eventName === data[0].eventName
        })[0]
    }
    if (type == "UG") {
        eventInfo = events?.ugEvents.filter((event) => {
            return event.eventName === data[0].eventName
        })[0]
    }
    if (eventInfo == null) {
        eventInfo = events?.onlineEvents.filter((event) => {
            return event.eventName === data[0].eventName
        })[0]
    }

    const pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        doc.addImage(header, "PNG", 15, 0, 180, 40);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
    doc.text("DEPARTMENT OF COMPUTER APPLICATIONS", pageWidth / 2, 44, { align: "center" });
    doc.setFontSize(12);
    doc.text("QMAZE 2K24 - State Level Technical Symposium", pageWidth / 2, 52, { align: "center" });
    doc.setFont("helvetica", "normal", "normal");
    doc.setFontSize(12);

    doc.text(`Event Name : ${eventInfo?.eventName}`, 15, 65);
    doc.text(`Time : ${eventInfo?.time}`, 110, 65);
    doc.text(`Event Incharge : ${eventInfo?.incharge}`, 15, 75);
    doc.text(`Venue : ${eventInfo?.venue}`, 110, 75);

    doc.autoTable({
        head: [["Sno", "Lot Number", "Participants", "College Name"]],
        body: participantsData,
        startY: 85,
        styles: {
            fontSize: 8
        }
    })

    doc.save(`${data[0]?.eventName}.pdf`);
}

export const generateTeamsTable = (data) => {
    let tableData = data.map((value, index) => {
        return { key: index, lotNo: value?.lotNo, deptType: value?.deptType, deptName: value?.deptName, counts: value?.teamMembers.length }
    })
    return (
        <Table columns={teamsTableColumns} dataSource={tableData} pagination={false} className='w-100 px-2' />
    )
}

export const generateEventMembersTable = (data) => {
    let tableData = data.map((value, index) => {
        return { ...value, sno: index + 1, key: index }
    })
    return (
        <Table columns={eventMembersTableColumn} dataSource={tableData} pagination={false} className='w-100 px-2' />
    )
}

export const filterByEvent = (teamsData) => {
    let EventWiseList = { PG: [], UG: [] }
    let teamss = _.groupBy(teamsData, "deptType");
    let totalParticipants = [];
    teamss?.PG?.map((team) => {
        team.eventParticipants.map((event) => {
            let eventMembers = event?.members.filter((member) => {
                return member != ""
            })
            if (eventMembers.length > 0)
                totalParticipants.push({ eventName: event.eventName, members: eventMembers, lotNo: team.lotNo, collegeName: team.collegeName });
        })
    })
    totalParticipants = _.groupBy(totalParticipants, "eventName")
    EventWiseList.PG = totalParticipants;

    totalParticipants = [];
    teamss?.UG?.map((team) => {
        team.eventParticipants.map((event) => {
            let eventMembers = event?.members.filter((member) => {
                return member != ""
            })
            if (eventMembers.length > 0)
                totalParticipants.push({ eventName: event.eventName, members: eventMembers, lotNo: team.lotNo, collegeName: team.collegeName });
        })
    })
    totalParticipants = _.groupBy(totalParticipants, "eventName")
    EventWiseList.UG = totalParticipants;
    return EventWiseList;
}

export const imgToBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result)
    };
    reader.readAsDataURL(file);
}

export const generateNetmazeQuestionsTable = (data, dispatch, messageApi) => {
    let tableData = data?.map((value, index) => {
        return { ...value, deleteData: { levelNumber: parseInt(value.levelNumber), type: value.type, dispatch, messageApi }, key: index }
    })
    tableData=_.sortBy(tableData,"levelNumber")
    tableData=tableData?.sort(function (quesOne, quesTwo) {
        return quesOne.levelNumber - quesTwo.levelNumber;
    });
    return (
        <Table columns={netmazeQuestionTableColumn} dataSource={tableData} pagination={true} className='w-100 px-0' />
    )
}

export const generateNetmazeParticipantsTable = (data, dispatch, messageApi) => {
    let tableData = data?.map((value, index) => {
        return { ...value, deleteData: { lotNo: value.lotNo, dispatch, messageApi }, key: index }
    })
    return (
        <Table columns={netmazeParticipantsTableColumn} dataSource={tableData} pagination={false} className='w-100 px-0' />
    )
}

export const generateNetmazeLeaderboard = (data) => {
    let t = [...data];
    let tableData=[]
    if (t.length > 0) {
        let temp = t?.sort(function (participantOne, participantTwo) {
            return participantOne.level - participantTwo.level || participantTwo.totalAttempt - participantOne.totalAttempt || participantTwo.lastUpdatedOn - participantOne.lastUpdatedOn;
        });
        tableData = temp?.reverse()?.map((value, index) => {
            return { ...value, rank: index + 1, key: index }
        })
    }
    return (
        tableData ?
            <Table columns={netmazeLeaderboard} dataSource={tableData} pagination={true} className='w-100 px-0' />
            :
            ""
    )
}

export const generateAnswerKeyTable = (data) => {
    let tableData = data?.map((value, index) => {
        return { ...value, key: index }
    })
    return (
        <Table columns={netmazeAnswerKeyColumn} dataSource={tableData} pagination={true} className='w-100 px-0' />
    )
}

export const encryptData = (data) => {
    if (data)
        return cryptjs.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_DB_NETMAZE_PRIVATE_KEY).toString();
    else
        return null
}

export const decryptData = (data) => {
    if (data) {
        var bytes = cryptjs.AES.decrypt(data, process.env.REACT_APP_DB_NETMAZE_PRIVATE_KEY);
        return JSON.parse(bytes.toString(cryptjs.enc.Utf8));
    }
    else
        return null
}