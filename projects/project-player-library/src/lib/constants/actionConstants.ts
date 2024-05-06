export const actions = {
    PROJECT_ACTIONS : [
        {
            title: "DOWNLOAD",
            icon: "cloud_download",
            action: "download",
            color: "primary"
        },
        {
            title: "SHARE",
            icon: "ios_share",
            action: "share",
            color: "primary"
        },
        {
            title: "FILES",
            icon: "folder_open",
            action: "files",
            color: "primary"
        },
        {
            title: "SYNC",
            icon: "sync",
            action: "sync",
            color: "primary"
        }
    ],
    SYNCED_ACTION : {
        title: "SYNCED",
        icon: "sync",
        action: "synced",
        color: "green"
    },
    DOWNLOADED_ACTION : {
        title: "DOWNLOADED",
        icon: "check_circle",
        action: "downloaded",
        color: "green"
    },
        SUBTASK_OPTIONS: [
    {
        label : "Not Started",
        value:"notStarted"
    },
    {
        label : "In Progress",
        value:"inProgress"
    },
    {
        label : "Completed",
        value:"completed"
    },
    ],
        TASK_OPTIONS : [
    {
            label: 'Not Started',
            value: 'notStarted',
        },
        {
            label: 'In Progress',
            value: 'inProgress',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
    ],
        ACTION_LIST : [
    {
        name:"EDIT",
        icon:"edit",
        action:"edit"
    },
    {
        name:"SHARE",
        icon:"ios_share",
        action:"share"
    },
    {
        name:"DELETE",
        icon:"delete",
        action:"delete"
    },
    ]
}