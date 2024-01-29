import { ApiClientOptions, BaseApiClient } from '@/api/base-api-client';
import { Artist, Song } from '@/types/models';
import { PaginationParams } from '@/types/pagination';

// https://640799f62f01352a8a7faa72.mockapi.io/api/artists
// https://640799f62f01352a8a7faa72.mockapi.io/api/artists/1
// https://640799f62f01352a8a7faa72.mockapi.io/api/artists/1/songs
// https://640799f62f01352a8a7faa72.mockapi.io/api/artists/1/songs/1

const host = 'https://640799f62f01352a8a7faa72.mockapi.io';
const apiPath = '/api/artists';

export class ArtistApiClient extends BaseApiClient {
	constructor(options: ApiClientOptions) {
		super({ ...options, baseURL: options.baseURL });
	}

	public async getArtistList(): Promise<Artist[]> {
		return this.doRequest(async () => {
			const response = await this.axiosClient.get<Artist[]>('');
			return response.data;
		});
	}

	public async getArtistById(id: string): Promise<Artist> {
		return this.doRequest(async () => {
			const response = await this.axiosClient.get<Artist>(`/${id}`);
			return response.data;
		});
	}

	public async getArtistsSongs(artistId: string, params: PaginationParams): Promise<Song[]> {
		return await this.doRequest(async () => {
			const response = await this.axiosClient.get<Song[]>(
				`${artistId}/songs`,
				{
					params,
				});

			return response.data;
		});
	}

	public async getSongById(artistId: string, songId: string): Promise<Song> {
		return this.doRequest(async () => {
			const response = await this.axiosClient.get<Song>(`/${artistId}/songs/${songId}`);
			return response.data;
		});
	}
}

export const artistApiClient = new ArtistApiClient({ baseURL: host + apiPath });