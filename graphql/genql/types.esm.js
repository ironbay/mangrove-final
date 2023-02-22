export default {
    "scalars": [
        1,
        3,
        7,
        9
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
        "Filter": {
            "id": [
                3
            ],
            "kind": [
                3
            ],
            "op": [
                3
            ],
            "value": [
                20
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
            "createSlackConnection": [
                15,
                {
                    "code": [
                        3,
                        "String!"
                    ],
                    "userID": [
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
        "NumberType": {
            "value": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "Float": {},
        "Pipe": {
            "enabled": [
                9
            ],
            "id": [
                1
            ],
            "name": [
                3
            ],
            "plaidSources": [
                10
            ],
            "slackDestinations": [
                16
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {},
        "PlaidSource": {
            "account": [
                11
            ],
            "filters": [
                4
            ],
            "id": [
                1
            ],
            "institution": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "PlaidSourceAccountType": {
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
        "PlaidSourceInstitutionType": {
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
        "Query": {
            "articles": [
                0
            ],
            "pipe": [
                8,
                {
                    "pipeID": [
                        3,
                        "String!"
                    ]
                }
            ],
            "pipes": [
                8,
                {
                    "userID": [
                        3,
                        "String!"
                    ]
                }
            ],
            "slackConnections": [
                15,
                {
                    "userID": [
                        3,
                        "String!"
                    ]
                }
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
                1
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
            "team": [
                17
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
        "SlackTeam": {
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
        "TextContainsType": {
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "TextType": {
            "value": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Value": {
            "on_NumberType": [
                6
            ],
            "on_TextContainsType": [
                18
            ],
            "on_TextType": [
                19
            ],
            "__typename": [
                3
            ]
        }
    }
}