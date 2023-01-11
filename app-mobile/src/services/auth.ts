import { api } from './api';

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

// export async function signIn(params) {
//     try {
//         const response = await api.post('/auth/login',{
//             username: params.username,
//             password: params.password,
//         });
//         console.log(
//             '------------###-------------',
//             JSON.stringify(response, undefined, 2),
//             '------------***------------'
//         );
//         return response.data;
//     } catch (error: any) {
//         console.log(
//             '------------###-------------',
//             '------------ERROR-------------',
//             JSON.stringify(error.response, undefined, 2),
//             '------------***------------'
//         );
//     }
// }

// export function signIn(): Promise<Response> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
//                 user: {
//                     name: 'Thiago',
//                     email: 'thiagomarinho@rocketseat.com.br',
//                 },
//             });
//         }, 2000);
//     });
// }
