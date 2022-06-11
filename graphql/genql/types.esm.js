export default {
    "scalars": [
        1,
        3,
        11
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
                5
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
            "plaidConnection": [
                6,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "plaidConnections": [
                6
            ],
            "slackConnecion": [
                9,
                {
                    "id": [
                        3,
                        "String!"
                    ]
                }
            ],
            "slackConnections": [
                9
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
                8
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
                8
            ],
            "connection": [
                9
            ],
            "id": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Boolean": {}
    }
}