export interface IArticle {
   id: string;
   title: string;
   imageUrl: string;
   content: string;
   publishedAt: string;
   comments: Array<IComment>;
}

export interface IComment {
   id: string;
   author: string;
   content: string;
   publishedAt: string;
}

export interface IRole {
   id: number;
   name: string;
}

export interface IUser {
   id: string;
   login: string;
   roleId: number;
   registeredAt: string;
}

export interface IAPIResponse<T> {
   data?: T;
   error?: string;
}

export interface IYandexWeatherApiResponse {
   geo_object: {
      locality: {
         name: string;
      };
   };
   fact: {
      temp: number;
      prec_strength: number;
   };
}
