import { ApiClientOptions, BaseApiClient } from '@/api/base-api-client';
import { Artist, Song } from '@/types/models';
import { PaginatedList } from '@/types/paginated-list';

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
		const response = await this.axiosClient.get<Artist[]>('');
		return response.data;
	}

	public async getArtistById(id: string): Promise<Artist> {
		const response = await this.axiosClient.get<Artist>(`/${id}`);
		return response.data;
	}

	public async getSongListPage(artistId: string, page: number, limit: number): Promise<PaginatedList<Song>> {
		const response = await this.axiosClient.get<Song[]>(
			`${artistId}/songs`,
			{
				params: {
					page,
					limit,
				},
			});

		return {
			currentPage: page,
			data: response.data,
		};
	}

	public async getSongById(id: string): Promise<Song> {
		const response = await this.axiosClient.get<Song>(`songs/${id}`);
		return response.data;
	}
}

export const artistApiClient = new ArtistApiClient({ baseURL: host + apiPath });