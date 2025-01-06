export const actions = {
    PROJECT_ACTIONS : [
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
    CERTIFICATE_ACTION :{
        title: "CERTIFICATE",
        icon: "workspace_premium",
        action: "certificate",
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
            label: "IMAGE",
            icon: "photo_library",
            accept: "image/jpg,image/png,image/jpeg"
          },
          {
            label: "VIDEO",
            icon: "videocam",
            accept: "video/mp4"
          },
          {
            label: "FILE",
            icon: "picture_as_pdf",
            accept: "application/pdf"
          },
          {
            label: "LINK",
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
            label : "COMPLETE",
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
            name:"DELETE",
            icon:"delete",
            action:"delete",
            color: "primary-icon"
        },
    ]
}