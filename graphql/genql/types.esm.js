export default {
    "scalars": [
        1,
        3,
        6,
        8
    ],
    "types": {
        "Article": {
            "comments": [
                2
            ],
            "id": [
                1
            ],
            "title": [
                1
            ],
            "url": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "Comment": {
            "id": [
                3
            ],
            "text": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "String": {},
        "CommonDataTimes": {
            "created": [
                3
            ],
            "updated": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Mutation": {
            "addComment": [
                2,
                {
                    "articleID": [
                        3,
                        "String!"
                    ],
                    "text": [
                        3,
                        "String!"
                    ]
                }
            ],
            "addPipe": [
                10,
                {
                    "enabled": [
                        6,
                        "Boolean!"
                    ],
                    "name": [
                        3,
                        "String!"
                    ],
                    "number_filters": [
                        9,
                        "[NumberFilterInputType!]!"
                    ]
                }
            ],
            "createArticle": [
                0,
                {
                    "title": [
                        3,
                        "String!"
                    ],
                    "url": [
                        3,
                        "String!"
                    ]
                }
            ],
            "removeComment": [
                2,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {},
        "NumberFilter": {
            "account": [
                11
            ],
            "connection": [
                12
            ],
            "id": [
                1
            ],
            "operand": [
                3
            ],
            "value": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "Float": {},
        "NumberFilterInputType": {
            "operand": [
                3
            ],
            "value": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "Pipe": {
            "enabled": [
                6
            ],
            "id": [
                1
            ],
            "name": [
                3
            ],
            "number_filters": [
                7
            ],
            "slack_destinations": [
                16
            ],
            "string_filters": [
                17
            ],
            "times": [
                4
            ],
            "__typename": [
                3
            ]
        },
        "PlaidAccount": {
            "id": [
                1
            ],
            "kind": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PlaidConnection": {
            "accounts": [
                11
            ],
            "id": [
                1
            ],
            "institution_color": [
                3
            ],
            "institution_logo": [
                3
            ],
            "institution_name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Query": {
            "articles": [
                0
            ],
            "pipes": [
                10
            ],
            "pipesFromPlaidConnection": [
                10,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "pipesFromSlackConnection": [
                10,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "plaidConnection": [
                12,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "plaidConnections": [
                12
            ],
            "slackConnecion": [
                15,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "slackConnections": [
                15
            ],
            "__typename": [
                3
            ]
        },
        "SlackChannel": {
            "id": [
                1
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "SlackConnection": {
            "channels": [
                14
            ],
            "id": [
                1
            ],
            "logo": [
                3
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "SlackDestination": {
            "channel": [
                14
            ],
            "connection": [
                15
            ],
            "id": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "StringFilter": {
            "id": [
                1
            ],
            "operand": [
                3
            ],
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        }
    }
}