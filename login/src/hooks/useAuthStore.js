import { useDispatch, useSelector} from 'react-redux';
import { pokemonApi } from '../../api';


export const useAuthStore = () =>{

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch;

    const startLogin = async ({ email, password }) => {
        console.log({ email, password});

        try {

            const resp = await pokemonApi.post('/auth')
        } catch (error) {
            console.log(error)
        }

    }

    return {
        errorMessage,
        status,
        user,
        startLogin
    }
}