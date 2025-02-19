import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Odoo from '../utils/Odoo';
import {goHome, goToAuth} from '../utils/navigation';
import SupercoopSignIn from '../utils/SupercoopSignIn';
import Database from '../utils/Database';

export interface Props {
    componentId: string;
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 28,
    },
    quoteView: {
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    quoteText: {
        color: '#000000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const welcomeMessages = [
    'Alignement des astres...',
    "En train de faire l'impossible...",
    "Comment vas-tu aujourd'hui ?",
    'Je te souhaite une belle journée !',
    "A la recherche d'Odoo...",
    'Cuisson en cours...',
    "Vers l'infini et l'au delà !",
    'Il était une fois...',
    'Dans une galaxie très très lointaine...',
];

export default class Initializing extends React.Component<Props> {
    static screenName = 'Initializing';

    constructor(props: Props) {
        super(props);
        this.state = {
            loggedUser: null,
        };
    }

    componentDidMount(): void {
        Database.connect().then(() => {
            Odoo.getInstance()
                .fetchBarcodeNomenclature()
                .then(() => {
                    this.signInSilently();
                });
        });
    }

    signInSilently(): void {
        SupercoopSignIn.getInstance()
            .signInSilently()
            .then(
                () => {
                    console.debug('Previously Authenticated.');
                    goHome();
                },
                () => {
                    console.debug('Going to authentication screen.');
                    goToAuth();
                },
            );
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Chargement...</Text>
                <View style={styles.quoteView}>
                    <Text style={styles.quoteText}>
                        {welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}
                    </Text>
                </View>
            </View>
        );
    }
}
