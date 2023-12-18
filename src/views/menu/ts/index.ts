export const  menus = [
    {
        index: '1',
        name: '导航1',
        icon: 'Menu',
    },
    {
        index: '2',
        name: '导航2',
        icon: 'Menu',
    },
    {
        index: '3',
        name: '导航3',
        icon: 'Menu',
        children: [
            {
                index: '3-1',
                name: '导航3-1',
                icon: 'Menu',
            },
        ],
    },
];

export const menus2 = [
    {
        index: '1',
        name: '导航1',
        icon: 'Document'
    },
    {
        index: '2',
        name: '导航2',
        icon: 'Document'
    },
    {
        index: '3',
        name: '导航3',
        icon: 'Document',
        children: [
            {
                index: '3-1',
                name: '导航3-1',
                icon: 'Document',
                children: [
                    {
                        index: '3-1-1',
                        name: '导航3-1-1',
                        icon: 'Document',
                        children: [
                            {
                                index: '3-1-1-1',
                                name: '导航3-1-1-1',
                                icon: 'Document',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
