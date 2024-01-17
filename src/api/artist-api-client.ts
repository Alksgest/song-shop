import {ApiClientOptions, BaseApiClient} from "@/api/base-api-client";
import {Artist} from "@/types/models";

// https://640799f62f01352a8a7faa72.mockapi.io/api/artists
// https://640799f62f01352a8a7faa72.mockapi.io/api/artists/1
// https://640799f62f01352a8a7faa72.mockapi.io/api/artists/1/songs
// https://640799f62f01352a8a7faa72.mockapi.io/api/artists/1/songs/1

const host = "https://640799f62f01352a8a7faa72.mockapi.io";
const apiPath = "/api/artists"

export class ArtistApiClient extends BaseApiClient {
    constructor(options: ApiClientOptions) {
        super({...options, baseURL: options.baseURL});
    }

    public async getList(): Promise<Artist[]> {
        const response = await this.axiosClient.get<Artist[]>("");
        return response.data;
    }

    public async getById(id: string): Promise<Artist> {
        const response = await this.axiosClient.get<Artist>(`/${id}`);
        return response.data;
    }
}

export const artistApiClient = new ArtistApiClient({baseURL: host + apiPath});