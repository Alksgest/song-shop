import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

export type ApiClientOptions = {
    basePath?: string;
} & CreateAxiosDefaults;

export class BaseApiClient {
    protected readonly options: ApiClientOptions;
    protected readonly axiosClient: AxiosInstance;

    constructor(options: ApiClientOptions) {
        this.options = options;
        this.axiosClient = axios.create(options);
    }
}