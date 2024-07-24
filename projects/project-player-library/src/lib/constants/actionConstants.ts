export const actions = {
    PROJECT_ACTIONS : [
        {
            title: "SHARE",
            icon: "ios_share",
            action: "share",
            color: "primary-icon"
        },
        {
            title: "FILES",
            icon: "folder_open",
            action: "files",
            color: "primary-icon"
        },
        {
            title: "SYNC",
            icon: "sync",
            action: "sync",
            color: "primary-icon"
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
    FILE_UPLOAD_OPTIONS : [
        {
            label: "IMAGES",
            icon: "photo_library",
            accept: "image/jpg,image/png,image/jpeg"
          },
          {
            label: "VIDEOS",
            icon: "videocam",
            accept: "video/mp4"
          },
          {
            label: "FILES",
            icon: "picture_as_pdf",
            accept: "application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/csv"
          },
          {
            label: "LINKS",
            icon: "link",
            accept: "link"
          },
    ],
    TASK_STATUS: [
        {
            label : "NOT_STARTED",
            value:"notStarted"
        },
        {
            label : "IN_PROGRESS",
            value:"inProgress"
        },
        {
            label : "COMPLETED",
            value:"completed"
        },
    ],
    ACTION_LIST : [
        {
            name:"EDIT",
            icon:"edit",
            action:"edit",
            color: "primary-icon"
        },
        {
            name:"SHARE",
            icon:"ios_share",
            action:"share",
            color: "primary-icon"
        },
        {
            name:"DELETE",
            icon:"delete",
            action:"delete",
            color: "primary-icon"
        },
    ]
}