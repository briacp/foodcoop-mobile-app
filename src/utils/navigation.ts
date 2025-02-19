import {Navigation, Options} from 'react-native-navigation';
import GoodsReceiptService from '../services/GoodsReceiptService';

export function goToAuth(): void {
    Navigation.setRoot({
        root: {
            component: {
                name: 'Welcome',
            },
        },
    });
}

function loadBadges(): void {
    GoodsReceiptService.getInstance()
        .getPurchaseOrdersPlannedTodays()
        .then(purchaseOrders => {
            Navigation.mergeOptions('GoodsReceiptTab', {
                bottomTab: {
                    badge: purchaseOrders.length.toString(),
                },
            });
        });
}

export function goHome(): void {
    Navigation.setDefaultOptions({
        bottomTab: {
            iconColor: 'black',
            textColor: 'black',
            selectedIconColor: 'blue',
            selectedTextColor: 'blue',
        },
    });

    loadBadges();

    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: 'News/List',
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                    text: 'Actualités',
                                    icon: require('../../assets/icons/newspaper-regular.png'),
                                },
                            },
                        },
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: 'Scanner',
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                    text: 'Scanette',
                                    icon: require('../../assets/icons/barcode-read-regular.png'),
                                },
                            },
                        },
                    },
                    {
                        stack: {
                            id: 'ListsListTab',
                            children: [
                                {
                                    component: {
                                        name: 'Lists/List',
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                    text: 'Listes',
                                    icon: require('../../assets/icons/clipboard-list-check-regular.png'),
                                },
                            },
                        },
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: 'Plus',
                                    },
                                },
                            ],
                            options: {
                                bottomTab: {
                                    text: 'Plus',
                                    icon: require('../../assets/icons/ellipsis-h-regular.png'),
                                },
                            },
                        },
                    },
                ],
            },
        },
    });
}

export function goToScreen(screen: string): void {
    Navigation.setStackRoot('App', [
        {
            component: {
                id: screen,
                name: screen,
            },
        },
    ]);
}

export function defaultScreenOptions(screenTitle: string): Options {
    return {
        topBar: {
            title: {
                text: screenTitle,
                fontSize: 20,
            },
        },
    };
}
