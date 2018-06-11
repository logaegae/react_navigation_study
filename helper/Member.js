import { serverAuth } from '../lib/ServerFn';
import { AsyncStorage } from 'react-native';

export const auth = async () => {

    let key = await AsyncStorage.getItem('@RouteTest:key');

    if (!key) {
        return false;
    }

    const result = await serverAuth(key);

    if(result.status === 'SUCCESS')
        return result;
    else
        return false;
}