export const projectDetailsData = {
    "certificate": {
        "templateUrl": "https://sunbirdstagingpublic.blob.core.windows.net/samiksha/certificateTemplates/6492d8a5955f600008e282d1/9bb884fc-8a56-4727-9522-25a7d5b8ea06_21-5-2023-1687345317608.svg?sv=2023-01-03&st=2024-04-03T07%3A26%3A43Z&se=2024-04-04T13%3A26%3A43Z&sr=b&sp=r&sig=P1gaSDyIdqDMBpd%2FZARfp9ejCttx5OH%2F9kzHnYIp5vY%3D",
        "status": "active",
        "criteria": {
            "validationText": "Complete validation message",
            "expression": "C1&&C2&&C3&&C4",
            "conditions": {
                "C1": {
                    "validationText": "Submit your project.",
                    "expression": "C1",
                    "conditions": {
                        "C1": {
                            "scope": "project",
                            "key": "status",
                            "operator": "==",
                            "value": "submitted"
                        }
                    }
                },
                "C2": {
                    "validationText": "Add 2  evidences at the project level",
                    "expression": "C1",
                    "conditions": {
                        "C1": {
                            "scope": "project",
                            "key": "attachments",
                            "function": "count",
                            "filter": {
                                "key": "type",
                                "value": "all"
                            },
                            "operator": ">=",
                            "value": 2
                        }
                    }
                },
                "C3": {
                    "validationText": "Add 2 evidence(s) for the task Conduct a needs assessment of the school",
                    "expression": "C1",
                    "conditions": {
                        "C1": {
                            "scope": "task",
                            "key": "attachments",
                            "function": "count",
                            "filter": {
                                "key": "type",
                                "value": "all"
                            },
                            "operator": ">=",
                            "value": 2,
                            "taskDetails": [
                                "6492d8a3ff4204000909dcc2"
                            ]
                        }
                    }
                },
                "C4": {
                    "validationText": "Add 2 evidence(s) for the task Analyse the findings from the needs assessment",
                    "expression": "C1",
                    "conditions": {
                        "C1": {
                            "scope": "task",
                            "key": "attachments",
                            "function": "count",
                            "filter": {
                                "key": "type",
                                "value": "all"
                            },
                            "operator": ">=",
                            "value": 2,
                            "taskDetails": [
                                "6492d8a3ff4204000909dcc6"
                            ]
                        }
                    }
                }
            }
        },
        "templateId": "6492d8a5955f600008e282d1"
    },
    "userRole": "HM,DEO",
    "status": "started",
    "isDeleted": false,
    "categories": [
        {
            "label": "Students",
            "value": "5fcfa9a2457d6055e33843f0"
        },
        {
            "label": "Education Leader",
            "value": "5fcfa9a2457d6055e33843f3"
        }
    ],
    "tasks": [
        {
            "_id": "c38574c8-251c-48bd-963a-03753b43492b",
            "createdBy": "9bb884fc-8a56-4727-9522-25a7d5b8ea06",
            "updatedBy": "52907735-7316-4d8d-886d-af46a8830549",
            "isDeleted": false,
            "isDeletable": false,
            "taskSequence": [],
            "children": [],
            "visibleIf": [],
            "hasSubTasks": false,
            "learningResources": [],
            "deleted": false,
            "type": "observation",
            "solutionDetails": {
                "type": "observation",
                "subType": "district",
                "minNoOfSubmissionsRequired": "2.0",
                "_id": "6492d63e5c81330008b71b30",
                "isReusable": false,
                "externalId": "9a0b9706-1021-11ee-8145-651b4322082f-OBSERVATION-TEMPLATE_CHILD",
                "name": "obs without rubrics 3",
                "programId": "648c1020d28df50009eea3b6",
                "allowMultipleAssessemts": true,
                "isRubricDriven": false,
                "criteriaLevelReport": false
            },
            "name": "Conduct a needs assessment of the school",
            "externalId": "Task1-1687345314917",
            "description": "",
            "sequenceNumber": "1",
            "updatedAt": "2023-08-25T05:38:35.238Z",
            "createdAt": "2023-06-21T11:01:55.901Z",
            "status": "inProgress",
            // "status":"completed",
            "referenceId": "6492d8a3ff4204000909dcc2",
            "isImportedFromLibrary": false,
            "syncedAt": "2023-08-25T05:38:35.238Z",
            "observationInformation": {
                "entityId": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03",
                "programId": "648c1020d28df50009eea3b6",
                "observationId": "64945b5f5c81330008b749c8",
                "solutionId": "6492d63e5c81330008b71b30"
            },
            "submissions": [
                {
                    "_id": "64a3f5165c81330008b83467",
                    "status": "started",
                    "completedDate": ""
                }
            ],
            "endDate": "2023-09-30T11:07:00+05:30",
            "submissionDetails": {
                "entityId": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03",
                "programId": "648c1020d28df50009eea3b6",
                "observationId": "64945b5f5c81330008b749c8",
                "solutionId": "6492d63e5c81330008b71b30",
                "_id": "64a3f5165c81330008b83467",
                "status": "started",
                "completedDate": ""
            },
            "isEdit": true
        },
        {
            "_id": "428a4215-79a4-446b-9f85-681cee1391db",
            "createdBy": "9bb884fc-8a56-4727-9522-25a7d5b8ea06",
            "updatedBy": "9bb884fc-8a56-4727-9522-25a7d5b8ea06",
            "isDeleted": false,
            "isDeletable": true,
            "taskSequence": [
                "Task2-1687345314917-subtask-4"
            ],
            "children": [
                {
                    "_id": "7c68206f-e2c0-4c54-93ce-7714a23a5b22",
                    "createdBy": "9bb884fc-8a56-4727-9522-25a7d5b8ea06",
                    "updatedBy": "9bb884fc-8a56-4727-9522-25a7d5b8ea06",
                    "isDeleted": false,
                    "isDeletable": true,
                    "taskSequence": [],
                    "children": [],
                    "visibleIf": [
                        {
                            "operator": "===",
                            "_id": "428a4215-79a4-446b-9f85-681cee1391db",
                            "value": "started"
                        }
                    ],
                    "hasSubTasks": false,
                    "learningResources": [],
                    "deleted": false,
                    "type": "simple",
                    "name": "Identify the areas of improvement in the school to work on",
                    "externalId": "Task2-1687345314917-subtask-4",
                    "description": "",
                    "updatedAt": "2023-06-22T14:31:50.142Z",
                    "createdAt": "2023-06-21T11:01:55.912Z",
                    "parentId": "6492d8a3ff4204000909dcc6",
                    "status": "notStarted",
                    "referenceId": "6492d8a3ff4204000909dcc9",
                    "isImportedFromLibrary": false,
                    "syncedAt": "2023-06-22T14:31:50.142Z"
                }
            ],
            "visibleIf": [],
            "hasSubTasks": true,
            "learningResources": [],
            "deleted": false,
            "type": "simple",
            "name": "Analyse the findings from the needs assessment",
            "externalId": "Task2-1687345314917",
            "description": "",
            "sequenceNumber": "2",
            "updatedAt": "2023-06-22T14:31:50.142Z",
            "createdAt": "2023-06-21T11:01:55.908Z",
            "status": "notStarted",
            "referenceId": "6492d8a3ff4204000909dcc6",
            "isImportedFromLibrary": false,
            "syncedAt": "2023-06-22T14:31:50.142Z",
            "attachments": [
                {
                    "name": "1713859717051.jpg",
                    "type": "image/jpeg",
                    "isUploaded": false,
                    "url": "",
                    "localUrl": "http://localhost/_app_file_/storage/emulated/0/Android/data/org.sunbird.app.staging/files/1713859717051.jpg"
                },
                {
                    "name": "trtt.com",
                    "type": "link",
                    "isUploaded": false,
                    "url": ""
                },
                {
                    "name": "1713859723511.pdf",
                    "type": "application/pdf",
                    "isUploaded": false,
                    "url": "",
                    "localUrl": "http://localhost/_app_file_/storage/emulated/0/Android/data/org.sunbird.app.staging/files/1713859723511.pdf"
                }
            ],
            "isEdit": true
        }
    ],
    "learningResources": [],
    "hasAcceptedTAndC": false,
    "taskSequence": [
        "Task1-1687345314917",
        "Task2-1687345314917"
    ],
    "recommendedFor": [
        {
            "roleId": "5f32d8238e0dc831240405a0",
            "code": "HM"
        }
    ],
    "attachments": [],
    "deleted": false,
    "description": "Leveraging the huge number of private schools to show the significance of the financial problem by creating a petition and presenting to the authorities.",
    "title": "Improvement Project 4",
    "solutionId": "6492d8a4955f600008e282b0",
    "solutionExternalId": "IDEAIMP-4-1687345314917-PROJECT-SOLUTION",
    "programId": "6492b9fda08e6200086f30c7",
    "programExternalId": "Pgm_Teacher_template-2-QA_new",
    "isAPrivateProgram": false,
    "appInformation": {
        "appName": "Sunbird",
        "appVersion": "4.8.local.0-debug"
    },
    "entityId": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03",
    "lastDownloadedAt": "2023-06-22T14:31:50.178Z",
    "userProfile": {
        "maskedPhone": null,
        "tcStatus": null,
        "channel": "dikshapreprodcustodian",
        "profileUserTypes": [
            {
                "type": "administrator",
                "subType": "hm"
            },
            {
                "type": "administrator",
                "subType": "deo"
            }
        ],
        "updatedDate": "2023-06-22 14:03:43:910+0000",
        "managedBy": null,
        "flagsValue": 0,
        "id": "52907735-7316-4d8d-886d-af46a8830549",
        "recoveryEmail": "",
        "identifier": "52907735-7316-4d8d-886d-af46a8830549",
        "updatedBy": "52907735-7316-4d8d-886d-af46a8830549",
        "externalIds": [],
        "roleList": [
            {
                "name": "Book Creator",
                "id": "BOOK_CREATOR"
            },
            {
                "name": "Membership Management",
                "id": "MEMBERSHIP_MANAGEMENT"
            },
            {
                "name": "Flag Reviewer",
                "id": "FLAG_REVIEWER"
            },
            {
                "name": "Report Viewer",
                "id": "REPORT_VIEWER"
            },
            {
                "name": "Program Manager",
                "id": "PROGRAM_MANAGER"
            },
            {
                "name": "Program Designer",
                "id": "PROGRAM_DESIGNER"
            },
            {
                "name": "System Administration",
                "id": "SYSTEM_ADMINISTRATION"
            },
            {
                "name": "Content Curation",
                "id": "CONTENT_CURATION"
            },
            {
                "name": "Book Reviewer",
                "id": "BOOK_REVIEWER"
            },
            {
                "name": "Content Creator",
                "id": "CONTENT_CREATOR"
            },
            {
                "name": "Org Management",
                "id": "ORG_MANAGEMENT"
            },
            {
                "name": "Course Admin",
                "id": "COURSE_ADMIN"
            },
            {
                "name": "Org Moderator",
                "id": "ORG_MODERATOR"
            },
            {
                "name": "Public",
                "id": "PUBLIC"
            },
            {
                "name": "Admin",
                "id": "ADMIN"
            },
            {
                "name": "Course Mentor",
                "id": "COURSE_MENTOR"
            },
            {
                "name": "Content Reviewer",
                "id": "CONTENT_REVIEWER"
            },
            {
                "name": "Report Admin",
                "id": "REPORT_ADMIN"
            },
            {
                "name": "Org Admin",
                "id": "ORG_ADMIN"
            }
        ],
        "rootOrgId": "0126796199493140480",
        "prevUsedEmail": "",
        "firstName": "ft1",
        "isMinor": false,
        "tncAcceptedOn": 1687442512347,
        "profileDetails": null,
        "phone": "",
        "dob": "1995-12-31",
        "status": 1,
        "lastName": null,
        "tncLatestVersion": "v13",
        "roles": [],
        "prevUsedPhone": "",
        "stateValidated": false,
        "isDeleted": false,
        "organisations": [
            {
                "organisationId": "0126796199493140480",
                "approvedBy": null,
                "channel": "dikshapreprodcustodian",
                "updatedDate": null,
                "approvaldate": null,
                "isSystemUpload": false,
                "isDeleted": false,
                "id": "013823529419833344438",
                "isApproved": null,
                "orgjoindate": "2023-06-22 14:01:46:541+0000",
                "isSelfDeclaration": true,
                "updatedBy": null,
                "orgName": "Staging Custodian Organization",
                "addedByName": null,
                "addedBy": null,
                "associationType": 2,
                "locationIds": [
                    "027f81d8-0a2c-4fc6-96ac-59fe4cea3abf",
                    "8250d58d-f1a2-4397-bfd3-b2e688ba7141"
                ],
                "orgLocation": [
                    {
                        "type": "state",
                        "id": "027f81d8-0a2c-4fc6-96ac-59fe4cea3abf"
                    },
                    {
                        "type": "district",
                        "id": "8250d58d-f1a2-4397-bfd3-b2e688ba7141"
                    }
                ],
                "externalId": "101010",
                "userId": "52907735-7316-4d8d-886d-af46a8830549",
                "isSchool": false,
                "hashTagId": "0126796199493140480",
                "isSSO": false,
                "isRejected": null,
                "locations": [
                    {
                        "code": "29",
                        "name": "Karnataka",
                        "id": "027f81d8-0a2c-4fc6-96ac-59fe4cea3abf",
                        "type": "state",
                        "parentId": null
                    },
                    {
                        "code": "2901",
                        "name": "BELAGAVI",
                        "id": "8250d58d-f1a2-4397-bfd3-b2e688ba7141",
                        "type": "district",
                        "parentId": "027f81d8-0a2c-4fc6-96ac-59fe4cea3abf"
                    }
                ],
                "position": null,
                "orgLeftDate": null
            },
            {
                "organisationId": "01275630321992499239077",
                "approvedBy": null,
                "channel": "apekx",
                "updatedDate": null,
                "approvaldate": null,
                "isSystemUpload": false,
                "isDeleted": false,
                "id": "013823534336098304439",
                "isApproved": false,
                "orgjoindate": "2023-06-22 14:03:43:920+0000",
                "isSelfDeclaration": true,
                "updatedBy": null,
                "orgName": "MPPS HANUMANNAHALLI",
                "addedByName": null,
                "addedBy": "52907735-7316-4d8d-886d-af46a8830549",
                "associationType": 2,
                "locationIds": [
                    "bc75cc99-9205-463e-a722-5326857838f8",
                    "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03",
                    "966c3be4-c125-467d-aaff-1eb1cd525923"
                ],
                "orgLocation": [
                    {
                        "type": "state",
                        "id": "bc75cc99-9205-463e-a722-5326857838f8"
                    },
                    {
                        "type": "district",
                        "id": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03"
                    },
                    {
                        "type": "block",
                        "id": "966c3be4-c125-467d-aaff-1eb1cd525923"
                    }
                ],
                "externalId": "28226200910",
                "userId": "52907735-7316-4d8d-886d-af46a8830549",
                "isSchool": true,
                "hashTagId": "01275630321992499239077",
                "isSSO": false,
                "isRejected": false,
                "locations": [
                    {
                        "code": "28",
                        "name": "Andhra Pradesh",
                        "id": "bc75cc99-9205-463e-a722-5326857838f8",
                        "type": "state",
                        "parentId": null
                    },
                    {
                        "code": "2822",
                        "name": "ANANTAPUR",
                        "id": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03",
                        "type": "district",
                        "parentId": "bc75cc99-9205-463e-a722-5326857838f8"
                    },
                    {
                        "code": "282262",
                        "name": "AGALI",
                        "id": "966c3be4-c125-467d-aaff-1eb1cd525923",
                        "type": "block",
                        "parentId": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03"
                    }
                ],
                "position": null,
                "orgLeftDate": null
            }
        ],
        "provider": null,
        "countryCode": null,
        "tncLatestVersionUrl": "https://obj.stage.sunbirded.org/privacy-policy/terms-of-use.html",
        "maskedEmail": "ft*@yopmail.com",
        "email": "ft*@yopmail.com",
        "rootOrg": {
            "organisationSubType": null,
            "channel": "dikshapreprodcustodian",
            "description": "Pre-prod Custodian Organization",
            "updatedDate": "2022-02-18 09:50:42:752+0000",
            "organisationType": 5,
            "isTenant": true,
            "provider": null,
            "id": "0126796199493140480",
            "isBoard": true,
            "email": null,
            "slug": "dikshapreprodcustodian",
            "isSSOEnabled": null,
            "orgName": "Staging Custodian Organization",
            "updatedBy": null,
            "locationIds": [
                "027f81d8-0a2c-4fc6-96ac-59fe4cea3abf",
                "8250d58d-f1a2-4397-bfd3-b2e688ba7141"
            ],
            "externalId": "101010",
            "orgLocation": [
                {
                    "type": "state",
                    "id": "027f81d8-0a2c-4fc6-96ac-59fe4cea3abf"
                },
                {
                    "type": "district",
                    "id": "8250d58d-f1a2-4397-bfd3-b2e688ba7141"
                }
            ],
            "isRootOrg": true,
            "rootOrgId": "0126796199493140480",
            "imgUrl": null,
            "homeUrl": null,
            "createdDate": "2019-01-18 09:48:13:428+0000",
            "createdBy": "system",
            "hashTagId": "0126796199493140480",
            "status": 1
        },
        "tcUpdatedDate": null,
        "userLocations": [
            {
                "code": "2822",
                "name": "ANANTAPUR",
                "id": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03",
                "type": "district",
                "parentId": "bc75cc99-9205-463e-a722-5326857838f8"
            },
            {
                "code": "282262",
                "name": "AGALI",
                "id": "966c3be4-c125-467d-aaff-1eb1cd525923",
                "type": "block",
                "parentId": "2f76dcf5-e43b-4f71-a3f2-c8f19e1fce03"
            },
            {
                "code": "28",
                "name": "Andhra Pradesh",
                "id": "bc75cc99-9205-463e-a722-5326857838f8",
                "type": "state",
                "parentId": null
            },
            {
                "code": "28226200910",
                "name": "MPPS HANUMANNAHALLI",
                "id": "01275630321992499239077",
                "type": "school",
                "parentId": ""
            }
        ],
        "recoveryPhone": "",
        "userName": "ft1_3iib",
        "userId": "52907735-7316-4d8d-886d-af46a8830549",
        "declarations": [],
        "promptTnC": false,
        "lastLoginTime": 0,
        "createdDate": "2023-06-22 14:01:46:522+0000",
        "framework": {
            "board": [
                "State (Andhra Pradesh)"
            ],
            "gradeLevel": [
                "Class 1",
                "Class 2",
                "Class 3"
            ],
            "id": [
                "ap_k-12_1"
            ],
            "medium": [
                "English"
            ],
            "subject": [
                "English"
            ]
        },
        "createdBy": null,
        "profileUserType": {
            "subType": "hm",
            "type": "administrator"
        },
        "tncAcceptedVersion": "v13"
    },
    "syncedAt": "2023-08-25T05:38:35.238Z",
    "entityName": "Anantapur",
    "programName": "Program Teacher-2,also called a schoolteacher or औपचारिक  रूप से एक शिक्षक, is a person who helps students to ಜ್ಞಾನವನ್ನು ಸಂಪಾದಿಸಿ, competence, or virtue, via the practice of బోధన.-Teacher4",
    "goal": "Goal is added for project",
    "rationale": "",
    "primaryAudience": "",
    "duration": "2 months",
    "successIndicators": "",
    "risks": "",
    "approaches": "",
    "isEdit": true,
    "updatedAt": "2024-04-23T08:08:44.583Z",
    "_id": "64945b56ff4204000909ef83",
    "_rev": "5-a830846190dea03188b0d2544e1312b2"
}