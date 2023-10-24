import { AxiosError } from 'axios';
import { ApiError } from '@src/@types/index';

export type CustomError = AxiosError<unknown> | ApiError | null | unknown;
