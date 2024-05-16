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
    FILE_UPLOAD_OPTIONS : [
        {
            label: "IMAGES",
            icon: "photo_library",
            accept: "image/*"
          },
          {
            label: "VIDEOS",
            icon: "videocam",
            accept: "video/*"
          },
          {
            label: "FILES",
            icon: "picture_as_pdf",
            accept: "application/pdf"
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