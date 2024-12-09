import React from 'react';
import { View } from 'react-native';

const DashboardBox = ({ children }) => {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                height: 419,
                width: 356,
                marginTop: 10,
                borderRadius: 15,
                alignSelf: 'center',
                elevation: 4,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 2.41,
            }}
        >
            {children}
        </View>
    );
};

export default DashboardBox;
